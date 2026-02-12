"use client"
import {createContext,ReactNode,useContext, useState,useEffect} from 'react'


type Product =  {
    id:string;
    name:string;
    price:number;
    image?:string;
};
type CartContextType = {
    cart:Product[];
    addToCart:(product:Product)=>void;
    removeFromCart:(productId:string)=>void;
    clearCart:()=>void;
};

const CartContext = createContext<CartContextType|undefined>(undefined);

export function CartProvider({children}:{children:ReactNode}){
    const [cart, setCart] = useState<Product[]>([])

    const addToCart = (product:Product) =>{
        setCart((prev)=>[...prev,product]);
    }

    const removeFromCart =(productId:string)=>{
        setCart((prev)=>prev.filter((product)=>product.id!==productId));
    }

    const clearCart =()=>{
        setCart([]);
    }


        useEffect(()=>{
            const savedCart = localStorage.getItem("cart");
            if(savedCart){
                setCart(JSON.parse(savedCart));
            }
            },[]);


        useEffect(()=>{
            localStorage.setItem("cart",JSON.stringify(cart));
            },[cart]);

    
    return(
        <CartContext.Provider value={{cart,addToCart,removeFromCart,clearCart}}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}