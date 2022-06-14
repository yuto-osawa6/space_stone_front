import { useEffect } from "react"

type Props = {
  statusCode: number
  message?: string
}

export const CustomError:React.FC<Props> = function (Props) {
    
  useEffect(()=>{
    const elements = document.getElementsByTagName('body')
    elements[0].classList.add("error-occur")
    return(
      elements[0].classList.remove("error-occur")
    )
  },[])
  return(
    <>
      <div className="meruplanet-error"
      style={{
        width: "100%",
        position: "fixed",
        top: 0,
        backgroundColor: "white",
        height: "100vh",
        zIndex: 200,
      }}
      >
        {Props.statusCode}: エラーが発生しました。
      </div>
    </>
  )
}

