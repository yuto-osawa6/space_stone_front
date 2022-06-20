import { news } from "@/interfaces/main"
import { Modal } from "@mui/material"
import React from "react"

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  news: news
}

export const NewMessageModal:React.FC<Props> = function NewMessageModalFunc(Props){
  const handleClose = () => Props.setOpen(false)
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
            {Props.news.information}
            {Props.news.title}
            {Props.news.description}
              
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}