import React, { useState, useEffect } from "react"
import ActionCable from 'actioncable'
import { product } from "@/interfaces/product";
import { Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ChatListItem } from "./ChatListItem";
import { OpenContext } from "@/contexttype/contexttype";
// import { UserModalSign } from "component/aplication/lefts/UserModalSign";
import { ChatModal } from "./ChatModal";
import { UserModalSign } from "@/components/applications/user/UserModalSign";
import { useUser } from "@/lib/data/user/useUser";

type Props = {
  product : product
  chatList: chatList[]
  setChatList : React.Dispatch<React.SetStateAction<chatList[]>>
  Channel: any
}

type chatList = {
  created_at: string
  id: number
  message: string
  product_id: number
  user_id: number
}
export const ChatRoomInProductShow:React.FC<Props> = function ChatRoomInProductShowFunc(Props){

  // const cable = ActionCable.createConsumer('ws://localhost:3001/cable');
  // const sub = cable.subscriptions.create('');
  // const [Channel,setChannel] = useState<any>(null)
  const [Message,setMessage] = useState<string>("")
  // const [chatList,setChatList] = useState<chatList[]>([])
  // const userStore = useSelector((state:RootState)=>state.user)
  const { userSwr } = useUser()
    // useEffect(() => {
  //   const channel = cable.subscriptions.create(
  //     {
  //       channel: 'ProductsChannel',
  //       id: Props.product.id,
  //     },
  //     {
  //       received: (data) => {
  //         // receiveMessage(data)
  //         // data => {product:data}
  //         setChatList(data.chatList)
  //       },
  //     }
  //   )
  
  //   setChannel(channel)
  
  //   return () => {
  //     channel.unsubscribe()
  //   }
  // }, [])
  const handleSendMessage = () => {
    const data = {
      product_id : Props.product.id,
      user_id : userSwr.user.id,
      message : Message
    }
    // Channel.send(data)
  }
  
  // ----------------------------------------------------
  const handleChangetext = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setMessage(e.target.value)
  }

  // user ---------------------------------------------------
  const [open,setOpen] = useState<boolean>(false)
  const modalopenJugdetop =() => setOpen(true)
  
  const [openChatRoom,setOpenChatRoom] = useState<boolean>(false)
  const modalopenJugde2 = () => setOpenChatRoom(true)
  return(
    <>
    <div className="ChatLists">
      <div style={{fontWeight: "bold",
    fontSize: "1.1rem",
    margin:"10px 20px",
    }}>
        Chat
      </div>
      <div>
        {userSwr.login==true?
        <>
          <div style={{
            width:"fit-content",
            cursor:"pointer",
            fontSize: "0.9rem",
            color: "cornflowerblue",
            margin:"10px 20px",
          }}
          onClick={modalopenJugde2}
          >ChatRoomへ</div>
        </>
        :
        <>
          <div style={{
            width:"fit-content",
            cursor:"pointer",
            fontSize: "0.9rem",
            color: "cornflowerblue",
            margin:"10px 20px",
          }}
          onClick={modalopenJugdetop}
          >ChatRoomへ</div>
        </>
        }
      </div>
      {Props.chatList.length!=0&&(
        <>
          <div className = "ChatListsBox">
          {/* {chatList.slice(-1)[0].message} */}
            {Props.chatList.slice(-5).map((item)=>{
              return(
                <ChatListItem
                key={item.id}
                item={item}
                />
              )
            })}
          </div>
        </>
      )}
    </div>
      {open&&(
          <OpenContext.Provider value={{ open, setOpen }}>
            <UserModalSign/>
          </OpenContext.Provider>
        )}
        {openChatRoom&&(
          <ChatModal
            product = {Props.product}
            openChatRoom = {openChatRoom}
            setOpenChatRoom = {setOpenChatRoom}

            Channel = {Props.Channel}
            chatList = {Props.chatList}
            setChatList = {Props.setChatList}

          />
        )}
    </>
  )
}