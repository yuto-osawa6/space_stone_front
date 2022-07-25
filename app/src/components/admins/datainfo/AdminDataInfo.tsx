import { execUpdateDataInfo } from "@/lib/api/admin/data-info"
import { ErrorMessage } from "@/lib/ini/message"
import { pussingMessageDataAction } from "@/store/message/actions"
import { Button, Modal, TextField } from "@mui/material"
import React, { useState } from "react"
import { useDispatch } from "react-redux"

type Props = {
  open:boolean
  setOpen:React.Dispatch<React.SetStateAction<boolean>>
}
export const AdminDataInfo:React.FC<Props> = function AdminDataInfoFunc(Props){
  const dispatch = useDispatch()
  const handleClose = () => {
    Props.setOpen(false)
  }

  const [title,setTitle] = useState<string>("")
  const [titleError,setTitleEroor] = useState<boolean>()
  const [titleValidateText,setTitleValidateText] = useState<string>()
  const handleChangeTitle = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setTitleEroor(false)
    setTitleValidateText("")
  }

  const handleSubmit = async() => {
    const res = await execUpdateDataInfo(title)
    if(res.data.status === 200){
      dispatch(pussingMessageDataAction({title:"data-information情報を更新しました。",select:1}))
    }else{
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    }
  }


  return(
      <>
        <Modal
          open={Props.open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className = "AdminsProduct">
            <div className = "FormProduct">
              <div className = "FormProductSetTitle">
                <TextField
                  error={titleError}
                  inputProps={{ maxLength: 100, pattern: "^[a-zA-Z0-9_]+$" }}
                  placeholder="data-infoを入力してください（必須:100文字以内）"
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  helperText={titleValidateText}
                  onChange={handleChangeTitle}
                  size="small"
                  fullWidth
                />
                <Button variant="contained"
                  onClick = { handleSubmit }
                  >
                  Submit
                </Button>
              </div>
            </div>
          </div>
      </Modal>
    </>
  )
}