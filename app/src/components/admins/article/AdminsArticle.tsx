import { useEffect, useMemo, useRef, useState } from "react"
import { Button,  FormControl,  FormControlLabel,  FormHelperText,  FormLabel,  Modal, Radio, RadioGroup, Slider, TextField, Tooltip } from "@mui/material";
import { execArticleProductList, execCreateArticle, execSubmitHash, uploadArticleFile } from "@/lib/api/article";
import Select, { InputActionMeta } from 'react-select'
import makeAnimated from 'react-select/animated';
import { useUser } from "@/lib/data/user/useUser";
import { useDispatch } from "react-redux";
import { pussingMessageDataAction } from "@/store/message/actions";
import { ErrorMessage } from "@/lib/ini/message";
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

type articleoption = {
  value:string
  label:string
}
type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const AdminsArticle:React.FC<Props> = (Props) => {
  const {userSwr} = useUser()
  const user = userSwr
  // value(記事)
  const [value,setValue] = useState<string>("")
  const [validatetext,setValidatetext] = useState<string>("")
  // title
  const [text,setText] = useState<string>("")
  const [inputError,setInputError] = useState<boolean>(false)
  // radio
  const [valueRadio,setvalueRadio] = useState<number>(2)
  const [errorradio,setErrorradio] = useState<boolean>(false)
  const [helpertextradio,setHelpertextradio] = useState<string>("")

  // hash
  const [hash,setHash] = useState<articleoption[]>([])
  const [hashIdList,setHashIdList] = useState<articleoption[]>([])
  // 
  const quillref  = useRef<any>(null!)
  const dispatch = useDispatch()

  const handleChange = (content: string):void | undefined => {
    setValue(content)
  }
  
  const handlesubmit = async() => {
    var product_ids:string[] = []
    productidList.map((item)=>{
      product_ids.push(item.value)
    })
    var hash_ids:string[] = []
    hashIdList.map((item)=>{
      hash_ids.push(item.value)
    })
    if (text.length===0){
      setValidatetext("タイトルを入力してください。")
      setInputError(true)
      return
    }
    // if (valueRadio===2){
    //   setHelpertextradio("選択してください")
    //   setErrorradio(true)
    //   return
    // }
    const res =  await execCreateArticle(user.user.id,value,text,valueRadio,product_ids,hash_ids)
    if (res.data.status == 200){

    }else{

    }
  }

  const imageHandlerLink = () => {
    var range = quillref.current.getEditor().getSelection();
    if (range==null)return 
    var value = prompt('What is the image URL');
    if(value){
      quillref.current.getEditor().insertEmbed(range.index, 'image', value);
    }
  }

  const imageHandler = () => {
    const input = document.createElement('input');  
    input.setAttribute('type', 'file');  
    input.setAttribute('accept', 'image/*');  
    input.click();  
    input.onchange = async () => {
      if (input.files == null) return
      var file: File = input.files[0];  
      var formData = new FormData();  
      formData.append('image', file); 
      var fileName = file.name;
      formData.append('name', fileName);
      const res = await uploadArticleFile(formData)
      const range = quillref.current.getEditor().getSelection();
      if (range==null)return 
      quillref.current.getEditor().insertEmbed(range.index, 'image', res.data.imageUrl);
      return fileName
    }
  }

  // const custom = new QuillToolbarButton({
  //   icon: `<svg viewBox="0 0 18 18"> <path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"></path></svg>`
  //   })

  const netflixHandlar = () => {
    const editor = quillref.current.getEditor()
    const range = editor.getSelection();
    const value333 = `<div class="NetflixBlot">netflixでみる</div>`
    if (range==null)return
    const delta = editor.clipboard.convert(value333)
    let [leaf, offset] = editor.getLeaf(range.index);
    if (leaf.parent.constructor.blotName == "NetflixBlot"){
      const length = editor.getLength();
    }else{
    editor.clipboard.dangerouslyPasteHTML(range.index,value333)
    }
  }

  const boxcontentsHandlar = () => {
    const editor = quillref.current.getEditor()
    const range = editor.getSelection();
    const value3334 = `<div class="BoxContentsBlot">netflixでみる00</div>`
    if (range==null)return
    const delta = editor.clipboard.convert(value3334)
    let [leaf, offset] = editor.getLeaf(range.index);
    if (leaf.parent.constructor.blotName == "BoxContentsBlot"){
      const length = editor.getLength();
    }else{
    editor.clipboard.dangerouslyPasteHTML(range.index,value3334)
    }
  }
  
  const modules =  useMemo(() => (
    {
    toolbar:{ 
      container:[
      // [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      // [{ script:  "sub" }, { script:  "super" }],
      ["blockquote"],
      ["code-block"],
      [{ list:  "ordered" }, { list:  "bullet" }],
      [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
      ["link", "image", "video"],
      ['link'],   
      // ["clean"],
      // ['netflix'],
      // ['boxcontents'],   
      // ["aa"]
    ],
    handlers: {
        // image: imageHandler,
        // image: imageHandlerLink,
        // netflix: netflixHandlar,
        // boxcontents: boxcontentsHandlar
      },
    },
    // ImageResize: {
    //   modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
    // }
  }
  ),[]);

  // text
  const handleChangetext = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setText(e.target.value)
    setValidatetext("")
    setInputError(false)
  }
  // radio
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setHelpertextradio("")
    setErrorradio(false)
    setvalueRadio(Number(e.target.value))
  }
  // react select 
  const animatedComponents = makeAnimated();
  const [product,setProduct] = useState<articleoption[]>([])
  const [productidList, setproductidList] = useState<articleoption[]>([])
  const [productidIdList, setproductIdList] = useState<string[]>([])
  const [pokemon, setPokemons] = useState("")

  useEffect(()=>{
    productlist()
  },[])
  
  const productlist = async() => {
    const res = await execArticleProductList()
    if (res.status == 200){
      setProduct(res.data.products)
      setHash(res.data.hashes)
    }else{
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    }
  }

  // const setHashList = () => {
  //   const res = await execArticleHashList()
  //   if (res.status == 200){
  //     setHash(res.data.hashes)
  //   }else{

  //   }
  // }

  const selectChangehandle = (value:any) => {
    setproductidList(value)
  }
  const handleClose = () => {
    Props.setOpen(false)
  }

  // select----------------------------------------------
const [isMenuOpen,setIsMenuOpen] = useState<boolean>(false)
const [isMenuOpen2,setIsMenuOpen2] = useState<boolean>(false)
const handleInputChange = (newValue: string, actionMeta: InputActionMeta) => {
  console.log(newValue,actionMeta)
  if(newValue==""){
    setIsMenuOpen(false)
  }else if(newValue.length>1){
    setIsMenuOpen(true)
  }
}
const handleInputChange2 = (newValue: string, actionMeta: InputActionMeta) => {
  console.log(newValue,actionMeta)
  if(newValue==""){
    setIsMenuOpen2(false)
  }else if(newValue.length>1){
    setIsMenuOpen2(true)
  }
}
// hashtag

const handleSelectChangeCharacter = (value:any) => {
  setHashIdList(value) 
  if (addHashError == true){
    setAddHashError(false)
  }
}
// addHash
const [addHash,setAddHash] = useState<string>("")
const [addHashValidateText,setAddHashValidateText] = useState<string>("")
const [addHashError,setAddHashError] = useState<boolean>(false)
const handleChangeAddHash = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
  setAddHash(e.currentTarget.value)
  if(addHashError==true){
    setAddHashError(false)
    setAddHashValidateText("")
  }
}

const handleSubmitHash = async() => {
  if(addHash.length==0){
    setAddHashError(true)
    setAddHashValidateText("入力されていません。")
    return
  }
  const res = await execSubmitHash(addHash)
  if (res.data.status == 200){
    dispatch(pussingMessageDataAction({title:"ハッシュタグが追加されました。",select:1}))
  }else if (res.data.status == 300){
    dispatch(pussingMessageDataAction({title:"存在するハッシュタグです。",select:0}))
  }else{
    dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
  }
}

  return(
    <>
      <Modal
        open={Props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <div className = "AdminsProduct">
            <div className = "FormProduct">
              <div className = "FormProductSetTitle">
                <div className = "article">
                  <TextField 
                    className="TheredModalInputText"
                    fullWidth 
                    error={inputError}
                    inputProps={{ maxLength: 20, pattern: "^[a-zA-Z0-9_]+$" }}
                    placeholder="タイトルを入力してください（必須:20文字以内）"
                    defaultValue=""
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
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
                    menuIsOpen={isMenuOpen}
                    onInputChange={handleInputChange}
                  />
                  *2文字以上の入力が必要です。
                  <p>a</p>
                  <p>a</p> <p>a</p> <p>a</p> <p>a</p> <p></p> <p></p>
                
                <Select
                  placeholder={"Characters select..."}
                  options={hash} 
                  closeMenuOnSelect={false}
                  isMulti
                  value={hashIdList}
                  menuIsOpen={isMenuOpen2}
                  // components={animatedComponents}
                  onChange={handleSelectChangeCharacter}
                  styles={{ menu: (provided, state) => ({ ...provided, zIndex: 10 }) }}
                  // onInputChange={inputValue =>
                  //   (inputValue.length <= 1 ? inputValue : inputValue.substr(0, 1))
                  // }
                  onInputChange={handleInputChange2}
                  />
                  <div className = "FormProductList2AddGenreFlexBox">
                    <TextField
                      error={addHashError}
                      inputProps={{ maxLength: 30, pattern: "^[a-zA-Z0-9_]+$" }}
                      placeholder="Tagを入力してください(30文字以内）"
                      defaultValue=""
                      id="outlined-basic"
                      label="Add Character"
                      variant="outlined"
                      helperText={addHashValidateText}
                      onChange={handleChangeAddHash}
                      size="small"
                      fullWidth
                    />
                    <Button variant="contained"
                      onClick = { handleSubmitHash }
                    >
                      Add
                    </Button>
                  </div>
                  <div className = "articleQuill">
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
              </div>
            </div>
          </div>
        </>
      </Modal>
    </>
  )
} 