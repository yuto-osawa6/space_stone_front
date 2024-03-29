import { UserShowContext } from "@/contexttype/contexttype"
import { execGetMyTiers } from "@/lib/api/users"
import React, { useContext, useEffect, useState } from "react"
import { product } from "@/interfaces/product"
import { execTierSeasonMain } from "@/lib/api/main"
import { TierSeasonMainList } from "@/components/mains/sub/tiers/TierSeasonMainList"

type kisetsu = {
  id:number
  name:string
}

type year = {
  id:number
  year:string
}

type avg = {
  [k:number]:string
}

type tierProduct = {
  id:number
  avg:string
  imageUrl:string
  title:string
  tier:string
}

type yearTier = {
  avg: avg
  id: number
  kisetsu: kisetsu
  products: product[]
  year: year
}


export const UserShowMyTiers:React.FC = function UserShowMyTiersFunc(){
  const [updateTier,setUpdateTier] = useState<boolean>(false)
  const {user} = useContext(UserShowContext)
  const [yearTiers,setYearTiers] = useState<yearTier[]>([])
  const handleFirst = async() => {
    const res = await execGetMyTiers(user.id,current)
    setYearTiers(res.data.tierMain)
    GfNavigation(res.data.tierGroupLength)
  }
  // ---------------------page
  const [page,SetPage] = useState<number>(1)
  const [current,SetCurrent] = useState<number>(1)
//  page
useEffect(()=>{
  handleFirst()
},[current])

useEffect(()=>{
  if(updateTier==false)return
  setUpdateTier(false)
  handleFirst()
},[updateTier])
// simple handle
const GfNavigation = (Props:number) => {
  const limit = Math.ceil(Props / 1)
  currentPage(current,limit)
  SetPage(limit)
}

// 
const [pageNaviGation,setPageNaviGation] = useState<number[]>([])
const currentPage = (i:number,c:number) => {
if (c >= 6){

if(i <= 3){
  setPageNaviGation([1,2,3,4,5,6])
}else if(i == c-2){
  setPageNaviGation([i-3,i-2,i-1,i,i+1,i+2])
}else if(i == c-1){
  setPageNaviGation([i-4,i-3,i-2,i-1,i,i+1])
}else if(i == c){
  setPageNaviGation([i-5,i-4,i-3,i-2,i-1,i])
}else{
  setPageNaviGation([i-2,i-1,i,i+1,i+2])
}
}else{
const array:number[] = []
for (let step = 1; step <= c; step++) {
  array.push(step)
}
setPageNaviGation(array)
}
}

const currentSetHandler = (item:number) => {SetCurrent(item) }
const currentPrevHandler = () => SetCurrent(current-1)
const currentNextHandler = () => SetCurrent(current+1)
const currentFirstHandler = () => SetCurrent(1)
const currentMaxHandler = () => SetCurrent(page)
// Mytier
  return(
    <>
      <div className="TierSeasonMain"
      style={{
        margin: "20px",
        gridColumn: "1/3"
      }}
      >
          <div className=""
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            marginBottom: "10px"
          }}
          >
            シーズン別 Tier
          </div>
          {yearTiers.map((item)=>{
          return(
            <TierSeasonMainList
              key = {item.id}
              tiers = {item}
              setUpdateTier = {setUpdateTier}
              updateTier = {updateTier}
            />
          ) 
          })}

          <div className = "ArticlesContainerPage">
            <ul>
            <li
            onClick={currentFirstHandler}
            className={current==1?"activeCurrent":""}
            >1</li>
            {page>5&&current!=1&&(
              <li
              onClick={currentPrevHandler}
              >前</li>
            )}
            {pageNaviGation.map((item,index)=>
            {
              return(
                
                  <React.Fragment
                    key={index}
                    >
                  {item!=1&&item!=page&&(
                    <li
                    key={item}
                    onClick={()=>currentSetHandler(item)}
                    className={current==item?"activeCurrent":""}
                    >{item}</li>
                  )}    
                  </React.Fragment>     
              )
            })}
            {page>5&&current!=page&&(
              <li
              onClick={currentNextHandler}
              >次</li>
            )}
            {page>1&&(
            <li
              onClick={currentMaxHandler}
              className={current==page?"activeCurrent":""}
            >{page}</li>
            )}
            </ul>
          </div>


      </div>

      {/*  */}
    </>
  )
}