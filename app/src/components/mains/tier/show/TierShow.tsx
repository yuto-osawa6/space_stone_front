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
  alice: number
}

export const TierShow:React.FC<Props> = function(Props){
  const handleClose = () => Props.setOpen(false)
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
              right:"1%",
              top:"1%",
              width: 30,
              height: 30,
            }}
            >
          <IoMdClose/>
          </div>
          <div className="TierShow"
          style={{
            maxWidth: "1500px",
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
                  <TierShowItem key = {item.id} product = {item} group = {Props.group} alice = {Props.alice}/>
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