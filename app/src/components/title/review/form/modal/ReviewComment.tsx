import { Button, FormHelperText, Modal, TextField } from "@mui/material"
import { OpenReviewCommentContext } from "@/contexttype/contexttype"
import { review_comments } from "@/interfaces/review"
import { execCreateCommentReview } from "@/lib/api/reviews"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { IoMdClose } from "react-icons/io"
// import ReactQuill,{Quill} from "react-quill"
import { Audio, TailSpin } from  'react-loader-spinner'
// import { ngword } from "hook/NgWord"
import { useDispatch } from "react-redux"
import { pussingMessageDataAction } from "@/store/message/actions"
import { ngword } from "@/lib/ini/ngWord"
import { ErrorMessage } from "@/lib/ini/message"
import { submitSpin } from "@/lib/color/submit-spin"
// import dynamic from "next/dynamic"
// import { DefaultPaste } from "./Test"
import { QuillSettings } from "@/lib/ini/quill/QuillSettings"
import { DefaultPaste } from "@/lib/ini/quill/QuillEffect"

// import { PlainClipboard } from "./Test"

// const PlainClipboard = dynamic(() => import("./Test"), { ssr: false });
// import { PlainClipboard } from "./Test"
// import { ErrorMessage } from "share/message"
// import { submitSpin } from "color/submit-spin"
const ReactQuill = typeof window === "object" ? require("react-quill") : () => false;
const Quill = typeof window === "object" ? require("quill") : () => false;

// const QuillNoSSRWrapper = dynamic(import('react-quill'), {
//   ssr: false,
//   loading: () => <p>Loading ...</p>,
// });
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false,loading: () => <p>Loading ...</p>, });
// const {Quill} = ReactQuill;

// class PlainClipboard extends Clipboard {
//   convert(html = null) {
//     // if (typeof html === 'string') {
//     //   this.container.innerHTML = html;
//     // }
//     // let text = this.container.innerText;
//     // this.container.innerHTML = '';
//     const Delta = Quill.import('delta')
//     return new Delta().insert("");
//   }
// }
// const icons = 
//   Quill !== false ?Quill.import('ui/icons'): () => false;
  // Quill !== false ? icons.tag = "#": () => false;
  // Quill !==  icons.hash = "#": () => false;

// Quill !== false ? Quill.register('modules/clipboard', PlainClipboard, true): () => false;
// let clipboard = Quill.import("modules/clipboard")
// clipboard.addMatcher (Node.ELEMENT_NODE, function (node:Node, delta:any) {
//   const Delta = Quill.import('delta')
//   var plaintext = node.textContent
//   return new Delta().insert (plaintext);
// });
// Quill.register('modules/clipboard', PlainClipboard, true)


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


export const ReviewComment:React.FC<Props> = function ReviewCommentFunc(Props){
  // const [quillLoaded,setQuillLoaded] = useState<boolean>(false)
  // useEffect(()=>{
  //   const Clipboard = Quill.import('modules/clipboard')
  //   const Delta = Quill.import('delta')
  //   class PlainClipboard extends Clipboard {
  //     onPaste (e:any) {
  //       if (e.defaultPrevented || !this.quill.isEnabled()) return
  //       let range = this.quill.getSelection()
  //       const text = e.clipboardData.getData('text')
  //       let delta = new Delta().retain(range.index)
  //       let scrollTop = this.quill.scrollingContainer.scrollTop
  //       this.container.focus()
  //       this.quill.selection.update(Quill.sources.SILENT)
  //       setTimeout(() => {
  //         // ここだけ変更箇所 本来はconvert()
  //         const pastedDelta = new Delta().insert(text)
  //         delta = delta.concat(pastedDelta).delete(range.length)
  //         this.quill.updateContents(delta, Quill.sources.USER)
  //         // range.length contributes to delta.length()
  //         this.quill.setSelection(delta.length() - range.length, Quill.sources.SILENT)
  //         this.quill.scrollingContainer.scrollTop = scrollTop
  //         this.quill.focus()
  //       }, 1)
  //     }
  //   }
  //   Quill.register('modules/clipboard', PlainClipboard, true)
  //   // setQuillLoaded(true)
  // },[])
  // DefaultPaste()

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
      ["hash"]
      // ['link'],   
      // ["clean"],
    ],
    clipboard: {
      matchers: [
        ['IMG', customh1],
        // ['a',customa]
      ],
        // matchVisual: false,
    },
    
    // handlers: {
    //   image: imageHandlerLink,

    // },
    // function:{

    // }
  }

  }
  ),[])
  const customh1 =  function(node:any, delta:any) {
    console.log("aaauoi")
    const Delta = Quill.import('delta')
    // return delta.compose(new Delta().retain(delta.length(), { h1: false }));
    return new Delta().insert('')
  }
  // const customh1 =()=>{
  //   // const editor = quillref.current?.getEditor()
  //   // editor.clipboard.addMatcher (Node.ELEMENT_NODE, function (node:Node, delta:any) {
  //   // const Delta = Quill.import('delta')
  //   // var plaintext = node.textContent
  //   // return new Delta().insert (plaintext);
  //   console.log("df4")
  //   const editor = quillref.current.getEditor()
  //     editor.clipboard.addMatcher('IMG', (node:any, delta:any) => {
  //       const Delta = Quill.import('delta')
  //       return new Delta().insert('')
      
  //   }
  // )}
  // const customh2 =  function(node:any, delta:any) {
  //   const Delta = Quill.import('delta')
  //   // return delta.compose(new Delta().retain(delta.length(), { h1: false }));
  //   return new Delta().insert('')
  // }

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

  // useEffect(()=>{
  //   if( quillref.current==null)return
  //   const editor = quillref.current.getEditor()
  //   // editor.clipboard.addMatcher('IMG', (node:any, delta:any) => {
  //   //   const Delta = Quill.import('delta')
  //   //   return new Delta().insert('')
  //   // })
  //   // editor.clipboard.addMatcher('PICTURE', (node:any, delta:any) => {
  //   //     const Delta = Quill.import('delta')
  //   //     return new Delta().insert('')
  //   // })
  //   // editor.clipboard.addMatcher(Node.ELEMENT_NODE, function (node:Node, delta:any) {
  //   //   const plaintext = node.innerText
  //   //   const Delta = Quill.import('delta')
  //   //   return new Delta().insert(plaintext)
  // })
  // },[quillref.current])



  const handleChange = (content: string):void | undefined => {
    
    // editor.clipboard.addMatcher('PICTURE', (node:any, delta:any) => {
    //     const Delta = Quill.import('delta')
    //     return new Delta().insert('')
    // })
    // console.log(quillref.current.getEditor().getText(0,20).replace(/\r?\n/g, ''))
    const ss = quillref.current.getEditor().getText(0,20)
    const ss2 = quillref.current.getEditor().getLength()
    const blob = new Blob([content]).size
    console.log("aaaaaaaaaaaa")
    console.log(blob)
    // setValue(content)
    setcontent(content)
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
  const setcontent = (content: string) => {
    setValue(content)
  }

  const dispatch = useDispatch()
  

  const handlesubmit = async() => {
    const validationText = quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length
    console.log(new Blob([value]).size)
    console.log(quillref.current.getEditor().getText().length)
    console.log(quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length)

      if ( validationText < QuillSettings.textLength){
        // setHelpertextradio(`10文字以上で入力してください 文字数${quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length}`)
        dispatch(pussingMessageDataAction({title:ErrorMessage.tenover,select:0}))
        return
      }
      // if ( quillref.current.getEditor().getText().length > 1000){
      //   dispatch(pussingMessageDataAction({title:ErrorMessage.twothousanddown,select:0}))
      //   return
      // }
      
  
       // ngword
       const text_all = quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "")
      if(ngword.some((ngWord) => text_all.includes(ngWord))){
        dispatch(pussingMessageDataAction({title:ErrorMessage.ngword,select:0}))
        return
      }
      if(new Blob([value]).size>QuillSettings.blobSize){
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
    }else if(res.data.status===490){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message490,select:0}))
    }else if(res.data.status===491){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message491,select:0}))
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
          {/* {quillLoaded&&( */}
            <ReactQuill
            className = "reviews_modal_quill"
            ref={quillref}
            // ref='editor'
            modules={modules} value={ value.replace(/(\s+){2,}/g," ").replace(/(<p>\s+<\/p>){1,}/g,"<p><br></p>").replace(/(<p><\/p>){1,}/g,"<p><br></p>").replace(/(<p><br><\/p>){2,}/g,"<p><br></p>")} 
            // theme="bubble" 
            theme="bubble"
            readOnly={true}
          />

          {/* )} */}
          {/* <ReactQuill
            className = "reviews_modal_quill"
            ref={quillref}
            // ref='editor'
            modules={modules} value={ value.replace(/(\s+){2,}/g," ").replace(/(<p>\s+<\/p>){1,}/g,"<p><br></p>").replace(/(<p><\/p>){1,}/g,"<p><br></p>").replace(/(<p><br><\/p>){2,}/g,"<p><br></p>")} 
            // theme="bubble" 
            theme="bubble"
            readOnly={true}
            
          /> */}

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