import { Home12 } from "../src/components/Home1"
import { HeaderDivComponent } from "../src/components/share/HeaderDiv"
// import Home from "./indexa"

const Home:React.FC = () => {


  return(
    <>
      {/* <div className = "header">
        <div className = "header__box">
          <Header/>
        </div>
      </div> */}
      <HeaderDivComponent>
        ccc
      </HeaderDivComponent>
      <div className = "super ToptensContainerGridListRankTranpSpade">
        aaa
        {/* <Lefts/> */}
        {/* <div className = {`super-sheet`} style={handleStyle()}> */}
        <div className = {`super-sheet`} >
          <div className = "header__message__box">
            {/* <div className = "header__search" style={handleStyle2()}>
              <Search/>
            </div> */}
          </div>
          <div className = "insert_box">
            {/* <Outlet/> */}
          </div>
          {/* <MessageContainer/> */}
        </div>
      </div>
      {/* <Footter/> */}
    </>
  )
}

export default Home