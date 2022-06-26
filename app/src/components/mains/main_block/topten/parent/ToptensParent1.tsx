import { ReactNode } from "react"

type Props = {
  children:ReactNode
  title:string
  parent:number
  alice?:number
}

export const ToptensParent1:React.FC<Props> = function ToptensParent1Func(Props){
  return(
    <>
    <div className = {`Toptens Toptens${Props.parent}`}>
        <div className = "ToptensTitle share_middle_container_title">
          Top10
        </div>
        <div className = "ToptensLikesAll ToptensContainer"
        style={Props.alice&&Props.alice==1?{
          paddingBottom:"30px"
        }:{}}
        >
          <div className="ToptensLikesAllTitle ToptensContainerTitle">
            {Props.title}
          </div>
          <div className="ToptensLikesAllGrid ToptensContainerGrid">
            {Props.children}
          </div>

        </div>
      </div>
    </>
  )
}
