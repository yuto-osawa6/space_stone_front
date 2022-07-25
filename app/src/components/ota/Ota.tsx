import { product } from "@/interfaces/product"
import {  products_reds } from "@/lib/api/products_red"
import { useEffect, useState } from "react"


// export const Ota2:React.FC = function Ota2Func(){
//   const [products,setProducts] = useState<product[]>()
//   const [message,setMessage] = useState<string>("")
//   const [count,setCount] = useState<number>(0)

//   useEffect(()=>{
//     const handleOta = async()=>{
//       const res = await fetch('http://localhost:3001/api/v1/products/red')
//       const data = await res.json()
//       setMessage(data.message)
//     }
//     handleOta()
//   },[])
  
//   const handleClick = async() => {
//     const res = await fetch('http://localhost:3001/api/v1/products/red')
//     const data = await res.json()
//     setMessage(data)
//     setCount(1)
//   }

//   return(
//     <>
//     <input
//         id="search"
//         type="text"
//       />
//       <button
//       onClick={handleClick}
//       >
//       {count==1&&(
//         <div className="">aaaaaaaaaaaiu</div>
//       )}
//       </button>
//       {message.length>0?
//       <div className="">
//         Signed in as
//       </div>
//       :
//         <div className="">nocontent</div>
//       }
//     <div className="">Welcome to Next.js!</div>
//       <div>aaaaaa</div>
//     </>
//   )
// }