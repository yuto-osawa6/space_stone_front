// import { useLocation, useNavigate } from "react-router";
import { IoSearchCircle } from 'react-icons/io5'
import React, {useEffect,useRef,useState } from "react"
import { Button,  FormControl,  FormControlLabel,  FormHelperText,  FormLabel,  InputLabel,  MenuItem,  Modal, Radio, RadioGroup,Select, SelectChangeEvent } from "@mui/material";
import { execAdminSearchProduct, execAdminSetYears } from "lib/api/admin/product";
import InfiniteScroll from "react-infinite-scroller";
import { product } from "interfaces/product";
import { useSelector } from "react-redux";
import { RootState } from "store";
// import { GridProduct04 } from "component/main/grid/GridProduct04";
// import { GridProduct03 } from "component/main/grid/GridProduct03";
// import { GridProduct02 } from "component/main/grid/GridProduct02";
// import { GridProducts } from "component/main/GridProduct";
import { PublishedAll } from "./PublishedAll";
import { AdminProductGrid } from "./AdminProductGrid";


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
  // const navigate = useNavigate();
 const handleAdminArticle = () => {
  // navigate("/admins/article")
 }

 const handleAdminAddProducts = () => {
  // navigate("/admins/product")
 }

 const handleAdminNewMessage = () => {
  // navigate("/admins/news")
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
    // On autofill we get a stringified value.
    typeof value === 'string' ? value.split(',') : value,
  )
  // SetCurrent(1)
}

const  handleFirstYear = async() => {
  const res = await execAdminSetYears()
  console.log(res)
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
  console.log(data,seasons,years,valueRadio)
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
  console.log(res)
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
  // const res = await execSearch(todoList)
  if (res.status === 200) {
    console.log(res)
    setPage(page+1)
    if (res.data.products.length < 1) {
      console.log(11111111111111111111111111111111112222222)
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
        {/* 非公開 */}
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
            // marginBottom:"20px"
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
            // marginBottom:"20px"
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

      {/* 一覧 */}
      <div className = "products_header">
        <div className = "products_contents">
          <div className = "products_contents_list"
          // ref={ref}
          >
      {/* {firstloding&&grid.grid === "01"&&(
         
         <InfiniteScroll
             className = "products_infinitescroll"
             loadMore={handleScrollingExec}    //項目を読み込む際に処理するコールバック関数
             hasMore={hasMore}         //読み込みを行うかどうかの判定
             loader={loader}>   
             {products.map((item: product)=>{
               return(

                   <GridProducts
                   key={item.id} 
                   product = {item}
                   push ={ pushgridleft }
                   left_grid = { maxleft}
                   right={right}
                   // colornumber = {colornumber}
                   />

               )
           })}
           </InfiniteScroll>
           )} */}

{/* 
       {firstloding&&grid.grid === "02"&&(
        
        <InfiniteScroll
            className = "products_infinitescroll02"
            loadMore={handleScrollingExec}    //項目を読み込む際に処理するコールバック関数
            hasMore={hasMore}         //読み込みを行うかどうかの判定
            loader={loader}>   
            {products.map((item: product)=>{
              return(

                  <GridProduct02
                  key={item.id}
                  product = {item}
                  pushgridleft02 = {pushgridleft02}
                  maxleft02 = {maxleft02}
                  right={right}
                  />
              )
          })}
          </InfiniteScroll>
          )} */}

       {/* {firstloding&&(
        
        <InfiniteScroll
            className = "products_infinitescroll03  ToptensContainerGrid"
            loadMore={handleScrollingExec}    //項目を読み込む際に処理するコールバック関数
            hasMore={hasMore}         //読み込みを行うかどうかの判定
            loader={loader}>   
            {products.map((item: product)=>{
              return(     

                  <GridProduct03
                  key={item.id}
                  product = {item}
                  />

              )
          })}
          </InfiniteScroll>
          )} */}

     
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