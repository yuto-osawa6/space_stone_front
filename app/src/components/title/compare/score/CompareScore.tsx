import { UserShowOverviewScore } from "@/components/users/show/main/overview/UserShowOverviewScore"
import { Productshowcontext } from "@/contexttype/contexttype"
import { execCompareScore } from "@/lib/api/products"
import { useUser } from "@/lib/data/user/useUser"
import { useContext, useEffect, useState } from "react"



export const CompareScore:React.FC = () => {
  const [scoreArray,setScoreArray] = useState<number[]>([])
  const props = useContext(Productshowcontext)
  const select = ["平均",
    "総合",
    "ストーリー",
    "アニメーション",
    "演出",
    "音楽",
    "キャラクター"]
  const [scoreArrayies,setScoreArrayies] = useState<number[]>([])
  const [indexNumber,setIndexNumber] = useState<number>(0)

    const handleSelect = async(i:number) =>{
      if(props.product==undefined)return
      const res = await execCompareScore(props.product.id,i)
      if(res.status == 200){
        if(res.data.scoreArrayies[10]!=undefined){
          res.data.scoreArrayies[9] = res.data.scoreArrayies[9] +res.data.scoreArrayies[10]
        }
        setIndexNumber(i)
        setScoreArrayies(res.data.scoreArrayies)
      }else{

      }
    }
    useEffect(()=>{
      handleSelect(0)
    },[])
    const {userSwr} = useUser()

  return(
    <>
      <div className="CompareScore">
        <div className="CompareScoreTitle">
          スコアの比較
        </div>
        <div className="CompareUserScore">
          {userSwr.user.nickname}さんの{select[indexNumber]}のスコア
          {indexNumber==0&&(
            <>
              {props.userScore?.value}
            </>
          )}
          {indexNumber==1&&(
            <>
              {props.userScore?.all}
            </>
          )}
          {indexNumber==2&&(
            <>
              {props.userScore?.story}
            </>
          )}
          {indexNumber==3&&(
            <>
              {props.userScore?.animation}
            </>
          )}
          {indexNumber==4&&(
            <>
              {props.userScore?.performance}
            </>
          )}
          {indexNumber==5&&(
            <>
              {props.userScore?.music}
            </>
          )}
          {indexNumber==6&&(
            <>
              {props.userScore?.character}
            </>
          )}
          {/* {props.userScore?.all} */}
        </div>
        <ul className="CompareScoreSelect">
          {select.map((item,index)=>{
            return(
              <li className={indexNumber==index?"activeCompareSelect":""} key={index} onClick={()=>handleSelect(index)}>{item}</li>
            )
          })}
          
        </ul>
        <div className = "CompareScoreMain">
            <UserShowOverviewScore
            score = {scoreArrayies}
            />
        </div>     
      </div>
    </>
  )
}