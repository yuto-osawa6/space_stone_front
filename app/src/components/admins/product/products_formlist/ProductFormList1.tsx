import { FormControl, FormHelperText, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField } from "@mui/material"
import { useEffect, useMemo, useRef, useState } from "react"
// import ReactQuill, { Quill } from "react-quill"
// import { Navigate, useNavigate } from "react-router-dom"

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { YearSeasonsCreate } from "./YearSeasonsCreate";
// import { product } from "interfaces/product";
// import { HorizontalNonLinearStepper } from "./stepper/Stepper";

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

type Props = {
  activeStep : number
  childFunc: React.MutableRefObject<any>

  completed: {[k: number]: boolean;}
  setCompleted:React.Dispatch<React.SetStateAction<{[k: number]: boolean;}>>
  handleNext: () => void
  setProduct: React.Dispatch<React.SetStateAction<product>>
  product: product
}

type product = {
  title:string
  imageUrl:string
  description:string
  list:string | undefined
  year:string
  kisetsu:string[]
  delivery_start:Date | null
  delivery_end:Date | null

  imageUrl2:string | undefined
  imageUrl3:string | undefined
  imageUrlh1:string | undefined
  imageUrlh2:string | undefined
  imageUrlh3:string | undefined

  copyright:string | undefined
  annitictId:number | undefined
  shoboiTid:number | undefined
  wikiEn:string | undefined

  // time:Date | null
  yearSeason:year_season[]
 
}
type year_season = {
  year:string
  season:string[]
}

export const ProductFormList1:React.FC<Props> = (Props) => {
  useEffect(()=>{
    handleSetUpYear()
  },[])

  // useEffect(() => {
    // Props.childFunc.current = handleErrorCheck
    // console.log(Props.childFunc)
  // }, [])

// //  product
// const [product,setProduct] = useState<product>({
//   title:"",
//   imageUrl:"",
//   description:"",
//   list:"",
//   year:"",
//   kisetsu:[],
//   delivery_start:null,
//   delivery_end:null,
//   // time:null,
// })
  
  // productTitle------------------------------
    // const [title,setTitle] = useState<string | undefined>("")
    const [title,setTitle] = useState<string | undefined>(Props.product.title)

    const [titleError,setTitleError] = useState<boolean>()
    const [titleValidateText,setValidateText] = useState<string>()
    const handleChangetext = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
      setTitle(e?.currentTarget.value)
      console.log("aaaa")
      setTitleError(false)
      setValidateText("")
    }

  // setProduct({title:"",imageUrl:""})
  // imageUrl-----------------------------------

  const [imageUrl,setImageUrl] = useState<string | undefined>(Props.product.imageUrl)
  const [imageUrlError,setImageUrlEroor] = useState<boolean>()
  const [imageUrlValidateText,setImageUrlValidateText] = useState<string>()
  const handleChangeImageUrl = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    setImageUrl(e?.currentTarget.value)
    setImageUrlEroor(false)
    setImageUrlValidateText("")
  }

   // imageUrl2~-----------------------------------

   const [imageUrl2,setImageUrl2] = useState<string | undefined>(Props.product.imageUrl)
   const handleChangeImageUrl2 = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
     setImageUrl2(e?.currentTarget.value)
   }
   const [imageUrl3,setImageUrl3] = useState<string | undefined>(Props.product.imageUrl)
   const handleChangeImageUrl3 = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
     setImageUrl3(e?.currentTarget.value)
   }
   const [imageUrlh1,setImageUrlh1] = useState<string | undefined>(Props.product.imageUrlh1)
   const [imageUrlErrorh1,setImageUrlEroorh1] = useState<boolean>()
   const [imageUrlValidateTexth1,setImageUrlValidateTexth1] = useState<string>()
   const handleChangeImageUrlh1 = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
     setImageUrlh1(e?.currentTarget.value)
     setImageUrlEroorh1(false)
    //  setImageUrlValidateTexth1("")
   }
   const [imageUrlh2,setImageUrlh2] = useState<string | undefined>(Props.product.imageUrl)
   const handleChangeImageUrlh2 = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
     setImageUrlh2(e?.currentTarget.value)
   }
   const [imageUrlh3,setImageUrlh3] = useState<string | undefined>(Props.product.imageUrl)
   const handleChangeImageUrlh3 = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
     setImageUrlh3(e?.currentTarget.value)
   }
  //  add annict 関係
  const [wikiEn,setwikiEn] = useState<string | undefined>(Props.product.wikiEn)
   const handleChangeImageUrl4 = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    setwikiEn(e?.currentTarget.value)
   }
   const [copyright,setCopyright] = useState<string | undefined>(Props.product.copyright)
   const handleChangeImageUrl5 = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    setCopyright(e?.currentTarget.value)
   }
   const [annitictId,setAnnitictId] = useState<number | undefined>(Props.product.annitictId)
   const handleChangeImageUrl6 = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
     if(e?.currentTarget.value!=undefined&&e?.currentTarget.value.length>0){
    const num = Number(e?.currentTarget.value.replace(/[^0-9]/g, ''))
      setAnnitictId(Number(e?.currentTarget.value.replace(/[^0-9]/g, '')))
     }else{
      setAnnitictId(undefined)
     }
   }
   const [shoboiTid,setShoboiTid] = useState<number | undefined>(Props.product.shoboiTid)
   const handleChangeImageUrl7 = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    if(e?.currentTarget.value!=undefined&&e?.currentTarget.value.length>0){
    const num = Number(e?.currentTarget.value.replace(/[^0-9]/g, ''))
      setShoboiTid(Number(e?.currentTarget.value.replace(/[^0-9]/g, '')))
    }else{
      setShoboiTid(undefined)
    }
   }
  // arasuzi --------------------------
  const quillref  = useRef<any>(undefined!)
  const [value,setValue] = useState<string>("")
  const [arasuziValidationText,setArasuziValidationText] = useState<string>("")
  const [arasuziLength,setArasuziLength]= useState<number>(0)
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
      // ["link", "image", "video"],
      ['netflix'],
      ['boxcontents'],   
    ],
    handlers: {
      // image: imageHandlerLink,
      // netflix: netflixHandlar,
      // boxcontents: boxcontentsHandlar
    },
    clipboard: {
      matchVisual: false
      }
    },
  }
  ),[]);
  const handleChange = (content: string):void | undefined => {
    const editor = quillref.current?.getEditor()
    // setArasuziLength(editor.getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length)
   console.log(editor.getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length)

    // console.log(quillref.current.getEditor().getText(0,20).replace(/\r?\n/g, ''))
    // const ss = quillref.current.getEditor().getText(0,20)
    // const ss2 = quillref.current.getEditor().getLength()
    console.log(new Blob([content]).size)
    setValue(content)
    setArasuziLength(editor.getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length)
    if(editor.getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length>300){
      setArasuziValidationText("300字までです。")
    }else{
    setArasuziValidationText("")
    }
  }
  // list-------------------------------------------------------
  const [list,setList] = useState<string | undefined>(Props.product.list)
  const [listError,setListEroor] = useState<boolean>()
  const [listValidateText,setListValidateText] = useState<string>()
  const handleChangeList = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    setList(e?.currentTarget.value)
    setListEroor(false)
    setListValidateText("")
  }
  // year-----------------------------------------------
  const [year,setYear] = useState<string>("")
  const [years,setYears] = useState<string[]>([])

  const [yearValidationText,setYearValidationText] = useState<string>("")
  const [yearError,setYearError] = useState<boolean>(false)

  const [yearList,setYearList] = useState<number[]>([])
  const today = new Date()
  const l = today.getFullYear()
  // today.
  const handleSetUpYear = () => {
    const array:number[] = []
    for(let i = 1990; i < l+1; i++) {
      array.push(i)
      // if (i === l) {
      //   break;
      // }
    }
    setYearList(array)
    // set
  }

  const handleChangeYear = (e:SelectChangeEvent) => {
    setYear(e.target.value as string)
    setYearValidationText("")
    setYearError(false)
  }
  console.log(yearList)

  // kisetsu--------------------------------------------------------
  const [kisetsu,setKisetsu] = useState<string[]>([])
  const [kisetsuValidationText,setKisetsuValidationText] = useState<string>("")
  const [kisetsuError,setKisetsuError] = useState<boolean>(false)

  // delivery-end start--------------------------------------
  const [deliveryEnd, setDeliveryEnd] = useState<Date | null>(null);
  const [deliveryStart, setDeliveryStart] = useState<Date | null>(null);

  const [deliveryStartValidationText,setDeliveryStartValidationText] = useState<string>("")
  const [deliveryEndValidationText,setDeliveryEndValidationText] = useState<string>("")


  // 
  const handleChangeKisetsu = (e:SelectChangeEvent<string[]>) => {
    // setKisetsu(e.target.value as string)
    
    const {
      target: { value },
    } = e;
    setKisetsu(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setKisetsuValidationText("")
    setKisetsuError(false)
  }

  // step
  const [activeStep, setActiveStep] = useState<number>(0);


  const isInvalidDate = (date: Date | null):boolean => {
    if(date==null){
      return true
    }
    return Number.isNaN(date.getTime())
  }
  // error complete validation
  const handleErrorCheck = () => {
    // title
    console.log(title)
    if(title==undefined){
      setTitleError(true)
      setValidateText("タイトルが未定義です。")
      return
    }
    if(title.length>40){
      setTitleError(true)
      setValidateText("40字を超えています")
      return
    }else if(title.length==0){
      setTitleError(true)
      setValidateText("テキストが入力されていません。")
      return
    }
    // imageUrl
    if(imageUrl==undefined){
      setImageUrlEroor(true)
      setImageUrlValidateText("imageUrlが未定義です。")
      return
    }
    if(imageUrl.length==0){
      console.log(title)
      setImageUrlEroor(true)
      setImageUrlValidateText("imageUrlが入力されていません。")
      return
    }
    // if(imageUrlh1==undefined){
    //   setImageUrlEroorh1(true)
    //   setImageUrlValidateTexth1("imageUrlが未定義です。")
    //   return
    // }
    // if(imageUrlh1.length==0){
    //   setImageUrlEroorh1(true)
    //   setImageUrlValidateTexth1("imageUrlが入力されていません。")
    //   return
    // }

    // if(list?.length==0){
    //   setListEroor(true)
    //   setListValidateText("入力されていません。")
    // }
    const blob = new Blob([value])
    const editor = quillref.current?.getEditor()
    if(editor.getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length>300){
      console.log(editor.getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length)
      setArasuziValidationText("300文字までです。")
      return
    }else if(editor.getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length==0){
      setArasuziValidationText("入力されていません。")
      return
    }
    if(blob.size>3000){
      console.log(new Blob([value.replace(/(\s+){2,}/g," ").replace(/(<p>\s+<\/p>){1,}/g,"<p><br></p>").replace(/(<p><\/p>){1,}/g,"<p><br></p>").replace(/(<p><br><\/p>){2,}/g,"<p><br></p>")]).size)
      setArasuziValidationText("サイズが大きすぎます。")
      return
    }
    console.log(years)

    // doneyet-1(years エラーハンドリング)
    // if(year==""){
    //   setYearValidationText("選択されていませんaa")
    //   setYearError(true)
    //   return
    // } 
    // console.log(kisetsu.length)

    // if(kisetsu.length==0){
    //   setKisetsuValidationText("選択されていません。a")
    //   setKisetsuError(true)
    //   return
    // }
    
    // if(deliveryStart==null){
    //   setDeliveryStartValidationText("入力されていません。")
    //   return
    // }
    // if(deliveryEnd==null){
    //   setDeliveryEndValidationText("入力されていません。")
    //   return
    // }

    // console.log(isInvalidDate(deliveryStart))
    // console.log(isInvalidDate(deliveryEnd))
    // console.log(deliveryStart)
    // console.log(deliveryEnd)
    console.log(yearSeason)
    // --------------------------------------------------------------------
    const array:number[] = []
    childFunc01.current.map((i:Function,index:number)=>
    array.push(childFunc01.current[index].func())
    // childFunc01.current[index]()
    )
    console.log(array)

    let total = array.reduce(function(sum, element){
      return sum + element;
    }, 0);

    console.log(total)
    if(total>0){
      return
    }

    // if(isInvalidDate(deliveryStart)){
    //   setDeliveryStartValidationText("適切な形で入力してください。")
    //   return
    // }
    // if(isInvalidDate(deliveryEnd)){
    //   setDeliveryEndValidationText("適切な形で入力してください。")
    //   return
    // }

    Props.setProduct({
      title:title,
      imageUrl:imageUrl,
      description:value.replace(/(\s+){2,}/g," ").replace(/(<p>\s+<\/p>){1,}/g,"<p><br></p>").replace(/(<p><\/p>){1,}/g,"<p><br></p>").replace(/(<p><br><\/p>){2,}/g,"<p><br></p>"),
      list:list,
      year:year,
      kisetsu:kisetsu,
      delivery_start:deliveryStart,
      delivery_end:deliveryEnd,
      imageUrl2:imageUrl2,
      imageUrl3:imageUrl3,
      imageUrlh1:imageUrlh1,
      imageUrlh2:imageUrlh2,
      imageUrlh3:imageUrlh3,

      wikiEn:wikiEn,
      copyright:copyright,
      annitictId:annitictId,
      shoboiTid:shoboiTid,


      yearSeason:yearSeason
    })

    // return
    
    console.log(Props.completed)
    const newCompleted = Props.completed
    newCompleted[Props.activeStep] = true
    Props.setCompleted(newCompleted)
    Props.handleNext();
    // Props.setCompleted({[0]:true})
    

  }

  console.log(Props.completed)
  
  
  console.log(title)

  const handlererror = () => {
    console.log("aaa")
  }

  // doneyet-1(このやり方が推奨かどうかわからない)
  Props.childFunc.current = handleErrorCheck

  // ---------------------------
  // year2-----------------------------------------------
  const [yearSeason,setYearSeason] = useState<year_season[]>([])
  const childFunc01 = useRef<any>([])
  // const [years,setYears] = useState<string[]>([])
  // Props.formProduct.productYear.map(item=>item.year.slice(0,4))
  const [yearsValidationText,setYearsValidationText] = useState<string>("")
  const [yearsError,setYearsError] = useState<boolean>(false)

  const [yearsList,setYearsList] = useState<number[]>([])
  const handleChangeYears= (e:SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = e;
    setYears(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setYearsValidationText("")
    setYearsError(false)

    console.log(value)
    const character_filter = yearSeason.filter(item => value.includes(item.year))
    console.log(yearSeason)
    console.log(character_filter)
    childFunc01.current = childFunc01.current.filter((item:any) => value.includes(item.id))
    setYearSeason(character_filter)
  }
  

  return(
    <>
      {Props.completed[0]!=true?
      <div className = "Stepper1" style={Props.activeStep!=0?{display:"none"}:undefined}>
        <div className = "FormProductLabel">
          Product情報の追加
        </div>
        <div className = "FormProductSetTitle">
          <TextField
            error={titleError}
            inputProps={{ maxLength: 40, pattern: "^[a-zA-Z0-9_]+$" }}
            placeholder="タイトルを入力してください（必須:40文字以内）"
            // defaultValue=""
            defaultValue={Props.product.title}
            id="outlined-basic"
            label="Title"
            variant="outlined"
            // helperText={inputRef?.current?.validationMessage}
            helperText={titleValidateText}
            onChange={handleChangetext}
            size="small"
            fullWidth
            // disabled={true}
          />
          <TextField
            error={imageUrlError}
            inputProps={{ maxLength: 1000, pattern: "^[a-zA-Z0-9_]+$" }}
            placeholder="ImageUrlを入力してください(base64以外の画像リンク）"
            // defaultValue=""
            defaultValue={Props.product.imageUrl}
            id="outlined-basic"
            label="ImageUrl"
            variant="outlined"
            // helperText={inputRef?.current?.validationMessage}
            helperText={imageUrlValidateText}
            onChange={handleChangeImageUrl}
            size="small"
            fullWidth
          />
          <TextField
            // error={imageUrlError}
            inputProps={{ maxLength: 1000, pattern: "^[a-zA-Z0-9_]+$" }}
            placeholder="ImageUrlを入力してください(base64以外の画像リンク）"
            // defaultValue=""
            defaultValue={Props.product.imageUrl2}
            id="outlined-basic"
            label="ImageUrl2"
            variant="outlined"
            // helperText={inputRef?.current?.validationMessage}
            // helperText={imageUrlValidateText}
            onChange={handleChangeImageUrl2}
            size="small"
            fullWidth
          />
          <TextField
            // error={imageUrlError}
            inputProps={{ maxLength: 1000, pattern: "^[a-zA-Z0-9_]+$" }}
            placeholder="title Ka"
            // defaultValue=""
            defaultValue={Props.product.imageUrl3}
            id="outlined-basic"
            label="title Ka"
            variant="outlined"
            // helperText={inputRef?.current?.validationMessage}
            // helperText={imageUrlValidateText}
            onChange={handleChangeImageUrl3}
            size="small"
            fullWidth
          />
          <TextField
            error={imageUrlErrorh1}
            inputProps={{ pattern: "^[a-zA-Z0-9_]+$" }}
            placeholder="title En"
            // defaultValue=""k
            defaultValue={Props.product.imageUrlh1}
            id="outlined-basic"
            label="title En"
            variant="outlined"
            // helperText={inputRef?.current?.validationMessage}
            // helperText={imageUrlValidateTexth1}
            onChange={handleChangeImageUrlh1}
            size="small"
            fullWidth
          />
          <TextField
            // error={imageUrlError}
            inputProps={{ pattern: "^[a-zA-Z0-9_]+$" }}
            placeholder="title Ro"
            // defaultValue=""
            defaultValue={Props.product.imageUrlh2}
            id="outlined-basic"
            label="title Ro"
            variant="outlined"
            // helperText={inputRef?.current?.validationMessage}
            // helperText={imageUrlValidateText}
            onChange={handleChangeImageUrlh2}
            size="small"
            fullWidth
          />
          <TextField
            // error={imageUrlError}
            inputProps={{ pattern: "^[a-zA-Z0-9_]+$" }}
            placeholder="wiki"
            // defaultValue=""
            defaultValue={Props.product.imageUrlh3}
            id="outlined-basic"
            label="wiki"
            variant="outlined"
            // helperText={inputRef?.current?.validationMessage}
            // helperText={imageUrlValidateText}
            onChange={handleChangeImageUrlh3}
            size="small"
            fullWidth
          />
          <TextField
            // error={imageUrlError}
            inputProps={{ pattern: "^[a-zA-Z0-9_]+$" }}
            placeholder="wikiEn"
            // defaultValue=""
            defaultValue={Props.product.wikiEn}
            id="outlined-basic"
            label="wikiEn"
            variant="outlined"
            // helperText={inputRef?.current?.validationMessage}
            // helperText={imageUrlValidateText}
            onChange={handleChangeImageUrl4}
            size="small"
            fullWidth
          />
          <TextField
            // error={imageUrlError}
            inputProps={{ pattern: "^[a-zA-Z0-9_]+$" }}
            placeholder="copyright"
            // defaultValue=""
            defaultValue={Props.product.copyright}
            id="outlined-basic"
            label="copyright"
            variant="outlined"
            // helperText={inputRef?.current?.validationMessage}
            // helperText={imageUrlValidateText}
            onChange={handleChangeImageUrl5}
            size="small"
            fullWidth
          />
          <TextField
            // error={imageUrlError}
            inputProps={{ pattern: "^[0-9_]+$" }}
            placeholder="annictId"
            // defaultValue=""
            defaultValue={Props.product.annitictId}
            id="outlined-basic"
            label="annitictId"
            variant="outlined"
            value={annitictId}
            // helperText={inputRef?.current?.validationMessage}
            // helperText={imageUrlValidateText}
            onChange={handleChangeImageUrl6}
            size="small"
            fullWidth
          />
          <TextField
            // error={imageUrlError}
            inputProps={{ pattern: "^[0-9_]+$" }}
            placeholder="shoboiTid"
            // defaultValue=""
            defaultValue={Props.product.shoboiTid}
            id="outlined-basic"
            label="shoboiTid"
            variant="outlined"
            value={shoboiTid}
            // helperText={inputRef?.current?.validationMessage}
            // helperText={imageUrlValidateText}
            onChange={handleChangeImageUrl7}
            size="small"
            fullWidth
          />

          <TextField
            error={listError}
            inputProps={{ maxLength: 1000, pattern: "^[a-zA-Z0-9_]+$" }}
            placeholder="公式サイトURLを入力してください"
            defaultValue={Props.product.list}
            id="outlined-basic"
            label="Site URL"
            variant="outlined"
            // helperText={inputRef?.current?.validationMessage}
            helperText={listValidateText}
            onChange={handleChangeList}
            size="small"
            fullWidth
          />
          
          {/* <TextField
            error={titleError}
            inputProps={{ maxLength: 1000, pattern: "^[a-zA-Z0-9_]+$" }}
            placeholder="ImageUrlを入力してください(base64以外の画像リンク）"
            defaultValue=""
            id="outlined-basic"
            label="Arasuzi"
            variant="outlined"
            // helperText={inputRef?.current?.validationMessage}
            helperText={titleValidateText}
            onChange={handleChangetext}
            size="small"
            fullWidth
          /> */}
          
          現在の文字数{arasuziLength}
          {/* {value} */}
          {/* {value.replace(/(<p>\s+<\/p>){1,}/g,"").replace(/(<p><\/p>){1,}/g,"<p></p>").replace(/(<p><br><\/p>){2,}/g,"<p><br></p>")} */}
          {/* {value.replace(/\s/g,"").replaceAll("<p><br></p>","").replaceAll("<p></p>", '')} */}
          <FormHelperText className = "helpertexts">{arasuziValidationText}</FormHelperText>
          <ReactQuill 
            className = "adminProductDescriptionQuill"
            ref={quillref}
            modules={modules} 
            // value={value.replace(/\s/g,"").replace(/(<p><\/p>){1,}/g,"<p><br></p>").replace(/(<p><br><\/p>){2,}/g,"<p><br></p>")} 
            // value={value.replace(/(<p>\s+<\/p>){1,}/g,"").replace(/(<p><br><\/p>){2,}/g,"<p><br></p>")} 
            value={value.replace(/(\s+){2,}/g," ").replace(/(<p>\s+<\/p>){1,}/g,"<p><br></p>").replace(/(<p><\/p>){1,}/g,"<p><br></p>").replace(/(<p><br><\/p>){2,}/g,"<p><br></p>")} 


            // onChange={handleChange}  
            theme="bubble"
            placeholder="preview"
            readOnly={true}
            
          />
          <ReactQuill 
            className = "adminProductDescriptionQuill"
            ref={quillref}
            modules={modules} value={value} onChange={handleChange}  
            theme="snow"
            placeholder="あらすじ(300文字以内)"
            
          />

          {/* <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              error={yearError}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={year}
              label="Year"
              onChange={handleChangeYear}
              size="small"
            >
              {yearList.map((item,index)=>{
                return(
                <MenuItem value={item} key={index}>{item}</MenuItem>
                )
              })}
            </Select>
            <FormHelperText className = "helpertexts">{yearValidationText}</FormHelperText>
          </FormControl> */}


          {/* <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">季節</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={kisetsu}
              label="季節"
              multiple
              onChange={handleChangeKisetsu}
              size="small"
              error={kisetsuError}
            > 
              <MenuItem value={"1"} >All</MenuItem>
              <MenuItem value={"2"} >春</MenuItem>
              <MenuItem value={"3"} >夏</MenuItem>
              <MenuItem value={"4"} >秋</MenuItem>
              <MenuItem value={"5"} >冬</MenuItem>
              <MenuItem value={"6"} >不定期</MenuItem>
            </Select>
            <FormHelperText className = "helpertexts">{kisetsuValidationText}</FormHelperText>
          </FormControl> */}

          {/* <TextField
            error={durationError}
            inputProps={{ maxLength: 10, pattern: "^[a-zA-Z0-9_]+$" }}
            placeholder=""
            defaultValue=""
            id="outlined-basic"
            label="Site URL"
            variant="outlined"
            // helperText={inputRef?.current?.validationMessage}
            helperText={listValidateText}
            onChange={handleChangetext}
            size="small"
            fullWidth
          /> */}
           <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              error={yearsError}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={years}
              multiple
              label="Year"
              onChange={handleChangeYears}
              size="small"
            >
              {yearList.map((item,index)=>{
                return(
                <MenuItem value={String(item)} key={index}>{item}</MenuItem>
                )
              })}
            </Select>
            <FormHelperText className = "helpertexts">{yearValidationText}</FormHelperText>
          </FormControl>

          {years.map((item,index)=>{
           return(
             <YearSeasonsCreate
              key={item}
              index = {index}
              item = {item}
              yearSeason = {yearSeason}
              setYearSeason = {setYearSeason}
              childFunc01 = {childFunc01}
             />
           ) 
          })}

           <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              // readOnly={true}
              // disabled={true}
              
              label="配信開始"
              // onError={console.log("aaaaaaaaaaaaaaa")}
              // disable
              onError={handlererror}
              // type="datetime-local"
              value={deliveryStart}
              onChange={(newValue) => {
                setDeliveryStart(newValue)
                setDeliveryStartValidationText("")

              }}
              renderInput={(params) => 
                <TextField 
                  {...params}
                 />}
            />
          </LocalizationProvider>
          <FormHelperText className = "helpertexts">{deliveryStartValidationText}</FormHelperText>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              
            <DateTimePicker
              label="配信終了"
              onError={console.log}
              // type="datetime-local"
              value={deliveryEnd}
              onChange={(newValue) => {
                setDeliveryEnd(newValue)
                setDeliveryEndValidationText("")


              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <FormHelperText className = "helpertexts">{deliveryEndValidationText}</FormHelperText>
         

        </div>
      </div>
      :
      <>
      </>
      }
    </>
  )
}