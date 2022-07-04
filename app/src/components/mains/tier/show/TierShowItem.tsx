import { product } from "@/interfaces/product"


type Props = {
  product: product
  group: string
}

export const TierShowItem:React.FC<Props> = (Props) => {
  console.log(Props)
  return(
    <>
      <div className="TierShowItem">
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
          {Props.product.avg}
        </div>
      </div>
    </>
  )
}