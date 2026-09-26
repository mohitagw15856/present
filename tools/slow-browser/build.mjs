/**
 * Builds dist/chrome and dist/firefox from src/. No dependencies.
 * Icons are generated here as PNGs (a soft circle) so the repo stays binary-free.
 */
import { cp, mkdir, readFile, rm, writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { deflateSync } from 'node:zlib';

const root = new URL('.', import.meta.url).pathname;
const src = join(root, 'src');
const dist = join(root, 'dist');

/* ---------- minimal PNG encoder ---------- */
const crcTable = new Int32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c;
});
function crc32(buf) {
  let c = -1;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}
function png(size, pixel) {
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0; // filter: none
    for (let x = 0; x < size; x++) {
      const [r, g, b, a] = pixel(x, y);
      raw.set([r, g, b, a], y * (size * 4 + 1) + 1 + x * 4);
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}
function icon(size) {
  const cream = [251, 248, 242], sage = [169, 191, 168];
  const c = size / 2, r = size * 0.36, ry = size * 0.56;
  return png(size, (x, y) => {
    const dx = x + 0.5 - c, dy = y + 0.5 - ry;
    const d = Math.sqrt(dx * dx + dy * dy);
    const inner = Math.sqrt(dx * dx + (y + 0.5 - size * 0.42) ** 2);
    if (inner < r * 0.62) return [...cream, 255];
    if (d < r) return [...sage, 255];
    const edge = Math.max(0, Math.min(1, r + 1 - d));
    if (edge > 0) return [...sage, Math.round(edge * 255)];
    return [...cream, 255];
  });
}

/* ---------- build ---------- */
await rm(dist, { recursive: true, force: true });
const files = (await readdir(src)).filter((f) => !f.startsWith('manifest.'));
for (const target of ['chrome', 'firefox']) {
  const out = join(dist, target);
  await mkdir(join(out, 'icons'), { recursive: true });
  for (const f of files) await cp(join(src, f), join(out, f), { recursive: true });
  const manifest = JSON.parse(await readFile(join(src, `manifest.${target}.json`), 'utf8'));
  await writeFile(join(out, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  for (const s of [16, 32, 48, 128]) await writeFile(join(out, 'icons', `icon-${s}.png`), icon(s));
  console.log(`built dist/${target}`);
}
