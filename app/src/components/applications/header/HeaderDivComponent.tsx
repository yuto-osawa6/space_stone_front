import { ReactNode } from "react"

type Props = {
  children:ReactNode
}

export const HeaderDivComponent:React.FC<Props> = (Props) => {

  return(
    <>
    <div className = "header">
      <div className = "header__box">
        {/* <Header/> */}
        {Props.children}
      </div>
    </div>
    </>
  )
}