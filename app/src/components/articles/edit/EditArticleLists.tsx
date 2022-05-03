import { Article } from "@/interfaces/article"
import { useState } from "react"
import { DeleteArticleModal } from "./DeleteArticleModal"
import { EditArticleModal } from "./EditArticleModal"
type Props = {
  article: Article | undefined
}

export const EditArticleLists:React.FC<Props> = function EditArticleLists(Props){
  const[open,setOpen] = useState<boolean>(false)
  const[open2,setOpen2] = useState<boolean>(false)

  const handleDelete = () => {
    console.log(Props)
    setOpen2(true)
  }
  const handleEdit = () => {
    setOpen(true)
  }

  return(
    <>
      <div className="">
        <ul
        style={{display:"flex",gap:"10px",
        position: "absolute",
        top: "0",
        padding: "10px",
        backgroundColor: "transparent",
        zIndex: "100"
      }}
        >
          <li
            onClick={handleEdit}
            style={{
            // cursor:"pointer",
            borderRadius: "5px",
            cursor: "pointer",
            padding: "5px",
            backgroundColor: "#02af75",
            color: "white",
          }}
          >
            編集
          </li>
          <li
           style={{
            // cursor:"pointer",
            borderRadius: "5px",
            cursor: "pointer",
            padding: "5px",
            backgroundColor: "#ff3073",
            color: "white",
          }}
           onClick={handleDelete}
          >
              削除
          </li>
        </ul>
      </div> 
      {open&&(
        <EditArticleModal
          open = {open}
          setOpen = {setOpen}
          article = {Props.article}
        />
      )}
      {open2&&(
        <DeleteArticleModal
          open = {open2}
          setOpen = {setOpen2}
          article = {Props.article}
      />
      )}
    </>
  )
}