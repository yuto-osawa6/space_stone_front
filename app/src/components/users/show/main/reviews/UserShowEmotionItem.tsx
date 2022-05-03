type Props = {
  emotionItem:emotion
  setIsMenuOpen2: React.Dispatch<React.SetStateAction<boolean>>
  emotion:emotion | undefined
  setEmotion:React.Dispatch<React.SetStateAction<emotion | undefined>>
  setCurrent: React.Dispatch<React.SetStateAction<number>>
  // SetPage: React.Dispatch<React.SetStateAction<number>>
}
type emotion = {
  id:number
  emotion:string
}

export const UserShowEmotionItem:React.FC<Props> = function UserShowEmotionItemFunc(Props){

  const handleClick = () =>{
    Props.setEmotion(Props.emotionItem)
    Props.setCurrent(1)
    Props.setIsMenuOpen2(false)  
  }
  return(
    <>
      <li
      onClick={handleClick}
      >
        {Props.emotionItem.emotion}
      </li>
    </>
  )
}