export type Panel =
  | "grammar"
  | "objectives"
  | "help"
  | "shelf"
  | "checkout"
  | "congrats"
  | null;

export type IconName =
  | "book"
  | "notebook"
  | "chart"
  | "help"
  | "sound"
  | "cart"
  | "close"
  | "arrow"
  | "check"
  | "lock"
  | "receipt"
  | "add"
  | "gamepad";

export type CategoryId = "dairy" | "vegetables" | "fruit" | "meat" | "sweets" | "drinks";

export type ProductArtKind =
  | "milk"
  | "feta"
  | "yogurt"
  | "butter"
  | "tomato"
  | "cucumber"
  | "carrot"
  | "potato"
  | "apple"
  | "orange"
  | "banana"
  | "grape"
  | "chicken"
  | "beef"
  | "pork"
  | "sausage"
  | "honey"
  | "chocolate"
  | "iceCream"
  | "loukoumi"
  | "water"
  | "juice"
  | "coffee"
  | "tea";

export type Gender = "masculine" | "feminine" | "neuter";

export interface Product {
  category: CategoryId;
  greek: string;
  plural: string;
  latin: string;
  english: string;
  art: ProductArtKind;
  price: number;
  gender: Gender;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Direction = "up" | "down" | "left" | "right";
