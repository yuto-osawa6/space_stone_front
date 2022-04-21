import { news } from "@/interfaces/main"
import { memo } from "react"

type Props = {
  news:news
  tagsactive:number
}
export const GridNewMessage:React.FC<Props> = memo((Props) =>{
  console.log(Props)
  return(
    <>
    {Props.tagsactive ==Props.news.judge&&(
      <div className = "gridNewMessageList">
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
      </div>
      )}

      {Props.tagsactive ==0&&(
      <div className = "gridNewMessageList">
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
      </div>
      )}
    </>
  )
})