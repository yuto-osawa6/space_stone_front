import React, { useCallback, useEffect, useRef, useState } from "react"
import { execSearch, execSearchScroll } from "lib/api/main";
import { product } from "../../interfaces/product";
// import {GridProducts} from "./GridProduct";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import InfiniteScroll from 'react-infinite-scroller';
import { GridProduct02 } from "./grid/GridProduct02";
import { GridProduct03 } from "./grid/GridProduct03";
import { GridProduct04 } from "./grid/GridProduct04";
import { GridProducts } from "./grid/GridProduct";

  // interface SearchData {
  //   title_cont: string,
  //   janls_id_in:string[]
  // }
  // 初期データ
  // const initialData: SearchData = {
  //   title_cont: '',
  //   janls_id_in:[""]
  // }
  // interface tgds {
  //   genres_id:string
  // }
  // interface tgdss{
  //   janls_id_in:string[]
  // }
  // const ini:tgdss = {
  //   janls_id_in:[""]
  // }
  type avgScore = {
    [k:number]:string
  }
var array:number[] = new Array()
for (let i = 0; i < 10; i++) {
  array.push(i)
}

const MainSearch:React.FC= () =>{
  const [products,setProducts] = useState<product[]>([]);
  // const [data, setData] = useState<SearchData>(initialData);
  const todoList = useSelector((state: RootState) => state.search);
  const todoGenresList = useSelector((state: RootState) => state.todogenres);
  const todoStylesList = useSelector((state: RootState) => state.todostyles);
  const CastsStore = useSelector((state: RootState)=> state.cast)
  const SubSearchesStore = useSelector((state: RootState)=> state.subsearch)
  const TimeStore = useSelector((state:RootState)=> state.timesearch)
  const YearStore = useSelector((state:RootState)=> state.yearsearch)
  const SeasonStore = useSelector((state:RootState)=> state.seasonsearch)
  const PeriodStore = useSelector((state:RootState)=>state.SortPeriod)
  // v2.0
  const StudiosStore = useSelector((state:RootState)=>state.studios)
  const KisetsuStore = useSelector((state:RootState)=>state.kisetsu)
  const EmotionSortStore = useSelector((state:RootState)=>state.sortEmotion)





  const grid = useSelector((state: RootState) => state.grid);
  const dispatch = useDispatch();
  const sort = useSelector((state: RootState) => state.sort)
  const copied = { ...todoList,...todoGenresList,...todoStylesList,...sort,...CastsStore.castids,...SubSearchesStore,...TimeStore.times,...YearStore.years,...SeasonStore,...PeriodStore,...StudiosStore.studiosids,...KisetsuStore.kisetsusids,...EmotionSortStore};
  const [left_grid,setLeft_grid] = useState<number[]>([])
  const [maxleft,setMaxLeft] = useState<number>(0)

  const [left_grid02,setLeft_grid02] = useState<number[]>([])
  const [maxleft02,setMaxLeft02] = useState<number>(0)

  const [hasMore, setHasMore] = useState(true); 
  const [page,setPage] = useState<number>(1)
  const [firstloding,setFirstloding] = useState<boolean>(false);
  const [avgScore,setAvgScore] = useState<avgScore>()

  
  let isMounted = true;
  const handleExec = async () => {
  const res = await execSearch(copied)
  if (res.status === 200) {
    console.log(res)
    if(isMounted){
      setProducts(res.data.products)
      setAvgScore(res.data.scores.avgScore)
      setPage(2)
      setLeft_grid([])
      setHasMore(true);
      setFirstloding(true)
    }
  }
}
useEffect(() => {
  const timer = setTimeout(() => {
    handleExec()
  }, 500)
  return () => {
    clearTimeout(timer)
    isMounted = false;
  }
}, 
[todoList,todoGenresList,todoStylesList,sort,grid,CastsStore,SubSearchesStore,TimeStore,YearStore,SeasonStore,PeriodStore,StudiosStore,KisetsuStore,EmotionSortStore])

// left 座標------------------------------------------------
const pushgridleft = useCallback(( flg:number )=> {
  setLeft_grid([...left_grid, left_grid.push(flg)]) ;
  setMaxLeft(Math.max(...left_grid)) 
},[])
const pushgridleft02 = useCallback(( flg:number )=> {
  setLeft_grid02([...left_grid02, left_grid02.push(flg)]) ;
  setMaxLeft02(Math.max(...left_grid02))
},[])
const [right,setRight] = useState<number>(0)
const ref = useRef<HTMLDivElement>(null!)
useEffect(()=>{
  setRight(ref.current.getBoundingClientRect().right)
  window.scrollTo({top:0,left:0, behavior: "smooth"})
},[])



// add loading state
  const [loaded,setLoaded] = useState<boolean>(false)

const handleScrollingExec = async () => {
  setLoaded(true)
  if(loaded==true)return
  const res = await execSearchScroll(copied,String(page))
  if (res.status === 200) {
    console.log(res)
    setLeft_grid([])
    setPage(page+1)
    if (res.data.products.length < 1) {
      console.log(11111111111111111111111111111111112222222)
      setHasMore(false);
      setLoaded(false)
      return;
    }
    setProducts( [...products, ...res.data.products])
    setAvgScore({...avgScore,...res.data.scores.avgScore})
    setLoaded(false)
    
  }
}
const loader =<div className="loader" key={0}>Loading ...</div>;
  return(
    <>
      <div className = "products_header">
        <div className = "products_contents">
          <div className = "products_contents_list"
          ref={ref}
          >
            {firstloding&&grid.grid === "01"&&(
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
                  avgScore = {avgScore!=undefined?avgScore[item.id]!=undefined?avgScore[item.id]:undefined:undefined}
                  // colornumber = {colornumber}
                  />
                )
              })}
              </InfiniteScroll>
            )}
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
                  avgScore = {avgScore!=undefined?avgScore[item.id]!=undefined?avgScore[item.id]:undefined:undefined}
                  />
                )
              })}
              </InfiniteScroll>
            )}

            {firstloding&&grid.grid === "03"&&(
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
                avgScore = {avgScore!=undefined?avgScore[item.id]!=undefined?avgScore[item.id]:undefined:undefined}
                />
                )
              })}
              </InfiniteScroll>
            )}
            {/* {firstloding&&grid.grid === "04"&&(
              <InfiniteScroll
              className = "products_infinitescroll04 ArticlesAssociateProductsBox"
              loadMore={handleScrollingExec}    //項目を読み込む際に処理するコールバック関数
              hasMore={hasMore}         //読み込みを行うかどうかの判定
              loader={loader}>   
              {products.map((item: product)=>{
                return(
                <GridProduct04
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
    </>
  )
}
export default MainSearch