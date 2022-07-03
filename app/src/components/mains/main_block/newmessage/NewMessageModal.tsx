import { news } from "@/interfaces/main"
import { Modal } from "@mui/material"
import React, { useMemo } from "react"

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  news: news
}

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

export const NewMessageModal:React.FC<Props> = function NewMessageModalFunc(Props){
  const handleClose = () => Props.setOpen(false)
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
  console.log(Props)
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
            <div className="">
              {Props.news.title}
            </div>

              <ReactQuill
                className = "ovevierReactQuill"     
                modules={modules} value={Props.news.information} 
                theme="bubble"
                readOnly={true}       
              />
              
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}