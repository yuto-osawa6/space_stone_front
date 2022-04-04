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

export const ChatListItem:React.FC<Props> = (Props) => {


  return(
    <>
      <p className = "">
        {Props.item.message}
      </p>
    </>
  )
}