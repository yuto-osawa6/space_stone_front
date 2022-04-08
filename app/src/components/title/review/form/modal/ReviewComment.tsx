import { Button, FormHelperText, Modal, TextField } from "@mui/material"
import { OpenReviewCommentContext } from "contexttype/contexttype"
import { review_comments } from "interfaces/review"
import { execCreateCommentReview } from "lib/api/reviews"
import { useContext, useMemo, useRef, useState } from "react"
import { IoMdClose } from "react-icons/io"
// import ReactQuill from "react-quill"
import { Audio, TailSpin } from  'react-loader-spinner'
// import { ngword } from "hook/NgWord"
import { useDispatch } from "react-redux"
import { pussingMessageDataAction } from "store/message/actions"
import { ngword } from "lib/ini/ngWord"
import { ErrorMessage } from "lib/ini/message"
import { submitSpin } from "lib/color/submit-spin"
// import { ErrorMessage } from "share/message"
// import { submitSpin } from "color/submit-spin"
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

type Props = {
  user_id:number
  product_id:string
  review_id:number
  setReviewComments:React.Dispatch<React.SetStateAction<review_comments[]>>
  reviewComments:review_comments[]
  // -v1.01
  // setdata:Function
  selectSort:string
  scrollRef: React.RefObject<HTMLDivElement>
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>
  setPage2: React.Dispatch<React.SetStateAction<number>>
}


export const ReviewComment:React.FC<Props> = (Props) => {
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
      // [{ script:  "sub" }, { script:  "super" }],
      ["blockquote"
    ],
      // "code-block"],
      [{ list:  "ordered" }, { list:  "bullet" }],
      // [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
      // ["image"],
      // ["tag"],
      // ["hash"]
      // ['link'],   
      // ["clean"],
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
    // console.log(quillref.current.getEditor().getText(0,20).replace(/\r?\n/g, ''))
    const ss = quillref.current.getEditor().getText(0,20)
    const ss2 = quillref.current.getEditor().getLength()
    const blob = new Blob([content]).size
    console.log("aaaaaaaaaaaa")
    console.log(blob)
    setValue(content)
      // .replaceAll("<p><br></p><p><br></p><p><br></p>", "").replaceAll("<p></p>", "").replaceAll("<p> </p>", ""))
    // console.log(content.replaceAll())
    console.log(ss2)
    console.log(quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length)
    console.log("aaaaaaaaaaaa")

    // console.log(ss)
    // console.log(ss2)
    // if (quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length<10){
    //   setHelpertextradio(`10文字以上で入力してください 文字数${quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length}`)
    // }
    // // else if(quillref.current.getEditor().getLength()>=20000){
    // //   setHelpertextradio(`20,000文字以内で入力してください 文字数${quillref.current.getEditor().getText().length}`)
    // // } 
    // else{
    // setHelpertextradio("")
    // }
  }

  const dispatch = useDispatch()

  const handlesubmit = async() => {
    const validationText = quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length
      if ( validationText < 10){
        // setHelpertextradio(`10文字以上で入力してください 文字数${quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length}`)
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
    setLoding(true)
    const res = await execCreateCommentReview(Props.product_id,Props.review_id,Props.user_id,value_text,Props.selectSort)
    console.log(res)
    if(res.data.status===200){
      Props.setPage2(2)
      Props.scrollRef.current?.scrollTo({top:0})
      Props.setReviewComments(res.data.reviewComments)
      Props.setHasMore(true)
      dispatch(pussingMessageDataAction(res.data.message))
      closehandle()
    }else if(res.data.status===400){
      dispatch(pussingMessageDataAction({title:ErrorMessage.delete,select:0}))
    }else{
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    }
    setLoding(false)

  }

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