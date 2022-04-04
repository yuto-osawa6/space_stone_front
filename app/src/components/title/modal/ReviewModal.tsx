import { Button,  FormControl,  FormHelperText,  InputLabel,  MenuItem,  Modal, Select, SelectChangeEvent, Slider, TextField, Tooltip } from "@mui/material";
import { styled } from '@mui/material/styles';
import { OpenReviewContext, OpenScoreContext } from "contexttype/contexttype";
import { execCreateReview, execScoreCreate, execScoreUpdate } from "lib/api/products";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
// import { Quill } from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { IoMdClose } from "react-icons/io"
import { emotionList, product, productReviews, userReview } from "interfaces/product";
import { review } from "interfaces/review";
// import { ngword } from "hook/NgWord";
import { pussingMessageDataAction } from "store/message/actions";
// import { ErrorMessage } from "share/message";
import { TailSpin } from "react-loader-spinner";
import { ngword } from "lib/ini/ngWord";
import { ErrorMessage } from "lib/ini/message";
import { submitSpin } from "lib/color/submit-spin";
import dynamic from "next/dynamic";
// const ReactQuill = dynamic(() => from("react-quill"), { ssr: false });
// const Quill = dynamic(() => import("react-quill"), { ssr: false });

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

// const ReactQuill = dynamic(import('react-quill'), { 
//   ssr: false,
//   })
// let ReactQuill:any;
// if(window != undefined){
//   ReactQuill = require("react-quill")
// }


// const icons = Quill.import('ui/icons');
// icons.tag = "#";
// icons.hash = "#"

// let Block = Quill.import('blots/block');
// let TextBlot = Quill.import('blots/text');
// let Inline = Quill.import('blots/inline');
// let Embed = Quill.import('blots/embed');

// // doneyet (tag機能)

// class QuillHashtag extends Embed {
//   static create(value:any) {
//     console.log(value)
//     let node = super.create(value);
//     node.innerHTML = `<span>#${value}</span>`;
//     return node;
//   }
// }

// QuillHashtag.blotName = 'hashtag'; 
// QuillHashtag.className = 'quill-hashtag';
// QuillHashtag.tagName = 'span';

// export class TagBlot extends Inline {
//   static blotName = 'tag';
//   static className = 'aur-tag';
//   static tagName = 'span';
//   static contentEditable = 'false';

//   static formats(): boolean {
//     return true;
//   }
// }

// Quill.register(TagBlot);
// Quill.register(QuillHashtag);


type Props = {
  product_id:number | undefined
  user_id:number
  product:product | undefined
  userReview: userReview[]
  setUserReview: React.Dispatch<React.SetStateAction<userReview[]>>
  setEmotionLists: React.Dispatch<React.SetStateAction<emotionList[]>>
  setProductReviews: React.Dispatch<React.SetStateAction<productReviews[]>>
}

type episord = {
  arasuzi: string
  episord: number
  id: number | null
  image: string
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

export const ReviewModal:React.FC<Props> = (Props) => {

  const imageHandlerLink = () => {
    var range = quillref.current.getEditor().getSelection();
    if (range==null)return 
    var value = prompt('画像URLを入力してください');
    if(value){
      quillref.current.getEditor().insertEmbed(range.index, 'image', value);
      // quillref.current.g
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

  console.log(Props.product)
  const {openreview, setOpenreview} = useContext(OpenReviewContext)
  const user = useSelector((state: RootState) => state.user);
  const handleClose = () => {
  }
  const closehandle = () =>{setOpenreview(false)}



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
    // if (quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length<10){
    //   setHelpertextradio(`10文字以上で入力してください 文字数${quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length}`)
    //   // dispatch(pussingMessageDataAction({title:ErrorMessage.tenover,select:0}))
    // }else if(quillref.current.getEditor().getLength()>=20000){
    //   setHelpertextradio(`20,000文字以内で入力してください 文字数${quillref.current.getEditor().getText().length}`)
    //   // dispatch(pussingMessageDataAction({title:ErrorMessage.twodown,select:0}))
    // } 
    // else{
    // setHelpertextradio("")
    // }
  }
  // const handleChangetext = (e: React.ChangeEvent<HTMLInputElement>) =>{
  //   setText(e.target.value)
  //   console.log(e.target.value)
  // }
  const [emotions,setEmotions] = useState<string[]>([])
  const [submitLoading,setSubmitLoading] = useState<boolean>(false)
  const dispatch = useDispatch()
  const handlesubmit = async() => {
    const blob = new Blob([value])
    console.log(blob)
    const text_all = quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "")
    const validationText = quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length
    if ( validationText < 10){
      // setHelpertextradio(`10文字以上で入力してください 文字数${quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length}`)    
      dispatch(pussingMessageDataAction({title:ErrorMessage.tenover,select:0}))
      return
    }
    // check(バイト数制限どこまでにするか)
    if ( blob.size  > 100000){
      // setHelpertextradio(`サイズが大きすぎます`)
      dispatch(pussingMessageDataAction({title:ErrorMessage.tenover,select:0}))
      return
    }
    if ( quillref.current.getEditor().getText().length > 20000){
      // setHelpertextradio(`サイズが大きすぎます`)
      dispatch(pussingMessageDataAction({title:ErrorMessage.byteSize,select:0}))
      return
    }
     // ngword
    if(ngword.some((ngWord) => text_all.includes(ngWord))){
      // setHelpertextradio(`使用できない文字が含まれています`)
      dispatch(pussingMessageDataAction({title:ErrorMessage.ngword,select:0}))
      return
    }
    if (typeof Props.product_id === 'undefined') return
    // 2.0
    if (episordValue==undefined){
      setErrorEpisordValue(true)
      // setValidationTextEpisordValue("エピソードが選択されていません")
      dispatch(pussingMessageDataAction({title:ErrorMessage.episordSelect,select:0}))
      return
    }
    setSubmitLoading(true)
    const value_text= value.replace(/(\s+){2,}/g," ").replace(/(<p>\s+<\/p>){1,}/g,"<p><br></p>").replace(/(<p><\/p>){1,}/g,"<p><br></p>").replace(/(<p><br><\/p>){2,}/g,"<p><br></p>")
    const res = await execCreateReview(episordValue,text,value_text,quillref.current.getEditor().getText(0,50).replace(/\r?\n/g, '')+"...",Props.product_id,Props.user_id,emotions)
    if(res.data.status===200){
      console.log(res)
      Props.setUserReview(res.data.userReview)
      Props.setEmotionLists(res.data.emotionLists)
      Props.setProductReviews(res.data.productReviews)
      setOpenreview(false)
      dispatch(pussingMessageDataAction(res.data.message))
    }else if(res.data.status===440){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message440,select:0}))
    }else if(res.data.status===450){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message450,select:0}))
    }else{
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    }
    setSubmitLoading(false)

  }
  // episord
  const [episordValue, SetEpisordValue] = useState<string>()
  const [errorEpisordValue,setErrorEpisordValue] = useState<boolean>(false)
  const [validationTextEpisordValue, setValidationTextEpisordValue] = useState<string>("")


  const handleChangeEpisord = (event: SelectChangeEvent) => {
    console.log(event.target)
    SetEpisordValue(event.target.value as string);
  
  }
  // userEpisord----------------------------------------------------------------------------
  const [userEpisord,setUserEpisord] = useState<episord[]>([])
  // const [episord,setEpisord] = usestate<episord[]>([])
  const handleSetUp = () => {
    if(Props.product == undefined)return
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
    setUserEpisord(Props.product.episords.filter(i=>array.includes(i.id)==false))
    // console.log(Props.product.episords)
    // console.log(Props)
    // console.log(Props.product.episords.filter(i=>array.includes(i.id)==false))
    
  }

  useEffect(()=>{
    handleSetUp()
  },[Props.product])
  // emotions---------------------------------------------------------------
  // const [emotions,setEmotions] = useState<selectOption[]>([])
  // const [emotionsIdList,setEmotionsIdList] = useState<selectOption[]>([])

  // const handleChangeEmotionValue = (value:any) => {
  //   setEmotionsIdList(value)
  // }

  // const [emotions,setEmotions] = useState<string[]>([])
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
   
  return(
    <>
     <Modal
        open={openreview}
        onClose={handleClose}
        // onClose={false}
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
            style={{outline:"none"}}
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
             {/* <TextField
              className="TheredModalInputText"
              fullWidth 
              // error={inputError}
              inputProps={{ maxLength: 20, pattern: "^[a-zA-Z0-9_]+$" }}
              // inputRef={inputRef}
              placeholder="タイトルを入力してください"
              defaultValue=""
              id="outlined-basic"
              label="Title"
              variant="outlined"
              // helperText={inputRef?.current?.validationMessage}
              // helperText={validatetext}
              onChange={handleChangetext}
              /> */}
               <FormControl fullWidth className="selectLabel" size="small">
              <InputLabel id="demo-simple-select-label">Episord(*必須)</InputLabel>
              <Select
                // value={episordValue}
                label="Episord(*必須)"
                onChange={handleChangeEpisord}
                error={errorEpisordValue}
                size="small"
                // defaultValue={}
              >
                {/* <MenuItem value={""}>指定なし</MenuItem> */}
                {/* {Props.product?.episords.map((item)=>{
                  return(
                      <MenuItem key={item.id} value={String(item.id)}>{`episord${item.episord} ${item.title}`}</MenuItem>
                  )
                })} */}
                {userEpisord.map((item)=>{
                  return(
                      <MenuItem key={item.id} value={String(item.id)}>{item.id==null?"ALL":`episord${item.episord} ${item.title}`}</MenuItem>
                  )
                })}


              </Select>
              </FormControl>
            {/* <FormHelperText className = "helpertexts">{helpertextradio}</FormHelperText> */}
            {/* <Select
              placeholder={"Emotion Select..."}
              options={Props.product?.emotions} 
              closeMenuOnSelect={false}
              isMulti
              value={emotionsIdList}
              // components={animatedComponents}
              onChange={handleChangeEmotionValue}
              styles={{ menu: (provided, state) => ({ ...provided, zIndex: 10 }) }}
            /> */}

            <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Emotions(*最大3つ)</InputLabel>
            <Select
              error={emotionError}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={emotions}
              multiple
              // multiple
              label="Emotions(*最大3)"
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
      </Modal>
    </>
  )
}