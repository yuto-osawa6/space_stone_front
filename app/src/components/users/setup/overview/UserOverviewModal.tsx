import { Button, FormControl, FormHelperText, Modal, TextField } from "@mui/material"
// import { ngword } from "hook/NgWord"
import { execCreateOverviewToUser } from "@/lib/api/users"
import { ErrorMessage } from "@/lib/ini/message"
import { ngword } from "@/lib/ini/ngWord"
import { useMemo, useRef, useState } from "react"
import { IoMdClose } from "react-icons/io"
// import ReactQuill from "react-quill"
import { useDispatch, useSelector } from "react-redux"
// import { ErrorMessage } from "share/message"
import { RootState } from "@/store"
import { pussingMessageDataAction } from "@/store/message/actions"
import { updateOverviewAction } from "@/store/user/actions"
import { useUser } from "@/lib/data/user/useUser"
import { mutate } from "swr"


const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;


type Props = {
  on:boolean
  setOn:React.Dispatch<React.SetStateAction<boolean>>
}

export const UserOverviewModal:React.FC<Props> = function UserOverviewModal(Props){
  const dispatch = useDispatch()
  // 
  const closeHandler = () => Props.setOn(false)

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
      [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
      ["image"],
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


  // const user = useSelector((state: RootState) => state.user);
  const {userSwr} = useUser()
  const user = userSwr

  // 
  const [value,setValue] = useState<string>(user.user.overview)
  const [text,setText] = useState<string>("")
  const [value2,setText2] = useState<string>("")

  const [helpertextradio,setHelpertextradio] = useState<string>("")

  const [discribe,setDiscribe] = useState<string>("")
  const quillref  = useRef<any>(null!)
  // const dispatch = useDispatch()

  const handleChange = (content: string):void | undefined => {
    const ss = quillref.current.getEditor().getText(0,20)
    const ss2 = quillref.current.getEditor().getLength()

    setValue(content)
    
    if(quillref.current.getEditor().getLength()>=2000){
      dispatch(pussingMessageDataAction({title:ErrorMessage.ngword,select:0}))
    } 
    else{
    setHelpertextradio("")
    }
  }

  const handlesubmit = async() => {
    const validationText = quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length
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
    
    // setLoding(true)
    const value_text= value.replace(/(\s+){2,}/g," ").replace(/(<p>\s+<\/p>){1,}/g,"<p><br></p>").replace(/(<p><\/p>){1,}/g,"<p><br></p>").replace(/(<p><br><\/p>){2,}/g,"<p><br></p>")
    const res = await execCreateOverviewToUser(user.user.id,value_text.replaceAll("<p><br></p><p><br></p><p><br></p>", ""))
    if(res.status===200){
    console.log(res)
    mutate('/session_user')
    // dispatch(updateOverviewAction(user.user,res.data.overview))
    dispatch(pussingMessageDataAction({title:"概要を更新しました。",select:1}))
    closeHandler()
    }else{
      // doneyet(エラー確認していない)
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    }

  }

  return(
    <>
      <Modal
        open={Props.on}
        onClose={closeHandler}
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
          {text}
          </div>
          <ReactQuill
            className = "reviews_modal_quill"
            
            ref={quillref}
            // ref='editor'
            modules={modules} value={value!=undefined?value.replace(/(\s+){2,}/g," ").replace(/(<p>\s+<\/p>){1,}/g,"<p><br></p>").replace(/(<p><\/p>){1,}/g,"<p><br></p>").replace(/(<p><br><\/p>){2,}/g,"<p><br></p>"):value} 
            // theme="bubble" 
            theme="bubble"
            readOnly={true}
            
          />

        </div>
          <div className = "modal_review_richtext">
            
          <div className = "modalCloseButton">
            <div className = "modalReviewTitle">
              概要を作成
            </div>
            <Button variant="outlined"
              className = "modal_review_richtext_close"
              onClick = {closeHandler}
            >
              <IoMdClose/>
              閉じる
            </Button>

            </div>
             
              
            <FormHelperText className = "helpertexts">{helpertextradio}</FormHelperText>
            <ReactQuill
            // placeholder="10~10000文字"
            className = "reviews_modal_quill"
            ref={quillref}
            modules={modules} value={value} onChange={handleChange}  
            theme="snow"
            />
            
            <Button variant="contained"
            onClick={handlesubmit}
            >Submit
            </Button>
            

          </div>
        </>

      </Modal>
     
    </>
  )
}