import { useRouter } from "next/router";
import { useEffect, useState } from "react"
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

export const ShowCloudsItems2:React.FC<Props> = function ShowCloudsItems2Func(Props){

  const [content,setContent] = useState<string>("")
  const firstReadMoreHandler = () => {
    setContent("")
    var doc = new DOMParser().parseFromString(Props.item.content, "text/html")
    const doc200 = doc.getElementsByTagName('body')[0].innerText.slice(0,200)
    setContent(doc200.length!=200?doc200:doc200+"...")

  }
  useEffect(()=>{
    firstReadMoreHandler()
  },[])
  // -------------------------------------------------------------------------
  const options = {
    scroll:false
  }
  const router = useRouter()
  const ReviewClickNavigate = () =>{
    if(Props.alice==true){
      router.push(`/title/${Props.productId}/threads/${Props.item.id}`,undefined,options)
    }else{
      router.push(`/title/${Props.productId}/top/threads/${Props.item.id}`,undefined,options)
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
        {Props.item.title.length>0&&(
          <>
            {Props.item.title}<br/>
          </>
        )}
        {content}
      </div>
    </>
  )
}