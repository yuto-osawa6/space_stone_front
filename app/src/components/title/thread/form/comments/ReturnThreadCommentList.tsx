import { UserModalSign } from "components/applications/user/UserModalSign"
import { OpenContext, OpenReviewCommentContext } from "contexttype/contexttype"
import { like_return_comment, return_review_comments } from "interfaces/review"
import { execCheckLikeReturnCommentReview, execCreateLikeReturnCommentReview, execDeleteLikeReturnCommentReview } from "lib/api/reviews"
import { execCheckLikeReturnCommentThread, execCreateLikeReturnCommentThread, execDeleteLikeReturnCommentThread, execDeleteReturnThreadComment } from "lib/api/threads"
import { useEffect, useRef, useState } from "react"
import { BsReply } from "react-icons/bs"
import { FaRegThumbsDown, FaRegThumbsUp, FaThumbsDown, FaThumbsUp } from "react-icons/fa"
// import ReactQuill from "react-quill"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "store"
import { ReturnReturn } from "./ReturnReturn"
// import { ReturnReturn } from "./ReturnReturn"
import { DeltaStatic } from "quill"
// import { useParams } from "react-router-dom"
import { pussingMessageDataAction } from "store/message/actions"
import { useUser } from "lib/data/user/useUser"
import { useRouter } from "next/router"
import { ErrorMessage } from "lib/ini/message"
// import { ErrorMessage } from "share/message"

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

type Props = {
  reviewcomment : return_review_comments
  setUpdateJudge?: () => Promise<void>
  firstHandler: () => Promise<void>
  setFirstloding: React.Dispatch<React.SetStateAction<boolean>>


  // returnReviewList:return_review_comments[]
  // setReturnReviewList:React.Dispatch<React.SetStateAction<return_review_comments[]>>
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

const ini:like_return_comment = {
  id:0,
  goodbad:0
}

export const ReturnThreadCommentList:React.FC<Props> = (Props) => {
  // console.log(Props)
  // const user = useSelector((state:RootState) => state.user)
  const {userSwr} = useUser()
  const user = userSwr
  // usestate
  const [open, setOpen] = useState<boolean>(false)
  const [likeCommentReview, setLikeCommentReview] = useState<like_return_comment>(ini)
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
  const ModalOpenReturnComment = () => {setOpenReturnReviewComment(true)
  console.log("aa")
  }

 // !userlogin usermodal
 const UserModalOpen = (e:React.MouseEvent<HTMLDivElement> | undefined) => {
  e?.stopPropagation()
  setOpen(true)
}


  const dispatch = useDispatch()
  // const params = useParams()
  const router = useRouter()
  const {pid,tid} = router.query
  const params_thread_id = tid as string
  // v1.01---------------------
  const [goodLength,setGoodlength] = useState<number>()
  const [likeCommentScore,setLikeCommentScore] = useState<string>()
  const [userLikesJugde,setUserLikesJudge] = useState<number>(0)
  const [totalLength,setTotalLength] = useState<number>(0)
  const [reviewLoaded,setReviewLoaded] = useState<boolean>(false)
  const quillref  = useRef<any>(null!)
// goodbad create
  const reviewValuationGood = async(e:React.MouseEvent<HTMLDivElement> | undefined) => {
    e?.stopPropagation()
    if(params_thread_id==undefined)return
    const res = await execCreateLikeReturnCommentThread(Props.reviewcomment.id,user.user.id,1,Props.reviewcomment.commentReviewId,params_thread_id)
    if (res.data.status==200) {
      setGoodlength(res.data.reviewGood)
      setLikeCommentScore(res.data.score.toFixed(1))
      setUserLikesJudge(res.data.like.goodbad)
      setTotalLength(res.data.reviewLength)

    }else if(res.data.status===400){
      dispatch(pussingMessageDataAction({title:ErrorMessage.delete,select:0}))
    }else if(res.data.status===410){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message410,select:0}))
    }else if(res.data.status===420){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message420,select:0}))
    }else{
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    }

  }
  const reviewValuationBad = async(e:React.MouseEvent<HTMLDivElement> | undefined) => {
    e?.stopPropagation()
    if(params_thread_id==undefined)return
    const res = await execCreateLikeReturnCommentThread(Props.reviewcomment.id,user.user.id,2,Props.reviewcomment.commentReviewId,params_thread_id)
    if (res.data.status === 200) {
      setGoodlength(res.data.reviewGood)
      setLikeCommentScore(res.data.score.toFixed(1))
      setUserLikesJudge(res.data.like.goodbad)
      setTotalLength(res.data.reviewLength)
    }else if(res.data.status===400){
      dispatch(pussingMessageDataAction({title:ErrorMessage.delete,select:0}))
    }else if(res.data.status===410){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message410,select:0}))
    }else if(res.data.status===420){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message420,select:0}))
    }else if(res.data.status===440){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message440,select:0}))
    }else{
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    }
  }
  // // check
  // useEffect(()=>{
  //   CheckLikeReview()
  // },[user])

  // const CheckLikeReview = async() => {
  //   // if(!user.login) return
  //   const res = await execCheckLikeReturnCommentThread(Props.reviewcomment.id,user.user.id)
  //   if (res.data.status === 200) {
  //     console.log(res)

  //     setLikeCommentReview(res.data.like)

  //     setLikeReviewScore(res.data.like.score)
  //     setLikeReviewLength(res.data.like.reviewLength)
  //     setLikeReviewGood(res.data.like.reviewGood)
  //   }
  //   if (res.data.status === 201){
    
  //     console.log(res)
  //     // console.log("no login")
  //     setLikeReviewScore(res.data.score)
  //     setLikeReviewLength(res.data.reviewLength)
  //     setLikeReviewGood(res.data.reviewGood)
  //   }
  //   else{

  //   }
  // }
  // // delete
  const reviewValuationGooddelete = async(e:React.MouseEvent<HTMLDivElement> | undefined) => {
    e?.stopPropagation()
    if(params_thread_id==undefined)return
    const res = await execDeleteLikeReturnCommentThread(Props.reviewcomment.id,user.user.id,likeCommentReview.id,Props.reviewcomment.commentReviewId,params_thread_id)
    if (res.data.status === 200) {
      setGoodlength(res.data.reviewGood)
      setLikeCommentScore(res.data.score.toFixed(1))
      setUserLikesJudge(0)
      setTotalLength(res.data.reviewLength)


    }else if(res.data.status===400){
      dispatch(pussingMessageDataAction({title:ErrorMessage.delete,select:0}))
    }else if(res.data.status===410){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message410,select:0}))
    }else if(res.data.status===420){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message420,select:0}))
    }else{
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    }
  }


  useEffect(()=>{
    firstHandler()
  },[])
  const firstHandler = () => {
    console.log(Props)
    setTotalLength(Props.reviewcomment.likeReturnCommentReviews.length)

    if(Props.reviewcomment.likeReturnCommentReviews.length>0){
      const good = Props.reviewcomment.likeReturnCommentReviews.reduce(function(a, x){return a + (x.goodbad==1?x.goodbad:0)}, 0);
      const parsent = ((good/Props.reviewcomment.likeReturnCommentReviews.length)*100).toFixed(1)
      setLikeCommentScore(parsent)
      setGoodlength(good)
    }else{
      setLikeCommentScore(undefined)
      setGoodlength(undefined)
    }

    if (user.login==true){

      const currentUserDict = Props.reviewcomment.likeReturnCommentReviews.filter(item=>item.userId==user.user.id)
      if(currentUserDict.length==1){
        setUserLikesJudge(currentUserDict[0].goodbad)
      }else{
        setUserLikesJudge(0)
      }
    }
  }

  // ------------------get text ReactQuil---------------------------------------------------------------

  const [readMore,setReadMore] = useState<boolean>(false) 
  const [readMoreLength,setReadMoreLength] = useState<number>(0)
  const [content,setContent] = useState<string|DeltaStatic>("")
  const readMoreHandler = () => {
    readMore==true?setReadMore(false):setReadMore(true)
  }
  const firstReadMoreHandler = () => {
    setContent("")
    setReadMore(false)
    var doc = new DOMParser().parseFromString(Props.reviewcomment.comment, "text/html")
    console.log(doc.getElementsByTagName('body')[0].innerText)
    const doc200 = doc.getElementsByTagName('body')[0].innerText.slice(0,200)
    setContent(doc200.length!=200?doc200:doc200+"...")
    setReadMoreLength(doc200.length)

  }

  useEffect(()=>{
    firstReadMoreHandler()
  },[])
// ----------------------------------------------------------
const ReviewCommentListRef = useRef<HTMLDivElement>(null)
  const clickHandler = () => {
    setReadMore(true)
  }
  const clickHandler2 = (e:React.MouseEvent<HTMLDivElement> | undefined) => {
    e?.stopPropagation()
    setReadMore(false)
    ReviewCommentListRef.current?.scrollIntoView()
  }

   // delete
   const handleDeleteReviewComment = async(e:React.MouseEvent<HTMLDivElement> | undefined) => {
    e?.stopPropagation()
    if(params_thread_id==undefined)return
    const res = await execDeleteReturnThreadComment(Props.reviewcomment.id,Props.reviewcomment.commentReviewId,params_thread_id)
    console.log(res)
    if (res.data.status == 200){
      Props.setFirstloding(false)
      Props.firstHandler()
    }else if(res.data.status===400){
      dispatch(pussingMessageDataAction({title:ErrorMessage.delete,select:0}))
    }else if(res.data.status===410){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message410,select:0}))
    }else if(res.data.status===420){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message420,select:0}))
    }else{
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    }
  }
 

  return(
    <>
     
     <div className = {readMore==false?"ReviewCommentList ReviewCommentListHover":"ReviewCommentList"}
      onClick={clickHandler}
      ref = {ReviewCommentListRef}
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
          {Props.reviewcomment.reply&&(
          <>
            {typeof Props.reviewcomment.returnReturn!= "undefined"?
            <>
              <div className = "ReturnUser"
              style={{fontSize:"0.9rem"}}
              >
                <p><BsReply/></p>
                <p>{Props.reviewcomment.returnReturn.nickname}</p>
              </div>
            </>
            :
            <>
              <div className = "ReturnUser"
              style={{fontSize:"0.9rem"}}
              >
                <p><BsReply/></p>
                <p>返信先は削除されました。</p>
              </div>
            </>
            }
          </>
          )}
        <div className = "ReviewCommentListMain">

          <ReactQuill
            className = "review_comment_list_modal_quill"
            // ref={quillref}
            // ref='editor'
            modules={modules} 
            value={readMore==true?Props.reviewcomment.comment:content}
            // theme="bubble" 
            theme="bubble"
            readOnly={true}
            
          />
          </div>
        <div className = "ReviewCommentListUnderflex">
          <div className = "ReviewCommentListUnderflexReturnAll"
          onClick ={ModalOpenReturnComment}
          >
            
          </div>
              
            
        
          <div className = "ReviewCommentListGoodBad">
            <div className = "ProductReviewShowMainValuationPeacentage">
              
              {readMore==true&&(
                <div
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
                  {likeReviewLength!=0&&likeReviewGood!=0&&(
                  <>
                    {likeReviewGood}
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
       
                    <ReturnReturn
                    user_id={user.user.id}
                    return_comment_review_id={Props.reviewcomment.id}
                    comment_review_id = {Props.reviewcomment.commentReviewId}
                    // setReviewComments = {setReviewComments}
                    // reviewComments = {reviewComments}
                    setReturnReviewList = {Props.setReturnReviewList}
                    returnReviewList = {Props.returnReviewList}
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
      {openReviewComment&&(
        <OpenReviewCommentContext.Provider value={{openReviewComment, setOpenReviewComment}}>

          <ReturnReturn
          user_id={user.user.id}
          return_comment_review_id={Props.reviewcomment.id}
          comment_review_id = {Props.reviewcomment.commentReviewId}
          // setReviewComments = {setReviewComments}
          // reviewComments = {reviewComments}
          // setReturnReviewList = {Props.setReturnReviewList}
          // returnReviewList = {Props.returnReviewList}
          setUpdateJudge = {Props.setUpdateJudge}
          />
        </OpenReviewCommentContext.Provider>
      )}  
      {open&&(
        <OpenContext.Provider value={{ open, setOpen }}>
          <UserModalSign/>
        </OpenContext.Provider>
      )} 
    </>
  )
}