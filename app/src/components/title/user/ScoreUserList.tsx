import { product, productScores } from "@/interfaces/product"
import { execDestroyScore } from "@/lib/api/products"
import { useUser } from "@/lib/data/user/useUser"
import { pussingMessageDataAction } from "@/store/message/actions"
import { useDispatch } from "react-redux"

type Props = {
  userScore: productScores
  nickname:string

  product : product
  // openscore:boolean
  setScore: React.Dispatch<React.SetStateAction<number | null>>
  scoreid:number | null
  setStats:React.Dispatch<React.SetStateAction<number[]>>
  setScoreaverage:React.Dispatch<React.SetStateAction<string>>
  setProductScores:React.Dispatch<React.SetStateAction<productScores[]>>
  setUserScore: React.Dispatch<React.SetStateAction<productScores | undefined>>
}

export const ScoreUserList:React.FC<Props> = function ScoreUserListFunc(Props){
  const {userSwr,error} = useUser()
  const handleColer= (averageScore:number | null) => {
    var color = {backgroundColor:""}
    if(averageScore == null){
      return {backgroundColor:'#1a252f'}
    }

    if(averageScore<10){
      // rgb(26 37 47);
      color = {backgroundColor:'rgb(246 61 32)'}
    }else if(10<=averageScore&&averageScore<20){
      color ={backgroundColor:'rgb(255 106 0)'}
    }else if(20<=averageScore&&averageScore<30){
      color ={backgroundColor:'rgb(255 165 0)'}
    }else if(30<=averageScore&&averageScore<40){
      color ={backgroundColor:'rgb(138 212 43)'}
    }else if(40<=averageScore&&averageScore<50){
      color ={backgroundColor:'rgb(0 198 152)'}
    }else if(50<=averageScore&&averageScore<60){
      color ={backgroundColor:'rgb(0 173 255)'}
    }else if(60<=averageScore&&averageScore<70){
      color ={backgroundColor:'rgb(0 102 255)'}
    }else if(70<=averageScore&&averageScore<80){
      color ={backgroundColor:'rgb(110 0 255)'}
    }else if(80<=averageScore&&averageScore<90){
      color ={backgroundColor:'rgb(239 0 255)'}
    }else if(90<=averageScore&&averageScore<=100){
      color ={backgroundColor:'rgb(255 48 115)'}
    }else{
      color ={backgroundColor:'#1a252f'}
    }
    return color
  }
  // ーーーーーーーーーーーーーーーdestroy
  const dispatch = useDispatch()
  const execDestroyScoreFunc = async() => {
    if (typeof Props.product === 'undefined') return
    const res = await execDestroyScore(Props.product.id,userSwr.user.id,Props.scoreid as number)
    if (res.data.status === 200) {
      Props.setScore(null)
      Props.setScoreaverage(res.data.scoreAverage)
      Props.setStats(res.data.statsArray)
      // 2.0
      Props.setProductScores(res.data.productScores)
      Props.setUserScore(undefined)
      dispatch(pussingMessageDataAction(res.data.message))
    }else{
      dispatch(pussingMessageDataAction({title:"予期しないエラーが発生しました。もう一度試すか、お問い合わせください。",select:0}))
    }
  }
  return(
    <>
      <div className = "ScoresListInProductShow ProductShowTopbottom">
        <div className = "ScoresListInProductShowTitle ProductShowTopbottomTitle">
          {Props.nickname}さんの評価　
          <span
          onClick={execDestroyScoreFunc}
          >削除</span>
        </div> 
        {Props.userScore!=undefined&&Props.userScore!=null&&(
          <div className="ScoresListInProductShowList">
            <ul>
              <li style={handleColer(Props.userScore.all)}>総合 {Props.userScore.all}%</li>
              <li style={handleColer(Props.userScore.story)}>ストーリー {Props.userScore.story}%</li>
              <li style={handleColer(Props.userScore.animation)}>アニメーション {Props.userScore.animation}%</li>
              <li style={handleColer(Props.userScore.performance)}>演出 {Props.userScore.performance}%</li>
              <li style={handleColer(Props.userScore.music)}>音楽 {Props.userScore.music}%</li>
              <li style={handleColer(Props.userScore.character)}>キャスト・キャラクター {Props.userScore.character}%</li>
            </ul>
          </div>
        )}
      </div>
    </>
  )
}