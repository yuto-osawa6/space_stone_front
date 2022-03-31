import Lefts from "../../../applications/left/Lefts"

type Props = {
  children:React.ReactNode
}

export const Super:React.FC<Props> = (Props) => {


  return(
      <SuperDiv>
        <Lefts/>
        <SuperSheet>
          <SearchDiv>
            {/* {Search} */}
            a
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
  return(
    <div className = {`super-sheet`}>
    {/* <div className = {`super-sheet`} style={handleStyle()}> */}
      {Props.children}
    </div>
  )
}

const SearchDiv:React.FC<Props> = (Props) => {
  return(
    <div className = "header__message__box">
      {/* <div className = "header__search" style={handleStyle2()}> */}
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