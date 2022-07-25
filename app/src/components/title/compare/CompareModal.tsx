import { Modal } from "@mui/material"
import { useState } from "react"
import { CompareEmotion } from "./emotion/CompareEmotion"
import { CompareScore } from "./score/CompareScore"



type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const CompareModal:React.FC<Props> = function CompareModalFunc(Props){
  const handleCloseModal = () => Props.setOpen(false)
  const [select,setSelect] = useState<number>(0)
  const handleSelect = (i:number) => {
    setSelect(i)
  }
  return(
    <>
      <Modal
      open={Props.open}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
        <>
          {/* 比較 */}
          <div className="CompareModal">
            <div className="CompareModalTitle">比較</div>
            <ul className="CompareModalSelect">
              <li
              className={select==0?"onCompareSelect1 CompareModalSelectA":"CompareModalSelectA"}
              onClick={()=>handleSelect(0)}
              >スコア</li>
              <li
              className={select==1?"onCompareSelect2 CompareModalSelectB":"CompareModalSelectB"}
              onClick={()=>handleSelect(1)}
              >感 情</li>
            </ul>

            {select==0&&(
              <>
                <CompareScore/>
              </>
            )}
            {select==1&&(
              <>
                <CompareEmotion/>
              </>
              )}
          </div>
        </>
      </Modal>
    </>
  )
}