import { useRouter } from "next/router";
import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"

 type item = {
  id: number;
  content: string;
  discribe: string;
  episordId?: null | number
}
type Props = {
  item:item
  productId: number | undefined
  alice?: boolean
  
}

export const ShowCloudsItems:React.FC<Props> = function ShowCloudsItemsFunc(Props){
  const router = useRouter()

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
  },[Props.item])
  // -------------------------------------------------------------------------
  // const navigate = useNavigate();
  const options = {
    scroll:false
  }
  const ReviewClickNavigate = () =>{
    if(Props.alice!=undefined&&Props.alice==true){
    router.push(`/title/${Props.productId}/reviews/${Props.item.id}`,undefined,options)
    }else{
    router.push(`/title/${Props.productId}/top/reviews/${Props.item.id}`,undefined,options)
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