import { ReactNode } from "react"
import { HeaderDivComponent } from "../../applications/header/Header"
import { Super } from "../layout/main/Super"

type Props = {
  children:ReactNode
  locationNumber?: number
}
export const ShareMain:React.FC<Props> = (Props) =>{
  
  return(
    <>
      {/* <div className = "header">
        <div className = "header__box">
          <Header/>
        </div>
      </div> */}
      <HeaderDivComponent>
        a
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

// <div className = "super">
//         {/* <Lefts/> */}
//         {/* <div className = {`super-sheet`} style={handleStyle()}> */}
//         <div className = {`super-sheet`}>
//           <div className = "header__message__box">
//             {/* <div className = "header__search" style={handleStyle2()}> */}
//             <div className = "header__search">
//               {/* <Search/> */}
//             </div>
//           </div>
//           <div className = "insert_box">
//             {/* <Outlet/> */}
//             {Props.children}
//             {/* a */}
//           </div>
//           {/* <MessageContainer/> */}
//         </div>
//       </div>