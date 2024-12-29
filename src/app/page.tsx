"use client";
import { useState } from "react";
import products from "../data/products.json";
import { Product, SortOrder } from "@/types";

export default function Home() {


  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const filterByCategory = (category: string) => {
    if (!category || category === "All") {
      return products;
    }
    return products.filter((p) => p.category === category);
  };

  const sortByPrice = (order: SortOrder, data: Product[]) => {
    if (order === "default") {
      return data;
    }
    return [...data].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
  };

  const updateProductList = (category: string, order: SortOrder) => {
    const filtered = filterByCategory(category);
    const sorted = sortByPrice(order, filtered);
    setFilteredProducts(sorted);
  };

  const handleSortChange = (order: SortOrder) => {
    setSortOrder(order);
    updateProductList(selectedCategory, order);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    updateProductList(category, sortOrder);
  };

  return (
    <main className="main-products">
      <div className="products-head">
        <h2 className="product-title">Günün Teklifi</h2>
        <div className="products-filter">
          <button onClick={() => handleSortChange("default")}>Varsayılan</button>
          <button onClick={() => handleSortChange("asc")}>Artan</button>
          <button onClick={() => handleSortChange("desc")}>Azalan</button>
        </div>
      </div>
      <div className="product-section">
        <div className="products-categories">
          {categories.map((cat, i) => (
            <button onClick={() => handleCategorySelect(cat)} key={i}>
              {cat}
            </button>
          ))}
          <button onClick={() => handleCategorySelect("All")}>Hepsi</button>
        </div>
        <div className="products-cards">
          {filteredProducts.map((product, i) => (
            <div className="product-card" key={i}>
              <div className="product-wrapper">
                <div className="product-img">
                  <img src="/" alt="product" />
                </div>
                <div className="product-discount">
                  <span>
                    Sepette&nbsp;
                    {product.discountedPrice !== 0
                      ? product.price - (product.discountedPrice * product.price) / 100
                      : product.price
                    }
                    &nbsp;TL
                  </span>
                </div>
                <div className="product-star">star 2</div>
                <p className="product-name">{product.productName}</p>
                <div className="product-price">{product.price} TL</div>
                <button className="add-product">Sepete Ekle</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
