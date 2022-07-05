import { product } from "@/interfaces/product";
import { like_review, review, review_comments } from "@/interfaces/review";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
// icon
import { FaRegThumbsUp, FaRegThumbsDown, FaThumbsUp, FaThumbsDown } from "react-icons/fa"
import { OpenContext, OpenReviewCommentContext } from "@/contexttype/contexttype";
import { UserModalSign } from "@/components/applications/user/UserModalSign";
import { execCheckLikeReview, execCreateLikeReview, execDeleteLikeReview } from "@/lib/api/reviews";
import { execAcsessThreadCountHandler, execCheckLikeThread, execCreateLikeThread, execDeleteLikeThread, execProductThreadShow, execProductThreadShowSort } from "@/lib/api/threads";
import { ThreadComment } from "./modal/ThreadComment";
import { ThreadCommentList } from "./comments/ThreadCommentList";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Modal } from "@mui/material";
import { MdAccessTime } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import InfiniteScroll from "react-infinite-scroller";
import { ThreadEditList } from "./ThreadEditList";
import { pussingMessageDataAction } from "@/store/message/actions";
import { useRouter } from "next/router";
import { useUser } from "@/lib/data/user/useUser";
import { ErrorMessage } from "@/lib/ini/message";
import { DefaultPaste } from "@/lib/ini/quill/QuillEffect";

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

const ini:like_review = {
  id:0,
  goodbad:0,
  userId:0
}

type Props = {
  data:{
    product:product
    review:review
    reviewComments:review_comments[]
    status:number
  }
}

export const ProductThreads:React.FC<Props> = function ProductThreadsFunc(Props){
  DefaultPaste()
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      ["blockquote"
    ],
      [{ list:  "ordered" }, { list:  "bullet" }],
      [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
      ['link'],   
    ], 
  }
  // params
  const router = useRouter()
  const {pid,tid,uid} = router.query
  const params_product_id = pid as string
  const params_review_id = tid as string
  const params_user_id = uid

  // usestate
  const [likeReview,setLikeReview] = useState<like_review>(ini)
  const [likeReviewScore,setLikeReviewScore] = useState<number>(0)
  const [likeReviewLength,setLikeReviewLength] = useState<number>(0)
  const [likeReviewGood,setLikeReviewGood] = useState<number>(0)
  // store
  const [productStore,setProductStore] = useState<product>()
  const [navigateJudge,setNavigateJudge] = useState<boolean>(false)
  const ProductStore = useSelector((state: RootState) => state.product);
  const {userSwr} = useUser()
  const user = userSwr
  const [open,setOpen] = useState<boolean>(false)
  const [openReviewComment,setOpenReviewComment] = useState<boolean>(false)
  const modalOpenJugdeReviewComment= () => setOpenReviewComment(true)

  // // v1.01------------------------------------------------------------------------
  // const [goodLength,setGoodlength] = useState<number>()
  // const [likeCommentScore,setLikeCommentScore] = useState<string>()
  // const [userLikesJugde,setUserLikesJudge] = useState<number>(0)
  // const [totalLength,setTotalLength] = useState<number>(0)
  // const [reviewLoaded,setReviewLoaded] = useState<boolean>(false)
  //  v1.02-------------------------------------------------------------------------
  const [review,setReview] = useState<review | undefined>(Props.data.review)
  const [product,setProduct] = useState<product | undefined>(Props.data.product)
  const [reviewComments,setReviewComments] = useState<review_comments[]>(Props.data.reviewComments)
  const [reviewLoaded,setReviewLoaded] = useState<boolean>(true)
  const [firstloding,setFirstloding] = useState<boolean>(true);
  const [totalLength,setTotalLength] = useState<number>(Props.data.review.likeReviewLength)
  const [likeCommentScore,setLikeCommentScore] = useState<string>(Props.data.review.score)
  const [goodLength,setGoodlength] = useState<number>(Props.data.review.likeReviewGood)
  const [userLikesJugde,setUserLikesJudge] = useState<number>(Props.data.review.userLikeReview!=undefined? Props.data.review.userLikeReview.goodbad: 0)

  
  const [loading,setLoding] = useState<boolean>(false)
  const dispatch = useDispatch()
 
  // user
  const UserChangeHandler  = async() => {
    const res = await execProductThreadShowSort(params_product_id as string,params_review_id as string,selectSort,page)
    if (res.data.status == 200){
      scrollRef.current?.scrollTo({
        top: 0,
      })
      setPage2(2)
      setReviewComments(res.data.reviewComments)
      setHasMore(true)
    }else{
    }
  }

  useEffect(()=>{
    UserChangeHandler()
  },[user.login])

  useEffect(()=>{
    acsessCountHandler()
  },[review])

  const acsessCountHandler = async() => {
    if (review==undefined) return
      const currentToday =  new Date()
      currentToday.setHours(currentToday.getHours())
    const res =  await execAcsessThreadCountHandler(review?.id,currentToday) 
    if(res.status === 200){
    }else{

    }
  }
  // review good bad
  const UserModalOpen = () => setOpen(true)
  const reviewValuationGood = async() => {
    const res = await execCreateLikeThread(params_product_id as string,params_review_id as string,user.user.id,1)
    if (res.data.status === 200) {
      setGoodlength(res.data.reviewGood)
      setLikeCommentScore(res.data.score.toFixed(1))
      setUserLikesJudge(res.data.like.goodbad)
      setTotalLength(res.data.reviewLength)
    }else if(res.data.status===400){
      dispatch(pussingMessageDataAction({title:ErrorMessage.delete,select:0}))
    }else{
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    }
  }
  const reviewValuationBad = async() => {
    const res = await execCreateLikeThread(params_product_id as string,params_review_id as string,user.user.id,2)
    if (res.data.status === 200) {
     // v1.01------------------------------------------------------------------------
    setGoodlength(res.data.reviewGood)
    setLikeCommentScore(res.data.score.toFixed(1))
    setUserLikesJudge(res.data.like.goodbad)
    setTotalLength(res.data.reviewLength)
    }else if(res.data.status===400){
      dispatch(pussingMessageDataAction({title:ErrorMessage.delete,select:0}))
    }else{
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    }
  }
  const reviewValuationGooddelete = async() => {
    const res = await execDeleteLikeThread(params_product_id as string,params_review_id as string,user.user.id,likeReview.id)
    if (res.data.status === 200) {
     // v1.01------------------------------------------------------------------------
    setGoodlength(res.data.reviewGood)
    setLikeCommentScore(res.data.score.toFixed(1))
    setUserLikesJudge(0)
    setTotalLength(res.data.reviewLength)
    }else if(res.data.status===400){
      dispatch(pussingMessageDataAction({title:ErrorMessage.delete,select:0}))
    }else{
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    }
  }

  const [selectSort, setSelectSort] = useState<string>('0');
  const handleChangeSelectSort  = async(event: SelectChangeEvent) => {
    setSelectSort(event.target.value);
    const res = await execProductThreadShowSort(params_product_id as string,params_review_id as string,event.target.value,page)
    if (res.data.status == 200){
      scrollRef.current?.scrollTo({
        top: 0,
      })
      setPage2(2)
      setReviewComments(res.data.reviewComments)
      setHasMore(true)
    }else if(res.data.status===400){
      dispatch(pussingMessageDataAction({title:ErrorMessage.delete,select:0}))
    }else if(res.data.status===440){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message440,select:0}))
    }else{
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    }
  }
  // modal
  const [openModal,setOpenModal] = useState<boolean>(true)
  const options = {
    scroll:false
  }

  const handleClose = () => {
    setOpenModal(false)
    if(location.pathname===`/title/${params_product_id}/top/threads/${params_review_id}/`){
      router.push(`/title/${params_product_id}`,undefined,options)
    }else if(location.pathname===`/threads/${params_review_id}/title/${params_product_id}/`){
      router.push(`/threads`,undefined,options)
    }else if(location.pathname=== `/users/${params_user_id}/threads/${params_review_id}/title/${params_product_id}/`){
      router.push(`/users/${params_user_id}/threads`,undefined,options)
    }else{
      router.push(`/title/${params_product_id}/threads`,undefined,options)
    }
  }
  const [loaded,setLoaded] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState(true); 
  const [page,setPage] = useState<number>(1)
  const [page2,setPage2] = useState<number>(2)

const handleScrollingExec = async () => {
  setLoaded(true)
  if(loaded==true)return
  const res = await execProductThreadShowSort(params_product_id as string,params_review_id as string,selectSort,page2)
  if (res.status === 200) {
    setPage2(page2+1)
    if(res.data.reviewComments==undefined){
      setHasMore(false);
      setLoaded(false)
      return
    }

    if (res.data.reviewComments.length < 1) {
      setHasMore(false);
      setLoaded(false)
      return;
    }

    setReviewComments([...reviewComments, ...res.data.reviewComments])
    setLoaded(false)
  }
}

const loader =<div className="loader" key={0}>Loading ...</div>;
const scrollRef = useRef<HTMLDivElement>(null);
const scrollRef2 = useRef<HTMLDivElement>(null)
let reff:HTMLDivElement | null = null
const scrollParentRef = scrollRef.current 
// update contents ---------------------
const handleUpdateContents  = async() => {
  const res = await execProductThreadShowSort(params_product_id as string,params_review_id as string,selectSort,page)
  if (res.status == 200){
    if(res.data.reviewComments==undefined)return
    scrollRef.current?.scrollTo({
      top: 0,
    })
    setPage2(2)
    setReviewComments(res.data.reviewComments)
    setHasMore(true)
  }else{
  }
}
  return(
    <>
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
        <>
      {navigateJudge?
      <>
      </>
      :
      <>
      <div className = "ProductReviewShow">
        <div className = "ProductReviewShowTop">
          <div className = "ProductReviewShowTopImg">
            <img src = {product?.imageUrl}></img>
            <div className = "ProductReviewShowTopImgShadow"></div>
          </div> 
          {user.user.id===review?.user.id&&(
            <ThreadEditList
              review={review}
              setReview={setReview}
              product={product}
              setProduct={setProduct}
              handleCloseAll={handleClose}
            /> 
          )} 
          <div className = "ProductReviewShowTopCenter">
            <div className = "ProductReviewShowTopCenterTitle">
              {product?.title}
            </div>
            <div className = "ProductReviewShowTopCenterUser">
              <img src={review?.user.image}></img>
              <div className = "ProductReviewShowTopCenterUserName">
                {review?.user.nickname}さんによる投稿
              </div>
            </div> 
            <div className="ProductReviewShowTopCenterDateTime">
              <MdAccessTime/>{review?.updatedAt}  
            </div>
          </div>
          <div className="CloseButton"
            onClick={handleClose}
            >
            <IoMdClose/>
          </div>
        </div>  
        <div className = "ProductReviewShowMain"
        style={{
          lineHeight: "1.42"
        }}
        >
          <div className = "ProductReviewShowMainQuill">
          {review?.title!=undefined&&(
            <div className = "modal_review_richtext_preview_text"
            style={
              {
              fontSize: "1.2rem",
              fontWeight: "bold",
              marginTop: "10px",
              marginBottom: "5px"
              }}
            >
            {review?.title}
            </div>
          )}
          <div className = "modal_review_richtext_preview_questions"
            style={{
            margin:"0px"
          }}
          >
            {review?.questions.map((item)=>{
              return(
                <div className = "questionList" key={item.id}>
                  {item.question}
                </div>
              )
            })}
          </div>
            <ReactQuill
              className="quill_reviews preview_quill"
              style={{padding: "10px 0px"}}
              modules={modules} 
              value={typeof review != "undefined"?review.content:""} 
              theme="bubble" 
              readOnly={true}
            />     
          </div>
          {/* <div className = "ProductReviewShowMainValuation"> */}
            {/* <div className = "ProductReviewShowMainValuationPeacentage">
              <div className = "ProductReviewShowMainValuationPeacentageMain">
                {likeCommentScore==undefined||likeCommentScore=="0.0"?
                <>-----</>  
                :
                <>
                {likeCommentScore}
                </>
                }
              </div>
              <div className = "ProductReviewShowMainValuationPeacentageSub">
                /100
              </div>
            </div>
            <div className = "ProductReviewShowMainValuationGoodBad">
            {user.login?
              <>
              {userLikesJugde == 0&&(
              <>
              <div className = "ProductReviewShowMainValuationGood"
              onClick={reviewValuationGood}
              >
                <FaRegThumbsUp/>
              </div>
              <div className = "ProductReviewShowMainValuationBad"
              onClick={reviewValuationBad}
              >
                <FaRegThumbsDown/>
              </div>
              </>
              )}
              {userLikesJugde == 1&&(
              <>
              <div className = "ProductReviewShowMainValuationGood"
              onClick={reviewValuationGooddelete}
              >
                <FaThumbsUp/>
              </div>
              <div className = "ProductReviewShowMainValuationBad"
              onClick={reviewValuationBad}
              >
                <FaRegThumbsDown/>
              </div>
              </>
              )}
              {userLikesJugde == 2&&(
              <>
              <div className = "ProductReviewShowMainValuationGood"
              onClick={reviewValuationGood}
              >
                <FaRegThumbsUp/>
              </div>
              <div className = "ProductReviewShowMainValuationBad"
              onClick={reviewValuationGooddelete}
              >
                <FaThumbsDown/>
              </div>
              </>
              )}
              </>
              // 下 ログインしていない処理
              :
              <>
              <div className = "ProductReviewShowMainValuationGood"
                onClick={UserModalOpen}
              >
                
                <FaRegThumbsUp/>
              </div>
              <div className = "ProductReviewShowMainValuationBad"
                onClick={UserModalOpen}
              >
                <FaRegThumbsDown/>
              </div>
                {open&&(
                  <OpenContext.Provider value={{ open, setOpen }}>
                    <UserModalSign/>
                  </OpenContext.Provider>
                )}
              </>
              }
            </div>
          </div>
          <div className="ProductReviewShowMainValuationExplain">
            {reviewLoaded==true&&(
              <>
              {totalLength!=0&&(
                <>
              {`${totalLength}人中${goodLength}人が好評価しました。`}
                </>
              )}
              {totalLength==0&&(
                <>
                  まだ評価はありません。
                </>
              )}
            </>
            )}
          </div> */}
          <div className = "ProductReviewShowMainComments">
            <div className = "ProductReviewShowMainCommentsTop">
              <div className = "ProductReviewShowMainCommentsTopTitle">
                
                <div className = "ProductReviewShowMainCommentsTopTitleSort">
                  <div className = "sortCommentsLists">
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">Sort</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"

                    value={selectSort}
                    onChange={handleChangeSelectSort}
                    label="Age"
                  >
                    <MenuItem value={0}>評価数順</MenuItem>
                    <MenuItem value={1}>新着順</MenuItem>
                    <MenuItem value={2}>投稿順</MenuItem>
                  </Select>
                  </FormControl>
                  </div>
                </div>
              </div>
              {user.login?
                <>
              <div className = "ProductReviewShowMainCommentsTopCommenting"
                onClick={modalOpenJugdeReviewComment}
              >
                投稿する
              </div>
              {openReviewComment&&(
                <OpenReviewCommentContext.Provider value={{openReviewComment, setOpenReviewComment}}>
                  <ThreadComment
                  user_id={user.user.id}
                  product_id={params_product_id as string}
                  review_id = {review?.id as number}
                  setReviewComments = {setReviewComments}
                  reviewComments = {reviewComments}
                  // ---------------
                  selectSort={selectSort}
                  scrollRef={scrollRef}
                  setHasMore={setHasMore}
                  setPage2 = {setPage2}
                  />
                </OpenReviewCommentContext.Provider>
              )}   
              </>
              :
              <>
              <div className = "ProductReviewShowMainCommentsTopCommenting"
              onClick={UserModalOpen}
              >
                コメントする
              </div>
              </>
              }
            </div>
            <div className = "ProductReviewShowMainCommentsMain" ref={scrollRef} style={{overflow:"auto"}}>
            {firstloding&&(
            <InfiniteScroll
              loadMore={handleScrollingExec}    
              hasMore={hasMore}  
              loader={loader}
              useWindow={false}
              getScrollParent={() => scrollParentRef}
              >
            {reviewComments.map((item) => {
              return(

                  <ThreadCommentList
                  key={item.id}
                  reviewcomment = {item}
                  selectSort={selectSort}
                  product_id={params_product_id}
                  review_id={params_review_id}
                  handleUpdateContents={handleUpdateContents}
                  />
              )
            })}
              </InfiniteScroll>
              )}
            </div>
          </div>

        </div>  
      </div>
      </>}
      </>
      </Modal>
    </>
  )
}