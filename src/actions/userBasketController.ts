"use server"

import { db } from "@/lib/db";
import { Basket, Product } from "@/types"


export const addBasket = async (
    userId: string,
    product: Product
) => {

    const { productName, price } = product;

    const existingBasketItem = await db.userBasket.findFirst({
        where: {
          userId,
          productName,
        },
    });

    if (existingBasketItem) {
        return await db.userBasket.update({
          where: { id: existingBasketItem.id },
          data: {
            count: existingBasketItem.count + 1,
          },
        });
      } else {
        return await db.userBasket.create({
          data: {
            userId,
            userName: "Default User", 
            productName,
            price: price,
            count: 1,
          },
        });
    }
    
}

export const getBasket = async(
    userId:string
) => {
    return await db.userBasket.findMany({
        where: {
          userId, 
        },
      });
}

export const updateOrRemoveProductInBasket = async (
    userId: string,
    productName: string,
    decrementCount: boolean = false 
  ) => {
    const existingBasketItem = await db.userBasket.findFirst({
      where: { userId, productName },
    });
  
    if (!existingBasketItem) {
      throw new Error("Ürün sepetinizde bulunamadı.");
    }
  
    if (decrementCount) {
      if (existingBasketItem.count > 1) {
        return await db.userBasket.update({
          where: { id: existingBasketItem.id },
          data: {
            count: existingBasketItem.count - 1,
          },
        });
      } else {
        return await db.userBasket.delete({
          where: { id: existingBasketItem.id },
        });
      }
    } else {
      return await db.userBasket.delete({
        where: { id: existingBasketItem.id },
      });
    }
};



export const deleteBasket = async (
  userId: string
) => {
  await db.userBasket.deleteMany({ where: { userId: userId } });
};

export const createOrder = async (
  userId: string,
  basket: Basket[]
) => {
  if (!basket || basket.length === 0) {
    throw new Error("Sepet boş!");
  }

  const totalAmount = basket.reduce((total, item) => total + Number(item.price) * Number(item.count), 0);

  const order = await db.order.create({
    data: {
      userId,
      totalAmount,
      items: {
        create: basket.map((item) => ({
          productName: item.productName,
          productPrice: Number(item.price),
          productCount: item.count,
        })),
      },
    },
    include: {
      items: true, // Eklenen ürünleri de döndür
    },
  });

  return order;
};

export const getOrder = async(
  userId: string
) => {
  const order = await db.order.findMany({
    where: {
      userId,
    },
  });
  if(order){
    return order
  }
  return{error: "Sipariş bulunamadı"}
}
