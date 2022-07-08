import { FormControl, FormHelperText, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField } from "@mui/material"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { product, productForm } from "@/interfaces/product";
import { YearSeasonsEdit } from "./YearSeasonsEdit";
import { DefaultPasteForTitle } from "@/lib/ini/quill/QuillEffectForTitle";
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

type Props = {
  activeStep : number
  childFunc: React.MutableRefObject<any>

  completed: {[k: number]: boolean;}
  setCompleted:React.Dispatch<React.SetStateAction<{[k: number]: boolean;}>>
  handleNext: () => void
  setProduct: React.Dispatch<React.SetStateAction<form_product>>
  product: form_product

  formProduct: productForm
}

type form_product = {
  title:string
  imageUrl:string
  description:string
  list:string | undefined
  year:string
  years:string[]
  kisetsu:string[]
  delivery_start:Date | null
  delivery_end:Date | null

  imageUrl2:string | undefined
  imageUrl3:string | undefined
  imageUrlh1:string | undefined
  imageUrlh2:string | undefined
  imageUrlh3:string | undefined

  wikiEn:string | undefined
  copyright:string | undefined
  annitictId:number | undefined
  shoboiTid:number | undefined

  yearSeason:year_season[]
  overview:string | undefined
}

type year_season = {
  year:string
  season:string[]
}



export const ProductFormList1Edit:React.FC<Props> = (Props) => {
  // const a = useMemo(()=>{
  //   DefaultPasteForTitle()
  // },[])
  // a
  // DefaultPasteForTitle()
  // -------------------
  // const YearSeasonSetHandle = () => {
  //   Props.formProduct.formYearSeason.map((item)=>{
  //     item.
  //   })
  // }
  
  useEffect(()=>{
    handleSetUpYear()
  },[])
  // console.log(Props)
  // console.log(Props.formProduct.formYearSeason)
  // console.log(yearSeason)
  const [yearSeason,setYearSeason] = useState<year_season[]>(Props.formProduct.formYearSeason)
  const childFunc01 = useRef<any>([])
  // console.log(yearSeason)
 
  // productTitle------------------------------
    const [title,setTitle] = useState<string | undefined>(Props.formProduct.title)
    const [titleError,setTitleError] = useState<boolean>()
    const [titleValidateText,setValidateText] = useState<string>()
    const handleChangetext = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
      setTitle(e?.currentTarget.value)
      setTitleError(false)
      setValidateText("")
    }
  // imageUrl-----------------------------------

  const [imageUrl,setImageUrl] = useState<string | undefined>(Props.formProduct.imageUrl)
  const [imageUrlError,setImageUrlEroor] = useState<boolean>()
  const [imageUrlValidateText,setImageUrlValidateText] = useState<string>()
  const handleChangeImageUrl = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    setImageUrl(e?.currentTarget.value)
    setImageUrlEroor(false)
    setImageUrlValidateText("")
  }

   // imageUrl2~-----------------------------------

   const [imageUrl2,setImageUrl2] = useState<string | undefined>(Props.formProduct.imageUrl2)
   const handleChangeImageUrl2 = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
     setImageUrl2(e?.currentTarget.value)
   }
   const [imageUrl3,setImageUrl3] = useState<string | undefined>(Props.formProduct.imageUrl3)
   const handleChangeImageUrl3 = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
     setImageUrl3(e?.currentTarget.value)
   }
   const [imageUrlh1,setImageUrlh1] = useState<string | undefined>(Props.formProduct.imageUrlh1)
   const [imageUrlErrorh1,setImageUrlEroorh1] = useState<boolean>()
   const [imageUrlValidateTexth1,setImageUrlValidateTexth1] = useState<string>()
   const handleChangeImageUrlh1 = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
     setImageUrlh1(e?.currentTarget.value)
     setImageUrlEroorh1(false)
     setImageUrlValidateTexth1("")
   }
   const [imageUrlh2,setImageUrlh2] = useState<string | undefined>(Props.formProduct.imageUrlh2)
   const handleChangeImageUrlh2 = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    setImageUrlh2(e?.currentTarget.value)
   }
   const [imageUrlh3,setImageUrlh3] = useState<string | undefined>(Props.formProduct.imageUrlh3)
   const handleChangeImageUrlh3 = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
     setImageUrlh3(e?.currentTarget.value)
   }
    //  add annict 関係
  const [wikiEn,setwikiEn] = useState<string | undefined>(Props.formProduct.wikiEn)
  const handleChangeImageUrl4 = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    setwikiEn(e?.currentTarget.value)
  }
  const [copyright,setCopyright] = useState<string | undefined>(Props.formProduct.copyright)
  const handleChangeImageUrl5 = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    setCopyright(e?.currentTarget.value)
  }
  const [annitictId,setAnnitictId] = useState<number | undefined>(Props.formProduct.annitictId)
  const handleChangeImageUrl6 = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    if(e?.currentTarget.value!=undefined&&e?.currentTarget.value.length>0){
   const num = Number(e?.currentTarget.value.replace(/[^0-9]/g, ''))
     setAnnitictId(Number(e?.currentTarget.value.replace(/[^0-9]/g, '')))
    }else{
     setAnnitictId(undefined)
    }
  }
  const [shoboiTid,setShoboiTid] = useState<number | undefined>(Props.formProduct.shoboiTid)
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
  const [value,setValue] = useState<string>(Props.formProduct.arasuzi)
  const [arasuziValidationText,setArasuziValidationText] = useState<string>("")
  const [arasuziLength,setArasuziLength]= useState<number>()


  const underlineWavyHandler = () => {
    const editor = quillref.current.getEditor()
    const range = editor.getSelection()

    if(range!=null){
      editor.format('textdecorationcolor',"#ff9900")
      quillref.current.getEditor().getFormat(range).UnderlineWavy==true?editor.format('UnderlineWavy',false):editor.format('UnderlineWavy',true)
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
      // [{my:[]}]
      // ['UnderlineWavy'],
      // ['UnderlineWavy','UnderlineWavy2','UnderlineWavy3'],
      // ["link", "image", "video"],
      // ['netflix'],
      // ['boxcontents'],   
    ],
    handlers: {
      // UnderlineWavy:underlineWavyHandler,
    },
    clipboard: {
      matchVisual: false
      }
    },
  }
  ),[]);
  const handleChange = (content: string):void | undefined => {
    const editor = quillref.current?.getEditor()
    setValue(content)
    setArasuziLength(editor.getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length)
    // if(editor.getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length>300){
    //   setArasuziValidationText("300字までです。")
    // }else{
    setArasuziValidationText("")
    // }
  }
  // list-------------------------------------------------------
  const [list,setList] = useState<string | undefined>(Props.formProduct.list)
  const [listError,setListEroor] = useState<boolean>()
  const [listValidateText,setListValidateText] = useState<string>()
  const handleChangeList = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    setList(e?.currentTarget.value)
    setListEroor(false)
    setListValidateText("")
  }
  // year-----------------------------------------------
  const [year,setYear] = useState<string>(Props.formProduct.year)
  const [yearValidationText,setYearValidationText] = useState<string>("")
  const [yearError,setYearError] = useState<boolean>(false)

  const [yearList,setYearList] = useState<number[]>([])
  const today = new Date()
  const l = today.getFullYear()
  // today.
  const [years,setYears] = useState<string[]>([])
  const handleSetUpYear = () => {
    const array:number[] = []
    for(let i = 1990; i < l+1; i++) {
      array.push(i)
      // if (i === l) {
      //   break;
      // }
    }
    setYearList(array)
    setYears(Props.formProduct.formYearSeason.map(item=>String(item.year)))
  }
  

  const handleChangeYear = (e:SelectChangeEvent) => {
    setYear(e.target.value as string)
    setYearValidationText("")
    setYearError(false)
  }
  // year2-----------------------------------------------
  const [yearsValidationText,setYearsValidationText] = useState<string>("")
  const [yearsError,setYearsError] = useState<boolean>(false)

  const [yearsList,setYearsList] = useState<number[]>([])
  const handleChangeYears= (e:SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = e;
    setYears(
      typeof value === 'string' ? value.split(',') : value,
    );
    setYearsValidationText("")
    setYearsError(false)
    const character_filter = yearSeason.filter(item => value.includes(item.year))
    childFunc01.current = childFunc01.current.filter((item:any) => value.includes(item.id))
    setYearSeason(character_filter)
  }

  // kisetsu--------------------------------------------------------
  const [kisetsu,setKisetsu] = useState<string[]>(Props.formProduct.productKisetsu.map(item=>String(item.id)))
  const [kisetsuValidationText,setKisetsuValidationText] = useState<string>("")
  const [kisetsuError,setKisetsuError] = useState<boolean>(false)

  // delivery-end start--------------------------------------
  const [deliveryEnd, setDeliveryEnd] = useState<Date | null>(Props.formProduct.deliveryEnd!=undefined?new Date(Props.formProduct.deliveryEnd):null);
  const [deliveryStart, setDeliveryStart] = useState<Date | null>(Props.formProduct.deliveryStart!=undefined?new Date(Props.formProduct.deliveryStart):null);

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

  // v2.0 overview ---------------------------------------------------
  const quillref2  = useRef<any>(undefined!)
  const [overview,setOverview] = useState<string>(Props.formProduct.overview)
  const [overviewValidationText,setOverviewValidationText] = useState<string>("")
  const [overviewLength,setOverviewLength]= useState<number>()

  const handleChangeOverview = (content: string):void | undefined => {
    const editor = quillref2.current?.getEditor()
    setOverview(content)
    setOverviewLength(editor.getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length)
    if(editor.getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length>3000){
      setOverviewValidationText("3000字までです。")
    }else{
    setOverviewValidationText("")
    }
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

    
    const blob = new Blob([value])
    const editor = quillref.current?.getEditor()
    // if(editor.getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length>300){
    //   setArasuziValidationText("300文字までです。")
    //   return
    // }
    // else 
    if(editor.getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length==0){
      setArasuziValidationText("入力されていません。")
      return
    }
    // if(blob.size>3000){
    //   setArasuziValidationText("サイズが大きすぎます。")
    //   return
    // }

    // if(year==""){
    //   setYearValidationText("選択されていません")
    //   setYearError(true)
    //   return
    // } 

    // if(kisetsu.length==0){
    //   setKisetsuValidationText("選択されていません。")
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
    // --------------------------------------------------------------------
    const array:number[] = []
    childFunc01.current.map((i:Function,index:number)=>
    array.push(childFunc01.current[index].func())
    // childFunc01.current[index]()
    )

    let total = array.reduce(function(sum, element){
      return sum + element;
    }, 0);

    if(total>0){
      return
    }


    // ---------------------------------------------------------------------
    // if(isInvalidDate(deliveryStart)){
    //   setDeliveryStartValidationText("適切な形で入力してください。")
    //   return
    // }
    // if(isInvalidDate(deliveryEnd)){
    //   setDeliveryEndValidationText("適切な形で入力してください。")
    //   return
    // }
    // doneyet-1 (エラー表示がまだ)
    if (yearSeason==undefined)return
    // console.log(deliveryStart)
    Props.setProduct({
      title:title,
      imageUrl:imageUrl,
      description:value!=undefined?value.replace(/(\s+){2,}/g," ").replace(/(<p>\s+<\/p>){1,}/g,"<p><br></p>").replace(/(<p><\/p>){1,}/g,"<p><br></p>").replace(/(<p><br><\/p>){2,}/g,"<p><br></p>"):"",
      list:list,
      year:year,
      years:years,
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

      yearSeason:yearSeason,
      overview:overview
    })

    // return
    const newCompleted = Props.completed
    newCompleted[Props.activeStep] = true
    Props.setCompleted(newCompleted)
    Props.handleNext();
    // Props.setCompleted({[0]:true})
    

  }

  const handlererror = () => {
  }

  // doneyet-1(このやり方が推奨かどうかわからない)
  Props.childFunc.current = handleErrorCheck

  // console.log(Props.product)
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
            defaultValue={Props.formProduct!=undefined?Props.formProduct.title:"a"}
            id="outlined-basic"
            label="Title"
            variant="outlined"
            helperText={titleValidateText}
            onChange={handleChangetext}
            size="small"
            fullWidth
          />
          <TextField
            error={imageUrlError}
            inputProps={{ maxLength: 1000, pattern: "^[a-zA-Z0-9_]+$" }}
            placeholder="ImageUrlを入力してください(base64以外の画像リンク）"
            defaultValue={Props.formProduct.imageUrl}
            id="outlined-basic"
            label="ImageUrl"
            variant="outlined"
            helperText={imageUrlValidateText}
            onChange={handleChangeImageUrl}
            size="small"
            fullWidth
          />
          <TextField
            inputProps={{ maxLength: 1000, pattern: "^[a-zA-Z0-9_]+$" }}
            placeholder="ImageUrlを入力してください(base64以外の画像リンク）"
            defaultValue={Props.formProduct.imageUrl2}
            id="outlined-basic"
            label="ImageUrl2"
            variant="outlined"
            onChange={handleChangeImageUrl2}
            size="small"
            fullWidth
          />
          <TextField
            error={imageUrlError}
            inputProps={{ maxLength: 1000, pattern: "^[a-zA-Z0-9_]+$" }}
            placeholder="title Ka"
            defaultValue={Props.formProduct.imageUrl3}
            id="outlined-basic"
            label="title Ka"
            variant="outlined"
            helperText={imageUrlValidateText}
            onChange={handleChangeImageUrl3}
            size="small"
            fullWidth
          />
          <TextField
            error={imageUrlErrorh1}
            inputProps={{ pattern: "^[a-zA-Z0-9_]+$" }}
            placeholder="title En"
            defaultValue={Props.formProduct.imageUrlh1}
            id="outlined-basic"
            label="title En"
            variant="outlined"
            onChange={handleChangeImageUrlh1}
            size="small"
            fullWidth
          />
          <TextField
            inputProps={{ pattern: "^[a-zA-Z0-9_]+$" }}
            placeholder="title Ro"
            defaultValue={Props.formProduct.imageUrlh2}
            id="outlined-basic"
            label="title Ro"
            variant="outlined"
            onChange={handleChangeImageUrlh2}
            size="small"
            fullWidth
          />
          <TextField
            inputProps={{ pattern: "^[a-zA-Z0-9_]+$" }}
            placeholder="wiki"
            defaultValue={Props.formProduct.imageUrlh3}
            id="outlined-basic"
            label="wiki"
            variant="outlined"
            onChange={handleChangeImageUrlh3}
            size="small"
            fullWidth
          />

            <TextField
            inputProps={{ pattern: "^[a-zA-Z0-9_]+$" }}
            placeholder="wikiEn"
            defaultValue={Props.formProduct.wikiEn}
            id="outlined-basic"
            label="wikiEn"
            variant="outlined"
            onChange={handleChangeImageUrl4}
            size="small"
            fullWidth
          />
          <TextField
            inputProps={{ pattern: "^[a-zA-Z0-9_]+$" }}
            placeholder="copyright"
            defaultValue={Props.formProduct.copyright}
            id="outlined-basic"
            label="copyright"
            variant="outlined"
            onChange={handleChangeImageUrl5}
            size="small"
            fullWidth
          />
          <TextField
            inputProps={{ pattern: "^[0-9_]+$" }}
            placeholder="annictId"
            defaultValue={Props.formProduct.annitictId}
            id="outlined-basic"
            label="annitictId"
            variant="outlined"
            value={annitictId}
            onChange={handleChangeImageUrl6}
            size="small"
            fullWidth
          />
          <TextField
            inputProps={{ pattern: "^[0-9_]+$" }}
            placeholder="shoboiTid"
            defaultValue={Props.formProduct.shoboiTid}
            id="outlined-basic"
            label="shoboiTid"
            variant="outlined"
            value={shoboiTid}
            onChange={handleChangeImageUrl7}
            size="small"
            fullWidth
          />

          <TextField
            error={listError}
            inputProps={{ maxLength: 1000, pattern: "^[a-zA-Z0-9_]+$" }}
            placeholder="公式サイトURLを入力してください"
            defaultValue={Props.formProduct.list}
            id="outlined-basic"
            label="Site URL"
            variant="outlined"
            helperText={listValidateText}
            onChange={handleChangeList}
            size="small"
            fullWidth
          />
          現在の文字数{arasuziLength}
          <FormHelperText className = "helpertexts">{arasuziValidationText}</FormHelperText>
          <ReactQuill 
            className = "adminProductDescriptionQuill"
            ref={quillref}
            modules={modules} 
            value={value!=undefined?value.replace(/(\s+){2,}/g," ").replace(/(<p>\s+<\/p>){1,}/g,"<p><br></p>").replace(/(<p><\/p>){1,}/g,"<p><br></p>").replace(/(<p><br><\/p>){2,}/g,"<p><br></p>"):value} 
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
            <InputLabel id="demo-simple-select-label">開始年</InputLabel>
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
          {/* 2.0 */}
          {years.map((item,index)=>{
            return(
              <YearSeasonsEdit
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
            <DatePicker
              label="配信開始"
              onError={handlererror}
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
            <DatePicker
              label="配信終了"
              value={deliveryEnd}
              onChange={(newValue) => {
                setDeliveryEnd(newValue)
                setDeliveryEndValidationText("")
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <FormHelperText className = "helpertexts">{deliveryEndValidationText}</FormHelperText>
          現在の文字数{overviewLength}
          <FormHelperText className = "helpertexts">{overviewValidationText}</FormHelperText>
          <ReactQuill 
            className = "adminProductDescriptionQuill"
            ref={quillref2}
            modules={modules} 
            value={overview!=undefined?overview.replace(/(\s+){2,}/g," ").replace(/(<p>\s+<\/p>){1,}/g,"<p><br></p>").replace(/(<p><\/p>){1,}/g,"<p><br></p>").replace(/(<p><br><\/p>){2,}/g,"<p><br></p>"):overview} 
            theme="bubble"
            placeholder="preview"
            readOnly={true}
          />
          <ReactQuill 
            className = "adminProductDescriptionQuill"
            ref={quillref2}
            modules={modules} value={overview} onChange={handleChangeOverview}  
            theme="snow"
            placeholder="概要・見所(3000文字以内)"
          />
        </div>
      </div>
      :
      <>
      </>
      }
    </>
  )
}