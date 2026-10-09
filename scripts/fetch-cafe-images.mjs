/**
 * Downloads free-licensed photos into public/images/cafe-viana placeholders.
 * Sources: Unsplash License + Openverse (CC0 / CC BY / PDM).
 * Run: node scripts/fetch-cafe-images.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "images", "cafe-viana");
const MAX_EDGE = 1400;

const u = (id, w = MAX_EDGE) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=82`;

/**
 * Curated unique free photos — prefer newer Unsplash + CC Openverse picks
 * so we avoid the most overused cafe stock shots.
 * Each entry: { file, url, credit, license, page }
 */
const IMAGES = [
  // —— Hero ——
  {
    file: "hero-bread.png",
    url: u("photo-1767065888075-59d3bf3f02d1"),
    credit: "Diego Arenas de Rodrigo / Unsplash",
    license: "Unsplash License",
    page: "https://unsplash.com/photos/KWhGdy9nX_8",
  },
  {
    file: "hero-coffee.png",
    url: u("photo-1511920170033-f8396924c348"),
    credit: "Unsplash contributor",
    license: "Unsplash License",
    page: "https://unsplash.com/photos/XoBYCjCyP4Y",
  },
  {
    file: "hero-breakfast.png",
    url: u("photo-1712746785711-84d31909ef3f"),
    credit: "Nima Naseri / Unsplash",
    license: "Unsplash License",
    page: "https://unsplash.com/photos/TXZlK7n9WJw",
  },

  // —— Breakfast ——
  {
    file: "big-breakfast.png",
    url: u("photo-1553649504-60af7754bf35"),
    credit: "Unsplash contributor",
    license: "Unsplash License",
    page: "https://unsplash.com/photos/6NjUhnS0ne0",
  },
  {
    file: "eggs-benedict.png",
    url: u("photo-1767425315802-0983465737e3"),
    credit: "Unsplash contributor",
    license: "Unsplash License",
    page: "https://unsplash.com/photos/Mj_mF9HCDPY",
  },
  {
    file: "avocado-toast.png",
    url: u("photo-1761027101403-862b44000b4c"),
    credit: "Unsplash contributor",
    license: "Unsplash License",
    page: "https://unsplash.com/photos/zB6hGZV0ZIk",
  },
  {
    file: "pancakes.png",
    url: u("photo-1756819753358-1bfcc5c6ff54"),
    credit: "Unsplash contributor",
    license: "Unsplash License",
    page: "https://unsplash.com/photos/OtI4Wy5GzHg",
  },
  {
    file: "fruit-toast.png",
    url: "https://live.staticflickr.com/6207/6083578877_e8d3306686_b.jpg",
    credit: "jeffreyw / Flickr",
    license: "CC BY 2.0",
    page: "https://www.flickr.com/photos/7927684@N03/6083578877",
  },

  // —— Bakery breads ——
  {
    file: "sourdough-white.png",
    url: u("photo-1774669081553-4ef841520c05"),
    credit: "tommao wang / Unsplash",
    license: "Unsplash License",
    page: "https://unsplash.com/photos/8tIB5BBc6fc",
  },
  {
    file: "multigrain.png",
    url: u("photo-1763297014734-e2ac58a6f3c0"),
    credit: "Unsplash contributor",
    license: "Unsplash License",
    page: "https://unsplash.com/photos/1l2qWh-W5AU",
  },
  {
    file: "sourdough-fig-fennel.png",
    url: "https://live.staticflickr.com/65535/52501548282_c768f9f67a_b.jpg",
    credit: "Nutrition, Food Safety & Health / Flickr",
    license: "CC0",
    page: "https://www.flickr.com/photos/93936679@N05/52501548282",
  },
  {
    file: "jalapeno-cheese.png",
    url: u("photo-1753012247961-feb139675068"),
    credit: "lee seunghyub / Unsplash",
    license: "Unsplash License",
    page: "https://unsplash.com/photos/Sum7k8hC9iA",
  },
  {
    file: "olive-basil.png",
    url: "https://live.staticflickr.com/65535/51892427727_9f791f8778_b.jpg",
    credit: "conall.. / Flickr",
    license: "CC BY 2.0",
    page: "https://www.flickr.com/photos/16176711@N02/51892427727",
  },
  {
    file: "brioche.png",
    url: u("photo-1767065887348-6e76f3338c80"),
    credit: "Diego Arenas de Rodrigo / Unsplash",
    license: "Unsplash License",
    page: "https://unsplash.com/photos/smHpLKXZJA8",
  },

  // —— Pies ——
  {
    file: "pie-beef.png",
    url: u("photo-1777315387661-42a289edccba"),
    credit: "Yasin Onuş / Unsplash",
    license: "Unsplash License",
    page: "https://unsplash.com/photos/u5gSxngPiwg",
  },
  {
    file: "pie-chicken.png",
    url: "https://live.staticflickr.com/65535/53450053754_15851f8469_b.jpg",
    credit: "dalecruse / Flickr",
    license: "CC BY 2.0",
    page: "https://www.flickr.com/photos/91873384@N04/53450053754",
  },
  {
    file: "pie-butter-chicken.png",
    url: "https://live.staticflickr.com/65535/54592652446_04f6af54b2_b.jpg",
    credit: "Piersey / Flickr",
    license: "CC BY 2.0",
    page: "https://www.flickr.com/photos/201676878@N03/54592652446",
  },

  // —— Drinks ——
  {
    file: "coffee.png",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/WDJES619M1.jpg",
    credit: "David Bares / StockSnap",
    license: "CC0",
    page: "https://stocksnap.io/photo/coffee-latte-WDJES619M1",
  },
  {
    file: "tea.png",
    url: "https://live.staticflickr.com/2943/15223644448_455a5c3ee1_b.jpg",
    credit: "psd / Flickr",
    license: "CC BY 2.0",
    page: "https://www.flickr.com/photos/45581782@N00/15223644448",
  },
  {
    file: "fresh-juice.png",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/VWZSB0VCZ8.jpg",
    credit: "WDnet Studio / StockSnap",
    license: "CC0",
    page: "https://stocksnap.io/photo/lemon-juice-VWZSB0VCZ8",
  },

  // —— Lunch ——
  {
    file: "banh-mi.png",
    url: "https://live.staticflickr.com/65535/52149964693_c0510d9071_b.jpg",
    credit: "loumchen / Flickr",
    license: "Public Domain Mark",
    page: "https://www.flickr.com/photos/149704944@N08/52149964693",
  },
  {
    file: "loaded-chips.png",
    url: "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdXB3azYxNjYzMTY3LXdpa2ltZWRpYS1pbWFnZS1rb3diMTJlZy5qcGc.jpg",
    credit: "Rawpixel / Wikimedia (CC0)",
    license: "CC0",
    page: "https://www.rawpixel.com/image/3282874/free-photo-image-bacon-bean-bowl",
  },
  {
    file: "brisket-roll.png",
    url: u("photo-1550547660-d9450f859349"),
    credit: "Unsplash contributor",
    license: "Unsplash License",
    page: "https://unsplash.com/photos/4uRnPqLQmXM",
  },
  {
    file: "pulled-pork.png",
    url: "https://live.staticflickr.com/65535/51831058516_6564ab7fc7_b.jpg",
    credit: "Ruth and Dave / Flickr",
    license: "CC BY 2.0",
    page: "https://www.flickr.com/photos/95142644@N00/51831058516",
  },
  {
    file: "souvlaki.png",
    url: "https://live.staticflickr.com/65535/52282029171_3628f1f7e7_b.jpg",
    credit: "sarahstierch / Flickr",
    license: "CC BY 2.0",
    page: "https://www.flickr.com/photos/7633518@N08/52282029171",
  },
  {
    file: "chicken-souvlaki.png",
    url: u("photo-1529006557810-274b9b2fc783"),
    credit: "Unsplash contributor",
    license: "Unsplash License",
    page: "https://unsplash.com/photos/U0tB5O0vVrc",
  },
  {
    file: "lamb-filo.png",
    url: "https://live.staticflickr.com/65535/52137805819_6b67fc903c_b.jpg",
    credit: "David Jackmanson / Flickr",
    license: "CC BY 2.0",
    page: "https://www.flickr.com/photos/58301516@N00/52137805819",
  },
  {
    file: "green-curry.png",
    url: "https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvaXMxMTM5Mi1pbWFnZS1rd3lzZmNuOC5qcGc.jpg",
    credit: "Rawpixel (CC0)",
    license: "CC0",
    page: "https://www.rawpixel.com/image/5970320/green-chicken-curry",
  },
  {
    file: "focaccia.png",
    url: "https://live.staticflickr.com/65535/53790288192_7fa4c3ab40_b.jpg",
    credit: "Steam Pipe Trunk Distribution Venue / Flickr",
    license: "CC BY 2.0",
    page: "https://www.flickr.com/photos/65067366@N00/53790288192",
  },
  {
    file: "wrap.png",
    url: u("photo-1626700051175-6818013e1d4f"),
    credit: "Unsplash contributor",
    license: "Unsplash License",
    page: "https://unsplash.com/photos/5X8oLkzR2uQ",
  },

  // —— Specials ——
  {
    file: "beef-cheek-benny.png",
    url: u("photo-1776194569490-dac42ea51e5e"),
    credit: "Diego Marín / Unsplash",
    license: "Unsplash License",
    page: "https://unsplash.com/photos/yDGq9vODnfM",
  },
  {
    file: "red-beef-curry.png",
    url: u("photo-1585937421612-70a008356fbe"),
    credit: "Unsplash contributor",
    license: "Unsplash License",
    page: "https://unsplash.com/photos/n3AzGm8t-Rk",
  },
  {
    file: "fishcakes.png",
    url: "https://live.staticflickr.com/1361/683576746_fb35f553d0.jpg",
    credit: "rovingI / Flickr",
    license: "CC BY 2.0",
    page: "https://www.flickr.com/photos/rovingi/683576746",
  },

  // —— Pastries ——
  {
    file: "biscoff-jar.png",
    url: "https://live.staticflickr.com/8055/8076687473_f473fcf7db.jpg",
    credit: "raramaurina / Flickr",
    license: "CC BY 2.0",
    page: "https://www.flickr.com/photos/51854834@N00/8076687473",
  },
  {
    file: "white-forest.png",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/9C80IXZQWU.jpg",
    credit: "Viktor Tasnadi / StockSnap",
    license: "CC0",
    page: "https://stocksnap.io/photo/dessert-food-9C80IXZQWU",
  },
  {
    file: "chocolate-jar.png",
    url: u("photo-1606313564200-e75d5e30476c"),
    credit: "Unsplash contributor",
    license: "Unsplash License",
    page: "https://unsplash.com/photos/6vOaXqQhG2I",
  },
  {
    file: "raspberry-jar.png",
    url: "https://live.staticflickr.com/65535/52299500347_cf95ba5050_b.jpg",
    credit: "young shanahan / Flickr",
    license: "CC BY 2.0",
    page: "https://www.flickr.com/photos/14759783@N04/52299500347",
  },
  {
    file: "monte-carlo.png",
    url: "https://live.staticflickr.com/5462/10244314173_b21caa05cd_b.jpg",
    credit: "Pictures by Ann / Flickr",
    license: "CC BY 2.0",
    page: "https://www.flickr.com/photos/picturesbyann/10244314173",
  },
  {
    file: "yo-yo.png",
    url: "https://live.staticflickr.com/3460/3209486128_0a41a87206_b.jpg",
    credit: "Debs / Flickr",
    license: "CC BY 2.0",
    page: "https://www.flickr.com/photos/debs-eye/3209486128",
  },
  {
    file: "quince-danish.png",
    url: u("photo-1770888844785-85841aba6de8"),
    credit: "Tanya Barrow / Unsplash",
    license: "Unsplash License",
    page: "https://unsplash.com/photos/0CGvRer963Y",
  },
  {
    file: "scones.png",
    url: "https://live.staticflickr.com/7436/8726079227_8ab0c2dbbf_b.jpg",
    credit: "HausOf_Diegoo / Flickr",
    license: "CC BY 2.0",
    page: "https://www.flickr.com/photos/hausofdiegoo/8726079227",
  },
  {
    file: "scrolls.png",
    url: u("photo-1732565492107-d32577478885"),
    credit: "Unsplash contributor",
    license: "Unsplash License",
    page: "https://unsplash.com/photos/kupNbKEaJL4",
  },

  // —— Venue ——
  {
    file: "interior.png",
    url: u("photo-1759593914906-4ea0b1261ba4"),
    credit: "Alexandra / Unsplash",
    license: "Unsplash License",
    page: "https://unsplash.com/photos/RPDCA2KiLAQ",
  },
  {
    file: "outdoor.png",
    url: u("photo-1769985125587-eaad07527d31"),
    credit: "Unsplash contributor",
    license: "Unsplash License",
    page: "https://unsplash.com/photos/MZWsBM78qGc",
  },
  {
    file: "storefront.png",
    url: u("photo-1554118811-1e0d58224f24"),
    credit: "Unsplash contributor",
    license: "Unsplash License",
    page: "https://unsplash.com/photos/nzyzAUsbV0M",
  },
  {
    file: "counter.png",
    url: u("photo-1495474472287-4d71bcdd2085"),
    credit: "Unsplash contributor",
    license: "Unsplash License",
    page: "https://unsplash.com/photos/8Jg4r4y4YYg",
  },
  {
    file: "takeaway.png",
    url: "https://live.staticflickr.com/65535/50327891762_95e7374aa1_b.jpg",
    credit: "Artem Beliaikin / Flickr",
    license: "CC BY 2.0",
    page: "https://www.flickr.com/photos/artembeliaikin/50327891762",
  },
];

async function download(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "CafeVianaSite/1.0 (local asset build)",
      Accept: "image/*,*/*",
    },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function processOne(item) {
  const dest = path.join(OUT_DIR, item.file);
  const buf = await download(item.url);
  await sharp(buf)
    .rotate()
    .resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .png({ compressionLevel: 8, quality: 85 })
    .toFile(dest);
  const stat = await fs.stat(dest);
  return { file: item.file, bytes: stat.size, ok: true };
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  // Deduplicate URLs — if two files share a URL, skip second and warn
  const seen = new Map();
  const unique = [];
  for (const item of IMAGES) {
    if (seen.has(item.url)) {
      console.warn(`DUPLICATE URL skipped for ${item.file} (also ${seen.get(item.url)})`);
      continue;
    }
    seen.set(item.url, item.file);
    unique.push(item);
  }

  const results = [];
  for (const item of unique) {
    process.stdout.write(`↓ ${item.file} … `);
    try {
      const r = await processOne(item);
      console.log(`${Math.round(r.bytes / 1024)} KB`);
      results.push({ ...item, ...r });
    } catch (err) {
      console.log(`FAIL: ${err.message}`);
      results.push({ ...item, ok: false, error: String(err.message) });
    }
    await new Promise((r) => setTimeout(r, 200));
  }

  // Fill any skipped duplicates by searching alternate Unsplash IDs
  const failed = results.filter((r) => !r.ok);
  if (failed.length) {
    console.log(`\n${failed.length} failed — see CREDITS for details.`);
  }

  const credits = [
    "# Cafe Viana image credits",
    "",
    "Illustrative free-licensed photography used as placeholders until Cafe Viana's own photos are available.",
    "",
    ...results.map((r) =>
      r.ok
        ? `- **${r.file}** — ${r.credit} (${r.license}) — ${r.page}`
        : `- **${r.file}** — FAILED: ${r.error}`
    ),
    "",
  ].join("\n");

  await fs.writeFile(path.join(OUT_DIR, "CREDITS.md"), credits, "utf8");
  console.log(`\nWrote ${results.filter((r) => r.ok).length}/${IMAGES.length} images + CREDITS.md`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
