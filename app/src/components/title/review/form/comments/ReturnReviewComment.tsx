import { Button, FormHelperText, Modal } from "@mui/material"
// import { submitSpin } from "color/submit-spin"
import { OpenReviewCommentContext } from "contexttype/contexttype"
// import { ngword } from "hook/NgWord"
import { return_review_comments } from "interfaces/review"
import { execCreateReturnCommentReview } from "lib/api/reviews"
import { submitSpin } from "lib/color/submit-spin"
import { ErrorMessage } from "lib/ini/message"
import { ngword } from "lib/ini/ngWord"
import { useRouter } from "next/router"
import { useContext, useMemo, useRef, useState } from "react"
import { IoMdClose } from "react-icons/io"
import { TailSpin } from "react-loader-spinner"
// import ReactQuill from "react-quill"
import { useDispatch } from "react-redux"
// import { useParams } from "react-router-dom"
// import { ErrorMessage } from "share/message"
import { pussingMessageDataAction } from "store/message/actions"

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

type Props = {
  user_id : number
  comment_review_id : number
  setReturnReviewList : React.Dispatch<React.SetStateAction<return_review_comments[]>>
  returnReviewList : return_review_comments[]

  setReturnJugde: React.Dispatch<React.SetStateAction<boolean>>
  setUpdateJudge?: () => Promise<void>
}


export const ReturnReviewComment:React.FC<Props> = (Props) => {
  const [helpertextradio,setHelpertextradio] = useState<string>("")
  // validation
  const [validatetext,setValidatetext] = useState<string>("")
    
  const {openReviewComment,setOpenReviewComment} = useContext(OpenReviewCommentContext)
  const handleClose = () => {
    // e?.stopPropagation()
    setOpenReviewComment(false);
  }
  const closehandle = () =>{setOpenReviewComment(false)}
  // quill
  const [value,setValue] = useState<string>("")

  const quillref  = useRef<any>(null!)

  const handleChange = (content: string):void | undefined => {
    // console.log(quillref.current.getEditor().getText(0,20).replace(/\r?\n/g, ''))
    const ss = quillref.current.getEditor().getText(0,20)
    const ss2 = quillref.current.getEditor().getLength()

    setValue(content)
    console.log(content)
    // console.log(ss)
    // console.log(ss2)
    if (quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length<10){
      setHelpertextradio(`10文字以上で入力してください 文字数${quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length}`)
    }
    else{
    setHelpertextradio("")
    }
  }

  const [loading,setLoding] = useState<boolean>(false)
  const dispatch = useDispatch()
  // const params = useParams()
  const router = useRouter()
  const {pid,rid} = router.query
  const params_review_id = rid as string

  const handlesubmit = async() => {
    const validationText = quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length
      if ( validationText < 10){
        dispatch(pussingMessageDataAction({title:ErrorMessage.tenover,select:0}))
        return
      }
      if ( quillref.current.getEditor().getText().length > 2000){
        dispatch(pussingMessageDataAction({title:ErrorMessage.twothousanddown,select:0}))
        return
      }
       // ngword
       const text_all = quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "")
      if(ngword.some((ngWord) => text_all.includes(ngWord))){
        dispatch(pussingMessageDataAction({title:ErrorMessage.ngword,select:0}))
        return
      }
      if(new Blob([value]).size>100000){
        console.log(new Blob([value]).size)
        dispatch(pussingMessageDataAction({title:ErrorMessage.byteSize,select:0}))
        return
      }
      const value_text= value.replace(/(\s+){2,}/g," ").replace(/(<p>\s+<\/p>){1,}/g,"<p><br></p>").replace(/(<p><\/p>){1,}/g,"<p><br></p>").replace(/(<p><br><\/p>){2,}/g,"<p><br></p>")
    // if (typeof Props._id === 'undefined') return
    if(params_review_id==undefined)return
    setLoding(true)
    const res = await execCreateReturnCommentReview(Props.comment_review_id,Props.user_id,value_text,params_review_id)
    if(res.data.status===200){
      console.log(res)
      Props.setReturnJugde(true)
      Props.setUpdateJudge!=undefined&&(Props.setUpdateJudge())
      closehandle()
    }else if(res.data.status===400){
      dispatch(pussingMessageDataAction({title:ErrorMessage.delete,select:0}))
    }else if(res.data.status===410){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message410,select:0}))
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
      // [{ font: [] }],
      [{ header: 1 },{ header: 2 }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],

      ["blockquote"
    ],
      [{ list:  "ordered" }, { list:  "bullet" }],
    ],
    handlers: {
      image: imageHandlerLink,
      // tag:tagHandler,
      // hash:hashHandler,
      // video: videoHandlerLink,
    },
  }

  }
  ),[])

  return(
    <>
     <Modal
        open={openReviewComment}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > 
        <>
        <div className = "modal_review_richtext_preview">
          <div className = "modal_review_richtext_preview_title">
            Preview
          </div>
          {/* <div className = "modal_review_richtext_preview_title">
          <IoMdClose/>
            閉じる
          </div> */}
          <div className = "modal_review_richtext_preview_text">
          {/* {text} */}
          </div>
          <ReactQuill
            className = "reviews_modal_quill"
            ref={quillref}
            // ref='editor'
            modules={modules} value={ value.replace(/(\s+){2,}/g," ").replace(/(<p>\s+<\/p>){1,}/g,"<p><br></p>").replace(/(<p><\/p>){1,}/g,"<p><br></p>").replace(/(<p><br><\/p>){2,}/g,"<p><br></p>")} 
            // theme="bubble" 
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
            // ref='editor'
            modules={modules} value={value} onChange={handleChange}  
            // theme="bubble" 
            theme="snow"
            
            />
            {/* <FormHelperText className = "helpertexts">{helpertextradio}</FormHelperText> */}
            
            <Button variant="contained"
            className={"tail-spin-loading"}
            onClick = {handlesubmit}
            >Submit
            {loading==true&&(
              <TailSpin color={submitSpin.color} height={20} width={20} />
            )}
            </Button>


            {/* preview */}
          </div>
        </>
      </Modal>
    </>
  )
}