import { review } from "interfaces/review"
import { useRouter } from "next/router";
import React, { memo, useEffect, useMemo, useRef, useState } from "react"
// import ReactQuill from "react-quill"
import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

type Props = {
  id :number
  review:review
}
export const ThreadsLists:React.FC<Props> = memo((Props) => {
  const router = useRouter()
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

  const quillref = useRef<any>(null!)
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  

  const movementHandler = () => {
    router.push(`/threads/${Props.review.id}/products/${Props.review.reviewProduct.id}`)
  }

  return(
    <>
      <div className = "ReviewIndexList">
        <div className = "ArticleListItem ReviewListItem"
        onClick={movementHandler}
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
          </div>
          <div className = "ReviewListItemMain">
            <div className = {`RevieweListItemMainTop`}>
              <div className = "RevieweListItemMainTopTitle">       
              </div>    
              <div className = "ReviewListItemMainTopContent">
              <ReactQuill
              className = "reviews_modal_quill"     
              ref={quillref}
              modules={modules} value={Props.review.content} 
              theme="bubble"
              readOnly={true}       
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
})