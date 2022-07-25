import { product } from "@/interfaces/product"
import { useState } from "react"
import { CompareTierModal } from "./CompareTierModal"


type Props = {
  product: product
  group: string
  alice:number
}

export const TierShowItem:React.FC<Props> = (Props) => {
  const [open,setOpen] = useState<boolean>(false)
  const handleOpenModal = () => setOpen(true)
  return(
    <>
      <div className="TierShowItem"
      onClick={handleOpenModal}
      >
        <img src = {Props.product.imageUrl?Props.product.imageUrl:""}
          style={{
            // borderRadius:"5px",
            // top:"0",
            // width:"120px",
            // height:"63px",
            // objectFit:"cover"
          }}
        />
        {/* aaa */}
        <div className="TierShowAvg"
        style = {{
          position: "absolute",
          top: 0,
          right: 0,
          padding: 3,
          backgroundColor: "#f6f6f9",
          borderRadius: "0px 0px 0px 5px",
        }}
        >
          {Number(Props.product.avg).toFixed(1)}
        </div>
      </div>
      {open&&(
        <>
          <CompareTierModal
          open = {open}
          setOpen = {setOpen}
          product = {Props.product}
          alice = {Props.alice}
          />
        </>
      )}
    </>
  )
}