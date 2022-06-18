import { Button,  FormControl,  FormHelperText,  InputLabel,  MenuItem,  Modal, Select, SelectChangeEvent, Slider, TextField, Tooltip } from "@mui/material";
import { styled } from '@mui/material/styles';
import { OpenReviewContext, OpenScoreContext } from "@/contexttype/contexttype";
import { execCreateReview, execScoreCreate, execScoreUpdate, execUpdateReview } from "@/lib/api/products";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
// import { Quill } from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { IoMdClose } from "react-icons/io"
import { emotionList, product, productReviews, userReview } from "@/interfaces/product";
import { review } from "@/interfaces/review";
// import { ngword } from "hook/NgWord";
import { TailSpin } from "react-loader-spinner";
// import { submitSpin } from "color/submit-spin";
// import { ErrorMessage } from "share/message";
import { pussingMessageDataAction } from "@/store/message/actions";
// import { ngword } from "lib/ini/NgWord";
import { ErrorMessage } from "@/lib/ini/message";
import { submitSpin } from "@/lib/color/submit-spin";
import { ngword } from "@/lib/ini/ngWord";
import dynamic from "next/dynamic";
// import Quill from "quill";
// const ReactQuill:any = dynamic(() => import("react-quill"), { ssr: false });
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;
const Quill =
  typeof window === "object" ? require("react-quill").Quill : () => false;
// const Quill:any = dynamic(() => import("react-quill"), { ssr: false });
// const Quill =
//   typeof window === "object" ? require("react-quill") : () => false;
// import  (Select as Reeee from 'react-select'
// import Select, { InputActionMeta } from 'react-select'

if(typeof window === "object"){
const icons = Quill.import('ui/icons');
icons.tag = "#";
icons.hash = "#"

let Block = Quill.import('blots/block');
let TextBlot = Quill.import('blots/text');
let Inline = Quill.import('blots/inline');
let Embed = Quill.import('blots/embed');

// doneyet (tag機能)

class QuillHashtag extends Embed {
  static create(value:any) {
    console.log(value)
    let node = super.create(value);
    node.innerHTML = `<span>#${value}</span>`;
    return node;
  }
}

QuillHashtag.blotName = 'hashtag'; 
QuillHashtag.className = 'quill-hashtag';
QuillHashtag.tagName = 'span';

  class TagBlot extends Inline {
  static blotName = 'tag';
  static className = 'aur-tag';
  static tagName = 'span';
  static contentEditable = 'false';

  static formats(): boolean {
    return true;
  }
}

Quill.register(TagBlot);
Quill.register(QuillHashtag);
}

type Props = {
  product_id:number | undefined
  user_id:number
  product:product | undefined
  userReview: userReview[]
  setUserReview: React.Dispatch<React.SetStateAction<userReview[]>>

  editOpenModal:boolean
  setEditOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  setEmotionLists: React.Dispatch<React.SetStateAction<emotionList[]>>
  setProductReviews: React.Dispatch<React.SetStateAction<productReviews[]>>
}

type episord = {
  arasuzi: string
  episord: number
  id: number | null
  image: string
  // productId:number
  season: number
  seasonTitle: string
  time: Date | undefined
  title: string
  releaseDate:string
}

type selectOption = {
  value: string;
  label: string;
}
// -------------------------------------------------------------------------------------------------------------
export const EditReviewModal:React.FC<Props> = function EditReviewModalFunc(Props){

  const imageHandlerLink = () => {
    var range = quillref.current.getEditor().getSelection();
    if (range==null)return 
    var value = prompt('画像URLを入力してください');
    if(value){
      quillref.current.getEditor().insertEmbed(range.index, 'image', value);
    }
  }
  const  videoHandlerLink = () => {
    var range = quillref.current.getEditor().getSelection();
    if (range==null)return 
    var value = prompt('VIDEO URLを入力してください');
    if(value){
      quillref.current.getEditor().insertEmbed(range.index, 'video', value);
    }
  }

  const tagHandler = () => {
    const editor = quillref.current.getEditor()
    const range = editor.getSelection();
    const value3333 = `<span class ="aur-tag" contentEditable="false">#netflixでみる00</span>`
    console.log(value3333)

    if (range==null)return
    const delta = editor.clipboard.convert(value3333)
    let [leaf, offset] = editor.getLeaf(range.index);
    console.log(leaf)

    if (leaf.parent.children.constructor.className == "aur-tag"){
      const length = editor.getLength();
      console.log(length)

    }else{
    console.log(value3333)
    editor.clipboard.dangerouslyPasteHTML(range.index,value3333)

    }
  }

  const hashHandler = () => {
    const editor = quillref.current.getEditor()
    const range = editor.getSelection();
  if (range) {
    const hashtag = prompt("Select hashtag", "foobar");
    if (hashtag==null)return
    console.log(hashtag)
    editor.insertEmbed(0, 'hashtag', hashtag);
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
    },
  }

  }
  ),[])

  // --------------------------------------------------------------------------------------------------------

  // const {openreview, setOpenreview} = useContext(OpenReviewContext)
  const user = useSelector((state: RootState) => state.user);
  const handleClose = () => {
    // setOpenreview(false);
  }
  const closehandle = () =>{Props.setEditOpenModal(false)}



  // 
  const [value,setValue] = useState<string>("")
  const [text,setText] = useState<string>("")
  const [value2,setText2] = useState<string>("")

  const [helpertextradio,setHelpertextradio] = useState<string>("")

  const [discribe,setDiscribe] = useState<string>("")
  const quillref  = useRef<any>(null!)


  const handleChange = (content: string):void | undefined => {
    const ss = quillref.current.getEditor().getText(0,20)
    const ss2 = quillref.current.getEditor().getLength()
    setValue(content)
    console.log(content)
    console.log(ss2)
    // if (quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length<10){
    //   setHelpertextradio(`10文字以上で入力してください 文字数${quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length}`)
    // }else if(quillref.current.getEditor().getLength()>=20000){
    //   setHelpertextradio(`20,000文字以内で入力してください 文字数${quillref.current.getEditor().getText().length}`)
    // } 
    // else{
    // setHelpertextradio("")
    // }
  }


  const [emotions,setEmotions] = useState<string[]>([])
  const [editReview,setEditReview] = useState<userReview>()
  const [submitLoading,setSubmitLoading] = useState<boolean>(false)
  const dispatch = useDispatch()
  const handlesubmit = async() => {
    const blob = new Blob([value])
    const text_all = quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "")
    const validationText = quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length
    if ( validationText < 10){
      // setHelpertextradio(`10文字以上で入力してください 文字数${quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length}`)
      dispatch(pussingMessageDataAction({title:ErrorMessage.tenover,select:0})) 
      
      return
    }
    // doneyet-1(バイト数制限)
    if ( blob.size  > 100000){
      dispatch(pussingMessageDataAction({title:ErrorMessage.byteSize,select:0})) 
      return
    }
    if ( quillref.current.getEditor().getText().length > 20000){
      dispatch(pussingMessageDataAction({title:ErrorMessage.twodown,select:0})) 
      return
    }

     // ngword
    if(ngword.some((ngWord) => text_all.includes(ngWord))){
      dispatch(pussingMessageDataAction({title:ErrorMessage.ngword,select:0})) 
    
      return
    }
    
    if (typeof Props.product_id === 'undefined') return
    if (editReview == undefined) return
    // 2.0
    if (episordValue==undefined){
      setErrorEpisordValue(true)
      dispatch(pussingMessageDataAction({title:ErrorMessage.episordSelect,select:0})) 
      return
    }
    
    const value_text= value.replace(/(\s+){2,}/g," ").replace(/(<p>\s+<\/p>){1,}/g,"<p><br></p>").replace(/(<p><\/p>){1,}/g,"<p><br></p>").replace(/(<p><br><\/p>){2,}/g,"<p><br></p>")
    // episord_id
    setSubmitLoading(true)
    const res = await execUpdateReview(editReview.id,episordValue,text,value_text,quillref.current.getEditor().getText(0,50).replace(/\r?\n/g, '')+"...",Props.product_id,Props.user_id,emotions)
    if(res.data.status===200){
      console.log(res)
      Props.setUserReview(res.data.userReview)
      Props.setEditOpenModal(false)
      SetEpisordValue(undefined)
      Props.setEmotionLists(res.data.emotionLists)
      Props.setProductReviews(res.data.productReviews)
      dispatch(pussingMessageDataAction(res.data.message))
    }else if(res.data.status===440){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message440,select:0}))
    }else if(res.data.status===460){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message460,select:0}))
    }else{
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))

    }
    setSubmitLoading(false)
  }
  // episord----------------------------------------------------------------------------------
  const [episordValue, SetEpisordValue] = useState<string>()
  const [errorEpisordValue,setErrorEpisordValue] = useState<boolean>(false)
  const [validationTextEpisordValue, setValidationTextEpisordValue] = useState<string>("")


  const handleChangeEpisord = (event: SelectChangeEvent) => {
    console.log(event.target)
    SetEpisordValue(event.target.value as string);
  
  }
  // userEpisord----------------------------------------------------------------------------
  const [userEpisord,setUserEpisord] = useState<episord[]>([])
  const handleSetUp = () => {
    if(Props.product == undefined)return
    if(Props.product.episords[0]==undefined){
      Props.product.episords.unshift({
        arasuzi: "",
        episord: 0,
        id: null,
        image: "",
        season: 0,
        seasonTitle: "",
        time: undefined,
        title: ",",
        releaseDate:""
      })
      const array = Props.userReview.map(i=>i.episordId)
      setUserEpisord(Props.product.episords.filter(i=>array.includes(i.id)==false))
      if(Props.product.episords.length==1){
        SetEpisordValue("null");
      }
      return
      
    }
    if(Props.product.episords.length==1){
      SetEpisordValue("null");
    }
    if(Props.product.episords[0].id!=null){
      Props.product.episords.unshift({
        arasuzi: "",
        episord: 0,
        id: null,
        image: "",
        season: 0,
        seasonTitle: "",
        time: undefined,
        title: ",",
        releaseDate:""
      })
    }
    
    const array = Props.userReview.map(i=>i.episordId)
    setUserEpisord(Props.product.episords.filter(i=>array.includes(i.id)==true))
  }
  useEffect(()=>{
    handleSetUp()
  },[])
  // emotions---------------------------------------------------------------

  const [emotionValidationText,setEmotionValidationText] = useState<string>("")
  const [emotionError,setEmotionError] = useState<boolean>(false)

  const handleChangeEmotion = (e:SelectChangeEvent<string[]>) => {

    const {
      target: { value },
    } = e;
    if(value.length>3)return
    setEmotions(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setEmotionValidationText("")
    setEmotionError(false)
  }
  console.log(emotions)

  // episord select
  console.log(Props)
  console.log(episordValue)
  // -------------------------------------

  useEffect(()=>{
    if (episordValue==undefined) return
    console.log(Props.userReview.filter(i=>i.episordId==(episordValue=="null"?null:Number(episordValue))) )
    const alfaData = Props.userReview.filter(i=>i.episordId==(episordValue=="null"?null:Number(episordValue)))
    setEditReview(Props.userReview.filter(i=>i.episordId==(episordValue=="null"?null:Number(episordValue)))[0])
    // doneyet-1{下}
    console.log(value)
    // console.log(editReview?.content)
    // if(editReview==undefined)return
    setValue(alfaData[0].content)
    setEmotions(alfaData[0].emotions.map(i=>String(i.id)))
    console.log(alfaData[0])
  },[episordValue])
  //  console.log()
  return(
    <>
     <Modal
        open={Props.editOpenModal}
        onClose={handleClose}
        // onClose={false}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <>
        {episordValue==undefined?
        <>
        {Props.product&&Props.product.episords.length>1&&(
        <div className = "EditReviewModal">
        <p style={{marginBottom:"10px"}}>
        編集するエピソードを選んでください
        </p>
        <FormControl fullWidth className="selectLabel" size="small">
          <InputLabel id="demo-simple-select-label">Episord</InputLabel>
          <Select
            // value={episordValue}
            label="Episord"
            onChange={handleChangeEpisord}
            error={errorEpisordValue}
            size="small"
            // defaultValue={}
          >
            
            {userEpisord.map((item)=>{
              return(
                  <MenuItem key={item.id} value={String(item.id)}>{item.id==null?"ALL":`episord${item.episord} ${item.title}`}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <Button variant="outlined"
          className = "modal_review_richtext_close"
          onClick = {closehandle}
        >
          <IoMdClose/>
          閉じる
        </Button>
        </div>
        )}
        </>
        :
        <>
        <div className = "modal_review_richtext_preview">
          <div className = "modal_review_richtext_preview_title">
            Preview
          </div>
          {/* <div className = "modal_review_richtext_preview_title">
          <IoMdClose/>
            閉じる
          </div> */}
          {/* <div className = "modal_review_richtext_preview_text">
          {text}
          </div> */}
           <div className=""
          style={{
            display:"flex",
            gap:"10px",
            margin: "10px 0px",
            fontSize: "0.9rem"
          }}
          >
            {Props.product?.emotions.filter(i=>emotions.includes(String(i.id))).map((item)=>{
              return(
                <div key={item.id}
                style={{
                  padding: "5px",
                  backgroundColor: "#2bb1ac",
                  borderRadius: "5px",
                  color: "white"
                }}
                >{item.emotion}</div>
              )
            })}
          </div>
          <ReactQuill 
            className = "reviews_modal_quill preview_quill"
            
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
              Reviewを作成
            </div>
            <Button variant="outlined"
              className = "modal_review_richtext_close"
              onClick = {closehandle}
            >
              <IoMdClose/>
              閉じる
            </Button>

            </div>
               {/* <FormControl fullWidth className="selectLabel">
              <InputLabel id="demo-simple-select-label">Episord(必須)</InputLabel>
              <Select
                // value={episordValue}
                label="Episord(必須)"
                onChange={handleChangeEpisord}
                error={errorEpisordValue}
                size="small"
                // defaultValue={}
              >
               
                {userEpisord.map((item)=>{
                  return(
                      <MenuItem key={item.id} value={String(item.id)}>{item.id==null?"ALL":`episord${item.episord} ${item.title}`}</MenuItem>
                  )
                })}


              </Select>
              </FormControl> */}
            <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Emotions(*最大3つ)</InputLabel>
            <Select
              error={emotionError}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={emotions}
              multiple
              // multiple
              label="Emotions(*最大3つ)"
              onChange={handleChangeEmotion}
              size="small"
              style={{marginBottom:"20px"}}
            >
              {Props.product?.emotions.map((item,index)=>{
                return(
                <MenuItem value={String(item.id)} key={item.id}>{item.emotion}</MenuItem>
                )
              })}
            </Select>
            {/* <FormHelperText className = "helpertexts">{yearValidationText}</FormHelperText> */}
           </FormControl>

            <ReactQuill
            // placeholder="10~10000文字"
            className = "reviews_modal_quill"
            ref={quillref}
            // ref='editor'
            modules={modules} value={value} onChange={handleChange}  
            // theme="bubble" 
            theme="snow"
            
            />
            <FormHelperText className = "helpertexts">{helpertextradio}</FormHelperText>
            <FormHelperText className = "helpertexts">{validationTextEpisordValue}</FormHelperText>
            <Button variant="contained"
            className={"tail-spin-loading"}
            onClick = {handlesubmit}
            >Submit
            {submitLoading==true&&(
              <TailSpin color={submitSpin.color} height={20} width={20} />
            )}
            </Button>
            

          </div>
          </>
          }
        </>
      </Modal>
    </>
  )
}