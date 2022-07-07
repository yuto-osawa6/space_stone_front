import { product } from "@/interfaces/product"
import { execCompareTier } from "@/lib/api/products"
import { useUser } from "@/lib/data/user/useUser"
import { Modal } from "@mui/material"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { FALSE } from "sass"
import { CompareTierGraph } from "./CompareTierGraph"

type Props = {
  open : boolean
  setOpen : React.Dispatch<React.SetStateAction<boolean>>
  product : product
  alice: number
}
export const CompareTierModal:React.FC<Props> = (Props) => {
  console.log(Props)
  const [values,setValues] = useState<number[]>([])
  const [userTier,setUserTier] = useState<string>()
  const [loading,setLoading] = useState<boolean>(false)
  const { userSwr } = useUser()
  const setUpHandler = async() => {
    const user_id = userSwr.login == true? userSwr.user.id : null
    const res = await execCompareTier(Props.product.id,user_id,Props.alice)
    console.log(res)
    if(res.data.status == 200){
      setUserTier(res.data.userTier)
      setValues(res.data.values)
      setLoading(true)
    }else{

    }
  }

  useEffect(()=>{
    setUpHandler()
  },[])

  const router = useRouter()
  const navigateShow = () => {
    router.push(`/title/${Props.product.id}`)
  }
  return(
    <>
      <Modal
      open={Props.open}
      onClose={() => Props.setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
        <> 
        <div className="CompareModal">
          <div className="CompareModalTierShow"
            onClick={navigateShow}
          >
            詳細ページへ
          </div>
        {/* <div className="CompareScoreTitle">
          Tierの比較
        </div>
        <div className="CompareScoreTitle">
          Tierの比較
        </div>
        <div className="CompareScoreTitle">
          Tierの比較
        </div> */}
        <div className="CompareScore">
          {userSwr.login&&loading&&(
            <>
              {userSwr.user.nickname}さんの評価は
              {userTier==undefined?"ありません。":userTier}
            </>
          )}

          <div className = "CompareScoreMain">
            <CompareTierGraph
            score={values}
            />
          </div>
          </div>
          </div>
        </>
      </Modal>
    </>
  )
}