// Generates PWA icons (192/512 standard + 512 maskable) and copies the hero image.
// Uses only Node built-ins (zlib) — no external dependencies.
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "client", "public");
const ICONS = path.join(PUBLIC, "icons");
const IMAGES = path.join(PUBLIC, "images");

fs.mkdirSync(ICONS, { recursive: true });
fs.mkdirSync(IMAGES, { recursive: true });

// --- PNG encoding helpers -------------------------------------------------
const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

function encodePNG(size, pixels) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  // raw scanlines with filter byte 0
  const raw = Buffer.alloc(size * (size * 4 + 1));
  let p = 0;
  for (let y = 0; y < size; y++) {
    raw[p++] = 0;
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      raw[p++] = pixels[i];
      raw[p++] = pixels[i + 1];
      raw[p++] = pixels[i + 2];
      raw[p++] = pixels[i + 3];
    }
  }
  const idat = zlib.deflateSync(raw);
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", idat),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// --- icon drawing ---------------------------------------------------------
function lerp(a, b, t) {
  return Math.round(a + (b - a) * t);
}

function drawIcon(size, rounded) {
  const px = new Uint8Array(size * size * 4);
  const c = size / 2;
  const bgTop = [14, 58, 59]; // #0E3A3B
  const bgBot = [28, 107, 102]; // #1C6B66
  const pool = [191, 227, 220]; // #BFE3DC
  const coral = [223, 98, 79]; // #DF624F
  const poolR = rounded ? size * 0.3 : size * 0.22;
  const ringR = rounded ? size * 0.355 : size * 0.27;
  const ringW = Math.max(3, size * 0.022);
  const corner = rounded ? size * 0.18 : 0;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const dx = x - c;
      const dy = y - c;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // rounded-corner mask (outside = transparent)
      let alpha = 255;
      if (rounded && corner > 0) {
        const ax = Math.min(Math.abs(dx), Math.abs(c - corner));
        const ay = Math.min(Math.abs(dy), Math.abs(c - corner));
        if (Math.abs(dx) > c - corner && Math.abs(dy) > c - corner) {
          const ex = Math.abs(dx) - (c - corner);
          const ey = Math.abs(dy) - (c - corner);
          if (Math.sqrt(ex * ex + ey * ey) > corner) alpha = 0;
        }
      }

      let r, g, b;
      if (alpha === 0) {
        px[i + 3] = 0;
        continue;
      }
      // diagonal background gradient
      const t = (x + y) / (2 * size);
      r = lerp(bgTop[0], bgBot[0], t);
      g = lerp(bgTop[1], bgBot[1], t);
      b = lerp(bgTop[2], bgBot[2], t);

      // coral ring
      if (Math.abs(dist - ringR) <= ringW / 2) {
        r = coral[0]; g = coral[1]; b = coral[2];
      }
      // pool fill
      if (dist < poolR) {
        r = pool[0]; g = pool[1]; b = pool[2];
      }

      px[i] = r;
      px[i + 1] = g;
      px[i + 2] = b;
      px[i + 3] = alpha;
    }
  }
  return px;
}

fs.writeFileSync(path.join(ICONS, "icon-192.png"), encodePNG(192, drawIcon(192, true)));
fs.writeFileSync(path.join(ICONS, "icon-512.png"), encodePNG(512, drawIcon(512, true)));
fs.writeFileSync(path.join(ICONS, "icon-maskable-512.png"), encodePNG(512, drawIcon(512, false)));
console.log("Wrote PWA icons to", ICONS);

// --- copy hero image for og:image ----------------------------------------
const heroSrc = path.join(ROOT, "assets", "angels-billabong-real.jpeg");
const heroDst = path.join(IMAGES, "hero.jpg");
if (fs.existsSync(heroSrc)) {
  fs.copyFileSync(heroSrc, heroDst);
  console.log("Copied hero image to", heroDst);
} else {
  console.warn("Hero source not found:", heroSrc);
}
