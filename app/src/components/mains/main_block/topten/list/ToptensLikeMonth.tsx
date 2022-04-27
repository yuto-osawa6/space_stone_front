import { product } from "@/interfaces/product";
import { execToptenLikeAll, execToptenLikeMonth } from "@/lib/api/mains/toptens";
import { useEffect, useState } from "react";
import { ToptensList2 } from "../item/ToptensList2";
import { ToptensParent1 } from "../parent/ToptensParent1";
// import { ToptensList } from "../ToptensList";

type scoreAvg = {
  [k:number]:string
}

export const ToptensLikeMonth:React.FC = () => {
  const [LikeToptensAll,setLikeToptensAll] = useState<product[]>([]);
  const [averageScore,setAverageScore] = useState<scoreAvg>()
  const [likeMonth,setLikeMonth] = useState<scoreAvg>()
  let isMounted = true;
  const setupHandler = async() => {
    const res = await execToptenLikeMonth()
    console.log(res)
    if(res.status === 200){
      if(isMounted){
        setLikeToptensAll(res.data.products)
        setAverageScore(res.data.scores.avgScore)
        setLikeMonth(res.data.likes.likes)
      }
    }else{
    }
  }
  useEffect(()=>{
    const timer = setTimeout(() => {
      setupHandler()
    }, 300)
    return () => {
      clearTimeout(timer)
      isMounted = false;
    };
  },[])
  console.log(averageScore)

  var count:number = 0
  var ranks:number = 1
  const ranksjudge = (l:number,i:number) => {
    if(count==l){
    }else{
      ranks = i + 1
    }
    count = l
  }

  return(
    <>
      <ToptensParent1
      title={"お気に入り数 Top10(月間)"}
      >
      {LikeToptensAll.map((item,index)=>{
        ranksjudge(likeMonth!=undefined?Number(likeMonth[item.id]):0,index)
        return(
          <ToptensList2
            key={item.id}
            product = {item}
            averageScore = {averageScore!=undefined?averageScore[item.id]:undefined}
            rank =  {ranks}
            judgecard = {1}
          />
        )
      })}
      </ToptensParent1>
    </>
  )
}