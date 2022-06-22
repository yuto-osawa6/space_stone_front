import { IoSearchCircle } from 'react-icons/io5'
import React, {useEffect,useRef,useState } from "react"
import { Button,  FormControl,  FormControlLabel,  FormHelperText,  FormLabel,  InputLabel,  MenuItem,  Modal, Radio, RadioGroup,Select, SelectChangeEvent } from "@mui/material";
import { execAdminSearchProduct, execAdminSetYears } from "@/lib/api/admin/product";
import InfiniteScroll from "react-infinite-scroller";
import { product } from "@/interfaces/product";
import { useSelector } from "react-redux";
import { PublishedAll } from "./PublishedAll";
import { AdminProductGrid } from "./AdminProductGrid";
import { RootState } from '@/store';
import { useRouter } from 'next/router';
import { AdminsAddProduct } from '../product/AdminsAddProduct';
import { AdminNews } from '../news/AdminNews';
import { AdminsArticle } from '../article/AdminsArticle';
import { AdminDataInfo } from '../datainfo/AdminDataInfo';

type q = {
  title_cont:string,
  finished_true:number|undefined,
  year_season_seasons_id_in:string[],
  year_season_years_id_in:string[]
}
type year = {
  id:number
  year:string
}

export const AdminsTop:React.FC = () => {
  const [open1,setOpen1] = useState<boolean>(false)
  const [open2,setOpen2] = useState<boolean>(false)
  const [open3,setOpen3] = useState<boolean>(false)
  const [open4,setOpen4] = useState<boolean>(false)
  const router = useRouter()
  const handleAdminArticle = () => {
    setOpen2(true)
  }
  const handleAdminAddProducts = () => {
    setOpen1(true)
  }
  const handleAdminNewMessage = () => {
    setOpen3(true)
  }
//  -search
  const [products,setProducts] = useState<product[]>([])
  const [data, setData] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setData(value);
}
const [valueRadio,setvalueRadio] = useState<number>()
const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
  setvalueRadio(Number(e.target.value))
}
const [seasons,setSeasons] = useState<string[]>([])
const season = [{k:"冬",i:5},{k:"春",i:2},{k:"夏",i:3},{k:"秋",i:4}]
const handleChangeSeasons= (e:SelectChangeEvent<string[]>) => {
  const {
    target: { value },
  } = e;
  setSeasons(
    typeof value === 'string' ? value.split(',') : value,
  )
}
const  handleFirstYear = async() => {
  const res = await execAdminSetYears()
  if(res.status === 200){
    setDefaultYears(res.data.years)
  }else{
  }
}

const [years,setYears] = useState<string[]>([])
const [defaultYears,setDefaultYears] = useState<year[]>([])
const handleChangeYears= (e:SelectChangeEvent<string[]>) => {
  const {
    target: { value },
  } = e;
  setYears(
    typeof value === 'string' ? value.split(',') : value,
  )
}
// search 
const handleSearch = async() => {
  const search:q = {
    title_cont:data,
    finished_true:valueRadio,
    year_season_seasons_id_in:seasons,
    year_season_years_id_in:years
  }
  const res = await execAdminSearchProduct(search,1)
  if(res.status===200){
    setProducts(res.data.products)
    setFirstloding(true)
    setPage(1)
    setHasMore(true)
  }else{ 
  }
}

useEffect(()=>{
  handleFirstYear()
},[])
useEffect(()=>{
  const timer = setTimeout(() => {
  handleSearch()
  },500)
  return () => clearTimeout(timer)
},[data,seasons,years,valueRadio])
// infinity scroll
const [hasMore, setHasMore] = useState(true); 
const [page,setPage] = useState<number>(1)
const [firstloding,setFirstloding] = useState<boolean>(false);
const [loaded,setLoaded] = useState<boolean>(false)
const grid = useSelector((state: RootState) => state.grid);
const handleScrollingExec = async () => {
  setLoaded(true)
  if(loaded==true)return
  const search:q = {
    title_cont:data,
    finished_true:valueRadio,
    year_season_seasons_id_in:seasons,
    year_season_years_id_in:years
  }
  const res = await execAdminSearchProduct(search,page+1)
  if (res.status === 200) {
    setPage(page+1)
    if (res.data.products.length < 1) {
      setHasMore(false);
      setLoaded(false)
      return;
    }
    setProducts( [...products, ...res.data.products])
    setLoaded(false)
  }
}
const loader =<div className="loader" key={0}>Loading ...</div>;
// まとめて公開
const [openPublishedAll,setOpenPublishedAll] = useState<boolean>(false)

return(
  <>
    <div className=""
    style={{margin:"20px",}}
    >
      
      <div className=""
      style={{
        display:"flex",
        gap:"10px",
        color:"rgb(55, 136, 216)",
      }}
      >
        <div className = "admin_kizi"
        onClick={handleAdminAddProducts}
        >
          プロダクトの追加
        </div>
        <div className = "admin_kizi"
        onClick={handleAdminArticle}
        >
          記事を書く
        </div>
        <div className = "admin_kizi"
        onClick={handleAdminNewMessage}
        >
          おしらせの追加
        </div>
        <div className = "admin_kizi"
        onClick={()=>setOpen4(true)}
        >
          データー公開情報の編集
        </div>
        <div className = "admin_kizi"
        onClick={()=>setOpenPublishedAll(true)}
        >
          まとめて公開
        </div>
      </div>
      <div className =""
        style={{marginTop:"20px"}}>
        Product List
      </div>
      <div className="">
        <div className = "search__input__box"
        style={{margin:"10px"}}
        >
        <IoSearchCircle/>
          <input 
          style={{width:"90%",outline:"none"}}
          type="text" 
          name="name" 
          placeholder="タイトルを入力してください"
          value={data}
          autoComplete="off"
          onChange={handleChange}
          />
        </div>
        <div className=""
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}
        >
        <FormControl >
          <FormLabel id="demo-radio-buttons-group-label">非公開</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            value={valueRadio}
            onChange={handleRadioChange}
            style={{
              display:"flex",
              flexFlow:"nowrap"
            }}
          >
            <FormControlLabel value="0" control={<Radio />} label="true" />
            <FormControlLabel value="1" control={<Radio />} label="false" />
          </RadioGroup>
        </FormControl>
        <FormControl
          style={{
            width:"200px",
          }}
          size="small"
          >
          <InputLabel id="demo-simple-select-label">Seasons Select</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={seasons}
            multiple
            label="Seasons Select"
            onChange={handleChangeSeasons}
            size="small"
          >
            {season.map((item,index)=>{
              return(
              <MenuItem value={item.i} key={index}>{item.k}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <FormControl
          style={{
            width:"200px",
          }}
          size="small"
          >
          <InputLabel id="demo-simple-select-label">Years Select</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={years}
            multiple
            label="Seasons Select"
            onChange={handleChangeYears}
            size="small"
          >
            {defaultYears.map((item,index)=>{
              return(
              <MenuItem value={item.id} key={item.id}>{item.year.slice(0,4)}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
        </div>
      </div>
      <div className = "products_header">
        <div className = "products_contents">
          <div className = "products_contents_list"
          >
          </div>
        </div>
      </div>
      {firstloding&&( 
        <InfiniteScroll
            className = "products_infinitescroll03  ToptensContainerGrid"
            loadMore={handleScrollingExec}    //項目を読み込む際に処理するコールバック関数
            hasMore={hasMore}         //読み込みを行うかどうかの判定
            loader={loader}>   
            {products.map((item: product)=>{
              return(     
                  <AdminProductGrid
                  key={item.id}
                  product = {item}
                  />
              )
          })}
          </InfiniteScroll>
          )}
    </div>
    {open1==true&&(
      <AdminsAddProduct
      open = {open1}
      setOpen = {setOpen1}
      />
    )}
    {open2==true&&(
      <AdminsArticle
      open = {open2}
      setOpen = {setOpen2}
      />
    )}
    {open3==true&&(
      <AdminNews
      open = {open3}
      setOpen = {setOpen3}
      />
    )}
    {open4 == true &&(
      <AdminDataInfo
      open = {open4}
      setOpen = {setOpen4}
      />
    )}
    {openPublishedAll==true&&(
      <PublishedAll
        defaultYears = {defaultYears}
        openPublishedAll = {openPublishedAll}
        setOpenPublishedAll = {setOpenPublishedAll}
      />
    )}
  </>
)
}