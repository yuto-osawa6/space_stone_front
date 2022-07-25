import { product } from "@/interfaces/product"
import { review } from "@/interfaces/review"
import { useState } from "react"
import { DeleteThreadModal2 } from "./edit/DeleteThreadModal2"

type Props = {
  review: review
  product: product | undefined
  setReview: React.Dispatch<React.SetStateAction<review | undefined>>
  setProduct: React.Dispatch<React.SetStateAction<product | undefined>>
  handleCloseAll: () => void
}
export const ThreadEditList:React.FC<Props> = function ThreadEditListFunc(Props){
  const[open,setOpen] = useState<boolean>(false)
  const[open2,setOpen2] = useState<boolean>(false)

  const handleDelete = () => {
    setOpen2(true)
  }
  const handleEdit = () => {
    setOpen(true)
  }
  

  return(
    <>
      <div className="">
        <ul
        style={{display:"flex",gap:"10px",
        position: "absolute",
        top: "0",
        padding: "10px",
        backgroundColor: "transparent",
        zIndex: "100"
      }}
        >
          <li
          style={{
            // cursor:"pointer",
            borderRadius: "5px",
            cursor: "pointer",
            padding: "5px",
            backgroundColor: "#ff3073",
            color: "white",
          }}
            onClick={handleDelete}
          >
              削除
          </li>
        </ul>
      </div> 
      {/* doneyet-2 threadの編集機能  */}
      {/* {open&&(
        <EditThreadModal2
          open = {open}
          setOpen = {setOpen}
          // review = {Props.review}
          // product = {Props.product}
          // setReview={Props.setReview}
          // setProduct={Props.setProduct}
        />
      )} */}
      {open2&&(
        <DeleteThreadModal2
        open = {open2}
        setOpen = {setOpen2}
        review = {Props.review}
        product = {Props.product}
        handleCloseAll={Props.handleCloseAll}
      />
      )}
    </>
  )
}