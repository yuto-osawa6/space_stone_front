import { Button,  Modal, Slider, Tooltip } from "@mui/material";
import { styled } from '@mui/material/styles';
import { OpenScoreContext } from "@/contexttype/contexttype";
import { execScoreCreate, execScoreUpdate } from "@/lib/api/products";
import { useContext, useEffect, useState } from "react";

type Props = {
  product_id:number | undefined
  user_id:number
}
export const ScoreModal:React.FC<Props> = function ScoreModalFunc(Props){
  const {openscore, setOpenscore} = useContext(OpenScoreContext)
  const {score,setScore} = useContext(OpenScoreContext)
  const {scoreid,setScoreid} = useContext(OpenScoreContext)

  const {scoreaverage,setScoreaverage} = useContext(OpenScoreContext)
  const {stats,setStats} = useContext(OpenScoreContext)
  const [value,setValue] = useState<number>(50)
  const [value2,setValue2] = useState<number | null>(score)
  const [valuecolor,setValueColor] = useState<string>("")
  const [firstvalue,setFirstvalue] = useState<number | null>(null)


useEffect(()=>{
  if (score!=null){
    setFirstvalue(score)
  }
},[])


  const handleClose = () => {
    setOpenscore(false);
  }

  const valuetext = (value:number):string=>{
    setValue(value)

    return `${value}`
  }

  const valuetext2 = (value:number):string=>{
    setValue2(value)
    return `${value}`
  }


  const execscore = async() => {

  }

  return(
    <>
      <Modal
        open={openscore}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className = "score_modal">
          {score == null&&(
            <>
              <div className = "score_modal_title">
                Score:{value}a
              </div>
              <div className = "user_social_login"
              >
                <Slider
                  aria-label="Temperature"
                  defaultValue={50}
                  getAriaValueText={valuetext}
                  valueLabelDisplay="auto"
                  step={10}
                  marks
                  min={10}
                  max={100}
                />           
                <Button variant="contained"
                onClick = {execscore}
                >決定
                </Button>
              </div>
            </>
          )}
          {score != null&&(
            <>
              <div className = "score_modal_title">
              Scoress:{value2}
            </div>
            <div className = "user_social_login"
            >
              <Slider
                aria-label="Temperature"
                defaultValue={firstvalue as number}
                getAriaValueText={valuetext2}
                valueLabelDisplay="auto"
                step={10}
                marks
                min={10}
                max={100}
              />   
              <Button variant="contained"
              >決定</Button>
            </div>
            </>
          )}
        </div>  
      </Modal>
    </>
  )
}