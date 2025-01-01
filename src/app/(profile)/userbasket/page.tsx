"use client"

import { createOrder, deleteBasket, getBasket, updateOrRemoveProductInBasket } from "@/actions/userBasketController";
import { Basket, Product } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const UserBasket = () => {

    const { data: session } = useSession();

    const [basket,setBasket] = useState<Basket[] | Product[] |null>(null)

    useEffect(() => {
        if(session){
            session.user?.id && getBasket(session.user?.id).then((data:Basket[] | Product[])=>{
                setBasket(data)
            })
        }else{
            const storedProducts = localStorage.getItem("products");
            const existingProducts: Product[] = storedProducts ? JSON.parse(storedProducts) : [];
            setBasket(existingProducts)
        }
    },[])

    const deleteProduct = async (productName: string, decrementCount: boolean) => {
      const userId = session?.user?.id;
      
      if (userId) {
        try {
          await updateOrRemoveProductInBasket(userId, productName, decrementCount);
          const updatedBasket = await getBasket(userId);
          setBasket(updatedBasket);
        } catch (error) {
          console.error("DB işlemi sırasında hata:", error);
        }
      } else {
        const storedProducts = localStorage.getItem("products");
        const existingProducts: Product[] = storedProducts ? JSON.parse(storedProducts) : [];
    
        const updatedProducts: any = existingProducts
          .map((product) => {
            if (product.productName === productName) {
              if (decrementCount && product.count && product.count > 1) {
                return { ...product, count: product.count - 1 };
              }
              return null;
            }
            return product;
          })
          .filter(Boolean) as Product[];
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        setBasket(updatedProducts); 
      }
    };
  
    const orderCompleted = async () => {
      const userId = session?.user?.id;
      if(userId && basket){
        createOrder(userId, basket).then((data) =>{
          deleteBasket(userId);
        })
      }
    }
      

    return (
    <div>
        <h1>UserBasket</h1>
        {basket && basket.map((item,i) =>(
            <div key={i}>
                name : {item.productName} <br />
                count: {item.count} <br />
                {item.count && item.count > 0 && <button onClick={() => deleteProduct(item.productName,true)}>1 azalt</button>}
                <button onClick={() => deleteProduct(item.productName,false)}>hepsini sil</button>
            </div>
        ))}
        <br /><br /><br />
        <button onClick={() => orderCompleted()}>Siparişi Tamamla</button>
    </div>
  )
}

export default UserBasket