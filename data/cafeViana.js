/**
 * Cafe Viana — central business data
 * Verified from Google Maps, public listings, Facebook/Instagram posts (2026).
 * Prices: null unless currently verified. Specials: only current:true shown in production.
 */

export const business = {
  name: "Cafe Viana",
  tagline: "Cafe & Artisan Bakery",
  suburbLabel: "Baxter · Victoria",
  shortSuburb: "Baxter · VIC",

  address: {
    street: "139 Grant Rd",
    suburb: "Baxter",
    state: "VIC",
    postcode: "3911",
    country: "Australia",
    full: "139 Grant Rd, Baxter VIC 3911, Australia",
    lines: ["139 Grant Rd", "Baxter VIC 3911"],
  },

  phone: "+61 3 5971 4367",
  phoneDisplay: "03 5971 4367",
  phoneHref: "tel:+61359714367",

  mapsUrl:
    "https://www.google.com/maps/place/Cafe+Viana/@-38.1947358,145.1340319,14.06z/data=!4m6!3m5!1s0x6ad60a7e1ebd44a1:0xbada082895ddff8!8m2!3d-38.2000044!4d145.1820177!16s%2Fg%2F11kn6_188s",

  facebook: "https://www.facebook.com/100313119162068",
  instagram: "https://www.instagram.com/cafe.viana.baxter/",
  twitter: null,
  youtube: null,

  email: null,

  hours: {
    monday: { label: "Mon", open: "7:00 AM", close: "3:00 PM", short: "7–3" },
    tuesday: { label: "Tue", open: "7:00 AM", close: "3:00 PM", short: "7–3" },
    wednesday: { label: "Wed", open: "7:00 AM", close: "3:00 PM", short: "7–3" },
    thursday: { label: "Thu", open: "7:00 AM", close: "3:00 PM", short: "7–3" },
    friday: { label: "Fri", open: "7:00 AM", close: "3:00 PM", short: "7–3" },
    saturday: { label: "Sat", open: "7:00 AM", close: "3:00 PM", short: "7–3" },
    sunday: { label: "Sun", open: "8:00 AM", close: "3:00 PM", short: "8–3" },
  },

  hoursNote: "Hours may change. Please confirm before visiting.",

  features: {
    dineIn: true,
    takeaway: true,
    outdoorSeating: true,
    dogFriendlyOutdoor: true,
    driveThru: true,
    artisanBakery: true,
  },

  community: {
    baxterPrimary:
      "Cafe Viana serves locals throughout the week, with takeaway, breakfast and lunch, and is referenced by nearby Baxter Primary School for Friday lunch orders.",
  },

  seo: {
    title: "Cafe Viana | Cafe & Artisan Bakery in Baxter",
    description:
      "Visit Cafe Viana at 139 Grant Road, Baxter for breakfast, coffee, artisan sourdough, pies, pastries and lunch.",
  },

  ticker: [
    "SOURDOUGH",
    "PIES",
    "PASTRIES",
    "COFFEE",
    "BREAKFAST",
    "LUNCH",
    "BAXTER",
  ],

  nav: [
    { label: "Breakfast", href: "#mornings" },
    { label: "Bakery", href: "#bakery" },
    { label: "Lunch", href: "#lunch" },
    { label: "Coffee", href: "#coffee" },
    { label: "Visit", href: "#visit" },
  ],

  mobileNav: [
    { label: "Breakfast", href: "#mornings" },
    { label: "Bakery", href: "#bakery" },
    { label: "Lunch", href: "#lunch" },
    { label: "Specials", href: "#specials" },
    { label: "Visit", href: "#visit" },
  ],

  feedbackThemes: [
    {
      keyword: "PIES",
      note: "Visitors regularly mention the pies and freshly baked bread.",
    },
    {
      keyword: "FRESH BREAD",
      note: "Public feedback highlights artisan sourdough and daily bakery selections.",
    },
    {
      keyword: "GOOD COFFEE",
      note: "Guests often praise the coffee alongside a pot of tea or fresh juice.",
    },
    {
      keyword: "BIG BREAKFAST",
      note: "Public feedback highlights the big breakfast and morning plates.",
    },
    {
      keyword: "FRIENDLY SERVICE",
      note: "Guests mention friendly service and a welcoming local atmosphere.",
    },
    {
      keyword: "OUTDOOR SPACE",
      note: "Guests mention outdoor seating and the fenced picnic area.",
    },
  ],
};

/** Price helper shape: price null when unverified */
const noPrice = { price: null, priceSource: null, verified: false };

export const breakfast = [
  {
    id: "big-breakfast",
    name: "Big Breakfast",
    description: "A generous morning plate — ask staff for today's composition.",
    image: "/images/cafe-viana/big-breakfast.jpg",
    availability: "Daily",
    ...noPrice,
  },
  {
    id: "eggs-benedict",
    name: "Eggs Benedict",
    description: "Poached eggs on toasted bread with hollandaise.",
    image: "/images/cafe-viana/eggs-benedict.jpg",
    availability: "Daily",
    ...noPrice,
  },
  {
    id: "avocado-toast",
    name: "Avocado Toast",
    description: "Avocado on fresh bakery bread — toppings vary.",
    image: "/images/cafe-viana/avocado-toast.jpg",
    availability: "Daily",
    ...noPrice,
  },
  {
    id: "pancakes",
    name: "Pancakes",
    description: "Recently featured on the morning board — see today's toppings in store.",
    image: "/images/cafe-viana/pancakes.jpg",
    availability: "Featured",
    ...noPrice,
  },
  {
    id: "fruit-toast",
    name: "Fruit Toast",
    description: "Toasted fruit loaf from the bakery.",
    image: "/images/cafe-viana/fruit-toast.jpg",
    availability: "Daily",
    ...noPrice,
  },
];

/** Recent Oct 2026 shelf — rotating; shown as baked this week */
export const bakery = [
  {
    id: "white-sourdough",
    name: "White Sourdough",
    description: "Naturally fermented white loaf.",
    image: "/images/cafe-viana/sourdough-white.jpg",
    availability: "Baked this week",
    status: "CHECK TODAY'S SHELF",
    ...noPrice,
  },
  {
    id: "multigrain",
    name: "Mixed Multigrain",
    description: "Seedy multigrain sourdough.",
    image: "/images/cafe-viana/multigrain.jpg",
    availability: "Baked this week",
    status: "CHECK TODAY'S SHELF",
    ...noPrice,
  },
  {
    id: "fig-fennel",
    name: "Fig & Fennel",
    description: "Sourdough with fig and fennel.",
    image: "/images/cafe-viana/sourdough-fig-fennel.jpg",
    availability: "Baked this week",
    status: "BAKED THIS WEEK",
    ...noPrice,
  },
  {
    id: "jalapeno-cheese",
    name: "Jalapeño & Cheese",
    description: "Spicy cheese sourdough — recently on the shelf.",
    image: "/images/cafe-viana/jalapeno-cheese.jpg",
    availability: "Baked this week",
    status: "BAKED THIS WEEK",
    ...noPrice,
  },
  {
    id: "olive-basil",
    name: "Olive & Basil",
    description: "Savoury olive and basil sourdough.",
    image: "/images/cafe-viana/olive-basil.jpg",
    availability: "Rotating",
    status: "CHECK TODAY'S SHELF",
    ...noPrice,
  },
  {
    id: "raisin-brioche",
    name: "Raisin Brioche",
    description: "Soft brioche with raisins.",
    image: "/images/cafe-viana/brioche.jpg",
    availability: "Rotating",
    status: "CHECK TODAY'S SHELF",
    ...noPrice,
  },
];

export const pies = [
  {
    id: "beef-pie",
    name: "Beef Pie",
    description: "Chunky homemade-style beef pie — check today's fillings.",
    image: "/images/cafe-viana/pie-beef.jpg",
    availability: "Ask in store",
    ...noPrice,
  },
  {
    id: "chicken-pie",
    name: "Chicken Pie",
    description: "Classic chicken pie from the cabinet.",
    image: "/images/cafe-viana/pie-chicken.jpg",
    availability: "Ask in store",
    ...noPrice,
  },
  {
    id: "butter-chicken-pie",
    name: "Butter Chicken Pie",
    description: "Frequently mentioned favourite — availability rotates.",
    image: "/images/cafe-viana/pie-butter-chicken.jpg",
    availability: "Ask in store",
    ...noPrice,
  },
];

export const drinks = [
  {
    id: "coffee",
    name: "Coffee",
    description: "Espresso-based coffee to drink in or take away.",
    image: "/images/cafe-viana/coffee.jpg",
    availability: "Daily",
    ...noPrice,
  },
  {
    id: "tea",
    name: "Tea",
    description: "Pot of tea — ask for today's selection.",
    image: "/images/cafe-viana/tea.jpg",
    availability: "Daily",
    ...noPrice,
  },
  {
    id: "fresh-juice",
    name: "Fresh Juice",
    description: "Fresh orange juice and seasonal juices.",
    image: "/images/cafe-viana/fresh-juice.jpg",
    availability: "Daily",
    ...noPrice,
  },
];

export const lunch = [
  {
    id: "banh-mi",
    name: "Bánh Mì Rolls",
    description: "Filled bakery rolls — see today's board.",
    image: "/images/cafe-viana/banh-mi.jpg",
    status: "DAILY",
    ...noPrice,
  },
  {
    id: "loaded-chips",
    name: "Loaded Chips",
    description: "Shareable chips with toppings.",
    image: "/images/cafe-viana/loaded-chips.jpg",
    status: "DAILY",
    ...noPrice,
  },
  {
    id: "brisket-roll",
    name: "Beef Brisket Roll",
    description: "Hot beef brisket on a bakery roll.",
    image: "/images/cafe-viana/brisket-roll.jpg",
    status: "DAILY",
    ...noPrice,
  },
  {
    id: "pulled-pork-roll",
    name: "Pulled Pork & Asian Slaw Roll",
    description: "Pulled pork with Asian-style slaw.",
    image: "/images/cafe-viana/pulled-pork.jpg",
    status: "DAILY",
    ...noPrice,
  },
  {
    id: "lamb-souvlaki",
    name: "Lamb Souvlaki",
    description: "Lamb souvlaki — ask for today's sides.",
    image: "/images/cafe-viana/souvlaki.jpg",
    status: "DAILY",
    ...noPrice,
  },
  {
    id: "chicken-souvlaki",
    name: "Chicken Souvlaki",
    description: "Chicken souvlaki from the lunch board.",
    image: "/images/cafe-viana/chicken-souvlaki.jpg",
    status: "DAILY",
    ...noPrice,
  },
  {
    id: "spiced-lamb-filo",
    name: "Spiced Lamb Filo",
    description: "Spiced lamb in filo pastry.",
    image: "/images/cafe-viana/lamb-filo.jpg",
    status: "WEEKEND",
    ...noPrice,
  },
  {
    id: "green-chicken-curry",
    name: "Green Chicken Curry",
    description: "Warming lunch curry — availability varies.",
    image: "/images/cafe-viana/green-curry.jpg",
    status: "SPECIAL",
    ...noPrice,
  },
  {
    id: "focaccia",
    name: "Focaccia",
    description: "House focaccia — toppings rotate.",
    image: "/images/cafe-viana/focaccia.jpg",
    status: "DAILY",
    ...noPrice,
  },
  {
    id: "wraps",
    name: "Wraps",
    description: "Fresh wraps — see today's fillings.",
    image: "/images/cafe-viana/wrap.jpg",
    status: "DAILY",
    ...noPrice,
  },
];

/**
 * Specials board — only items with current: true render in production.
 * Dated posts kept for record; September specials marked inactive.
 */
export const specials = [
  {
    id: "pulled-beef-cheek-benny",
    name: "Pulled Beef Cheek Benny",
    date: "2026-09-28",
    description:
      "Slow-cooked pulled beef cheek, toasted sourdough, sautéed spinach, poached eggs, red wine jus & horseradish hollandaise.",
    price: null,
    availability: "Ask in store",
    image: "/images/cafe-viana/beef-cheek-benny.jpg",
    source: "Facebook / business post",
    current: true,
  },
  {
    id: "red-beef-curry",
    name: "Red Beef Curry",
    date: "2026-09",
    description: "Beef curry with rice and roti bread.",
    price: null,
    availability: "Recent special",
    image: "/images/cafe-viana/red-beef-curry.jpg",
    source: "September 2026 business post",
    current: false,
  },
  {
    id: "orange-roughy-fishcakes",
    name: "Orange Roughy Fishcakes",
    date: "2026-09",
    description: "Father's Day special.",
    price: null,
    availability: "Past special",
    image: "/images/cafe-viana/fishcakes.jpg",
    source: "Father's Day post",
    current: false,
  },
  {
    id: "weekly-cake-jars",
    name: "Weekly Cake Jars",
    date: "2026-09",
    description: "Rotating dessert jars — see the cabinet.",
    price: null,
    availability: "Rotating",
    image: "/images/cafe-viana/biscoff-jar.jpg",
    source: "Business posts",
    current: false,
  },
];

export const pastries = [
  {
    id: "biscoff-jar",
    name: "Biscoff Cheesecake Jars",
    description: "Cheesecake jar with Biscoff — rotating cabinet item.",
    image: "/images/cafe-viana/biscoff-jar.jpg",
    availability: "Check cabinet",
    ...noPrice,
  },
  {
    id: "white-forest",
    name: "White Forest Dessert",
    description: "White chocolate mousse, reduced cherries, coconut sponge.",
    image: "/images/cafe-viana/white-forest.jpg",
    availability: "Recent creation",
    ...noPrice,
  },
  {
    id: "chocolate-jar",
    name: "Chocolate Cake Jars",
    description: "Chocolate cake jars from the sweet cabinet.",
    image: "/images/cafe-viana/chocolate-jar.jpg",
    availability: "Check cabinet",
    ...noPrice,
  },
  {
    id: "raspberry-jar",
    name: "Raspberry · Coconut · Lemon Cake Jar",
    description: "Fruit cake jar — flavours rotate.",
    image: "/images/cafe-viana/raspberry-jar.jpg",
    availability: "Check cabinet",
    ...noPrice,
  },
  {
    id: "monte-carlo",
    name: "Monte Carlo",
    description: "Classic-style biscuit from recent bakes.",
    image: "/images/cafe-viana/monte-carlo.jpg",
    availability: "Check cabinet",
    ...noPrice,
  },
  {
    id: "yo-yo",
    name: "Yo Yo Biscuits",
    description: "House yo yo biscuits.",
    image: "/images/cafe-viana/yo-yo.jpg",
    availability: "Check cabinet",
    ...noPrice,
  },
  {
    id: "quince-danish",
    name: "Quince Danish",
    description: "Danish pastry with quince.",
    image: "/images/cafe-viana/quince-danish.jpg",
    availability: "Rotating",
    ...noPrice,
  },
  {
    id: "scones",
    name: "Scones",
    description: "Fresh scones — ask for today's batch.",
    image: "/images/cafe-viana/scones.jpg",
    availability: "Daily",
    ...noPrice,
  },
  {
    id: "scrolls",
    name: "Scrolls",
    description: "Bakery scrolls from the cabinet.",
    image: "/images/cafe-viana/scrolls.jpg",
    availability: "Check cabinet",
    ...noPrice,
  },
];

export const gallery = [
  { id: "01", frame: "01", title: "Sourdough", image: "/images/cafe-viana/sourdough-white.jpg", ratio: "tall" },
  { id: "02", frame: "02", title: "Pie", image: "/images/cafe-viana/pie-beef.jpg", ratio: "wide" },
  { id: "03", frame: "03", title: "Breakfast", image: "/images/cafe-viana/big-breakfast.jpg", ratio: "square" },
  { id: "04", frame: "04", title: "Coffee", image: "/images/cafe-viana/coffee.jpg", ratio: "tall" },
  { id: "05", frame: "05", title: "Cake jar", image: "/images/cafe-viana/biscoff-jar.jpg", ratio: "square" },
  { id: "06", frame: "06", title: "Brioche", image: "/images/cafe-viana/brioche.jpg", ratio: "wide" },
  { id: "07", frame: "07", title: "Focaccia", image: "/images/cafe-viana/focaccia.jpg", ratio: "square" },
  { id: "08", frame: "08", title: "Lunch", image: "/images/cafe-viana/banh-mi.jpg", ratio: "tall" },
  { id: "09", frame: "09", title: "Interior", image: "/images/cafe-viana/interior.jpg", ratio: "wide" },
  { id: "10", frame: "10", title: "Outdoor", image: "/images/cafe-viana/outdoor.jpg", ratio: "square" },
];

export const heroImages = {
  bread: "/images/cafe-viana/hero-bread.jpg",
  coffee: "/images/cafe-viana/hero-coffee.jpg",
  breakfast: "/images/cafe-viana/hero-breakfast.jpg",
};

export const menuCategories = [
  { id: "breakfast", label: "Breakfast", items: breakfast },
  { id: "bakery", label: "Bakery", items: bakery },
  { id: "pies", label: "Pies", items: pies },
  { id: "lunch", label: "Lunch", items: lunch },
  { id: "pastries", label: "Pastries", items: pastries },
  { id: "drinks", label: "Drinks", items: drinks },
  {
    id: "specials",
    label: "Specials",
    items: specials.filter((s) => s.current),
  },
];

export function formatPrice(item) {
  if (!item || item.price == null || item.price === 0 || !item.verified) {
    return null;
  }
  return `$${Number(item.price).toFixed(2)}`;
}

export function priceLabel(item) {
  const p = formatPrice(item);
  if (p) return p;
  return "Ask in store";
}

export function currentSpecials() {
  return specials.filter((s) => s.current === true);
}

export function dayKeyFromDate(date = new Date()) {
  const keys = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  return keys[date.getDay()];
}
