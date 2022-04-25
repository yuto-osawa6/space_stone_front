import { product } from "@/interfaces/product"
import {  products_reds } from "@/lib/api/products_red"
import { useEffect, useState } from "react"


export const Ota2:React.FC = () => {
  const [products,setProducts] = useState<product[]>()
  const [message,setMessage] = useState<string>("")

  useEffect(()=>{
    const handleOta = async()=>{
      const res = await products_reds()
      if(res.status==200){
        console.log(res.data)
        // console.log("aaaaaaaa")
        setMessage(res.data.message)
      }else{

      }
     
      // setProducts(res.data.products)
    }
    handleOta()
  },[])
  

  return(
    <>
    {/* <label htmlFor="search">Welcome to Next.js!</label> */}
     <input
        id="search"
        type="text"
        // value={value}
        // onChange={onChange}
      />
      {message.length>0?
      <div className="">
        Signed in as
      </div>
      :
        <div className="">nocontent</div>
      }
    <div className="">Welcome to Next.js!</div>
      <div>aaaaaa</div>
      {/* Welcome to Next.js! */}
    </>
  )
}