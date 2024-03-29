import { MessageContainer } from "@/components/applications/message/MessageContainer"
import Search from "@/components/search/searchform/search"
import Lefts from "../../../applications/left/Lefts"
import { Footer } from "../../component/Footer"

type Props = {
  children:React.ReactNode
  locationNumber?: number | undefined
}
export const Super:React.FC<Props> = function SuperFunc(Props){

  return(
      <SuperDiv>
        <Lefts
        locationNumber={Props.locationNumber}
        />
        <SuperSheet
        locationNumber={Props.locationNumber}
        >
          <SearchDiv
          locationNumber={Props.locationNumber}
          >
            <Search/>
          </SearchDiv>
          <InsertBox>
            {Props.children}
          </InsertBox>
          <MessageContainer/>
          <Footer/>
        </SuperSheet>
    </SuperDiv>
  )
}


const SuperDiv:React.FC<Props> = (Props) => {
  return(
    <div className = "super">
      {Props.children}
    </div>
  )
}

const SuperSheet:React.FC<Props> = (Props) => {
  const handleStyle = () => {
    if(Props.locationNumber===undefined){
      return {}
    }else if(Props.locationNumber===1){
      return {gridColumn:"1/3"}
    }
  }
  return(
    <div className = {Props.locationNumber == 1 ?`super-sheet`:"super-sheet super-sheet2"} style={handleStyle()}>
      {Props.children}
    </div>
  )
}

const SearchDiv:React.FC<Props> = (Props) => {
  const handleStyle2 = () => {
    if(Props.locationNumber===undefined){
      return {}
    }else if(Props.locationNumber===1){
      return {display:"none"}
    }
  }

  return(
      <div className = "header__search header__search__parentV2" style={handleStyle2()}>
      <div className = "header__search header__searchV2">
        {Props.children}
      </div>
    </div>
  )
}

const InsertBox:React.FC<Props> = (Props) => {
  return(
    <div className = "insert_box">
      {Props.children}
    </div>
  )
}