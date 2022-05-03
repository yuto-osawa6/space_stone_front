// import { MenuProduLists } from "@/component/custom/MenuProduLists"
import { MenuProduLists } from "@/components/share/component/MenuProduLists"
import { Article } from "@/interfaces/article"
import { product } from "@/interfaces/product"
import { execArticleHandler } from "@/lib/api/article"
import { execProductSearchHandler } from "@/lib/api/main"
import React, { useEffect, useRef, useState } from "react"
import { HiChevronDoubleDown } from "react-icons/hi"
import { IoSearchCircle } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
// import { Outlet } from "react-router-dom"
import { RootState } from "@/store"
import { NavigatingLeftArticleDataAction } from "@/store/lefts/article/actions"
import { ArticlesLists } from "./ArticlesLists"

export const Articles:React.FC = function ArticlesFunc(){
  const LeftArtocleStore = useSelector((state:RootState)=>state.leftArticle)
  const array:number[] = [1,2,3,4,5,6,7,8,9,0]
  const [page,SetPage] = useState<number>(1)
  const [weekormonth,SetWeekorMonth] = useState<number | null>(LeftArtocleStore.weekormonth)
  const [article,SetArticle] = useState<Article[]>([]) 
  const [loaded,setLoaded] = useState<boolean>(false)
  const [product,setProduct] = useState<product>()


  let  isMounted = true; 
  const ArticleHandler = async() => {
    const res = await execArticleHandler(current,weekormonth,product?.id)
    console.log(res)
    if (res.status == 200){
      if(isMounted){
        SetArticle(res.data.articles) 
        GfNavigation(res.data.articleLength)
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
    SetWeekorMonth(LeftArtocleStore.weekormonth)
  },[LeftArtocleStore.weekormonth])
  useEffect(()=> {
    const timer = setTimeout(() => {
      ArticleHandler()
    }, 250)
    return () => {
      clearTimeout(timer)
      isMounted = false;
    };
  },[current,weekormonth,product])

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
  const weekormonthHandler = (i:number|null) => {
    SetCurrent(1)
    dispatch(NavigatingLeftArticleDataAction(i))
    SetWeekorMonth(i)
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
    setProduct(undefined)
  }

  return(
  
    <React.Fragment>
      <div className = "ArticlesContainer"
      >
        <div className = "ArticlesContainerTitle">
          Articles
        </div>
        <div className = "ArticlesContainerNavigate">
          <ul className = "ArticlesContainerNavigateUl">
            <li
            className={weekormonth==null?"activeArticlesWeekorMonth":""}
            onClick={()=>weekormonthHandler(null)}
            >All</li>
            <li
            className={weekormonth==0?"activeArticlesWeekorMonth":""}
            onClick={()=>weekormonthHandler(0)}
            >Weekly</li>
            <li
            className={weekormonth==1?"activeArticlesWeekorMonth":""}
            onClick={()=>weekormonthHandler(1)}
            >Monthly</li>
          </ul>
          <div className = "ArticlesContainerSort">
            <ul>
            </ul>
          </div>
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
                      <MenuProduLists products={item} key={item.id} product={product} setProduct={setProduct} setMenuOpen={setMenuOpen} setCurrent={SetCurrent}/>
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
          {article.map((item,index)=>{
            return(
            <ArticlesLists
            id = {item.id}
            article = {item}
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
            {pageNaviGation.map((item,index)=>{
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
          </div>
      </div>
    </React.Fragment>
  )
}