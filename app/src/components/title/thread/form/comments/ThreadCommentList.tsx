import { UserModalSign } from "components/applications/user/UserModalSign"
import { OpenContext, OpenReturnReviewCommentContext, OpenReviewCommentContext } from "contexttype/contexttype"
import { like_review, return_review_comments, review_comments } from "interfaces/review"
import { execCheckLikeCommentReview, execCheckReturnCommentReview, execCreateLikeCommentReview, execDeleteLikeCommentReview } from "lib/api/reviews"
import { execCheckLikeCommentThread, execCheckReturnCommentThread, execCreateLikeCommentThread, execDeleteLikeCommentThread, execDeleteThreadComment } from "lib/api/threads"
import { useEffect, useRef, useState } from "react"
import { FaRegThumbsDown, FaRegThumbsUp, FaThumbsDown, FaThumbsUp } from "react-icons/fa"
// import ReactQuill from "react-quill"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "store"
import { ReturnThreadCommentAll } from "../modal/ReturnThreadCommentAll"
import { ReturnThreadComment } from "./ReturnThreadComment"
// import { ReturnReviewCommentAll } from "../modal/ReturnReviewCommentAll"
// import { ReturnReviewComment } from "./ReturnReviewComment"
// import { DeltaStatic } from "quill"
// import { useParams } from "react-router-dom"
import { pussingMessageDataAction } from "store/message/actions"
import { useUser } from "lib/data/user/useUser"
import { useRouter } from "next/router"
import { ErrorMessage } from "lib/ini/message"
// import { ErrorMessage } from "share/message"

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

type Props = {
  reviewcomment : review_comments
  selectSort: string
  product_id: string | undefined
  review_id: string | undefined
  handleUpdateContents: () => Promise<void>
}

const ini:like_review = {
  id:0,
  goodbad:0,
  userId:0
}
const modules = {
  toolbar: [
    // [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    // [{ script:  "sub" }, { script:  "super" }],
    ["blockquote"
  ],
    // "code-block"],
    [{ list:  "ordered" }, { list:  "bullet" }],
    [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
    // ["link", "image", "video"],
    ['link'],   
    // ["clean"],
  ], 
}
export const ThreadCommentList:React.FC<Props> = (Props) => {
  // store
  // const user = useSelector((state:RootState) => state.user)
  const {userSwr} = useUser()
  const user = userSwr
  // usestate
  const [open, setOpen] = useState<boolean>(false)
  const [likeCommentReview, setLikeCommentReview] = useState<like_review>(ini)
    // score
    const [likeReviewScore,setLikeReviewScore] = useState<number>(0)
    const [likeReviewLength,setLikeReviewLength] = useState<number>(0)
    const [likeReviewGood,setLikeReviewGood] = useState<number>(0)
    // return
    const [returnReviewList,setReturnReviewList] = useState<return_review_comments[]>([])
    
  const [openReviewComment,setOpenReviewComment] = useState<boolean>(false)
  const modalOpenJugdeReviewComment= (e:React.MouseEvent<HTMLDivElement> | undefined) => {
    e?.stopPropagation()
    setOpenReviewComment(true)
  }
   // return modal
   const [openReturnReviewComment,setOpenReturnReviewComment] = useState<boolean>(false)
   const ModalOpenReturnComment = (e:React.MouseEvent<HTMLDivElement> | undefined) => {
     e?.stopPropagation()
     setOpenReturnReviewComment(true)
   }
  
  // !userlogin usermodal
  const UserModalOpen = (e:React.MouseEvent<HTMLDivElement> | undefined) => {
    e?.stopPropagation()
    setOpen(true)
  }
  
  const dispatch = useDispatch()
  // const params = useParams()
  const router = useRouter()
  const {pid,tid} = router. query
  const params_thread_id = tid as string

  // goodbad create
  const reviewValuationGood = async(e:React.MouseEvent<HTMLDivElement> | undefined) => {
    e?.stopPropagation()
    if(params_thread_id==undefined)return
    const res = await execCreateLikeCommentThread(Props.reviewcomment.id,user.user.id,1,params_thread_id)
    if (res.data.status === 200) {
      console.log(res)
      setGoodlength(res.data.reviewGood)
      setLikeCommentScore(res.data.score.toFixed(1))
      setUserLikesJudge(res.data.like.goodbad)
      setTotalLength(res.data.reviewLength)
      
    }else if(res.data.status===400){
      dispatch(pussingMessageDataAction({title:ErrorMessage.delete,select:0}))
    }else if(res.data.status===410){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message410,select:0}))
    }else{
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    }

  }
  const reviewValuationBad = async(e:React.MouseEvent<HTMLDivElement> | undefined) => {
    e?.stopPropagation()
    if(params_thread_id==undefined)return
    const res = await execCreateLikeCommentThread(Props.reviewcomment.id,user.user.id,2,params_thread_id)
    if (res.data.status === 200) {
      console.log(res)
      setGoodlength(res.data.reviewGood)
      setLikeCommentScore(res.data.score.toFixed(1))
      setUserLikesJudge(res.data.like.goodbad)
      setTotalLength(res.data.reviewLength)
    }else if(res.data.status===400){
      dispatch(pussingMessageDataAction({title:ErrorMessage.delete,select:0}))
    }else if(res.data.status===410){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message410,select:0}))
    }else{
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    }
  }
  // // check
  // useEffect(()=>{
  //   CheckLikeReview()
  // },[user,Props.reviewcomment])

  // const CheckLikeReview = async() => {
  //   // if(!user.login) return
  //   const res = await execCheckLikeCommentThread(Props.reviewcomment.id,user.user.id)
  //   if (res.data.status === 200) {
  //     console.log(res)
    

  //     setLikeCommentReview(res.data.like)

  //     setLikeReviewScore(res.data.like.score)
  //     setLikeReviewLength(res.data.like.reviewLength)
  //     setLikeReviewGood(res.data.like.reviewGood)
  //   }
  //   if (res.data.status === 201){
    
  //     console.log(res)
  //     console.log("no login")
  //     setLikeReviewScore(res.data.score)
  //     setLikeReviewLength(res.data.reviewLength)
  //     setLikeReviewGood(res.data.reviewGood)
  //   }
  //   else{

  //   }
  // }
  // delete
  const reviewValuationGooddelete = async(e:React.MouseEvent<HTMLDivElement> | undefined) => {
    e?.stopPropagation()
    if(params_thread_id==undefined)return
    const res = await execDeleteLikeCommentThread(Props.reviewcomment.id,user.user.id,likeCommentReview.id,params_thread_id)
    if (res.data.status === 200) {
      console.log(res)
      setGoodlength(res.data.reviewGood)
      setLikeCommentScore(res.data.score.toFixed(1))
      setUserLikesJudge(0)
      setTotalLength(res.data.reviewLength)

    }else if(res.data.status===400){
      dispatch(pussingMessageDataAction({title:ErrorMessage.delete,select:0}))
    }else if(res.data.status===410){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message410,select:0}))
    }else{
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    }
  }
  // execCheckReturnCommentThread

  // set first data
  // const CheckReturnReview = async() => {
  //   const res = await execCheckReturnCommentThread(Props.reviewcomment.id)
  //   if (res.data.status === 200) {
  //     console.log(res)
  //     setReturnReviewList(res.data.returncomment)
  //   }else{

  //   }
  // }

  // useEffect(()=>{
  //   CheckReturnReview()
  // },[Props.reviewcomment])


// v1.01------------------------------------------------------------------------------------------------------
// (n+1問題の解消、速度の改善)
  // like_review_comments

  const [goodLength,setGoodlength] = useState<number>()
  const [likeCommentScore,setLikeCommentScore] = useState<string>()
  const [userLikesJugde,setUserLikesJudge] = useState<number>(0)
  const [totalLength,setTotalLength] = useState<number>(0)
  const [reviewLoaded,setReviewLoaded] = useState<boolean>(false)

  const [returnJugde,setReturnJugde] = useState<boolean>(false)

  useEffect(()=>{
    firstHandler()
  },[Props.reviewcomment])

  const firstHandler = () => {
    console.log(Props)
    console.log(Props.reviewcomment.likeComment)
    setTotalLength(Props.reviewcomment.likeComment.length)

    if(Props.reviewcomment.likeComment.length>0){
      const good = Props.reviewcomment.likeComment.reduce(function(a, x){return a + (x.goodbad==1?x.goodbad:0)}, 0);
      const parsent = ((good/Props.reviewcomment.likeComment.length)*100).toFixed(1)
      setLikeCommentScore(parsent)
      setGoodlength(good)
    }else{
      setLikeCommentScore(undefined)
      setGoodlength(undefined)
    }

    setReturnJugde(Props.reviewcomment.returnJugde)

    if (user.login==true){

      const currentUserDict = Props.reviewcomment.likeComment.filter(item=>item.userId==user.user.id)
      if(currentUserDict.length==1){
        setUserLikesJudge(currentUserDict[0].goodbad)
      }else{
        setUserLikesJudge(0)
      }
    }
  }

  //   // ------------------get text ReactQuil---------------------------------------------------------------
  //   const quillref  = useRef<ReactQuill>(null!)
  const [readMore,setReadMore] = useState<boolean>(false) 
  const [readMoreLength,setReadMoreLength] = useState<number>(0)
  const [content,setContent] = useState<any>("")
  const readMoreHandler = () => {
    readMore==true?setReadMore(false):setReadMore(true)
  }
  const firstReadMoreHandler = () => {
    console.log(readMore)

    setReadMore(false)
    var doc = new DOMParser().parseFromString(Props.reviewcomment.comment, "text/html")
    console.log(doc.getElementsByTagName('body')[0].innerText)
    const doc200 = doc.getElementsByTagName('body')[0].innerText.slice(0,200)
    setContent(doc200.length!=200?doc200:doc200+"...")
    setReadMoreLength(doc200.length)
  }

  useEffect(()=>{
    firstReadMoreHandler()
  // },[Props.selectSort]) 
  // doneyet -2 selectsortでhandlerを起動させるかどうか、ロード中
},[])
useEffect(()=>{
  setReadMore(false)
},[Props.selectSort])

// ----------------------------------------------------------
const ReviewCommentListRef = useRef<HTMLDivElement>(null)

  const clickHandler = () => {
    console.log("aaaaaaaaaaaaa")
    // readMore==true?setReadMore(false):setReadMore(true)
    setReadMore(true)
  }
  const clickHandler2 = (e:React.MouseEvent<HTMLDivElement> | undefined) => {
    // console.log("aaaaaaaaaaaaa")
    // e?.stopPropagation()
    e?.stopPropagation()
    // readMore==true?setReadMore(false):setReadMore(true)
    setReadMore(false)
    ReviewCommentListRef.current?.scrollIntoView()
  }

  // delete
  const handleDeleteReviewComment = async(e:React.MouseEvent<HTMLDivElement> | undefined) => {
    e?.stopPropagation()
    if(Props.product_id==undefined)return
    if(Props.review_id==undefined)return
    const res = await execDeleteThreadComment(Props.product_id,Props.review_id,Props.reviewcomment.id)
    console.log(res)
    if (res.data.status == 200){
      Props.handleUpdateContents()
    }else if(res.data.status===400){
      dispatch(pussingMessageDataAction({title:ErrorMessage.delete,select:0}))
    }else if(res.data.status===410){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message410,select:0}))
    }else{
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    }
  }



  return (
    <>
      {/* {Props.reviewcomment.id} */}
      <div className = {readMore==false?"ReviewCommentList ReviewCommentListHover":"ReviewCommentList"}
      onClick={clickHandler}
      ref={ReviewCommentListRef}
      >
        <div className="ReviewCommentListUser">
          <img src={Props.reviewcomment.user.image}/>
          <div>
            {Props.reviewcomment.user.nickname}
          </div>
          <div className = "ReviewCommentListUserDate">
            {Props.reviewcomment.updatedAt}
          </div>
        </div>
        <div className = "ReviewCommentListMain">

          <ReactQuill
            className = "review_comment_list_modal_quill"
            // ref={quillref}
            // ref='editor'
            modules={modules} 
            // value={Props.reviewcomment.comment} 
            value={readMore==true?Props.reviewcomment.comment:content}
            // theme="bubble" 
            theme="bubble"
            readOnly={true}
            
          />
          </div>
        <div className = "ReviewCommentListUnderflex">
          <div className = "ReviewCommentListUnderflexReturnAll"
          onClick ={user.login?ModalOpenReturnComment:UserModalOpen}
          >
            {returnJugde&&(
                <>
                  返信一覧
                </>
              )}   
          </div>

            {/* {openReturnReviewComment&&(
                <OpenReturnReviewCommentContext.Provider value = {{openReturnReviewComment, setOpenReturnReviewComment}}>
            
                  <ReturnThreadCommentAll
                    returnReviewList = {returnReviewList}
                  // user_id={user.id}
                  // product_id={params_product_id as string}
                  // comment_review_id = {review?.id as number}
                    setReturnReviewList = { setReturnReviewList }
                  />
                </OpenReturnReviewCommentContext.Provider>
              )} */}
              
            
        
          <div className = "ReviewCommentListGoodBad">
              {/* <div className = "ReviewCommentListGoodBadReturn">
                返信する
              </div> */}
            <div className = "ProductReviewShowMainValuationPeacentage">
              {readMore==true&&(
                <div
                className="closeContents"
                onClick={clickHandler2}
                >
                  閉じる
                </div>
              )}

              {Props.reviewcomment.user.id==user.user.id&&(
                <div className="closeContents"
                onClick={handleDeleteReviewComment}
                >
                  削除
                </div>
              )}
              
              
              <div className = "ProductReviewShowMainValuationPeacentageMain">
                {totalLength > 0&&(
                  <>
                    {likeCommentScore}%
                  </>
                )}
              </div>
              
            </div>
            {user.login?
                <>
                {userLikesJugde == 0&&(
                <>
                <div className = "ProductReviewShowMainValuationGood"
                onClick={reviewValuationGood}
                >
                  <FaRegThumbsUp/>
                  {goodLength!=undefined&&goodLength!=0&&(
                  <>
                    {goodLength}
                  </>
                  )}
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
                  {goodLength!=undefined&&goodLength!=0&&(
                  <>
                    {goodLength}
                  </>
                  )}
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
                  {goodLength!=undefined&&goodLength!=0&&(
                  <>
                    {goodLength}
                  </>
                  )}
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
                  {goodLength&&goodLength!=0&&(
                  <>
                    {goodLength}
                  </>
                  )}
                </div>
                
                  {/* {open&&(
                    <OpenContext.Provider value={{ open, setOpen }}>
                      <UserModalSign/>
                    </OpenContext.Provider>
                  )} */}

                <div className = "ProductReviewShowMainValuationBad"
                  onClick={UserModalOpen}
                >
                  <FaRegThumbsDown/>
                </div>

                  {/* {open&&(
                    <OpenContext.Provider value={{ open, setOpen }}>
                      <UserModalSign/>
                    </OpenContext.Provider>
                  )} */}

                </>
                }
                {user.login?
                <>
                  <div className = "ReviewCommentListGoodBadReturn"
                    onClick={modalOpenJugdeReviewComment}
                  >
                    返信する
                  </div>
                  {/* {openReviewComment&&(
                  <OpenReviewCommentContext.Provider value={{openReviewComment, setOpenReviewComment}}>
            
                    <ReturnThreadComment
                    // product_id={props.product?.id}
                    // question={props.product?.questions}
                    user_id={user.user.id}
                    // product_id={params_product_id as string}
                    comment_review_id = {Props.reviewcomment.id}
                    setReturnReviewList = {setReturnReviewList}
                    returnReviewList = {returnReviewList}
                    />
                  </OpenReviewCommentContext.Provider>
                )}    */}
                </>
                :
                <>
                  <div className = "ReviewCommentListGoodBadReturn"
                    onClick={UserModalOpen}
                  >
                    返信する
                  </div>
                  {/* {open&&(
                    <OpenContext.Provider value={{ open, setOpen }}>
                      <UserModalSign/>
                    </OpenContext.Provider>
                  )} */}
                </>
                }
    

          </div>
        </div>

      </div>
      {openReturnReviewComment&&(
        <OpenReturnReviewCommentContext.Provider value = {{openReturnReviewComment, setOpenReturnReviewComment}}>
    
          <ReturnThreadCommentAll
            // returnReviewList = {returnReviewList}
            // setReturnReviewList = { setReturnReviewList }

            returnCommentReviewId = {Props.reviewcomment.id} 
            // v1.01-------------------------------------------------------------------------------------
            totalLength ={totalLength }
            likeCommentScore = {likeCommentScore}
            userLikesJugde={userLikesJugde}
            reviewValuationGood={reviewValuationGood}
            goodLength={goodLength}
            reviewValuationBad={reviewValuationBad}
            reviewValuationGooddelete={reviewValuationGooddelete}
            UserModalOpen={UserModalOpen}
            setReturnJugde={setReturnJugde}
            setReturnReviewList={setReturnReviewList}
            returnReviewList={returnReviewList}
            reviewcomment = {Props.reviewcomment}


          />
        </OpenReturnReviewCommentContext.Provider>
      )}
       {open&&(
        <OpenContext.Provider value={{ open, setOpen }}>
          <UserModalSign/>
        </OpenContext.Provider>
      )}
      {openReviewComment&&(
        <OpenReviewCommentContext.Provider value={{openReviewComment, setOpenReviewComment}}>
  
          <ReturnThreadComment
          // product_id={props.product?.id}
          // question={props.product?.questions}
          user_id={user.user.id}
          // product_id={params_product_id as string}
          comment_review_id = {Props.reviewcomment.id}
          setReturnReviewList = {setReturnReviewList}
          returnReviewList = {returnReviewList}

          setReturnJugde = {setReturnJugde}
          />
        </OpenReviewCommentContext.Provider>
      )} 
    </>
  )
}