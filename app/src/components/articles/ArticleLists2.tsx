import { Article } from "@/interfaces/article"
import React, { memo, useEffect, useMemo, useRef, useState } from "react"
// import ReactQuill from "react-quill"
import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"
import { SelectiongArticleDataAction } from "@/store/article/actions"
import { useRouter } from "next/router";

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

type Props = {
  id :number
  article:Article
}
export const ArticlesLists2:React.FC<Props> = memo(function ArticlesLists2Func(Props){
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
  const router = useRouter()
  const movementHandler = () => {
    dispatch(SelectiongArticleDataAction(Props.article))
    // navigate(`/articles/${Props.article.id}`)
    router.push(`/articles/${Props.article.id}`)
  }
  return(
    <React.Fragment>
      <div className = "ArticleListItem"
      onClick={movementHandler}
      >
        <div className = {`ArticleListTitle HeaderGrid${colornumber}`}>
          {Props.article.title}
        </div>
        <div className = {`ArticleListTitleAssociate`}>
          <div className = "ArticleListTitleAssociateTitle">
            {Props.article.articleProducts.length > 0&&(
              <>
                *関連のあるタイトル
              </>
            )}
          </div>
         <ul>
          {Props.article.articleProducts.map((item:any)=>{
            return(
                <li
                key={item.id}
                >{item.title}</li>             
            )
          })}
          </ul>  
        </div>
        <div className = "ArticleListContent">
         <ReactQuill
            className = "reviews_modal_quill"     
            ref={quillref}
            modules={modules} value={Props.article.content} 
            theme="bubble"
            readOnly={true}       
          />
        </div>
          
      </div>
    </React.Fragment>
  )
})