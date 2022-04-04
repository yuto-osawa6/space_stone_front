import { productScores } from "interfaces/product"

type Props = {
  userScore: productScores
  nickname:string
}

export const ScoreUserList:React.FC<Props> = (Props) => {
  console.log(Props)
  const handleColer= (averageScore:number | null) => {
    var color = {backgroundColor:""}
    if(averageScore == null){
      return {backgroundColor:'#1a252f'}
    }

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
          {Props.nickname}さんの評価
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