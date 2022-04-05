import { product } from "interfaces/product"
import { review } from "interfaces/review"
import { useState } from "react"
import { DeleteReviewModal2 } from "../show/edit/DeleteReviewModal2"
import { EditReviewModal2 } from "../show/edit/EditReviewModal2"

type Props = {
  review: review
  product: product | undefined
  setReview: React.Dispatch<React.SetStateAction<review | undefined>>
  setProduct: React.Dispatch<React.SetStateAction<product | undefined>>
  handleCloseAll: () => void
}
export const ReviewEditList:React.FC<Props> = (Props) => {
  const[open,setOpen] = useState<boolean>(false)
  const[open2,setOpen2] = useState<boolean>(false)

  const handleDelete = () => {
    console.log(Props)
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
            onClick={handleEdit}
            style={{
            // cursor:"pointer",
            borderRadius: "5px",
            cursor: "pointer",
            padding: "5px",
            backgroundColor: "#02af75",
            color: "white",
          }}
          >
            編集
          </li>
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
      {open&&(
        <EditReviewModal2
          open = {open}
          setOpen = {setOpen}
          review = {Props.review}
          product = {Props.product}
          setReview={Props.setReview}
          setProduct={Props.setProduct}
        />
      )}
      {open2&&(
        <DeleteReviewModal2
        open = {open2}
        setOpen = {setOpen2}
        review = {Props.review}
        product = {Props.product}
        handleCloseAll={Props.handleCloseAll}
        // review = {Props.review}
        // product = {Props.product}
        // setReview={Props.setReview}
        // setProduct={Props.setProduct}
      />
      )}
    </>
  )
}