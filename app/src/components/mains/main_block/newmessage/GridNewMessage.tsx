import { news } from "@/interfaces/main"
import { execDeleteNews } from "@/lib/api/admin/news"
import { useUser } from "@/lib/data/user/useUser"
import { ErrorMessage } from "@/lib/ini/message"
import { pussingMessageDataAction } from "@/store/message/actions"
import { memo, useState } from "react"
import { useDispatch } from "react-redux"
import { NewMessageModal } from "./NewMessageModal"

type Props = {
  news:news
  tagsactive:number
}
export const GridNewMessage:React.FC<Props> = memo(function GridNewMessageFunc(Props){
  const {userSwr} = useUser()
  const dispatch  = useDispatch()
  const handleDeleteNews = async(e:React.MouseEvent<HTMLDivElement> | undefined) => {
    e?.stopPropagation()
    const res = await execDeleteNews(Props.news.id)
    if(res.data.status === 200){
      dispatch(pussingMessageDataAction({title:"newsを削除しました。",select:1}))
    }else{
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    }
  }
  const handleOpen = (e:React.MouseEvent<HTMLDivElement> | undefined) => {
    setOpen(true)
  }
  const [open,setOpen] = useState<boolean>(false)
  return(
    <>
    {Props.tagsactive ==Props.news.judge&&(
      <div className = "gridNewMessageList"
        onClick={handleOpen}
      >
        <div className = "gridNewMessageListDate">
        {Props.news.date}
        </div>
        <div className = "gridNewMessageListTitle">
        {Props.news.title}
        </div>
        <div className = "gridNewMessageListDiscription">
        {Props.news.description}
        </div>
        <div className = "gridNewMessageListTag">
        {/* {String(Props.news.jugde)} */}
        {Props.news.judge == 1&&(
          <>
            #アニメ
          </>
        )}
        {Props.news.judge == 2&&(
          <>
            #記事
          </>
        )}
        {Props.news.judge == 3&&(
          <>
            #更新
          </>
        )}

        </div>
        {userSwr.user.administratorGold&&(
          <div className = "gridNewMessageListDelete"
          style={{zIndex:100}}
          onClick={handleDeleteNews}
          >
            削除
          </div>
        )}
      </div>
      )}

      {Props.tagsactive ==0&&(
      <div className = "gridNewMessageList"
        onClick={handleOpen}
      >
        <div className = "gridNewMessageListDate">
        {Props.news.date}
        </div>
        <div className = "gridNewMessageListTitle">
        {Props.news.title}
        </div>
        <div className = "gridNewMessageListDiscription">
        {Props.news.description}
        </div>
        <div className = "gridNewMessageListTag">
        {Props.news.judge == 1&&(
          <>
            #アニメ
          </>
        )}
        {Props.news.judge == 2&&(
          <>
            #記事
          </>
        )}
        {Props.news.judge == 3&&(
          <>
            #更新
          </>
        )}
        </div>
        {userSwr.user.administratorGold&&(
          <div className = "gridNewMessageListDelete"
          onClick={handleDeleteNews}
          >
            削除
          </div>
        )}
      </div>
      )}
      {open&&(
        <NewMessageModal
          open={open}
          setOpen={setOpen}
          news = {Props.news}
        />
      )}
    </>
  )
})