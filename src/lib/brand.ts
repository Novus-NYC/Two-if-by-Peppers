export type Sauce = {
  slug: string
  name: string
  shortName: string
  epithet: string
  tagline: string
  heat: number
  heatName: string
  image: string
  labelAspect: string
  art: string
  artFit: "cover" | "contain"
  artGlow: boolean
  accent: string
  number: string
  dossier: string
  notes: string[]
  muster: string[]
  build: string
  report: string
  reporter: string
}

export const sauces: Sauce[] = [
  {
    slug: "lantern-fuel",
    name: "Tom Sage’s Lantern Fuel",
    shortName: "Lantern Fuel",
    epithet: "Savory. Herbaceous. Revolutionary.",
    tagline: "For meals worth gathering around",
    heat: 4,
    heatName: "A long, slow burn",
    image: "/images/Lantern Fuel.png",
    labelAspect: "2/3",
    art: "/Tom Sage's Lantern Fuel - Just the lantern logo.png",
    artFit: "contain",
    artGlow: true,
    accent: "#ff6b23",
    number: "I",
    dossier:
      "Ignite your taste buds with Tom Sage’s Lantern Fuel, a bold, savory blend of Scotch bonnet peppers, roasted tomatillo, and sage. Earthy and herbaceous with a bright tomatillo tang, this small-batch sauce builds to a fiery heat worthy of the Flavor Rebellion. Each pour delivers layers of roasted flavor followed by the unmistakable spark of Scotch bonnet heat.",
    notes: ["Smoked red chile", "Charred garlic", "Molasses", "Cracked black pepper", "Cider vinegar"],
    muster: ["Brisket and burnt ends", "Black beans and rice", "Roast potatoes", "A fried egg at dawn"],
    build: "Peppers roasted over open flame, then held with molasses and cider until the heat stops shouting and starts smouldering.",
    report: "It does not hit you. It settles in, and then it will not leave.",
    reporter: "A regular, on his third bowl",
  },
  {
    slug: "bonney-mango",
    name: "Bonney Mango",
    shortName: "Bonney Mango",
    epithet: "Bright. Tropical. Rebellious.",
    tagline: "So bold it’ll make a red coat weep",
    heat: 3,
    heatName: "Bright and immediate",
    image: "/images/Bonney Mango.png",
    labelAspect: "3/2",
    art: "/Bonney Mango Label - no text no ships.PNG",
    artFit: "cover",
    artGlow: false,
    accent: "#e8a93a",
    number: "II",
    dossier:
      "Awaken your taste buds with Bonney Mango, a vibrant, fruit-forward blend of ripe mango, roasted tomatillo, and Scotch bonnet peppers. Sweet tropical flavor and bright tomatillo tang give way to a clean, lively heat, creating a small-batch sauce that’s bold, balanced, and made to brighten everything it touches.",
    notes: ["Ripe mango", "Habanero", "Lime", "Fresh ginger", "Sea salt"],
    muster: ["Fish tacos", "Grilled chicken", "Slow pork shoulder", "A sharp aged cheddar"],
    build: "Fruit first, heat second. The mango arrives before the habanero does, which is the only warning you get.",
    report: "Sweet as a peace treaty, and about as trustworthy.",
    reporter: "A customs officer, formerly",
  },
]

export const contactEmail = "dan@twoifbypepper.com"
export const brandName = "Two If By Pepper"
export const brandMotto = "Forged in rebellion — fueled by flavor"

export const navLinks = [
  { href: "/sauces", label: "The Sauces" },
  { href: "/story", label: "The Story" },
  { href: "/gazette", label: "The Pepper Gazette" },
  { href: "/wholesale", label: "Wholesale" },
]

export const gazette = {
  dateline: "Boston — the eighteenth of April, 1775",
  chapters: [
    {
      number: "I",
      title: "The Spark",
      body: "The complaint was never about the tax. It was about the table. Ration flour, salt beef, boiled everything — a colony can survive on that and many did, but surviving is not the same as eating. Two cooks on opposite ends of the same harbour arrived at the same heresy in the same season: that a meal ought to be worth sitting down for, and that a pepper was the shortest distance between a ration and a reason.",
    },
    {
      number: "II",
      title: "The Signal",
      body: "Their cooking was declared seditious, which was generous — it was mostly just hot. Barred from the market and watched at the docks, they needed a way to say the pot is on without saying anything at all. The answer hung in a window above the water: two lanterns, cut in the shape of peppers, lit only when the kitchen was open and the company was safe. One if by land. Two if by sea. Two, always, if by pepper.",
    },
    {
      number: "III",
      title: "The Rebellion",
      body: "The signal outlived the war, as signals do. It stopped meaning come quickly and started meaning come hungry, and it has meant that ever since. Every bottle we fill carries the same two lanterns for the same reason: somewhere, a kitchen is open, the food is worth the trip, and blandness is not welcome at the table.",
    },
  ],
}

export const articles = [
  {
    number: "I",
    title: "Of Small Batches",
    body: "Every batch is cooked, bottled, and labelled in quantities small enough that a single person can taste the whole run. We would rather tell you we are out than send you something we would not open ourselves.",
  },
  {
    number: "II",
    title: "Of Fair Terms",
    body: "Case pricing, straightforward margins, and no minimum so punishing that a small shop cannot say yes. We would rather be on ten good shelves than a hundred indifferent ones.",
  },
  {
    number: "III",
    title: "Of Good Company",
    body: "Independent grocers, butchers, kitchens, market tables, and anyone assembling a gift worth opening. If your shelf has a point of view, ours will sit well beside it.",
  },
  {
    number: "IV",
    title: "Of Plain Dealing",
    body: "You will hear back from a person, usually within two days, and that person will be the one who cooked it. There is no account team. There is Dan.",
  },
]

export const partnerTypes = [
  { number: "I", title: "Independent retail", body: "Specialty grocers, butchers, and market tables that stock on story as much as spec." },
  { number: "II", title: "Kitchens & bars", body: "For a finishing sauce on the pass, or a bottle that earns its place on the table." },
  { number: "III", title: "Events & gifting", body: "Gatherings, hampers, and the sort of party favour people actually take home." },
]

export const facts = [
  { label: "Bottled", value: "5 fl oz" },
  { label: "Batch", value: "Under 200" },
  { label: "Cooked in", value: "New England" },
]
