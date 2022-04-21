import { Button,  FormHelperText,  Modal, Slider, TextField, Tooltip } from "@mui/material";
import { styled } from '@mui/material/styles';
import { OpenScoreContext, OpenTheredContext } from "@/contexttype/contexttype";
import { execCreateThered, execScoreCreate, execScoreUpdate } from "@/lib/api/products";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
// import ReactQuill from "react-quill";

// mui
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { productThreads } from "@/interfaces/product";
import { useDispatch } from "react-redux";
import { pussingMessageDataAction } from "@/store/message/actions";
import { TailSpin } from "react-loader-spinner";

import { ngword } from "@/lib/ini/ngWord";
import { ErrorMessage } from "@/lib/ini/message";
import { submitSpin } from "@/lib/color/submit-spin";
import dynamic from "next/dynamic";
// const ReactQuill:any = dynamic(() => import("react-quill"), { ssr: false });
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type Props = {
  product_id:number | undefined
  user_id:number
  question:[{
    id:number
    question:string
  }]| undefined
  // score:number | null
  // score_id:number | null
  setProductThreads: React.Dispatch<React.SetStateAction<productThreads[]>>
}

export const TheredModal:React.FC<Props> = (Props) => {
  const {openthered, setOpenthered} = useContext(OpenTheredContext)
  const handleClose = () => setOpenthered(false)


  const [value,setValue] = useState<string>("")
  const [text,setText] = useState<string>("")
  const [value2,setText2] = useState<string>("")

  const [discribe,setDiscribe] = useState<string>("")
  const quillref  = useRef<any>(null!)

  const [helpertextradio,setHelpertextradio] = useState<string>("")

  // quesiton ids 
  // const [question_ids,setQuestion_ids] = useState<number[]>([])
  const [question_ids,setQuestion_ids] = useState<string[]>([])

  // validation
  const [validatetext,setValidatetext] = useState<string>("")
  // const inputRef = useRef(null);
  const [inputError,setInputError] = useState<boolean>(false)



  const handleChange = (content: string):void | undefined => {
    // console.log(quillref.current.getEditor().getText(0,20).replace(/\r?\n/g, ''))
    const ss = quillref.current.getEditor().getText(0,20)
    const ss2 = quillref.current.getEditor().getLength()

    setValue(content)

    // if (quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length<10){
    //   setHelpertextradio(`10文字以上で入力してください 文字数${quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length}`)
    // }else if(quillref.current.getEditor().getLength()>=2000){
    //   setHelpertextradio(`2000文字以内で入力してください 文字数${quillref.current.getEditor().getText().length}`)
    // } 
    // else{
    // setHelpertextradio("")
    // }

  }

  const handleChangetext = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setText(e.target.value)
    console.log(e.target.value)
    setValidatetext("")
    setInputError(false)
    // if (inputRef.current) {
    //   const ref = inputRef.current;
    //   console.log(ref)
      // if (!ref.validity.valid) {
      //   setInputError(true);
      // } else {
      //   setInputError(false);
      // }
    // }
  }

  // const  setDiscribehandle = () => {
  //   setDiscribe(quillref.current.getEditor().getText(0,20).replace(/\r?\n/g, ''))
  // }
  const [nonhelpertextradio,setNonhelpertextradio] = useState<string>("")
  const dispatch = useDispatch()
  const [submitLoading,setSubmitLoading] = useState<boolean>(false)
  const handlesubmit = async() => {
    // validation
    // console.log(validatetext)
    // console.log(text.length)
      // if (text.length===0){
      //   setValidatetext("タイトルを入力してください。")
      //   setInputError(true)
      //   return
      // }
      const validationText = quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length
      if ( validationText < 10){
        // setHelpertextradio(`10文字以上で入力してください 文字数${quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length}`)
        dispatch(pussingMessageDataAction({title:ErrorMessage.tenover,select:0}))
        
        return
      }
      const text_all = quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "")
      if(ngword.some((ngWord) => text_all.includes(ngWord))){
        // setHelpertextradio(`使用できない文字が含まれています`)
        dispatch(pussingMessageDataAction({title:ErrorMessage.ngword,select:0}))

        return
      }
      // doneyet(バイト数制限)
      const blob = new Blob([value])
      if ( blob.size  > 100000){
        // setHelpertextradio(`サイズが大きすぎます`)
        dispatch(pussingMessageDataAction({title:ErrorMessage.byteSize,select:0}))
        return
      }
      if ( quillref.current.getEditor().getText().length > 2000){
        // setHelpertextradio(`20,00文字以内で入力してください 文字数${quillref.current.getEditor().getText().length}`)
        dispatch(pussingMessageDataAction({title:ErrorMessage.twodown,select:0})) 
        return
      }
      
    setSubmitLoading(true)
    const value_text= value.replace(/(\s+){2,}/g," ").replace(/(<p>\s+<\/p>){1,}/g,"<p><br></p>").replace(/(<p><\/p>){1,}/g,"<p><br></p>").replace(/(<p><br><\/p>){2,}/g,"<p><br></p>")
    if (typeof Props.product_id === 'undefined') return
    const res = await execCreateThered(text,value_text,quillref.current.getEditor().getText(0,50).replace(/\r?\n/g, '')+"...",Props.product_id,Props.user_id,question_ids)
    if(res.data.status===200){
      console.log(res)
      Props.setProductThreads(res.data.productThreads)
      setOpenthered(false)
      dispatch(pussingMessageDataAction(res.data.message))
    }else{
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    }
    setSubmitLoading(false)
  }
  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

  // useEffect(()=>{
  //   names.push(Props.question.question)
  // },[Props.question.question])
 



  const [personName, setPersonName] = useState<string[]>([]);

  const handleChangemui = (event: SelectChangeEvent<typeof personName>) => {
    console.log(event)

    const {
      target: { value },
    } = event;
    console.log(personName)
    console.log(event)
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    
    



  };

  
   useEffect(()=>{
      // const array:number[] = []
      const array:string[] = []

      personName.map((item)=>{
        if(typeof Props.question === "undefined" )return
        console.log(Props.question.findIndex(({question}) => question === item))
        const arraynumber = Props.question?.findIndex(({question}) => question === item)
        array.push(String(Props.question[arraynumber].id))
      })

      // quillInsertQuestions()
      console.log(array)
      setQuestion_ids(array)


  },[personName])


  // const quillInsertQuestions = () => {
  //   // const editor = quillref.current.getEditor()
  //   // const ss = quillref.current.getEditor().getText(0,20)
  //   if (quillref.current === null) return
  //   const editor = quillref.current.getEditor()
  //   console.log(quillref.current)
  //   personName.map((item)=>{
  //     // editor.setContents(delta,`<div className = "ailis">${item}</div>`)
  //     // const value444 = 
  //   })
  //   const randray:string[] = personName.map((item)=>{
  //     // item
  //     return `<div>${item}</div>`
  //   })

   
  //   console.log(randray.length)
  //   const value333 = `<h3>${randray.map((item)=>{return item})}</h3>`.replaceAll(",","")
    
  //   console.log(insertHtmlquill())
    // const delta = editor.clipboard.convert(value333)
  //   const delta2 = editor.clipboard.convert("aaaaaaaa")
  //     editor.updateContents(delta,"silent")
  //     console.log(editor)
  //     editor.removeFormat(0,30)
  //     console.log(editor.root.innerHTML)
  // doneyet(多分厳しい)
  // }

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

  
  
   
  return(
    <>
     <Modal
        open={openthered}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
        
        <div className = "modal_review_richtext_preview"
        style={{lineHeight: "1.42"}}
        >
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
          <div className = "modal_review_richtext_preview_questions"
          style={{margin:"0px"}}
          >
            {personName.map((item,index)=>{
              return(
                <>
                <div className = "questionList" key={index}>
                  {item}
                </div>
              </>
              )
            })}
          </div>
          <ReactQuill 
            className = "reviews_modal_quill  preview_quill"
            style={{paddingTop: "10px"}}
            // ref={quillref}
            // ref='editor'
            modules={modules} value={value!=undefined?value.replace(/(\s+){2,}/g," ").replace(/(<p>\s+<\/p>){1,}/g,"<p><br></p>").replace(/(<p><\/p>){1,}/g,"<p><br></p>").replace(/(<p><br><\/p>){2,}/g,"<p><br></p>"):value} 
            // theme="bubble" 
            theme="bubble"
            readOnly={true}
            
          />

        </div>
          <div className = "modal_review_richtext">
            
            {/* <div className = "modal_review_richtext_close"
            onClick={handleClose}
            >
            <IoMdClose/>
              閉じる
            </div> */}
            <div className = "modalCloseButton">
            <div className = "modalReviewTitle">
              Threadを作成
            </div>
            <Button variant="outlined"
              className = "modal_review_richtext_close"
              onClick = {handleClose}
            >
              <IoMdClose/>
              閉じる
            </Button>
            </div>
            {/* Title */}
            {/* {text.length === 0&&
                  <>
                    {validatetext}
                  </>

                  }
            <input type="text"
            onChange = {handleChangetext}
            placeholder="タイトルを入力してください.(必須ではありません。)"
            /> */}

               <TextField 
                  className="TheredModalInputText"
                  fullWidth 
                  error={inputError}
                  inputProps={{ maxLength: 40, pattern: "^[a-zA-Z0-9_]+$" }}
                  // inputRef={inputRef}
                  placeholder="タイトルを入力してください（*40文字以内）"
                  defaultValue=""
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  size="small"
                  // helperText={inputRef?.current?.validationMessage}
                  helperText={validatetext}
                  onChange={handleChangetext}
                />
            <div>
            <FormControl sx={{ m: 1, width: 300 }} style={{margin:"0px 0px 20px 0px"}} size="small">
              <InputLabel id="demo-multiple-checkbox-label">Sample</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={personName}
                size="small"
                onChange={handleChangemui}
                input={<OutlinedInput label="Sample" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
      
                 {Props.question?.map((item) => (
                  <MenuItem key={item.id} value={item.question}>
                    <Checkbox checked={personName.indexOf(item.question) > -1} value={item.id} />
                    <ListItemText primary={item.question} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            </div>

            {/* Title
            <input type="text"
            onChange = {handleChangetext}
            placeholder="タイトルを入力してください.(必須ではありません。)"
            /> */}
            
            <ReactQuill 
            className = "reviews_modal_quill"
            // style={{paddingTop: "10px"}}
            ref={quillref}
            // ref='editor'
            modules={modules} value={value} onChange={handleChange}  
            // theme="bubble" 
            theme="snow"
            
            />
             <FormHelperText className = "helpertexts">{helpertextradio}</FormHelperText>
             {/* <FormHelperText className = "helpertexts">{nonhelpertextradio}</FormHelperText> */}
            <Button variant="contained"
              // className = "TheredModalButton"
              className={"tail-spin-loading"}
              onClick = {handlesubmit}
            >Submit
             {submitLoading==true&&(
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