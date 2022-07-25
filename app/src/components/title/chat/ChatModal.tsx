import React, { useState, useEffect, useRef, useCallback } from "react"
import ActionCable from 'actioncable'
import { product } from "@/interfaces/product";
import { Button, TextField, Modal, FormHelperText } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { ChatListItem } from "./ChatListItem";
import { OpenContext } from "@/contexttype/contexttype";
import { ChatModalListItems } from "./ChatModalListItems";
import { IoMdClose } from "react-icons/io";
import { pussingMessageDataAction } from "@/store/message/actions";
import { ngword } from "@/lib/ini/ngWord";
import { ErrorMessage } from "@/lib/ini/message";
import { useUser } from "@/lib/data/user/useUser";

type Props = {
  product : product
  openChatRoom: boolean
  setOpenChatRoom: React.Dispatch<React.SetStateAction<boolean>>

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

export const ChatModal:React.FC<Props> = function ChatModalFunc(Props){
  const [message,setMessage] = useState<string>("")
  // const userStore = useSelector((state:RootState)=>state.user)
  const {userSwr} = useUser()
  const [helperText,setHelperText] = useState<string>("")
  const dispatch = useDispatch()

  const handleSendMessage = () => {
    if(ngword.some((ngword) => message.includes(ngword))){
      dispatch(pussingMessageDataAction({title:ErrorMessage.ngword,select:2}))   
      return
    }
    const data = {
      product_id : Props.product.id,
      user_id : userSwr.user.id,
      message : message
    }
    Props.Channel.send(data)
    setMessage("")
  }
  
  // ----------------------------------------------------
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setMessage(e.target.value)
  }
  // modal ¥
  const handleClose = () => {
    Props.setOpenChatRoom(false)
  }

  // scroll ----------------------
  const chatListRef = useRef<HTMLDivElement>(null!)
  const [use,setUse] = useState<boolean>(false)
  useEffect(()=>{
    if(chatListRef.current==null)return
    // doneyet-2(67を子からの高さを受け取ってやる方法に変えるかどうか)
    const ref = chatListRef.current
    const maxHeight = ref.scrollHeight
    if((ref.scrollHeight - ref.scrollTop - 67) <=　ref.clientHeight){
      chatListRef.current.scrollTo(0,maxHeight)
    }
  },[Props.chatList])

  useEffect(()=>{
    if(chatListRef.current==null)return
    const maxHeight = chatListRef.current.scrollHeight
    chatListRef.current.scrollTo(0,maxHeight)
  },[use])
  useEffect(()=>{
    setUse(true)
  },[])
  
  return(
    <>
      <Modal
        open={Props.openChatRoom}
        onClose={handleClose}
        // onClose={false}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className = "ChatListsModal">
          <div className = "ChatListsModalList"
          id = "ChatListsModalListElem"
          ref = {chatListRef}
          >
            {Props.chatList.map((item)=>{
              return(
                <ChatModalListItems
                  key = {item.id}
                  item = {item}
                />
              )
            })}
          </div>
          <div className = "ChatListsModalForms">
            <div className = "CloseButtoDummy">
              <div className="CloseButtonInChat"
                onClick={handleClose}
                >
                <IoMdClose/>
              </div>
            </div>
            
            
            <div className = "ChatListsModalFormsBox">         
              <input 
                className = "ChatListsModalFormsInputTag"
                type="text" 
                name="name" 
                placeholder="Message"
                value={message}
                autoComplete="off"
                onChange={handleChangeText}
                maxLength={200}
                >         
              </input>
              <p 
                className = "ChatListsModalFormsButton"
                onClick={handleSendMessage}
                >Submit</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}