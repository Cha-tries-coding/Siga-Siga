import type { CategoryId, Product } from "../types";

export const categories: Array<{ id: CategoryId; greek: string; english: string }> = [
  { id: "dairy", greek: "ΓΑΛΑΚΤΟΚΟΜΙΚΑ", english: "Dairy" },
  { id: "vegetables", greek: "ΛΑΧΑΝΙΚΑ", english: "Vegetables" },
  { id: "fruit", greek: "ΦΡΟΥΤΑ", english: "Fruit" },
  { id: "meat", greek: "ΚΡΕΑΤΙΚΑ", english: "Meat" },
  { id: "sweets", greek: "ΓΛΥΚΑ", english: "Sweets" },
  { id: "drinks", greek: "ΠΟΤΑ", english: "Drinks" },
];

export const products: Product[] = [
  { category: "dairy", greek: "γάλα", plural: "γάλατα", latin: "gála", english: "milk", art: "milk", price: 1.7, gender: "neuter" },
  { category: "dairy", greek: "φέτα", plural: "φέτες", latin: "féta", english: "feta cheese", art: "feta", price: 3.2, gender: "feminine" },
  { category: "dairy", greek: "γιαούρτι", plural: "γιαούρτια", latin: "yaoúrti", english: "yogurt", art: "yogurt", price: 1.1, gender: "neuter" },
  { category: "dairy", greek: "βούτυρο", plural: "βούτυρα", latin: "voútyro", english: "butter", art: "butter", price: 2.4, gender: "neuter" },
  { category: "vegetables", greek: "ντομάτα", plural: "ντομάτες", latin: "domáta", english: "tomato", art: "tomato", price: 0.7, gender: "feminine" },
  { category: "vegetables", greek: "αγγούρι", plural: "αγγούρια", latin: "angoúri", english: "cucumber", art: "cucumber", price: 0.8, gender: "neuter" },
  { category: "vegetables", greek: "καρότο", plural: "καρότα", latin: "karóto", english: "carrot", art: "carrot", price: 0.45, gender: "neuter" },
  { category: "vegetables", greek: "πατάτα", plural: "πατάτες", latin: "patáta", english: "potato", art: "potato", price: 0.55, gender: "feminine" },
  { category: "fruit", greek: "μήλο", plural: "μήλα", latin: "mílo", english: "apple", art: "apple", price: 0.65, gender: "neuter" },
  { category: "fruit", greek: "πορτοκάλι", plural: "πορτοκάλια", latin: "portokáli", english: "orange", art: "orange", price: 0.75, gender: "neuter" },
  { category: "fruit", greek: "μπανάνα", plural: "μπανάνες", latin: "banána", english: "banana", art: "banana", price: 0.6, gender: "feminine" },
  { category: "fruit", greek: "σταφύλι", plural: "σταφύλια", latin: "stafýli", english: "grape", art: "grape", price: 2.1, gender: "neuter" },
  { category: "meat", greek: "κοτόπουλο", plural: "κοτόπουλα", latin: "kotópoulo", english: "chicken", art: "chicken", price: 5.9, gender: "neuter" },
  { category: "meat", greek: "μοσχάρι", plural: "μοσχάρια", latin: "moschári", english: "beef", art: "beef", price: 7.5, gender: "neuter" },
  { category: "meat", greek: "χοιρινό", plural: "χοιρινά", latin: "choirinó", english: "pork", art: "pork", price: 6.2, gender: "neuter" },
  { category: "meat", greek: "λουκάνικο", plural: "λουκάνικα", latin: "loukániko", english: "sausage", art: "sausage", price: 3.6, gender: "neuter" },
  { category: "sweets", greek: "μέλι", plural: "μέλια", latin: "méli", english: "honey", art: "honey", price: 4.4, gender: "neuter" },
  { category: "sweets", greek: "σοκολάτα", plural: "σοκολάτες", latin: "sokoláta", english: "chocolate", art: "chocolate", price: 1.8, gender: "feminine" },
  { category: "sweets", greek: "παγωτό", plural: "παγωτά", latin: "pagotó", english: "ice cream", art: "iceCream", price: 1.2, gender: "neuter" },
  { category: "sweets", greek: "λουκούμι", plural: "λουκούμια", latin: "loukoúmi", english: "loukoumi", art: "loukoumi", price: 2.3, gender: "neuter" },
  { category: "drinks", greek: "νερό", plural: "νερά", latin: "neró", english: "water", art: "water", price: 0.8, gender: "neuter" },
  { category: "drinks", greek: "χυμός", plural: "χυμοί", latin: "chymós", english: "juice", art: "juice", price: 1.5, gender: "masculine" },
  { category: "drinks", greek: "καφές", plural: "καφέδες", latin: "kafés", english: "coffee", art: "coffee", price: 2.1, gender: "masculine" },
  { category: "drinks", greek: "τσάι", plural: "τσάγια", latin: "tsái", english: "tea", art: "tea", price: 1.8, gender: "neuter" },
];

export const grammarRules = [
  "Food vocabulary",
  "Numbers 1 to 5",
  "Singular & plural nouns",
] as const;

export const greekNumbers = [
  { number: 1, masculine: "ένας", feminine: "μία", neuter: "ένα" },
  { number: 2, masculine: "δύο", feminine: "δύο", neuter: "δύο" },
  { number: 3, masculine: "τρεις", feminine: "τρεις", neuter: "τρία" },
  { number: 4, masculine: "τέσσερις", feminine: "τέσσερις", neuter: "τέσσερα" },
  { number: 5, masculine: "πέντε", feminine: "πέντε", neuter: "πέντε" },
] as const;

export const definiteArticles = [
  { gender: "Masculine", singular: "ο", plural: "οι" },
  { gender: "Feminine", singular: "η", plural: "οι" },
  { gender: "Neuter", singular: "το", plural: "τα" },
] as const;

export const genderExamples = [
  { gender: "Feminine", singularArticle: "η", singular: "ντομάτα", pluralArticle: "οι", plural: "ντομάτες" },
  { gender: "Masculine", singularArticle: "ο", singular: "χυμός", pluralArticle: "οι", plural: "χυμοί" },
  { gender: "Neuter", singularArticle: "το", singular: "μήλο", pluralArticle: "τα", plural: "μήλα" },
] as const;

export const tutorialSteps = [
  ["Walk around", "On a computer, use the arrow keys to walk: left and right between aisles, up toward the shelves, down away from them. On a phone, tap an aisle instead."],
  ["Choose an aisle", "Read the shopping list at the top. Move left or right: the little arrow always marks the aisle your character is in front of. Walk up to the shelves to open it."],
  ["Open the aisle", "When you are near the shelves, press Enter to open the marked aisle. You can also click or tap any shelf directly. Then select the product on your shopping list."],
  ["Listen and answer", "Use the speaker to hear the Greek word. Choose a quantity, then choose the noun form: singular for one item, plural for more than one."],
  ["Read the explanation", "When your answer is correct, add the item to your cart. Read why the answer is correct before continuing. After the last item, go to checkout."],
  ["Review anytime", "Open Grammar & Vocabulary for the lessons, Learning objectives to see what you are practising, or How to play to revisit these steps. Escape closes a panel."],
] as const;

export const gameSkills = [
  "Identify and use common Greek food vocabulary.",
  "Form the nominative singular and plural of masculine, feminine, and neuter nouns.",
  "Count objects from 1 to 5 using the correct number form according to grammatical gender.",
] as const;

export const missionSteps = [
  { targetProductGreek: "παγωτό", targetQuantity: 1, greek: "Ένα παγωτό", english: "One ice cream" },
  { targetProductGreek: "μήλο", targetQuantity: 3, greek: "Τρία μήλα", english: "Three apples" },
  { targetProductGreek: "ντομάτα", targetQuantity: 4, greek: "Τέσσερις ντομάτες", english: "Four tomatoes" },
  { targetProductGreek: "μπανάνα", targetQuantity: 1, greek: "Μία μπανάνα", english: "One banana" },
  { targetProductGreek: "γάλα", targetQuantity: 2, greek: "Δύο γάλατα", english: "Two cartons of milk" },
  { targetProductGreek: "κοτόπουλο", targetQuantity: 2, greek: "Δύο κοτόπουλα", english: "Two chickens" },
  { targetProductGreek: "καφές", targetQuantity: 2, greek: "Δύο καφέδες", english: "Two coffees" },
].map((step) => {
  const product = products.find((item) => item.greek === step.targetProductGreek)!;
  return { ...step, category: product.category, targetProductEnglish: product.english };
});

export const missionTotalItems = missionSteps.reduce((sum, step) => sum + step.targetQuantity, 0);
