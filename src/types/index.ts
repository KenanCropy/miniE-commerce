type SortOrder = "asc" | "desc" | "default";

type Product = {
  productName: string;
  price: number;
  discountedPrice: number;
  rating: number;
  reviews: number;
  imgPath: string;
  category: string;
};

export type {
  SortOrder,
  Product
};