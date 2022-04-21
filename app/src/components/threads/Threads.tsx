
// import { MenuProduLists } from "@/component/custom/MenuProduLists"
import { MenuProduLists } from "@/components/share/component/MenuProduLists"
import { product } from "@/interfaces/product"
import { review } from "@/interfaces/review"
import { execProductSearchHandler } from "@/lib/api/main"
import { execThreadHandler } from "@/lib/api/threads"
import React, { useEffect, useRef, useState } from "react"
import { HiChevronDoubleDown } from "react-icons/hi"
import { IoSearchCircle } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
// import { Outlet } from "react-router-dom"
import { RootState } from "@/store"
import { NavigatingLeftThreadDataAction } from "@/store/lefts/thread/actions"
import { ThreadsLists } from "./ThreadsLists"


type Props = {
  children:React.ReactNode
}
export const Threads:React.FC<Props> = (Props) => {
  const LeftThreadStore = useSelector((state:RootState)=>state.leftThread)
  const array:number[] = [1,2,3,4,5,6,7,8,9,0]
  const [page,SetPage] = useState<number>(1)
  const [selectSort,setSelectSort] = useState<number | null>(LeftThreadStore.selectSort)
  const [reviews,setReviews] = useState<review[]>([]) 
  const [product,setProduct] = useState<product>()
  const [rangeNumber,setRangeNumber] = useState<number>()
  const [rangeLikesNumber,setRangeLikesNumber] = useState<number>()
  const [rangePopulerNumber,setRangePopulerNumber] = useState<number>()

  let isMounted = true
  const ArticleHandler = async() => {
    const res = await execThreadHandler(current,selectSort,rangeNumber,rangeLikesNumber,rangePopulerNumber,product?.id)
    console.log(res)
    if (res.status == 200){
      if(isMounted){
        setReviews(res.data.reviews)
        GfNavigation(res.data.reviewLength)
      }
    }
  }

  const [current,SetCurrent] = useState<number>(1)
  const dispatch = useDispatch()

  useEffect(()=>{
    window.scrollTo({top:0,left:0, behavior: "smooth"})
  },[])
  useEffect(()=>{
    SetCurrent(1)
    setSelectSort(LeftThreadStore.selectSort)
  },[LeftThreadStore.selectSort])
  useEffect(()=> {
    const timer = setTimeout(() => {
      ArticleHandler()
    }, 250)
    return () => {
      clearTimeout(timer)
      isMounted = false;
    };
  },[current,selectSort,product,rangeNumber,rangeLikesNumber,rangePopulerNumber])

  const GfNavigation = (Props:number) => {
    const limit = Math.ceil(Props / 2)
    currentPage(current,limit)
    SetPage(limit)
  }
  const [pageNaviGation,setPageNaviGation] = useState<number[]>([])
  const currentPage = (i:number,c:number) => {
    if (c >= 6){
    if(i <= 3){
      setPageNaviGation([1,2,3,4,5,6])
    }else if(i == c-2){
      setPageNaviGation([i-3,i-2,i-1,i,i+1,i+2])
    }else if(i == c-1){
      setPageNaviGation([i-4,i-3,i-2,i-1,i,i+1])
    }else if(i == c){
      setPageNaviGation([i-5,i-4,i-3,i-2,i-1,i])
    }else{
      setPageNaviGation([i-2,i-1,i,i+1,i+2])
    }
  }else{
    const array:number[] = []
    for (let step = 1; step <= c; step++) {
      array.push(step)
    }
    setPageNaviGation(array)
  }
  }

  const currentSetHandler = (item:number) => {SetCurrent(item) }
  const currentPrevHandler = () => SetCurrent(current-1)
  const currentNextHandler = () => SetCurrent(current+1)
  const currentFirstHandler = () => SetCurrent(1)
  const currentMaxHandler = () => SetCurrent(page)

  const selectSortHandler = (i:number|null) => {
    SetCurrent(1)
    dispatch(NavigatingLeftThreadDataAction(i))
    setSelectSort(i)
  }
  
  const [menuOpen,setMenuOpen] = useState<boolean>(false)
  const [searchInput,setSearchInput] = useState<string>("")
  const [productData,setProductData] = useState<product[]>([])
  const handleProductTitleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value)
  }

  useEffect(()=>{
    if (searchInput.length < 2){
      setProductData([])
      return
    }
    const timer = setTimeout(() => {
      productSearchHandler()
    }, 500)

    return () => clearTimeout(timer)
  },[searchInput])

  const productSearchHandler = async() => {
    const res = await execProductSearchHandler(searchInput)
    if (res.status == 200){
      console.log(res)
      setProductData(res.data.products)
    }else{
    }
  }

  // 
  const menuOpenHandler = () => setMenuOpen(true)
  const ref = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    const checkIfClickedOutside = (e:any) => {
      if (menuOpen && ref.current && !ref.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [menuOpen]); 


  const clearProductHandler = () => {
    SetCurrent(1)
    setProduct(undefined)
  }
  const [onHaving,setOnHaving] = useState<boolean>(false)
  const [onRange,setOnRange] = useState<boolean>(false)
  const onHavingHandler = () => {onHaving==true?setOnHaving(false):setOnHaving(true)}
  const onRangeHandler = () => {onRange==true?setOnRange(false):setOnRange(true)}
  // range
  const [rangeString,setRangeString] = useState<string>()

  // handler
  const rangeNumberHandler = (number:number | undefined) => {
    SetCurrent(1)
    setRangeNumber(number)
    switch (number) {
    case undefined:
      setRangeString(undefined)
      break
    case 1:
      setRangeString("(１週間)")
      break
    case 2:
      setRangeString("(１ヶ月)")
      break
    case 3:
      setRangeString("(１年間)")
      break
      }
    }
  const [onRangeLikes,setOnRangeLikes] = useState<boolean>(false)
  const onRangeLikesHandler = () => {onRangeLikes==true?setOnRangeLikes(false):setOnRangeLikes(true)}
  const [rangeLikesString,setRangeLikesString] = useState<string>()
// handler
  const rangeLikesNumberHandler = (number:number | undefined) => {
    SetCurrent(1)
    setRangeLikesNumber(number)
    switch (number) {
    case undefined:
      setRangeLikesString(undefined)
      break
    case 1:
      setRangeLikesString("(１週間)")
      break
    case 2:
      setRangeLikesString("(１ヶ月)")
      break
    case 3:
      setRangeLikesString("(１年間)")
      break
      }
    }
    const [onRangePopuler,setOnRangePopuler] = useState<boolean>(false)
    const [rangePopulerString,setRangePopulerString] = useState<string>()
    const onRangePopulerHandler = () => {onRangePopuler==true?setOnRangePopuler(false):setOnRangePopuler(true)}
    const rangePopulerNumberHandler = (number:number | undefined) => {
      SetCurrent(1)
      setRangePopulerNumber(number)
      switch (number) {
      case undefined:
        setRangePopulerString(undefined)
        break
      case 1:
        setRangePopulerString("(今週)")
        break
      case 2:
        setRangePopulerString("(今月)")
        break
      case 3:
        setRangePopulerString("(今年)")
        break
      }
    }

  return(

    <React.Fragment>
      <div className = "ArticlesContainer"
      >
        <div className = "ArticlesContainerTitle">
          Threads
        </div>
        <div className = "ArticlesContainerNavigate">
          <ul className = "ArticlesContainerNavigateUl">
            <li
            className={selectSort==null?"activeArticlesWeekorMonth":""}
            onClick={()=>selectSortHandler(null)}
            >全て</li>
            <li
            className={selectSort==0?"activeArticlesWeekorMonth":""}
            onClick={()=>selectSortHandler(0)}
            >好評価</li>
            <li
            className={selectSort==1?"activeArticlesWeekorMonth":""}
            onClick={()=>selectSortHandler(1)}
            >流行</li>
          </ul>

          <ul className = "ArticlesContainerNavigateUl ArticlesContainerNavigateUlterms">
            <li
            className={rangeString!=undefined?"activeArticlesWeekorMonth":""}
            onClick={onRangeHandler}
            >更新日期間
            {rangeString}
            <div className = " ArticlesContainerNavigateUltermsRangeDummy">
              <div className = {`ArticlesContainerNavigateUltermsRangeDummyAbsolute ${onRange==true?"activeArticlesUlterms":""}`}>
                <ul>
                  <li
                  className={rangeNumber==undefined?"activeRange":""}
                  onClick={()=>rangeNumberHandler(undefined)}
                  >全て</li>
                  <li
                  className={rangeNumber==2?"activeRange":""}
                   onClick={()=>rangeNumberHandler(2)}
                  >１ヶ月</li>
                  <li
                  className={rangeNumber==3?"activeRange":""}
                   onClick={()=>rangeNumberHandler(3)}
                  >１年</li>
                </ul>
              </div>
            </div>
            </li>
          </ul>
          {selectSort==0&&(
          <ul className = "ArticlesContainerNavigateUl ArticlesContainerNavigateUlterms">
            <li
            className={rangeLikesString!=undefined?"activeArticlesWeekorMonth":""}
            onClick={onRangeLikesHandler}
            >好評価期間
            {rangeLikesString}
            <div className = " ArticlesContainerNavigateUltermsRangeDummy">
              <div className = {`ArticlesContainerNavigateUltermsRangeDummyAbsolute ${onRangeLikes==true?"activeArticlesUlterms":""}`}>
                <ul>
                  <li
                  className={rangeLikesNumber==undefined?"activeRange":""}
                  onClick={()=>rangeLikesNumberHandler(undefined)}
                  >全て</li>
                  <li
                  className={rangeLikesNumber==1?"activeRange":""}
                   onClick={()=>rangeLikesNumberHandler(1)}
                  >１週間</li>
                  <li
                  className={rangeLikesNumber==2?"activeRange":""}
                   onClick={()=>rangeLikesNumberHandler(2)}
                  >１ヶ月</li>
                  <li
                  className={rangeLikesNumber==3?"activeRange":""}
                   onClick={()=>rangeLikesNumberHandler(3)}
                  >１年</li>
                </ul>
              </div>
            </div>
            </li>
          </ul>
          )}

        {selectSort==1&&(
          <ul className = "ArticlesContainerNavigateUl ArticlesContainerNavigateUlterms">
            <li
            className={rangePopulerString!=undefined?"activeArticlesWeekorMonth":""}
            onClick={onRangePopulerHandler}
            >流行期間
            {rangePopulerString}
            <div className = " ArticlesContainerNavigateUltermsRangeDummy">
              <div className = {`ArticlesContainerNavigateUltermsRangeDummyAbsolute ${onRangePopuler==true?"activeArticlesUlterms":""}`}>
                <ul>
                  <li
                  className={rangePopulerNumber==undefined?"activeRange":""}
                  onClick={()=>rangePopulerNumberHandler(undefined)}
                  >全て</li>
                  <li
                  className={rangePopulerNumber==2?"activeRange":""}
                   onClick={()=>rangePopulerNumberHandler(2)}
                  >今月</li>
                  <li
                  className={rangePopulerNumber==3?"activeRange":""}
                   onClick={()=>rangePopulerNumberHandler(3)}
                  >今年</li>
                </ul>
              </div>
            </div>
            </li>
          </ul>

          )}
          <div className = "ArticlesContainerProductSearch"
          ref={ref}
          >
            <div className = "header-search-contents__boxes__store__right">
              <IoSearchCircle/>
            </div>
            <input type="text"
             value={searchInput}
             autoComplete="off"
             onChange={handleProductTitleChange}
             onClick={menuOpenHandler}
             placeholder="映画・TVタイトル(3文字以上)"
            />
            <div className = "selected_style_icons">
              <HiChevronDoubleDown
              className={menuOpen?"activeMenuOpen":""}
              />
            </div>
            <div className = "genresSearch__contents__dummy">   
              {menuOpen && (
                <>
                  <ul className = "SearchingTagDummy">
                    {productData.map((item)=>{
                      return(
                        <MenuProduLists products={item} key={item.id} product={product} setProduct={setProduct} setMenuOpen={setMenuOpen} setCurrent = {SetCurrent}/>
                      )
                    })}
                  </ul>
                </>
              )}
            </div>
          </div>    
        </div>
        <div className = "SettingTagSearch">     
            {!menuOpen && (
              <>
                {product!=undefined&&(
                  <div className = "header-search-contents__boxes__store__re">        
                    <p className = "lefttitleSearchingfor">Search for</p>
                    <p className = "lefttitleSearchingforTitle">{product?.title}</p>      
                    <p className = "lefttitleSearchingforClear"
                    onClick={clearProductHandler}
                    >Clear</p>   
                  </div>
                )}
              </>
            )}
            </div>
        
        <div className = "ArticlesContainerMain"> 
          {reviews.map((item,index)=>{
            
            return(
            <ThreadsLists
            id = {item.id}
            review = {item}
            key={item.id}
            />
            )
          })}        
        </div>
        <div className = "ArticlesContainerPage">
          <ul>     
            <li
            onClick={currentFirstHandler}
            className={current==1?"activeCurrent":""}
            >1</li>
          
            {page>5&&current!=1&&(
              <li
              onClick={currentPrevHandler}
              >前</li>
            )}
            {pageNaviGation.map((item,index)=>
            {
              return(  
                <React.Fragment
                  key={index}
                  >
                  {item!=1&&item!=page&&(
                     <li
                    key={item}
                    onClick={()=>currentSetHandler(item)}
                    className={current==item?"activeCurrent":""}
                     >{item}</li>
                  )}    
                </React.Fragment>     
              )  
            })}
            {page>5&&current!=page&&(
              <li
              onClick={currentNextHandler}
              >次</li>
            )}
            {page>1&&(
              <li
              onClick={currentMaxHandler}
              className={current==page?"activeCurrent":""}
              >{page}</li>
            )}
          </ul>
        </div>
        <div className="ModalArticle">
          {/* <Outlet/> */}
          {Props.children}
        </div>
      </div>
    </React.Fragment>
  )
}