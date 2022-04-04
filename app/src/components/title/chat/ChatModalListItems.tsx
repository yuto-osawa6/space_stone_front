import { useSelector } from "react-redux"
import { RootState } from "store"

type Props = {
  item : chatList
}
type chatList = {
  created_at: string
  id: number
  message: string
  product_id: number
  user_id: number
}

export const ChatModalListItems:React.FC<Props> = (Props) => {
  const user = useSelector((state:RootState)=>state.user)
  return(
    <>
      {Props.item.user_id==user.user.id?
      <>
        <p className = "CurrentUserMessagge">{Props.item.message}</p>
      </>
      :
      <>
       <p className = "NotCurrentUserMessagge">{Props.item.message}</p>
      </>
      }
    </>
  )
}