"use client"

import { getOrder } from "@/actions/userBasketController";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Orders = () => {

    const { data: session } = useSession();
    const userId = session?.user?.id;

    const [orders, setOrders] = useState([])

    useEffect(() => {
        if(userId){
            getOrder(userId).then((data:any)=>{
                if(data.length > 0){
                    setOrders(data)
                }else{
                    console.log("Sipariş kaydınız yok");
                    
                }
            })
        }
    },[])

    console.log("orders",orders);
    
    return (
        <div>
            <h1>Orders</h1>
            {orders.map((item,i) =>(
                <div>
                    id: {item.id} <br />
                    total: {item.totalAmount} <br />
                    date: {item.createdAt.toDateString()} <br /><br /><br />
                </div>
            ))}
        </div>
    )
}

export default Orders