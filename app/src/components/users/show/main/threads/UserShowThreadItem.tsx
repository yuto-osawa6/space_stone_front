import { review } from "@/interfaces/review"
import { useRouter } from "next/router"
import { useEffect, useMemo, useState } from "react"
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;


type Props = {
  review : review
  user_id:number
}
export const UserShowThreadItem:React.FC<Props> = function UserShowThreadItemFunc(Props){
  const [colornumber,setColornumber ]= useState<number>(0)

  useEffect(()=>{
    const array:number[] = [1,2,3,4,5,6,7,8,9,0]
    const colorNumber:number = array[Math.floor(Math.random() * array.length)]
    setColornumber(colorNumber)
  },[])

  const modules = useMemo(()=>({
    toolbar:{ 
      container:[
      [{ header: 1 },{ header: 2 }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      ["blockquote"
    ],
      [{ list:  "ordered" }, { list:  "bullet" }],
      [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
    ],
  }
  }
  ),[])
  const router = useRouter()
  const navigateHandler = () => {
    // doneyet-1 (idが必要)
    const options = {
      scroll:false
    }
    router.push(`/users/${Props.user_id}/threads/${Props.review.id}/title/${Props.review.reviewProduct.id}`,undefined,options)
  }
  return(
    <> 
      <div className = "ReviewIndexList"
      onClick={navigateHandler}
      style={{cursor:"pointer"}}
      >
        <div className = "ArticleListItem ReviewListItem"
        >
          <div className = "ReviewListItemTop">
            <div className = "ReviewListItemTopImage">
              <img src={Props.review.reviewProduct.imageUrl}/>
              <div className = "ReviewListItemTopShadow">
              </div>
              <div className = "ReviewListItemTopCenter">
                <div className = "ReviewListItemTopCenterTitle">
                {Props.review.reviewProduct.title}
                </div>
                <div className = {`ReviewListItemTopCenterUser ColorV10${colornumber}a`}>
                  {Props.review.reviewUser.nickname}さんによる投稿
                </div>
              </div>
            </div>
            <div className = "ReviewListItemMain">
            <div className = {`RevieweListItemMainTop`}>
              <div className = "RevieweListItemMainTopTitle">
                
              </div>
              
              <div className = "ReviewListItemMainTopContent">
              <ReactQuill
                className = "reviews_modal_quill"     
                modules={modules} value={Props.review.content} 
                theme="bubble"
                readOnly={true}       
              />
              </div>
            </div>
          </div>
          </div>

          {/* <div className = "ReviewListItemMain">
            <div className = {`RevieweListItemMainTop`}>
              <div className = "RevieweListItemMainTopTitle">
                
              </div>
              
              <div className = "ReviewListItemMainTopContent">
              <ReactQuill
                className = "reviews_modal_quill"     
                modules={modules} value={Props.review.content} 
                theme="bubble"
                readOnly={true}       
              />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}