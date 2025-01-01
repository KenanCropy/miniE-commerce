type SortOrder = "asc" | "desc" | "default";

type Product = {
  productName: string;
  price: number;
  discountedPrice: number;
  rating: number;
  reviews: number;
  imgPath: string;
  category: string;
  count: number;
};

type Basket = {
  id: string;
  count: number;
  productName: string;
  price: Number;
  userId: string;
  userName: string
}

export type {
  SortOrder,
  Product,
  Basket
};