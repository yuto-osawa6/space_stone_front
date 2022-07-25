import { ReactNode } from "react"

type Props = {
  children:ReactNode
}

export const HeaderDivComponent:React.FC<Props> = function HeaderDivComponentFunc(Props){

  return(
    <>
    <div className = "header">
      <div className = "header__box">
        {Props.children}
      </div>
    </div>
    </>
  )
}