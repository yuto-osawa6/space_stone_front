import { review } from "@/interfaces/review"
import { Button,  FormControl,  FormHelperText,  InputLabel,  MenuItem,  Modal, Select, SelectChangeEvent, Slider, TextField, Tooltip } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { execGetEmotionList } from "@/lib/api/main";
import { product } from "@/interfaces/product";
import { execUpdate2Review, execUpdateReview } from "@/lib/api/products";
import { useDispatch } from "react-redux";
import { updateReviewAction } from "@/store/reviewUpdate/actions";
import { pussingMessageDataAction } from "@/store/message/actions";
import { TailSpin } from "react-loader-spinner";
import { ngword } from "@/lib/ini/ngWord";
import { ErrorMessage } from "@/lib/ini/message";
import { submitSpin } from "@/lib/color/submit-spin";
import { QuillSettings } from "@/lib/ini/quill/QuillSettings";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

type Props = {
  review:review
  product: product | undefined
  open:boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setReview: React.Dispatch<React.SetStateAction<review | undefined>>
  setProduct: React.Dispatch<React.SetStateAction<product | undefined>>
}
type emotion = {
  id:number
  emotion:string
}

export const EditReviewModal2:React.FC<Props> = function EditReviewModal2Func(Props){
  const [emotionsList,setEmotionsList] = useState<emotion[]>([])
  const handleFirst = async() => {
    const res = await execGetEmotionList()
    if (res.status == 200){
      setEmotionsList(res.data.emotionList)
    }else{
    }
  } 
  useEffect(()=>{
    handleFirst()
  },[])
  // -------------------------------------------------------------

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
    ],
    handlers: {
    },
  }
  }
  ),[])
  // -----------------------------------------------------------
  const [value,setValue] = useState<string>(Props.review.content)
  const [text,setText] = useState<string>("")
  const [value2,setText2] = useState<string>("")
  const [helpertextradio,setHelpertextradio] = useState<string>("")
  const [discribe,setDiscribe] = useState<string>("")
  const quillref  = useRef<any>(null!)
  const handleChange = (content: string):void | undefined => {
    const ss = quillref.current.getEditor().getText(0,20)
    const ss2 = quillref.current.getEditor().getLength()
    setValue(content)
  }

  const [emotions,setEmotions] = useState<string[]>(Props.review.reviewEmotions.map(i=>String(i.id)))
  const dispatch = useDispatch()
  const [submitLoading,setSubmitLoading] = useState<boolean>(false)
  const { executeRecaptcha } = useGoogleReCaptcha()
  const handlesubmit = async() => {
    const blob = new Blob([value])
    const text_all = quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "")
    const validationText = quillref.current.getEditor().getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length
    if ( validationText < QuillSettings.textLength){
      dispatch(pussingMessageDataAction({title:ErrorMessage.tenover,select:0})) 
      return
    }
    if ( blob.size  > QuillSettings.blobSizeMain){
      dispatch(pussingMessageDataAction({title:ErrorMessage.byteSize,select:0})) 
      return
    }
     // ngword
    if(ngword.some((ngWord) => text_all.includes(ngWord))){
      dispatch(pussingMessageDataAction({title:ErrorMessage.ngword,select:0})) 
      return
    }
    const value_text= value.replace(/(\s+){2,}/g," ").replace(/(<p>\s+<\/p>){1,}/g,"<p><br></p>").replace(/(<p><\/p>){1,}/g,"<p><br></p>").replace(/(<p><br><\/p>){2,}/g,"<p><br></p>")
    if(Props.product==undefined)return
    if (!executeRecaptcha) {
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
      return
    }
    const reCaptchaToken = await executeRecaptcha('EditReviewModal2');
    if(!reCaptchaToken){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
      return
    }
    setSubmitLoading(true)
    const res = await execUpdate2Review(Props.review.id,String(Props.review.episordId),text,value_text,quillref.current.getEditor().getText(0,50).replace(/\r?\n/g, '')+"...",Props.product.id,Props.review.userId,emotions,reCaptchaToken,firstValue)
    if(res.data.status===200){
      Props.setReview(res.data.review)
      dispatch(updateReviewAction(true))
      dispatch(pussingMessageDataAction(res.data.message))
      Props.setOpen(false)
    }else if(res.data.status===440){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message440,select:0}))
    }else if(res.data.status===460){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message460,select:0}))
    }else{
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    }
    setSubmitLoading(false)
  }
  // emotions
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

  // const [defaultValue,setDefaultValue] = useState<number>(Props)
  const [firstValue,setFirstValue] = useState<number>(Props.review.episordScore)
  // const [value2,setValue2] = useState<number | null>(score)
  const valuetext = (value:number):string=>{
    setFirstValue(value)

    return `${value}`
  }

  return(
    <>
      <Modal
        open={Props.open}
        onClose={handleClose}
      >
        <>
          <div className = "modal_review_richtext_preview">
            <div className = "modal_review_richtext_preview_title">
              Preview
            </div>
          <div className=""
          style={{
            display:"flex",
            gap:"10px",
            margin: "10px 0px",
            fontSize: "0.9rem"
          }}
          >
            {emotionsList.filter(i=>emotions.includes(String(i.id))).map((item)=>{
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
            modules={modules} value={value!=undefined?value.replace(/(\s+){2,}/g," ").replace(/(<p>\s+<\/p>){1,}/g,"<p><br></p>").replace(/(<p><\/p>){1,}/g,"<p><br></p>").replace(/(<p><br><\/p>){2,}/g,"<p><br></p>"):value} 
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
              onClick = {handleClose}
            >
              <IoMdClose/>
              閉じる
            </Button>
            </div>
            {emotionsList.length>0&&(
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
              {emotionsList.map((item,index)=>{
                return(
                <MenuItem value={String(item.id)} key={item.id}>{item.emotion}</MenuItem>
                )
              })}
            </Select>
            </FormControl>
          )}
          {/* {firstValue!=undefined&&( */}
            <div className=""
                style={{marginBottom:"20px"}}
              >
              Score
              <Slider
                aria-label="Temperature"
                defaultValue={Props.review.episordScore}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                step={10}
                marks
                min={10}
                max={100}
              />  
            </div> 
          {/* )} */}

            <ReactQuill
            className = "reviews_modal_quill"
            ref={quillref}
            modules={modules} value={value} onChange={handleChange}  
            theme="snow"
            />
            <FormHelperText className = "helpertexts">{helpertextradio}</FormHelperText>
            <Button variant="contained"
              onClick = {handlesubmit}
              className={"tail-spin-loading"}
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