import { Button, FormHelperText, Modal } from "@mui/material"
import { Article } from "@/interfaces/article"
import { product } from "@/interfaces/product"
import { review } from "@/interfaces/review"
import { execDeleteArticle } from "@/lib/api/article"
import { execDeleteReview } from "@/lib/api/products"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { updateReviewAction } from "@/store/reviewUpdate/actions";


type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  article:Article | undefined
}
export const DeleteArticleModal:React.FC<Props> = function DeleteArticleModalFunc(Props){
  const [helpertextradio,setHelpertextradio] = useState<string>("")
  const dispatch = useDispatch()
  const handleClose = () => Props.setOpen(false)
  const handleSubmit = async() => {
    if(Props.article==undefined)return
    const res = await execDeleteArticle(Props.article.id)
    console.log(res)
    if(res.data.status==200){
      setHelpertextradio("削除されました。")
    }else{
      setHelpertextradio("予期しないエラーが発生したため、削除できませんでした。もう一度試すか、お問い合わせください。")
    }
  }

  return(
    <>
      <Modal
        open = {Props.open}
        onClose = {handleClose}
      >
        <>
          <div className=""
            style={{
              position:"absolute",
              top:"50%",
              left:"50%",
              transform:"translate(-50%,-50%)",
              padding:"50px",
              backgroundColor:"aliceblue"
            }}
          >
            削除しますか？　

            <Button variant="contained"
              onClick = {handleSubmit}
            >削除
            </Button> 
            <FormHelperText className = "helpertexts">{helpertextradio}</FormHelperText>
          </div>
        </>
      </Modal>
    </>
  )
} 