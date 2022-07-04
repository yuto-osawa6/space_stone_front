import { product } from "@/interfaces/product"
import { Modal } from "@mui/material"
import React from "react"
import { IoMdClose } from "react-icons/io"
import { Button } from "react-scroll"
import { TierShowItem } from "./TierShowItem"


type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  group: string
  products: product[]
  color: string
}

export const TierShow:React.FC<Props> = function(Props){
  const handleClose = () => Props.setOpen(false)
  console.log(Props)
  return(
    <>
      <Modal
        open={Props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <div className="CloseButton"
            onClick={handleClose}
            style={{
              right:"4%",
              top:"4%"
            }}
            >
          <IoMdClose/>
          </div>
          <div className="TierShow"
          style={{
            backgroundColor:`${Props.color}`
          }}
          >
            <div className="TierShowTitle">
              Tier {Props.group}
              <div className="">
              </div>
            </div>
            <div className="TierShowProducts">
              {Props.products.map((item)=>{
                return(
                  <TierShowItem key = {item.id} product = {item} group = {Props.group}/>
                )
              })}
            </div>
            {/* <div className="CloseButton"
                onClick={handleClose}
              >
              <IoMdClose/>
              </div> */}
          </div>
        </>
      </Modal>
    </>
  )
}