import { Header } from "@/components/applications/header/Header"
import { ReactNode } from "react"
import { HeaderDivComponent } from "../../applications/header/HeaderDivComponent"
import { Super } from "../layout/main/Super"

type Props = {
  children:ReactNode
  locationNumber?: number
}
export const ShareMain:React.FC<Props> = function ShareMainFunc(Props){
  
  return(
    <>
      <HeaderDivComponent>
        <Header
        locationNumber={Props.locationNumber}
        />
      </HeaderDivComponent>
      <Super
        locationNumber={Props.locationNumber}
      >
        {Props.children}
      </Super>
      {/* <Footter/> */}
    </>
  )
}