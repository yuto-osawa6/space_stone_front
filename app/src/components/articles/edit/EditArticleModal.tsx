import { Article } from "interfaces/article"
import { Button,  FormControl,  FormControlLabel,  FormHelperText,  FormLabel,  Modal, Radio, RadioGroup, Slider, TextField, Tooltip } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { RootState } from "store";
import { useSelector } from "react-redux";
import { execArticleProductList, execUpdateArticle } from "lib/api/article";
import Select, { InputActionMeta } from 'react-select'

type articleoption = {
  value:string
  label:string
}
type Props = {
  open:boolean
  setOpen:React.Dispatch<React.SetStateAction<boolean>>
  article: Article | undefined
}
export const EditArticleModal:React.FC<Props> = (Props) => {
  const handleClose = () => Props.setOpen(false)
  // ----------------------------------------------
  const userStore = useSelector((state:RootState) => state.user)
  const [value,setValue] = useState<string>(Props.article!=undefined?Props.article.content:"")
  const [validatetext,setValidatetext] = useState<string>("")
  const [text,setText] = useState<string>(Props.article!=undefined?Props.article?.title:"")
  const [inputError,setInputError] = useState<boolean>(false)
  const [valueRadio,setvalueRadio] = useState<number>(Props.article!=undefined?Props.article?.weekormonth==false?0:1:2)
  const [errorradio,setErrorradio] = useState<boolean>(false)
  const [helpertextradio,setHelpertextradio] = useState<string>("")
  const quillref  = useRef<ReactQuill>(null!)
  const handleChange = (content: string):void | undefined => {
    setValue(content)
  }

  const handlesubmit = async() => {
    var product_ids:string[] = []
    productidList.map((item)=>{
      product_ids.push(item.value)
    })
    if (text.length===0){
      setValidatetext("タイトルを入力してください。")
      setInputError(true)
      return
    }
    if (valueRadio===2){
      setHelpertextradio("選択してください")
      setErrorradio(true)
      return
    }
    if(Props.article==undefined)return
    const res =  await execUpdateArticle(Props.article?.id,userStore.user.id,value,text,valueRadio,product_ids)
    if (res.data.status == 200){
    }else{
    }
  }
  const modules =  useMemo(() => (
    {
    toolbar:{ 
      container:[
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      ["blockquote"],
      ["code-block"],
      [{ list:  "ordered" }, { list:  "bullet" }],
      [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
      ["link", "image", "video"],
      ['netflix'],
      ['boxcontents'],   
    ],
    handlers: {
    },
    },
  }
  ),[]);
// ---------------------------------------------------------------------------
  const handleChangetext = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setText(e.target.value)
    console.log(e.target.value)
    setValidatetext("")
    setInputError(false)
  }
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setHelpertextradio("")
    setErrorradio(false)
    setvalueRadio(Number(e.target.value))
  }
  // const animatedComponents = makeAnimated();
  const [product,setProduct] = useState<articleoption[]>([])
  const [productidList, setproductidList] = useState<articleoption[]>([])
  // const [productidIdList, setproductIdList] = useState<string[]>([])
  const [pokemon, setPokemons] = useState("")
  useEffect(()=>{
    productlist()
  },[])
  const productlist = async() => {
    const res = await execArticleProductList()
    if (res.status == 200){
      console.log(res)
      setProduct(res.data.products)
    }else{
    }
  }
  // ------------------------------------------------------
  const selectChangehandle = (value:any) => {
    console.log(value)
    setproductidList(value)
  }
  // ---------------------------
  const [isMenuOpen,setIsMenuOpen] = useState<boolean>(false)
  const handleInputChange = (newValue: string, actionMeta: InputActionMeta) => {
    console.log(newValue,actionMeta)
    if(newValue==""){
      setIsMenuOpen(false)
    }else if(newValue.length>1){
      setIsMenuOpen(true)
    }
  }
  console.log(Props)

  // setup ini select---------------------
  useEffect(()=>{
    if(Props.article==undefined)return
    const copy = productidList.slice()
    Props.article.articleProducts.map((i,index)=>copy[index]={value:String(i.id),label:i.title})
    console.log(copy)
    setproductidList(copy)
  },[])

  return(
    <>
      <Modal
      open={Props.open}
      onClose={handleClose}
      >
        <div className = "article"
        style={{
          position: "relative",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          height: "90%",
          overflow: "scroll",
          backgroundColor: "aliceblue",
          padding: "20px",
          outline:"none"
        }}
        >
          <TextField 
            size="small"
            className="TheredModalInputText"
            fullWidth 
            error={inputError}
            inputProps={{ maxLength: 20, pattern: "^[a-zA-Z0-9_]+$" }}
            placeholder="タイトルを入力してください（必須:20文字以内）"
            defaultValue={Props.article?.title}
            id="outlined-basic"
            label="Title"
            variant="outlined"
            // helperText={inputRef?.current?.validationMessage}
            helperText={validatetext}
            onChange={handleChangetext}
          />
          <FormControl error={errorradio}>
            <FormLabel id="demo-radio-buttons-group-label">Week or Month</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              value={valueRadio}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="0" control={<Radio />} label="Week" />
              <FormControlLabel value="1" control={<Radio />} label="Month" />
              <FormHelperText>{helpertextradio}</FormHelperText>
            </RadioGroup>
          </FormControl>
          <Select
            options={product} 
            closeMenuOnSelect={false}
            isMulti
            value={productidList}
            onChange={selectChangehandle}
            styles={{ menu: (provided, state) => ({ ...provided, zIndex: 10 }) }}
            onInputChange={handleInputChange}
            menuIsOpen={isMenuOpen}
          />
          <div className = "articleQuill"
          style={{
            marginTop:"20px"
          }}
          >
            <div className = "articleQuillInsert">  
            <ReactQuill
              className = "reviews_modal_quill"
              modules={modules} value={value} 
              theme="bubble" 
              readOnly={true}
            />
            </div>
            <div className = "articleQuillPreview">
              <ReactQuill 
                className = "reviews_modal_quill"
                ref={quillref}
                modules={modules} value={value} onChange={handleChange}  
                theme="snow"
              />
            </div>
          </div>
          <div className = "articleQuillSubmit">
            <Button variant="contained"
              className = "TheredModalButton"
              onClick = { handlesubmit }
            >
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}