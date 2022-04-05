import Search from "components/search/searchform/search"
import Lefts from "../../../applications/left/Lefts"

type Props = {
  children:React.ReactNode
  locationNumber?: number | undefined
}

export const Super:React.FC<Props> = (Props) => {

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
          {/* <MessageContainer/> */}
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
    // <div className = {`super-sheet`}>
    <div className = {`super-sheet`} style={handleStyle()}>
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
    // <div className = "header__message__box">
      <div className = "header__search" style={handleStyle2()}>
      <div className = "header__search">
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