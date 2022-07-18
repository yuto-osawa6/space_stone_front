import { Button,  Modal, Slider, Tooltip } from "@mui/material";
import { styled } from '@mui/material/styles';
import { OpenScoreContext } from "@/contexttype/contexttype";
import { product, productScores } from "@/interfaces/product";
import { execScoreCreate, execScoreUpdate } from "@/lib/api/products";
import { submitSpin } from "@/lib/color/submit-spin";
import { useContext, useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { pussingMessageDataAction } from "@/store/message/actions";

type Props = {
  product : product
  user_id:number
  openscore:boolean
  setOpenscore:React.Dispatch<React.SetStateAction<boolean>>
  score : number | null
  setScore: React.Dispatch<React.SetStateAction<number | null>>
  scoreid:number | null
  setScoreid:React.Dispatch<React.SetStateAction<number|null>>
  stats: number[]
  setStats:React.Dispatch<React.SetStateAction<number[]>>
  scoreaverage:string
  setScoreaverage:React.Dispatch<React.SetStateAction<string>>
  setProductScores:React.Dispatch<React.SetStateAction<productScores[]>>
  userScore : productScores | undefined
  setUserScore: React.Dispatch<React.SetStateAction<productScores | undefined>>
}

export const ScoreModal2:React.FC<Props> = function ScoreModal2Func(Props){
  const {stats,setStats} = useContext(OpenScoreContext)
  const [value,setValue] = useState<number>(50)
  const [value2,setValue2] = useState<number | null | undefined>(Props.userScore?.all)
  const [valuecolor,setValueColor] = useState<string>("")
  const [firstvalue,setFirstvalue] = useState<number | null>(null)

  // 2.0
  const[music,setMusic] = useState<number | null | undefined>(Props.userScore?.music)
  const[animation,setAnimation] = useState<number | null | undefined>(Props.userScore?.animation)
  const[character,setCharacter] = useState<number | null | undefined>(Props.userScore?.character)
  const[performance,setPerformance] = useState<number | null | undefined>(Props.userScore?.performance)
  const[story,setStory] = useState<number | null | undefined>(Props.userScore?.story)
  const [loading,setLoading] = useState<boolean>(false)

  const handleClose = () => {
    Props.setOpenscore(false);
  }

  const valuetext = (value:number):string=>{
    setValue(value)
    return `${value}`
  }

  const valuetext2 = (value:number):string=>{
    setValue2(value)
    return `${value}`
  }

  const dispatch = useDispatch()
  const [submitLoading,setSubmitLoading] = useState<boolean>(false)
  const execscore = async() => {
    // doneyet
    if (typeof Props.product === 'undefined') return
    if(value==null&&music==null&&performance==null&&story==null&&character==null&&animation==null&&value==undefined&&music==undefined&&performance==undefined&&story==undefined&&character==undefined&&animation==undefined)return
    const all_avg = (value as number)+(music as number)+(performance as number)+(story as number)+(character as number)+(animation as number)
    const all_avg2 = all_avg/6
    const res = await execScoreCreate(Props.product.id,Props.user_id,value,music ,performance,story,character,animation,all_avg2)
    if (res.data.status === 200) {
      Props.setScore(res.data.score.value)
      Props.setScoreid(res.data.score.id)
      Props.setOpenscore(false)
      Props.setScoreaverage(res.data.scoreAverage)
      Props.setStats(res.data.statsArray)
       // 2.0
      Props.setProductScores(res.data.productScores)
      Props.setUserScore(res.data.score)
      dispatch(pussingMessageDataAction(res.data.message))
    }else{
      dispatch(pussingMessageDataAction({title:"予期しないエラーが発生しました。もう一度試すか、お問い合わせください。",select:0}))
    }

  }


  const execscoreupdate = async() => {
   
    // doneyet-1
    if (typeof Props.product === 'undefined') return
    if(value2==null&&music==null&&performance==null&&story==null&&character==null&&animation==null&&value2==undefined&&music==undefined&&performance==undefined&&story==undefined&&character==undefined&&animation==undefined)return
    const value = (value2 as number)+(music as number)+(performance as number)+(story as number)+(character as number)+(animation as number)
    const all_avg = value/6
    setSubmitLoading(true)
    setLoading(true)
    const res = await execScoreUpdate(Props.product.id,Props.user_id,value2 as number,Props.scoreid as number,music ,performance,story,character,animation,all_avg)
    if (res.data.status === 200) {
      Props.setScore(res.data.score.value)
      Props.setOpenscore(false)
      Props.setScoreaverage(res.data.scoreAverage)
      Props.setStats(res.data.statsArray)
      // 2.0
      Props.setProductScores(res.data.productScores)
      Props.setUserScore(res.data.score)
      dispatch(pussingMessageDataAction(res.data.message))
    }else{
      dispatch(pussingMessageDataAction({title:"予期しないエラーが発生しました。もう一度試すか、お問い合わせください。",select:0}))
    }
    setSubmitLoading(false)
    setLoading(false)
  }

  const valuetextMusic = (value:number):string=>{
    setMusic(value)
    return `${value}`
  } 
  const valuetextAnimation = (value:number):string=>{
    setAnimation(value)
    return `${value}`
  } 
  const valuetextCharacter = (value:number):string=>{
    setCharacter(value)
    return `${value}`
  } 
  const valuetextPerformace = (value:number):string=>{
    setPerformance(value)
    return `${value}`
  }
  const valuetextStory = (value:number):string=>{
    setStory(value)
    return `${value}`
  }
  return(
    <>
    <Modal
      open={Props.openscore}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
        <div className = "score_modal">
          {Props.score == null&&(
            <>
              <div className = "score_modal_title">
              </div>
              <div className = "user_social_login"
              >
                <div className="">総合</div>
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
              <div className="">ストーリー</div>
              <Slider
                  aria-label="Temperature"
                  defaultValue={50}
                  getAriaValueText={valuetextStory}
                  valueLabelDisplay="auto"
                  step={10}
                  marks
                  min={10}
                  max={100}
                />
                <div className="">アニメーション</div>
                <Slider
                  aria-label="Temperature"
                  defaultValue={50}
                  getAriaValueText={valuetextAnimation}
                  valueLabelDisplay="auto"
                  step={10}
                  marks
                  min={10}
                  max={100}
                />
                <div className="">演出</div>
                <Slider
                  aria-label="Temperature"
                  defaultValue={50}
                  getAriaValueText={valuetextPerformace}
                  valueLabelDisplay="auto"
                  step={10}
                  marks
                  min={10}
                  max={100}
                />
                <div className="">音楽</div>
                <Slider
                  aria-label="Temperature"
                  defaultValue={50}
                  getAriaValueText={valuetextMusic}
                  valueLabelDisplay="auto"
                  step={10}
                  marks
                  min={10}
                  max={100}
                />
                <div className="">キャスト・キャラクター</div>
                <Slider
                  aria-label="Temperature"
                  defaultValue={50}
                  getAriaValueText={valuetextCharacter}
                  valueLabelDisplay="auto"
                  step={10}
                  marks
                  min={10}
                  max={100}
                />
                <Button variant="contained"
                className={"tail-spin-loading"}
                onClick = {execscore}
                >決定
                {submitLoading==true&&(
                  <TailSpin color={submitSpin.color} height={20} width={20} />
                )}
                </Button>
              </div>
            </>
          )}
          {Props.score != null&&(
            <>
              <div className = "score_modal_title">
            </div>
            <div className = "user_social_login"
            >
              <div className="">総合</div>
              <Slider
                aria-label="Temperature"
                defaultValue={Props.userScore!=undefined&&Props.userScore?.all!=null?Props.userScore.all:50}
                getAriaValueText={valuetext2}
                valueLabelDisplay="auto"
                step={5}
                marks
                min={0}
                max={100}
              />
              <div className="">ストーリー</div>
              <Slider
                  aria-label="Temperature"
                  defaultValue={Props.userScore!=undefined&&Props.userScore?.story!=null?Props.userScore.story:50}
                  getAriaValueText={valuetextStory}
                  valueLabelDisplay="auto"
                  step={5}
                  marks
                  min={0}
                  max={100}
                />
                <div className="">アニメーション</div>
                <Slider
                  aria-label="Temperature"
                  // defaultValue={50}
                  defaultValue={Props.userScore!=undefined&&Props.userScore?.animation!=null?Props.userScore.animation:50}
                  getAriaValueText={valuetextAnimation}
                  valueLabelDisplay="auto"
                  step={5}
                  marks
                  min={0}
                  max={100}
                />
                <div className="">演出</div>
                <Slider
                  aria-label="Temperature"
                  defaultValue={Props.userScore!=undefined&&Props.userScore?.performance!=null?Props.userScore.performance:50}
                  getAriaValueText={valuetextPerformace}
                  valueLabelDisplay="auto"
                  step={5}
                  marks
                  min={0}
                  max={100}
                />
                <div className="">音楽</div>
                <Slider
                  aria-label="Temperature"
                  defaultValue={Props.userScore!=undefined&&Props.userScore?.music!=null?Props.userScore.music:50}
                  getAriaValueText={valuetextMusic}
                  valueLabelDisplay="auto"
                  step={5}
                  marks
                  min={0}
                  max={100}
                />
                <div className="">キャスト・キャラクター</div>
                <Slider
                  aria-label="Temperature"
                  defaultValue={Props.userScore!=undefined&&Props.userScore?.character!=null?Props.userScore.character:50}
                  getAriaValueText={valuetextCharacter}
                  valueLabelDisplay="auto"
                  step={5}
                  marks
                  min={0}
                  max={100}
                />
              <Button variant="contained"
              className={"tail-spin-loading"}
              onClick = {execscoreupdate}
              >決定
              {submitLoading==true&&(
                <TailSpin color={submitSpin.color} height={20} width={20} />
              )}
              </Button>
            </div>
            </>
          )}
        </div>        
      </Modal>
    </>
  )
}