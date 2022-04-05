import { useRouter } from "next/router";
import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"

 type item = {
  id: number;
  content: string;
  discribe: string;
  title: string;
}
type Props = {
  item:item
  productId: number | undefined
  alice?: boolean
}

export const ShowCloudsItems2:React.FC<Props> = (Props) => {

  const [content,setContent] = useState<string>("")
  const firstReadMoreHandler = () => {
    setContent("")
    var doc = new DOMParser().parseFromString(Props.item.content, "text/html")
    console.log(doc.getElementsByTagName('body')[0].innerText)
    const doc200 = doc.getElementsByTagName('body')[0].innerText.slice(0,200)
    setContent(doc200.length!=200?doc200:doc200+"...")

  }
  useEffect(()=>{
    firstReadMoreHandler()
  },[])
  // -------------------------------------------------------------------------
  // const navigate = useNavigate();
  const router = useRouter()
  const ReviewClickNavigate = () =>{
    if(Props.alice==true){
      router.push(`/products/${Props.productId}/thread/${Props.item.id}`)
    }else{
      router.push(`/products/${Props.productId}/top/thread/${Props.item.id}`)
    }
  }

  return(
    <>
      <div
      className = "ShowClouds"
      onClick={ReviewClickNavigate} 
      style={{
        lineHeight:"1.4rem"
      }}
      >
        {content}
      </div>
    </>
  )
}