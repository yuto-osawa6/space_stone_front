import { FormControl, FormHelperText, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField } from "@mui/material"
import { useEffect, useMemo, useRef, useState } from "react"
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { YearSeasonsCreate } from "./YearSeasonsCreate";

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
  // productTitle------------------------------
  const [title,setTitle] = useState<string | undefined>(Props.product.title)
  const [titleError,setTitleError] = useState<boolean>()
  const [titleValidateText,setValidateText] = useState<string>()
  const handleChangetext = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    setTitle(e?.currentTarget.value)
    setTitleError(false)
    setValidateText("")
  }
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
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      ["blockquote"],
      ["code-block"],
      [{ list:  "ordered" }, { list:  "bullet" }],
      [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
      ['netflix'],
      ['boxcontents'],   
    ],
    handlers: {
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
    }
    setYearList(array)
  }
  const handleChangeYear = (e:SelectChangeEvent) => {
    setYear(e.target.value as string)
    setYearValidationText("")
    setYearError(false)
  }
  // kisetsu--------------------------------------------------------
  const [kisetsu,setKisetsu] = useState<string[]>([])
  const [kisetsuValidationText,setKisetsuValidationText] = useState<string>("")
  const [kisetsuError,setKisetsuError] = useState<boolean>(false)
  // delivery-end start--------------------------------------
  const [deliveryEnd, setDeliveryEnd] = useState<Date | null>(null);
  const [deliveryStart, setDeliveryStart] = useState<Date | null>(null);
  const [deliveryStartValidationText,setDeliveryStartValidationText] = useState<string>("")
  const [deliveryEndValidationText,setDeliveryEndValidationText] = useState<string>("")
  const handleChangeKisetsu = (e:SelectChangeEvent<string[]>) => { 
    const {
      target: { value },
    } = e;
    setKisetsu(
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
    const blob = new Blob([value])
    const editor = quillref.current?.getEditor()
    if(editor.getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length>300){
      setArasuziValidationText("300文字までです。")
      return
    }else if(editor.getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length==0){
      setArasuziValidationText("入力されていません。")
      return
    }
    if(blob.size>3000){
      setArasuziValidationText("サイズが大きすぎます。")
      return
    }
    // --------------------------------------------------------------------
    const array:number[] = []
    childFunc01.current.map((i:Function,index:number)=>
    array.push(childFunc01.current[index].func())
    )
    let total = array.reduce(function(sum, element){
      return sum + element;
    }, 0);
    if(total>0){
      return
    }

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
    const newCompleted = Props.completed
    newCompleted[Props.activeStep] = true
    Props.setCompleted(newCompleted)
    Props.handleNext();
  }
  const handlererror = () => {
  }
  // doneyet-1(このやり方が推奨かどうかわからない)
  Props.childFunc.current = handleErrorCheck
  // year2-----------------------------------------------
  const [yearSeason,setYearSeason] = useState<year_season[]>([])
  const childFunc01 = useRef<any>([])
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
            defaultValue={Props.product.title}
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
            defaultValue={Props.product.imageUrl}
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
            defaultValue={Props.product.imageUrl2}
            id="outlined-basic"
            label="ImageUrl2"
            variant="outlined"
            onChange={handleChangeImageUrl2}
            size="small"
            fullWidth
          />
          <TextField
            inputProps={{ maxLength: 1000, pattern: "^[a-zA-Z0-9_]+$" }}
            placeholder="title Ka"
            defaultValue={Props.product.imageUrl3}
            id="outlined-basic"
            label="title Ka"
            variant="outlined"
            onChange={handleChangeImageUrl3}
            size="small"
            fullWidth
          />
          <TextField
            error={imageUrlErrorh1}
            inputProps={{ pattern: "^[a-zA-Z0-9_]+$" }}
            placeholder="title En"
            defaultValue={Props.product.imageUrlh1}
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
            defaultValue={Props.product.imageUrlh2}
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
            defaultValue={Props.product.imageUrlh3}
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
            defaultValue={Props.product.wikiEn}
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
            defaultValue={Props.product.copyright}
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
            defaultValue={Props.product.annitictId}
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
            defaultValue={Props.product.shoboiTid}
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
            defaultValue={Props.product.list}
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
            value={value.replace(/(\s+){2,}/g," ").replace(/(<p>\s+<\/p>){1,}/g,"<p><br></p>").replace(/(<p><\/p>){1,}/g,"<p><br></p>").replace(/(<p><br><\/p>){2,}/g,"<p><br></p>")} 
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
        </div>
      </div>
      :
      <>
      </>
      }
    </>
  )
}