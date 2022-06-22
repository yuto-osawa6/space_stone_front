import { Button, FormHelperText, Modal } from "@mui/material"
import { product } from "@/interfaces/product"
import { review } from "@/interfaces/review"
import { execDeleteReview } from "@/lib/api/products"
import { submitSpin } from "@/lib/color/submit-spin"
import { ErrorMessage } from "@/lib/ini/message"
import React, { useState } from "react"
import { TailSpin } from "react-loader-spinner"
import { useDispatch } from "react-redux"
import { pussingMessageDataAction } from "@/store/message/actions"
import { updateReviewAction } from "@/store/reviewUpdate/actions";

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  review:review
  product: product | undefined
  handleCloseAll: () => void
}
export const DeleteReviewModal2:React.FC<Props> = function DeleteReviewModal2Func(Props){
  const [helpertextradio,setHelpertextradio] = useState<string>("")
  const dispatch = useDispatch()
  const handleClose = () => Props.setOpen(false)
  const [submitLoading,setSubmitLoading] = useState<boolean>(false)

  const handleSubmit = async() => {
    if(Props.product==undefined)return
    setSubmitLoading(true)
    const res = await execDeleteReview(Props.product.id,Props.review.id)
    if(res.data.status==200){
      dispatch(updateReviewAction(true))
      dispatch(pussingMessageDataAction(res.data.message))
      Props.handleCloseAll()
    }else if(res.data.status===440){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message440,select:0}))
    }else{
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))   
    }
    setSubmitLoading(false)
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
              className={"tail-spin-loading"}
            >削除
            {submitLoading==true&&(
              <TailSpin color={submitSpin.color} height={20} width={20} />
            )}
            </Button> 
            <FormHelperText className = "helpertexts">{helpertextradio}</FormHelperText>
          </div>
        </>
      </Modal>
    </>
  )
} 