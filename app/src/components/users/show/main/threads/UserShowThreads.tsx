// import { MenuProduLists } from "@/component/custom/MenuProduLists"
import { MenuProduLists } from "@/components/share/component/MenuProduLists"
import { UserShowContext } from "@/contexttype/contexttype"
import { product } from "@/interfaces/product"
import { review } from "@/interfaces/review"
import { execProductSearchHandler } from "@/lib/api/main"
import { execUserShowReviewsHandler, execUserShowThreadsHandler } from "@/lib/api/users"
import React, { ReactNode, useContext, useEffect, useRef, useState } from "react"
import { HiChevronDoubleDown } from "react-icons/hi"
import { IoSearchCircle } from "react-icons/io5"
// import { Outlet } from "react-router-dom"
import { UserShowReviewsItem } from "../reviews/UserShowReviewsItem"
import { UserShowThreadItem } from "./UserShowThreadItem"

type Props = {
  children:ReactNode
}

export const UserShowThreads:React.FC<Props> = function UserShowThreadsFunc(Props){
 // context
 const {user} = useContext(UserShowContext)

 // state
 const [reviews,setReviews] = useState<review[]>([])
 const [current,SetCurrent] = useState<number>(1)
 const [page,SetPage] = useState<number>(1)
 const [product,setProduct] = useState<product>()
 const [selectSort,setSelectSort] = useState<number | null>(null)

 useEffect(()=>{
   firstSetUpHandler()
 },[current,product,selectSort])

 const firstSetUpHandler = async() => {
   const res = await execUserShowThreadsHandler(user.id,current,product?.id,selectSort)
   if(res.status === 200){
     console.log(res)
     setReviews(res.data.reviews)
     GfNavigation(res.data.reviewLength)
   }else{

   }
 }

 // 
 const [pageNaviGation,setPageNaviGation] = useState<number[]>([])

 const GfNavigation = (Props:number) => {
   const limit = Math.ceil(Props / 2)
   console.log(limit)
   currentPage(current,limit)
   SetPage(limit)
}

 const currentPage = (i:number,c:number) => {
   // console.log(i,c)
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


  // ----------------product search
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

  const clearProductHandler = () => {
    SetCurrent(1)
    setProduct(undefined)
  }

  // 
  const menuOpenHandler = () => setMenuOpen(true)
  const ref = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    const checkIfClickedOutside = (e:any) => {
      if (menuOpen && ref.current && !ref.current.contains(e.target)) {
        setMenuOpen(false);
      }
      console.log(e.target)
      console.log(ref.current)
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [menuOpen]); 

  // 

  const selectSortHandler = (i:number|null) => {
    SetCurrent(1)
    setSelectSort(i)
  }


  return(
    <>
    <div className = "UserShowReviews">
        <div className = "UserShowReviewsTitle"
        style={{
         fontWeight:"bold",
         margin: "20px 20px 0px 20px"
        }}
        >
          スレッド 一覧
        </div>
        <div className="ArticlesContainerNavigate">
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


        {/*  */}
        <div className = "UserShowReviewsMain">
          <div className = "ArticlesContainerMain">
            {reviews.map((item)=>{
              return(
                <UserShowThreadItem
                key={item.id}
                review = {item}
                user_id={user.id}
                />
              )
            })}
          </div>
        </div>
        {reviews?.length>0&&(
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
              // console.log(item!=1&&(item!=page||page!=1))
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
        )}
      </div>
      {Props.children}
    </>
  )
}