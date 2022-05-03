import { GridProducts } from "@/components/search/grid/GridProduct"
import { GridProduct02 } from "@/components/search/grid/GridProduct02"
import { GridProduct03 } from "@/components/search/grid/GridProduct03"
import { GridProduct04 } from "@/components/search/grid/GridProduct04"
import { product } from "@/interfaces/product"
import { execMonthDuringHandler, execTop100Handler } from "@/lib/api/main"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { SettingSortPeriodAction } from "@/store/sortperiod/actions"

type month = {
  id:number
  month:Date
}

type avgScore = {
  [k:string]:string
}


export const Top100:React.FC = function Top100Func(){
  const PeriodStore = useSelector((state:RootState)=>state.SortPeriod)
  const dispatch = useDispatch()

  const [monthList,setMonthList] = useState<month[]>([])
  const [currentPeriod,setCurrentPeriod] = useState<Date | undefined>(PeriodStore.month)
  const [currentNumber,setCurrentNumber] = useState<number>(PeriodStore.periodnumber)

  const firstHandler = async() => {

    const res = await execMonthDuringHandler()
    if(res.status == 200){
      console.log(res)
      setMonthList(res.data.month)
    }else{

    }
  }
  
  useEffect(()=>{
    firstHandler()
    window.scrollTo({top:0,left:0, behavior: "smooth"})
  },[])
  // --------------------------
  const [currentSelect,setCurrentSelect] = useState<number>(PeriodStore.selectnumber)

  const setMonthDuringHandler = (month:Date,index:number) => {
    setCurrentSelect(index)
    setCurrentPeriod(month)
    dispatch(SettingSortPeriodAction(currentNumber,month,index))
  }
  const setCurrentNumberHandler=(number:number)=>{
    setCurrentNumber(number)
    dispatch(SettingSortPeriodAction(number,currentPeriod,currentSelect))
  }
  const resetMonthDuringHandler = () => {
    setCurrentSelect(0)
    setCurrentPeriod(undefined)
    dispatch(SettingSortPeriodAction(currentNumber,undefined,0))
  }
  const [products,setProducts]= useState<product[]>([])
  const [avgScore,setAvgScore] = useState<avgScore>()
  const top100Handler = async() => {
    console.log("aaaaaaaaaaaaaaaaaaaaiiiiiiiiiiiiii")
    const res = await execTop100Handler(currentPeriod,currentNumber)
    if(res.status == 200){
      console.log(res)
      setProducts(res.data.products)
      setAvgScore(res.data.scores.avgScore)
    }else{
      // console.log(11111111111111111)
    }
  }

  useEffect(()=>{
    console.log("aaaaaaaaaaaaaaaa")
    top100Handler()
  },[currentNumber,currentPeriod])
// },[PeriodStore])

  console.log(currentNumber)

  // ------------------------------------

  const grid = useSelector((state: RootState) => state.grid);


  const [left_grid,setLeft_grid] = useState<number[]>([])
  const [maxleft,setMaxLeft] = useState<number>(0)

  const [left_grid02,setLeft_grid02] = useState<number[]>([])
  const [maxleft02,setMaxLeft02] = useState<number>(0)
  // 
  // left 座標
const pushgridleft = ( flg:number )=> {
  setLeft_grid([...left_grid, left_grid.push(flg)]) ;
  setMaxLeft(Math.max(...left_grid))
  
}

const pushgridleft02 = ( flg:number )=> {
  setLeft_grid02([...left_grid02, left_grid02.push(flg)]) ;
  setMaxLeft02(Math.max(...left_grid02))
  
}

const [right,setRight] = useState<number>(0)
const ref = useRef<HTMLDivElement>(null!)
useEffect(()=>{
  setRight(ref.current.getBoundingClientRect().right)
},[])

console.log(currentSelect)

  return(
    <>
      <div className = "Top100 products_contents_list ArticlesContainer"
      ref = {ref}
      >
        <div className = "Top100Title">
          期間別TOP100
        </div>
        <div className = "Top100SelectList">
          <div className = "Top100SelectList1 ArticlesContainerNavigate">
            <ul className = "ArticlesContainerNavigateUl">
              <li
              className = {currentNumber==1?"activeArticlesWeekorMonth":""}
              onClick={()=>setCurrentNumberHandler(1)}
              >お気に入り数</li>
              <li
              className = {currentNumber==2?"activeArticlesWeekorMonth":""}
              onClick={()=>setCurrentNumberHandler(2)}
              >平均スコア</li>
              <li
              className = {currentNumber==3?"activeArticlesWeekorMonth":""}
              onClick={()=>setCurrentNumberHandler(3)}
              >アクセス数</li>
              <li
              className = {currentNumber==4?"activeArticlesWeekorMonth":""}
              onClick={()=>setCurrentNumberHandler(4)}
              >レビュー数</li>
              <li
              className = {currentNumber==5?"activeArticlesWeekorMonth":""}
              onClick={()=>setCurrentNumberHandler(5)}
              >スレッド数</li>
            </ul>
          
            <div className = "Top100SelectList2">
              <ul className = "">
                <li
                className={currentSelect==0?"activeTop100":""}
                onClick={resetMonthDuringHandler}
                >全て</li>
                {/* <li
                className={currentSelect==13?"activeTop100":""}
                onClick={resetMonthDuringHandler}
                >全て</li>
                <li
                className={currentSelect==13?"activeTop100":""}
                onClick={resetMonthDuringHandler}
                >全て</li>
                <li
                className={currentSelect==13?"activeTop100":""}
                onClick={resetMonthDuringHandler}
                >全て</li>
                <li
                className={currentSelect==13?"activeTop100":""}
                onClick={resetMonthDuringHandler}
                >全て</li>
                <li
                className={currentSelect==13?"activeTop100":""}
                onClick={resetMonthDuringHandler}
                >全て</li> */}
                {monthList.map((item)=>{
                  return(
                    <li 
                    key={item.id}
                    className={currentSelect==item.id?"activeTop100":""}
                    onClick={()=>setMonthDuringHandler(item.month,item.id)}
                    
                    >{`${new Date(item.month).getFullYear()}年${new Date(item.month).getMonth()+1}月`}</li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
        {/* grid */}
        {grid.grid === "01"&&(
        <div className = "Top100ProductList products_infinitescroll"
        // ref = {ref}
        > 
          {products.map((item: product)=>{
            return(
              <GridProducts
              key={item.id} 
              product = {item}
              push ={ pushgridleft }
              left_grid = { maxleft}
              right={right}
              avgScore = {avgScore!=undefined?avgScore[item.id]!=undefined?avgScore[item.id]:undefined:undefined}
            />
            )
          })}
        </div>
         )}
         {grid.grid === "02"&&(
        <div className = "Top100ProductList products_infinitescroll02"
        // ref = {ref}
        > 
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
        </div>
         )}
        
        {grid.grid === "03"&&(
        <div className = "Top100ProductList products_infinitescroll03 ToptensContainerGrid"
        // ref = {ref}
        > 
          {products.map((item: product)=>{
            return(
              <GridProduct03
              key={item.id}
              product = {item}
              avgScore = {avgScore!=undefined?avgScore[item.id]!=undefined?avgScore[item.id]:undefined:undefined}
              />
            )
          })}
        </div>
         )}

        {grid.grid === "04"&&(
        <div className = "Top100ProductList products_infinitescroll04 ArticlesAssociateProductsBox"
        // ref = {ref}
        > 
          {products.map((item: product)=>{
            return(
              
              <GridProduct04
              key={item.id}
              product = {item}
              />
            )
          })}
        </div>
         )}

      </div>
    </>
  )
}