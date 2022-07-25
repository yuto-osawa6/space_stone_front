import { Button,  FormHelperText,  Modal, Slider, TextField, Tooltip } from "@mui/material";
import { styled } from '@mui/material/styles';
import { OpenScoreContext, OpenTheredContext } from "@/contexttype/contexttype";
import { execCreateThered, execScoreCreate, execScoreUpdate } from "@/lib/api/products";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
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
import { QuillSettings } from "@/lib/ini/quill/QuillSettings";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { DefaultPaste } from "@/lib/ini/quill/QuillEffect";
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
  setProductThreads: React.Dispatch<React.SetStateAction<productThreads[]>>
}

export const TheredModal:React.FC<Props> = function TheredModalFunc(Props){
  DefaultPaste()
  const {openthered, setOpenthered} = useContext(OpenTheredContext)
  const handleClose = () => setOpenthered(false)
  const [value,setValue] = useState<string>("")
  const [text,setText] = useState<string>("")
  const [value2,setText2] = useState<string>("")
  const [discribe,setDiscribe] = useState<string>("")
  const quillref  = useRef<any>(null!)
  const [helpertextradio,setHelpertextradio] = useState<string>("")
  const [question_ids,setQuestion_ids] = useState<string[]>([])
  const [validatetext,setValidatetext] = useState<string>("")
  const [inputError,setInputError] = useState<boolean>(false)
  const handleChange = (content: string):void | undefined => {
    const ss = quillref.current.getEditor().getText(0,20)
    const ss2 = quillref.current.getEditor().getLength()
    setValue(content)
  }

  const handleChangetext = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setText(e.target.value)
    setValidatetext("")
    setInputError(false)
  }
  const [nonhelpertextradio,setNonhelpertextradio] = useState<string>("")
  const dispatch = useDispatch()
  const [submitLoading,setSubmitLoading] = useState<boolean>(false)
  const { executeRecaptcha } = useGoogleReCaptcha()
  const handlesubmit = async() => {
    // validation
    const validationText = quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length
    if ( validationText < QuillSettings.textLength){
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
    if ( blob.size  > QuillSettings.blobSizeMain){
      // setHelpertextradio(`サイズが大きすぎます`)
      dispatch(pussingMessageDataAction({title:ErrorMessage.byteSize,select:0}))
      return
    }
    // if ( quillref.current.getEditor().getText().length > 2000){
    //   // setHelpertextradio(`20,00文字以内で入力してください 文字数${quillref.current.getEditor().getText().length}`)
    //   dispatch(pussingMessageDataAction({title:ErrorMessage.twodown,select:0})) 
    //   return
    // }
    if (!executeRecaptcha) {
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
      return
    }
    const reCaptchaToken = await executeRecaptcha('ThreadModal');
    if(!reCaptchaToken){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
      return
    }
    setSubmitLoading(true)
    const value_text= value.replace(/(\s+){2,}/g," ").replace(/(<p>\s+<\/p>){1,}/g,"<p><br></p>").replace(/(<p><\/p>){1,}/g,"<p><br></p>").replace(/(<p><br><\/p>){2,}/g,"<p><br></p>")
    if (typeof Props.product_id === 'undefined') return
    const res = await execCreateThered(text,value_text,quillref.current.getEditor().getText(0,50).replace(/\r?\n/g, '')+"...",Props.product_id,Props.user_id,question_ids,reCaptchaToken)
    // console.log(res)
    if(res.data.status===200){
      Props.setProductThreads(res.data.productThreads)
      setOpenthered(false)
      dispatch(pussingMessageDataAction(res.data.message))
    }else if (res.data.status == 492){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message492,select:0}))
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
  const [personName, setPersonName] = useState<string[]>([]);
  const handleChangemui = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
   useEffect(()=>{
      // const array:number[] = []
      const array:string[] = []
      personName.map((item)=>{
        if(typeof Props.question === "undefined" )return
        const arraynumber = Props.question?.findIndex(({question}) => question === item)
        array.push(String(Props.question[arraynumber].id))
      })
      setQuestion_ids(array)
  },[personName])

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
      [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
      ["image"],
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
        open={openthered}
        onClose={handleClose2}
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
            modules={modules} value={value!=undefined?value.replace(/(\s+){2,}/g," ").replace(/(<p>\s+<\/p>){1,}/g,"<p><br></p>").replace(/(<p><\/p>){1,}/g,"<p><br></p>").replace(/(<p><br><\/p>){2,}/g,"<p><br></p>"):value} 
            theme="bubble"
            readOnly={true}
            
          />

        </div>
          <div className = "modal_review_richtext">
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
              <TextField 
                  className="TheredModalInputText"
                  fullWidth 
                  error={inputError}
                  inputProps={{ maxLength: 40, pattern: "^[a-zA-Z0-9_]+$" }}
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