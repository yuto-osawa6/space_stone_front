import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { deletingMessageDataAction } from "@/store/message/actions"

export const MessageContainer:React.FC =  function MessageContainerFunc(){
  const Message = useSelector((state:RootState)=>state.message)
  const dispatch = useDispatch()
  useEffect(()=>{
    if(Message.message.length==0)return
    const interval = setInterval(() => {
      dispatch(deletingMessageDataAction())
    }, 3000);
    return () => clearInterval(interval);
  },[Message])

  return(
    <>
      <div className="messageCOntainer"
        style={{
          color: "white",
          position: "fixed",
          top: 56,
          left: "50%",
          zIndex: 9000000,
          transform:"translateX(-50%)",
          width: "calc(100% - 40px)",
          maxWidth:"1500px",
          maxHeight:"100vh",
          overflow:"hidden",
          pointerEvents:"none"
        }}
      >
        {Message.message.map((i,index)=>{
          return(
            <div className=""
            key={index}
            style={{
              backgroundColor: i.select==1?"rgba(71, 207, 138,0.9)":i.select==2?"rgba(255, 48, 115,0.9)":"rgba(40, 61, 82,0.9)",
              margin: 0,
              padding:10,
              lineHeight:"1.4rem"
            }}
            >{i.title}</div>
          )
        })}
      </div>   
    </>
  )
}