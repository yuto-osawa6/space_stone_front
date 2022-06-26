import { ReactNode } from "react"

type Props = {
  children:ReactNode
  title:string
  parent:number
}

export const ToptensParent1:React.FC<Props> = function ToptensParent1Func(Props){
  return(
    <>
    <div className = {`Toptens Toptens${Props.parent}`}>
        <div className = "ToptensTitle share_middle_container_title">
          Top10
        </div>
        <div className = "ToptensLikesAll ToptensContainer">
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
