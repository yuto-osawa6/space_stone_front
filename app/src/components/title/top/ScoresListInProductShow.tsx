// import { isPropsValid } from "@fullcalendar/react"
// import { UserModalSign } from "component/aplication/lefts/UserModalSign"
import { UserModalSign } from "@/components/applications/user/UserModalSign"
import { OpenContext, OpenScoreContext } from "@/contexttype/contexttype"
import { product, productScores } from "@/interfaces/product"
import { useUser } from "@/lib/data/user/useUser"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
// import { ScoreModal } from "../ScoreModal"
import { ScoreModal2 } from "./ScoreModal2"

type Props = {
  product : product
  productScores: productScores[]
  setProductScores:React.Dispatch<React.SetStateAction<productScores[]>>
  score: number | null
  setScore:React.Dispatch<React.SetStateAction<number | null>>

  scoreid:number | null
  setScoreid:React.Dispatch<React.SetStateAction<number|null>>
  stats: number[]
  setStats:React.Dispatch<React.SetStateAction<number[]>>
  scoreaverage:string
  setScoreaverage:React.Dispatch<React.SetStateAction<string>>

  userScore : productScores | undefined
  setUserScore: React.Dispatch<React.SetStateAction<productScores | undefined>>
}

type Color = {
  backgroundColor:string
}


export const ScoresListInProductShow:React.FC<Props> = function ScoresListInProductShowFunc(Props){
  const[music,setMusic] = useState<number>(0)
  const[animation,setAnimation] = useState<number>(0)
  const[character,setCharacter] = useState<number>(0)
  const[performance,setPerformance] = useState<number>(0)
  const[story,setStory] = useState<number>(0)
  const[value,setValue] = useState<number>(0)
  const[all,setAll] = useState<number>(0)



  useEffect(()=>{
    var aa = Props.productScores.reduce((sum,i)=>i.animation!=undefined?sum+i.animation:sum,0)
    var ab = Props.productScores.length-Props.productScores.filter(i=>i.story==undefined).length
    setAnimation(Math.floor(aa/ab))
    var ba = Props.productScores.reduce((sum,i)=>i.character!=undefined?sum+i.character:sum,0)
    var bb = Props.productScores.length-Props.productScores.filter(i=>i.story==undefined).length
    setCharacter(Math.floor(ba/bb))
    var ca = Props.productScores.reduce((sum,i)=>i.music!=undefined?sum+i.music:sum,0)
    var cb = Props.productScores.length-Props.productScores.filter(i=>i.music==undefined).length
    setMusic(Math.floor(ca/cb))
    var da = Props.productScores.reduce((sum,i)=>i.performance!=undefined?sum+i.performance:sum,0)
    var db = Props.productScores.length-Props.productScores.filter(i=>i.performance==undefined).length
    setPerformance(Math.floor(da/db))
    var ea = Props.productScores.reduce((sum,i)=>i.story!=undefined?sum+i.story:sum,0)
    var eb = Props.productScores.length-Props.productScores.filter(i=>i.story==undefined).length
    setStory(Math.floor(ea/eb))
    var fa = Props.productScores.reduce((sum,i)=>i.all!=undefined?sum+i.all:sum,0)
    var fb = Props.productScores.length-Props.productScores.filter(i=>i.all==undefined).length
    setAll(Math.floor(fa/fb))
   
  },[Props.productScores])

  // modal
  const [openscore,setOpenscore] = useState<boolean>(false)
  const handleOpen = () => setOpenscore(true)
  const [open,setOpen] = useState<boolean>(false)
  const handleOpenUser = () => setOpen(true)
  // store
  // const user = useSelector((state:RootState)=>state.user)
  const {userSwr,error} = useUser()

  const handleColer= (averageScore:number) => {
    var color = {backgroundColor:""}
    if(averageScore<=10){
      // rgb(26 37 47);
      color = {backgroundColor:'rgb(246 61 32)'}
    }else if(10<averageScore&&averageScore<=20){
      color ={backgroundColor:'rgb(255 106 0)'}
    }else if(20<averageScore&&averageScore<=30){
      color ={backgroundColor:'rgb(255 165 0)'}
    }else if(30<averageScore&&averageScore<=40){
      color ={backgroundColor:'rgb(138 212 43)'}
    }else if(40<averageScore&&averageScore<=50){
      color ={backgroundColor:'rgb(0 198 152)'}
    }else if(50<averageScore&&averageScore<=60){
      color ={backgroundColor:'rgb(0 173 255)'}
    }else if(60<averageScore&&averageScore<=70){
      color ={backgroundColor:'rgb(0 102 255)'}
    }else if(70<averageScore&&averageScore<=80){
      color ={backgroundColor:'rgb(110 0 255)'}
    }else if(80<averageScore&&averageScore<=90){
      color ={backgroundColor:'rgb(239 0 255)'}
    }else if(90<averageScore&&averageScore<=100){
      color ={backgroundColor:'rgb(255 48 115)'}
    }else{
      color ={backgroundColor:'#1a252f'}
    }
    return color
  }
  return(
    <>
      <div className = "ScoresListInProductShow ProductShowTopbottom">
        <div className = "ScoresListInProductShowTitle ProductShowTopbottomTitle">
          評価
        </div>
        
          {userSwr.login?
          <>
            <div className="ScoresListInProductShowLink"
              onClick={handleOpen}
              style={{
                width: "fit-content",
                cursor: "pointer",
                fontSize: "0.9rem",
                color: "cornflowerblue",
                margin: "10px 0px",
              }}
              >
              評価する
            </div>      
          </>
          :
          <>
             <div className="ScoresListInProductShowLink"
              onClick={handleOpenUser}
              style={{
                width: "fit-content",
                cursor: "pointer",
                fontSize: "0.9rem",
                color: "cornflowerblue",
                margin: "10px 0px",
              }}
              >
              評価する
            </div>     
          </>
          }
        {Props.productScores.length!=0&&(
        <div className="ScoresListInProductShowList">
          <ul>
            <li style={handleColer(all)}>総合 {all}%</li>
            <li style={handleColer(story)}>ストーリー {story}%</li>
            <li style={handleColer(animation)}>アニメーション {animation}%</li>
            <li style={handleColer(performance)}>演出 {performance}%</li>
            <li style={handleColer(music)}>音楽 {music}%</li>
            <li style={handleColer(character)}>キャスト・キャラクター {character}%</li>
          </ul>
        </div>
        )}
      </div>

                    
        {openscore&&(
              <ScoreModal2
                openscore={openscore}
                setOpenscore={setOpenscore}
                product = {Props.product}
                user_id={userSwr.user.id}

                score = {Props.score}
                setScore = {Props.setScore}
                scoreid = {Props.scoreid}
                setScoreid = {Props.setScoreid}
                scoreaverage = {Props.scoreaverage}
                setScoreaverage = {Props.setScoreaverage}
                stats = {Props.stats}
                setStats = {Props.setStats}

                setProductScores={Props.setProductScores}
                userScore = {Props.userScore}
                setUserScore = {Props.setUserScore}
              />
        )}

        {open&&(
            <OpenContext.Provider value={{ open, setOpen }}>
              <UserModalSign/>
            </OpenContext.Provider>
        )}               
    </>
  )
}