import { Button, FormHelperText, Modal, TextField } from "@mui/material"
import { OpenReviewCommentContext } from "@/contexttype/contexttype"
import { review_comments } from "@/interfaces/review"
import { execCreateCommentReview } from "@/lib/api/reviews"
import { execCreateCommentThread } from "@/lib/api/threads"
import { submitSpin } from "@/lib/color/submit-spin"
import { ErrorMessage } from "@/lib/ini/message"
import { ngword } from "@/lib/ini/ngWord"
import { useContext, useMemo, useRef, useState } from "react"
import { IoMdClose } from "react-icons/io"
import { TailSpin } from "react-loader-spinner"
import { useDispatch } from "react-redux"
import { pussingMessageDataAction } from "@/store/message/actions"
import { DefaultPaste } from "@/lib/ini/quill/QuillEffect"
import { QuillSettings } from "@/lib/ini/quill/QuillSettings"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

type Props = {
  user_id:number
  product_id:string
  review_id:number
  setReviewComments:React.Dispatch<React.SetStateAction<review_comments[]>>
  reviewComments:review_comments[]
  // 
  selectSort:string
  scrollRef: React.RefObject<HTMLDivElement>
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>
  setPage2: React.Dispatch<React.SetStateAction<number>>
}


export const ThreadComment:React.FC<Props> = function ThreadCommentFunc(Props){
  // DefaultPaste()
  const [helpertextradio,setHelpertextradio] = useState<string>("")
  // validation
  const [validatetext,setValidatetext] = useState<string>("")

  const {openReviewComment,setOpenReviewComment} = useContext(OpenReviewCommentContext)
  const handleClose = () => {
    setOpenReviewComment(false);
  }
  const closehandle = () =>{setOpenReviewComment(false)}
  // quill
  const [value,setValue] = useState<string>("")

  const quillref  = useRef<any>(null!)
  // loading
  const [loading,setLoding] = useState<boolean>(false)

  const handleChange = (content: string):void | undefined => {
    const ss = quillref.current.getEditor().getText(0,20)
    const ss2 = quillref.current.getEditor().getLength()
    setValue(content)
  }

  const dispatch = useDispatch()
  const { executeRecaptcha } = useGoogleReCaptcha()
  const handlesubmit = async() => {
    const validationText = quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length
    if ( validationText < QuillSettings.textLength){
      dispatch(pussingMessageDataAction({title:ErrorMessage.tenover,select:0}))
      return
    }
      // ngword
    const text_all = quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "")
    if(ngword.some((ngWord) => text_all.includes(ngWord))){
      dispatch(pussingMessageDataAction({title:ErrorMessage.ngword,select:0}))
      return
    }
    if(new Blob([value]).size>QuillSettings.blobSize){
      dispatch(pussingMessageDataAction({title:ErrorMessage.byteSize,select:0}))
      return
    }
    if (!executeRecaptcha) {
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
      return
    }
    const reCaptchaToken = await executeRecaptcha('ThreadComment');
    if(!reCaptchaToken){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
      return
    }    
    setLoding(true)
    const value_text= value.replace(/(\s+){2,}/g," ").replace(/(<p>\s+<\/p>){1,}/g,"<p><br></p>").replace(/(<p><\/p>){1,}/g,"<p><br></p>").replace(/(<p><br><\/p>){2,}/g,"<p><br></p>")
    const res = await execCreateCommentThread(Props.product_id,Props.review_id,Props.user_id,value_text,Props.selectSort,reCaptchaToken)
    if(res.data.status===200){
      Props.setPage2(2)
      Props.scrollRef.current?.scrollTo({top:0})
      Props.setReviewComments(res.data.reviewComments)
      Props.setHasMore(true)
      dispatch(pussingMessageDataAction({title:res.data.message.title,select:1}))
      closehandle()
    }else if(res.data.status===400){
      dispatch(pussingMessageDataAction({title:ErrorMessage.delete,select:0}))
    }else if(res.data.status===493){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message493,select:0}))
    }else if(res.data.status===490){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message490,select:0}))
    }else{
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    }
    setLoding(false)


  }
  const imageHandlerLink = () => {
    var range = quillref.current.getEditor().getSelection();
    if (range==null)return 
    var value = prompt('画像URLを入力してください');
    if(value){
      quillref.current.getEditor().insertEmbed(range.index, 'image', value);
    }
  }
  const modules = useMemo(()=>({
    toolbar:{ 
      container:[
      [{ header: 1 },{ header: 2 }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      ["blockquote"
    ],
      [{ list:  "ordered" }, { list:  "bullet" }],
    ],
    handlers: {
      image: imageHandlerLink,
    },
  }

  }
  ),[])

  const handleClose2 = () => {
    
  }

  return(
    <>
      <Modal
        open={openReviewComment}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > 
        <>
        <div className = "modal_review_richtext_preview">
          <div className = "modal_review_richtext_preview_title">
            Preview
          </div>
          <div className = "modal_review_richtext_preview_text">
          </div>
          <ReactQuill
            className = "reviews_modal_quill"
            ref={quillref}
            modules={modules} value={value!=undefined?value.replace(/(\s+){2,}/g," ").replace(/(<p>\s+<\/p>){1,}/g,"<p><br></p>").replace(/(<p><\/p>){1,}/g,"<p><br></p>").replace(/(<p><br><\/p>){2,}/g,"<p><br></p>"):value} 
            theme="bubble"
            readOnly={true}
          />

        </div>
          <div className = "modal_review_richtext">
            
          <div className = "modalCloseButton">
            <div className = "modalReviewTitle">
              コメントを作成
            </div>
            <Button variant="outlined"
              className = "modal_review_richtext_close"
              onClick = {closehandle}
            >
              <IoMdClose/>
              閉じる
            </Button>

            </div>
            <ReactQuill 
            className = "reviews_modal_quill"
            ref={quillref}
            modules={modules} value={value} onChange={handleChange}  
            theme="snow"
            />
            <FormHelperText className = "helpertexts">{helpertextradio}</FormHelperText>
            
            <Button variant="contained"
              className={"tail-spin-loading"}
              onClick = {handlesubmit}
            >Submit
              {loading==true&&(
              <TailSpin color={submitSpin.color} height={20} width={20} />
              )}
            </Button>
          </div>
        </>
      </Modal>
    </>
  )
}