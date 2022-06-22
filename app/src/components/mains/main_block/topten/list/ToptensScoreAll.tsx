import { product } from "@/interfaces/product";
import { execToptenLikeAll, execToptenLikeMonth, execToptenScoreAll } from "@/lib/api/mains/toptens";
import { useEffect, useState } from "react";
import { ToptensList2 } from "../item/ToptensList2";
import { ToptensParent1 } from "../parent/ToptensParent1";

type scoreAvg = {
  [k:number]:string
}

export const ToptensScoreAll:React.FC = function ToptensScoreAllFunc(){
  const [LikeToptensAll,setLikeToptensAll] = useState<product[]>([]);
  const [averageScore,setAverageScore] = useState<scoreAvg>("0")
  let isMounted = true;
  const setupHandler = async() => {
    const res = await execToptenScoreAll()
    if(res.status === 200){
      if(isMounted){
        setLikeToptensAll(res.data.products)
        setAverageScore(res.data.scores.avgScore)
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
      title={"平均スコア Top10(総合)"}
      >
      {LikeToptensAll.map((item,index)=>{
        ranksjudge(Number(averageScore[item.id]),index)
        return(
          <ToptensList2
            key={item.id}
            product = {item}
            averageScore = {averageScore!=undefined?averageScore[item.id]:undefined}
            rank =  {ranks}
            judgecard = {2}
          />
        )
      })}
      </ToptensParent1>
    </>
  )
}