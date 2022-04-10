import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import ReactQuill,{Quill} from "react-quill"

import { Button,  FormControl,  FormControlLabel,  FormHelperText,  FormLabel,  Modal, Radio, RadioGroup, Slider, TextField, Tooltip } from "@mui/material";
import { execArticleProductList, execCreateArticle, uploadArticleFile } from "lib/api/article";

import { useSelector } from "react-redux";
import { RootState } from "store";

import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { product } from "interfaces/product";

// import { Delta } from 'quill-delta';
import Parchment from 'parchment';

// const icons = Quill.import('ui/icons');
// icons.netflix = "N"; //
// icons.boxcontents = "BOX"; //

// let Block = Quill.import('blots/block');
// let TextBlot = Quill.import('blots/text');



// class NetflixBlot extends Block { 
//   static create(url:any) {
//     let node = super.create();
//     node.setAttribute('class', 'NetflixBlot');
//     return node;
//   }
// }
// NetflixBlot.blotName = 'NetflixBlot';
// NetflixBlot.tagName = 'div';
// NetflixBlot.className = 'NetflixBlot';

// class NetflixBlot2 extends Block { 
//   static create(url:any) {
//     let node = super.create();
//     node.setAttribute('class', 'NetflixBlot2');
//     return node;
//   }
// }
// NetflixBlot2.blotName = 'NetflixBlot2';
// NetflixBlot2.tagName = 'div';
// NetflixBlot2.className = 'NetflixBlot2';

// class BoxContentsBlot extends Block { 
//   static create(url:any) {
//     let node = super.create();
//     node.setAttribute('class', 'BoxContentsBlot');
//     return node;
//   }
// }
// BoxContentsBlot.blotName = 'BoxContentsBlot';
// BoxContentsBlot.tagName = 'div';
// BoxContentsBlot.className = 'BoxContentsBlot';

// // Quill.register({NetflixBlot},true);
// Quill.register(NetflixBlot);
// Quill.register(NetflixBlot2);
// Quill.register(BoxContentsBlot);


type articleoption = {
  value:string
  label:string
}


export const AdminsArticle:React.FC = () => {
  const user = useSelector((state:RootState) => state.user)
  // 
  const [value,setValue] = useState<string>("")
  
  // validation
  const [validatetext,setValidatetext] = useState<string>("")
  // const inputRef = useRef(null);
  const [text,setText] = useState<string>("")
  const [inputError,setInputError] = useState<boolean>(false)
  // radio
  const [valueRadio,setvalueRadio] = useState<number>(2)
  const [errorradio,setErrorradio] = useState<boolean>(false)
  const [helpertextradio,setHelpertextradio] = useState<string>("")

  const quillref  = useRef<ReactQuill>(null!)

  const handleChange = (content: string):void | undefined => {
    // console.log(quillref.current.getEditor().getText(0,20).replace(/\r?\n/g, ''))
    // const ss = quillref.current.getEditor().getText(0,20)
    // const ss2 = quillref.current.getEditor().getLength()

    setValue(content)


  }
  


  const handlesubmit = async() => {
    console.log(productidList)

    var product_ids:string[] = []
    productidList.map((item)=>{
      product_ids.push(item.value)
    })
    console.log(product_ids)

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

    const res =  await execCreateArticle(user.user.id,value,text,valueRadio,product_ids)
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
    // public async imageHandler {


    const input = document.createElement('input');  
    
      input.setAttribute('type', 'file');  
      input.setAttribute('accept', 'image/*');  
      input.click();  
    
      input.onchange = async () => {
  
        // const createFormData = async() => {
        if (input.files == null) return
  
        var file: File = input.files[0];  
        var formData = new FormData();  
        // let
    
        formData.append('image', file); 
        
        // formData.append('book[title]', "aaa") // ポイント1！
        // formData.append('book[label]', "lala")
  
        // formData.append('username', 'Chris');
    
        var fileName = file.name;
        formData.append('name', fileName);
  
  
        console.log(formData)
        console.log(file)
  
        console.log(formData.getAll('image'))
  
  
        const res = await uploadArticleFile(formData)
        console.log(res)
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
    // doneyet
    console.log("a")

    const editor = quillref.current.getEditor()
    const range = editor.getSelection();
    const value333 = `<div class="NetflixBlot">netflixでみる</div>`
    if (range==null)return
    // quillref.current.getEditor().insertEmbed(range.index, 'netflix', `<div className="netflix">netflixでみる</div>`);
    const delta = editor.clipboard.convert(value333)
    let [leaf, offset] = editor.getLeaf(range.index);
    if (leaf.parent.constructor.blotName == "NetflixBlot"){
      const length = editor.getLength();
      console.log(length)
      // editor.deleteText(range.index,length)
    // editor.clipboard.dangerouslyPasteHTML(range.index,"<p></p>")


    }else{
    editor.clipboard.dangerouslyPasteHTML(range.index,value333)
    }

    // editor.enable(false);
    // let [leaf, offset] = editor.getLeaf(range.index);
    // console.log(leaf.parent == quillref.current)
    // console.log(leaf.parent.domNode.__blot)
    // console.log(leaf.parent.constructor.blotName == "NetflixBlot")

    // console.log( quillref.current.getEditor())







    // editor.updateContents(delta,"silent")
    // const delta2 = editor.insertText(range.index,value333)
    // new Delta().retain(6).insert('Quill')
    // editor.updateContents(new Delta().retain(6).insert('Quill'))

    // const delta23 = editor.clipboard.dangerouslyPasteHTML(5, '&nbsp;<b>World</b>');

  
    // editor.updateContents(delta)


    // editor.setText(value333);

    // editor.insertText(range.index, 'Quill', {
    //   'color': '#ffff00',
    //   'italic': true
    // });
  }

  const boxcontentsHandlar = () => {
    const editor = quillref.current.getEditor()
    const range = editor.getSelection();
    const value3334 = `<div class="BoxContentsBlot">netflixでみる00</div>`
    if (range==null)return
    // quillref.current.getEditor().insertEmbed(range.index, 'netflix', `<div className="netflix">netflixでみる</div>`);
    const delta = editor.clipboard.convert(value3334)
    let [leaf, offset] = editor.getLeaf(range.index);
    if (leaf.parent.constructor.blotName == "BoxContentsBlot"){
      const length = editor.getLength();
      console.log(length)
      // editor.deleteText(range.index,length)
    // editor.clipboard.dangerouslyPasteHTML(range.index,"<p></p>")

    // editor.updateContents(delta)

    }else{
    console.log(value3334)
    editor.clipboard.dangerouslyPasteHTML(range.index,value3334)
    // editor.updateContents(delta)

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
      // ['link'],   
      // ["clean"],
      ['netflix'],
      ['boxcontents'],   
      // ["aa"]
    ],
    handlers: {
      // image: imageHandler,
      image: imageHandlerLink,
 
      netflix: netflixHandlar,
      boxcontents: boxcontentsHandlar
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
  // radio
  

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    // console.log(e.target.value)
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
      console.log(res)
      setProduct(res.data.products)
    }else{

    }
  }

  const selectChangehandle = (value:any) => {
    console.log(value)
    setproductidList(value)
  
  }

  // console.log(product)

 return(
   <>

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
                {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
              </RadioGroup>
            </FormControl>
            {/*  */}
            <Select 
            // inputValue={pokemon}
            options={product} 
            closeMenuOnSelect={false}
            isMulti
            value={productidList}
            // components={animatedComponents}
            onChange={selectChangehandle}
            />
            <div className = "articleQuill">
            <div className = "articleQuillInsert">  
              <ReactQuill
              className = "reviews_modal_quill"
              // ref={quillref}
              // ref='editor'
              modules={modules} value={value} 
              theme="bubble" 
              // theme="bubble"
              readOnly={true}
              
              />
            </div>
            
              <div className = "articleQuillPreview">
                <ReactQuill 
                  className = "reviews_modal_quill"
                  ref={quillref}
                  // ref='editor'
                  modules={modules} value={value} onChange={handleChange}  
                  // theme="bubble" 
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
      {/* </div> */}
   </>
 )
 }

 