import { Modal } from "@mui/material"
import { UserModalSign } from "@/components/applications/user/UserModalSign"
import { OpenContext, OpenReturnReviewCommentContext, OpenReviewCommentContext } from "@/contexttype/contexttype"
import { return_review_comments, review_comments } from "@/interfaces/review"
import { execCreateLikeCommentReview, execDeleteLikeCommentReview, execReturenReviewIndexHandler } from "@/lib/api/reviews"
import { useUser } from "@/lib/data/user/useUser"
import { useContext, useEffect, useRef, useState } from "react"
import { FaRegThumbsDown, FaRegThumbsUp, FaThumbsDown, FaThumbsUp } from "react-icons/fa"
import InfiniteScroll from "react-infinite-scroller"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { ReturnReviewComment } from "../comments/ReturnReviewComment"
import { ReturnReviewCommentList } from "../comments/ReturnReviewCommentList"
import { IoMdClose } from "react-icons/io"

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

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
type Props = {
  returnCommentReviewId:number
  // -------------------
  totalLength :number
  likeCommentScore:string | undefined
  userLikesJugde: number
  reviewValuationGood: (e: React.MouseEvent<HTMLDivElement> | undefined) => Promise<void>
  goodLength: number | undefined
  reviewValuationBad: (e: React.MouseEvent<HTMLDivElement> | undefined) => Promise<void>
  reviewValuationGooddelete: (e: React.MouseEvent<HTMLDivElement> | undefined) => Promise<void>
  UserModalOpen: (e: React.MouseEvent<HTMLDivElement> | undefined) => void
  setReturnJugde: React.Dispatch<React.SetStateAction<boolean>>
  setReturnReviewList: React.Dispatch<React.SetStateAction<return_review_comments[]>>
  returnReviewList: return_review_comments[]
  reviewcomment:review_comments
}
export const ReturnReviewCommentAll:React.FC<Props> = function ReturnReviewCommentAllFunc(Props){
  const {openReturnReviewComment,setOpenReturnReviewComment} = useContext(OpenReturnReviewCommentContext)
  const handleClose = () => {
    setOpenReturnReviewComment(false);
  }

  
  // v1.01----------
  const [returnComments,setReturnComments] = useState<return_review_comments[]>([])
  const [commentReview, setCommentReview] = useState<review_comments>()

  const [updateJudge,setUpdateJudge] = useState<boolean>(false)

  const firstHandler = async() => {
    const res = await execReturenReviewIndexHandler(Props.returnCommentReviewId,1)
    if (res.status == 200){
      scrollRef.current?.scrollTo({
        top: 0,
      })
      setPage(2)
      setReturnComments(res.data.returncomment)
      setHasMore(true)
      setFirstloding(true)
    }else{
    }
  }
  const {userSwr} = useUser()
  const user = userSwr

  useEffect(()=>{
    firstHandler()
  },[])

const [open,setOpen] = useState<boolean>(false)
const UserModalOpen = () => setOpen(true)
const [openReviewComment,setOpenReviewComment] = useState<boolean>(false)
const modalOpenJugdeReviewComment= () => setOpenReviewComment(true)
// ------------------------------------------------------------------------------------------------------
const [loaded,setLoaded] = useState<boolean>(false)
const [hasMore, setHasMore] = useState(true); 
const [page,setPage] = useState<number>(2)
const [firstloding,setFirstloding] = useState<boolean>(false);
// doneyet-6(初回handlescrollingが呼び出される問題で、上のsetupハンドラーを削除するか否か。現状問題ないと判断したためこのまま続行)
const handleScrollingExec = async () => {

  setLoaded(true)
  if(loaded==true)return
  const res = await execReturenReviewIndexHandler(Props.returnCommentReviewId,page)
  if (res.status === 200) {
    setPage(page+1)
    if (res.data.returncomment.length < 1) {
      setHasMore(false);
      setLoaded(false)
      return;
    }
    setReturnComments([...returnComments, ...res.data.returncomment])
    setLoaded(false)  
  }
}

const loader =<div className="loader" key={0}>Loading ...</div>;
const scrollRef = useRef<HTMLDivElement>(null);
const scrollParentRef = scrollRef.current

  return(
    <>
    <Modal
        open={openReturnReviewComment}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > 
        <>
        <div className = "ReturnReviewConponentAll" ref={scrollRef}>
          <div className = "ReturnModalCommentReview ReviewCommentList">
            <div className="ReviewCommentListUser">
              <img src={Props.reviewcomment.user.image}/>
              <div>
                {Props.reviewcomment.user.nickname}
              </div>
              <div className = "ReviewCommentListUserDate">
                {Props.reviewcomment.updatedAt}
              </div>
            </div>
            <ReactQuill
              className = "ReviewReturnCommentQuill"
              modules={modules} 
              value={Props.reviewcomment.comment}
              theme="bubble"
              readOnly={true}
            />
            <div className = "ReviewCommentListUnderflex">
              <div></div>
              <div className = "ReviewCommentListGoodBad">
            <div className = "ProductReviewShowMainValuationPeacentage">
              <div className = "ProductReviewShowMainValuationPeacentageMain">
                {Props.totalLength > 0&&(
                  <>
                    {Props.likeCommentScore}%
                  </>
                )}
              </div>
            </div>
            {user.login?
                <>
                {Props.userLikesJugde == 0&&(
                <>
                <div className = "ProductReviewShowMainValuationGood"
                onClick={Props.reviewValuationGood}
                >
                  <FaRegThumbsUp/>
                  {Props.goodLength!=undefined&&Props.goodLength!=0&&(
                    <>
                      {Props.goodLength}
                    </>
                  )}
                </div>
                <div className = "ProductReviewShowMainValuationBad"
                onClick={Props.reviewValuationBad}
                >
                  <FaRegThumbsDown/>
                </div>
                </>
                )} 
                {Props.userLikesJugde == 1&&(
                <>
                <div className = "ProductReviewShowMainValuationGood"
                onClick={Props.reviewValuationGooddelete}
                >
                  <FaThumbsUp/>
                  {Props.goodLength!=undefined&&Props.goodLength!=0&&(
                    <>
                      {Props.goodLength}
                    </>
                  )}
                </div>
                <div className = "ProductReviewShowMainValuationBad"
                onClick={Props.reviewValuationBad}
                >
                  <FaRegThumbsDown/>
                </div>
                </>
                )}
                {Props.userLikesJugde == 2&&(
                <>
                <div className = "ProductReviewShowMainValuationGood"
                onClick={Props.reviewValuationGood}
                >
                  <FaRegThumbsUp/>
            
                  {Props.goodLength!=undefined&&Props.goodLength!=0&&(
                    <>
                      {Props.goodLength}
                    </>
                  )}
                </div>
                <div className = "ProductReviewShowMainValuationBad"
                onClick={Props.reviewValuationGooddelete}
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
                  onClick={Props.UserModalOpen}
                >
                  <FaRegThumbsUp/>
                  {Props.goodLength&&Props.goodLength!=0&&(
                    <>
                      {Props.goodLength}
                    </>
                  )}
                </div>
                
                  {open&&(
                    <OpenContext.Provider value={{ open, setOpen }}>
                      <UserModalSign/>
                    </OpenContext.Provider>
                  )}
                <div className = "ProductReviewShowMainValuationBad"
                  onClick={Props.UserModalOpen}
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
                {user.login?
                <>
                  <div className = "ReviewCommentListGoodBadReturn"
                    onClick={modalOpenJugdeReviewComment}
                  >
                    返信する
                  </div>
                  {openReviewComment&&(
                  <OpenReviewCommentContext.Provider value={{openReviewComment, setOpenReviewComment}}>
                    
                    <ReturnReviewComment
                    user_id={user.user.id}
                    comment_review_id={Props.returnCommentReviewId}
                    setReturnReviewList = {Props.setReturnReviewList}
                    returnReviewList = {Props.returnReviewList}
                    setReturnJugde = {Props.setReturnJugde}
                    setUpdateJudge={firstHandler}
                    />
                  </OpenReviewCommentContext.Provider>
                )}   
                </>
                :
                <>
                  <div className = "ReviewCommentListGoodBadReturn"
                    onClick={UserModalOpen}
                  >
                    返信する
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
          </div>

          <div className = "ModalReturnReviewComment"  
          >
            {firstloding&&(
            <InfiniteScroll
              loadMore={handleScrollingExec}    
              hasMore={hasMore}  
              loader={loader}
              useWindow={false}
              getScrollParent={() => scrollParentRef}
              >
              {returnComments.map((item) => {
                return(
                    <ReturnReviewCommentList
                      key={item.id}
                      reviewcomment = {item}
                      setUpdateJudge={firstHandler}
                      firstHandler={firstHandler}
                      setFirstloding = {setFirstloding}
                    />
                  )
              })}
              </InfiniteScroll>
              )}
            </div>
          </div>
          <div className="CloseButton CloseButtonReturnModals"
            onClick={handleClose}
            >
            <IoMdClose/>
          </div>
        </>
    </Modal>
    </>
  )

}