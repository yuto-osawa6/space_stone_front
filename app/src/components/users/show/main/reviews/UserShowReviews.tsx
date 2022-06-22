import { Modal } from "@mui/material"
import { MenuProduLists } from "@/components/share/component/MenuProduLists"
import { UserShowContext } from "@/contexttype/contexttype"
import { product } from "@/interfaces/product"
import { review } from "@/interfaces/review"
import { execGetEmotionList, execProductSearchHandler } from "@/lib/api/main"
import { execUserShowReviewsHandler } from "@/lib/api/users"
import React, { ReactNode, useContext, useEffect, useRef, useState } from "react"
import { HiChevronDoubleDown } from "react-icons/hi"
import { IoSearchCircle } from "react-icons/io5"
import { MdInsertEmoticon } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { updateReviewAction } from "@/store/reviewUpdate/actions"
import { UserShowEmotionItem } from "./UserShowEmotionItem"
import { UserShowReviewsItem } from "./UserShowReviewsItem"

type emotion = {
  id:number
  emotion:string
}

type Props = {
  children:ReactNode
}

export const UserShowReviews:React.FC<Props> = function UserShowReviewsFunc(Props){
  const [emotions,setEmotions] = useState<emotion[]>([])
  const [emotion,setEmotion] = useState<emotion>()
  const handlerOne = async() => {
    const res = await execGetEmotionList()
    if(res.status==200){
      setEmotions(res.data.emotionList)
    }
  }

  useEffect(()=>{
    handlerOne()
  },[])

  // context
  const {user} = useContext(UserShowContext)
  const [selectSort,setSelectSort] = useState<number | null>(null)
  // state
  const [reviews,setReviews] = useState<review[]>([])
  const [current,SetCurrent] = useState<number>(1)
  const [page,SetPage] = useState<number>(1)
  const [product,setProduct] = useState<product>()

  useEffect(()=>{
    firstSetUpHandler()
  },[current,product,selectSort,emotion])

  const firstSetUpHandler = async() => {
    const res = await execUserShowReviewsHandler(user.id,current,product?.id,selectSort,emotion?.id)
    if(res.status === 200){
      setReviews(res.data.reviews)
      GfNavigation(res.data.reviewLength)
    }else{

    }
  }

  // 
  const [pageNaviGation,setPageNaviGation] = useState<number[]>([])

  const GfNavigation = (Props:number) => {
    const limit = Math.ceil(Props / 20)
    currentPage(current,limit)
    SetPage(limit)
}

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
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [menuOpen]); 

  // 

  const selectSortHandler = (i:number|null) => {
    SetCurrent(1)
    // SetPage
    setSelectSort(i)
  }
  const [isMenuOpen2, setIsMenuOpen2] = useState(false);
  const handleClose = () => setIsMenuOpen2(false)

    // updateReview
    const dispatch = useDispatch()
    const updateReviewState = useSelector((state:RootState)=>state.updateReview)
    useEffect(()=>{
      if(updateReviewState.update == false)return
      firstSetUpHandler()
      dispatch(updateReviewAction(false))
    },[updateReviewState])

  return(
    <>
      <div className = "UserShowReviews">
        <div className = "UserShowReviewsTitle"
        style={{
          fontWeight:"bold",
          margin: "20px 20px 0px 20px"
        }}
        >
          レビュー一覧
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
          {emotions.length!=0&&(
          <div className = "header-search-contents__boxes__Lists__right__Lists__logo"
          style={{
            width: "30px",
            marginLeft: "10px",
            display: "flex",
            alignItems: "center"
          }}
          
          >
            <MdInsertEmoticon
            style={{
              cursor:"pointer"
            
            }}
            onClick={() => setIsMenuOpen2(true)}
            />
            </div>
          )}
          <div className=""
          style={{display:"flex",gap:"10px",alignItems:"center"}}
          >
            <div className="">
            {emotion?.emotion}
            </div>
            {emotion!=undefined&&(
              <div className=""
              onClick={()=>setEmotion(undefined)}
              >
              Clear
              </div>
            )}
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
          
        {/* </div> */}



        <div className = "UserShowReviewsMain">
          <div className = "ArticlesContainerMain">
            {reviews.map((item)=>{
              return(
                <UserShowReviewsItem
                key={item.id}
                review = {item}
                user_id = {user.id}
                />
              )
            })}
          </div>
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
      {isMenuOpen2 && (
        <Modal
          open={isMenuOpen2}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <div className = "emotionSortList">
          {emotions.map((item)=>{
            return(
              <UserShowEmotionItem
                emotionItem={item}
                emotion = {emotion}
                setEmotion = {setEmotion}
                setCurrent = {SetCurrent}
                setIsMenuOpen2={setIsMenuOpen2}
                key={item.id}
              />
            )
          })}
        </div>
        </Modal>
      )}
      </div>
      {Props.children}
    </>
  )
}