import { product } from "@/interfaces/product"
import {  products_reds } from "@/lib/api/products_red"
import { useEffect, useState } from "react"


export const Ota2:React.FC = function Ota2Func(){
  const [products,setProducts] = useState<product[]>()
  const [message,setMessage] = useState<string>("")
  const [count,setCount] = useState<number>(0)

  useEffect(()=>{
    const handleOta = async()=>{
      // axios
      // const res = await products_reds()
      // if(res.status==200){
      //   console.log(res.data)
      //   // console.log("aaaaaaaa")
      //   setMessage(res.data.message)
      // }else{

      // }
      // fetch
      const res = await fetch('http://localhost:3001/api/v1/products/red')
      const data = await res.json()
      console.log(data.message)
      setMessage(data.message)
      // setProducts(res.data.products)
    }
    handleOta()
  },[])
  
  const handleClick = async() => {
    const res = await fetch('http://localhost:3001/api/v1/products/red')
    const data = await res.json()
    console.log(data)
    setMessage(data)
    setCount(1)
  }

  return(
    <>
    {/* <label htmlFor="search">Welcome to Next.js!</label> */}
     <input
        id="search"
        type="text"
        // value={value}
        // onChange={onChange}
      />
      <button
      onClick={handleClick}
      >
      {count==1&&(
        <div className="">aaaaaaaaaaaiu</div>
      )}

      </button>
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