import { UserShowOverviewScore } from "@/components/users/show/main/overview/UserShowOverviewScore"
import { Productshowcontext } from "@/contexttype/contexttype"
import { execCompareEmotion, execCompareScore } from "@/lib/api/products"
import { useUser } from "@/lib/data/user/useUser"
// import { Theme } from "@fullcalendar/react"
import { createStyles, FormControl, InputLabel, makeStyles, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { CompareEmotionGraphe } from "./CompareEmotionGraphe"


type emotions = {
  id:number
  emotion: string
  // length:number
}

// export const useStyles = makeStyles({
//   select: {
//       '&:before': {
//           borderColor: 'white',
//       },
//       '&:after': {
//           borderColor: 'white',
//       },
//       '&:not(.Mui-disabled):hover::before': {
//           borderColor: 'white',
//       },
//   },
//   icon: {
//       fill: 'white',
//   },
//   root: {
//       color: 'white',
//   },
// })
// const useStyles2 = makeStyles({
//   button: {
//     backgroundColor: 'green'
//   }
// });
// const useStyles3 = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       padding: theme.spacing(2)
//     },
//     title: {
//       borderBottom: `2px solid ${theme.palette.primary.main}`
//     }
//   })
// );

export const CompareEmotion:React.FC = () => {
  const [scoreArray,setScoreArray] = useState<number[]>([])
  const props = useContext(Productshowcontext)
  // const select = ["平均",
  //   "総合",
  //   "ストーリー",
  //   "アニメーション",
  //   "演出",
  //   "音楽",
  //   "キャラクター"]
  const [scoreArrayies,setScoreArrayies] = useState<number[]>([])
  const [indexNumber,setIndexNumber] = useState<number>(0)

    // const handleSelect = async(i:number) =>{
    //   if(props.product==undefined)return
    //   const res = await execCompareScore(props.product.id,i)
    //   console.log(res)
    //   if(res.status == 200){
    //     if(res.data.scoreArrayies[10]!=undefined){
    //       res.data.scoreArrayies[9] = res.data.scoreArrayies[9] +res.data.scoreArrayies[10]
    //     }
    //     setIndexNumber(i)
    //     setScoreArrayies(res.data.scoreArrayies)
    //   }else{

    //   }
    // }
    // console.log(props)
    const {userSwr} = useUser()

    // userEmotion = {props.userReviews.filter(i=>i.episordId as number==item.id)[0]}
    const [episords,setEpisords] = useState<string>("0")
    const handleChangeEpisords= (e:SelectChangeEvent<string>) => {
      setEpisords(
        e.target.value as string
      )
    }

    useEffect(()=>{
      handleGetEpisordEmotions()
    },[episords])
    const [labels,setLabels] = useState<string[]>([])
    const [values,setValues] = useState<number[]>([])

    const handleGetEpisordEmotions = async() => {
      if(props.product == undefined) return
      const res = await execCompareEmotion(props.product.id as number,Number(episords))
      if(res.status == 200){
        setLabels(res.data.emotionsKey)
        setValues(res.data.emotionsValue)
      }else{

      }
    }
    const getArrayDeleteDouble2 = (ary:emotions[], key:any) => {
      let map = new Map(ary.map((o:any) => [o[key], o]));
      return Array.from(map.values());
    }
    // console.log(props.userReviews)
    // console.log(props.userReviews.filter(i=>episords=="0"?i.episordId ==null:i.episordId == Number(episords))[0])
    // console.log(props.userReviews.filter(i=>episords=="0"?i.episordId ==null:i.episordId == Number(episords))[0].emotions)
  
  // const classes = useStyles();
  return(
    <>
      <div className="CompareScore">
        <div className="CompareScoreTitle">
          抱いた感情の比較
        </div>
        {/* select episord */}
        <FormControl
            style={{
              width:"200px",
              marginBottom:"20px"
            }}
            size="small"
            >
          <InputLabel id="demo-simple-select-label">Episord Select</InputLabel>
          <Select
            sx={{
              width: 100,
              height: 40,
              // margin: 20,
              border: "1px solid darkgrey",
              color: "#fff",
              "& .MuiSvgIcon-root": {
                  color: "white",
              },
              "& .MuiInputLabel-root":{
                color: "white",
              }
              }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={episords}
            // multiple
            label="Episord Select"
            onChange={handleChangeEpisords}
            size="small"
          >
            <MenuItem value={0} key={0}>{"All"}</MenuItem>
            {props.product?.episords.filter(i => i.episord != 0).map((item,index)=>{
              return(
              <MenuItem value={String(item.id)} key={item.id}>{item.episord}話 {item.title}</MenuItem>
              )
            })}
          </Select>
        </FormControl>



        <ul className="CompareUserScore">
          {userSwr.user.nickname}さんの抱いた感情
          {props.userReviews.length>0&&(
            <>
              {props.userReviews.filter(i=>episords=="0"?i.episordId ==null:i.episordId == Number(episords))[0]==undefined?
              <>

              </>
              :
              props.userReviews.filter(i=>episords=="0"?i.episordId ==null:i.episordId == Number(episords))[0].emotions.map((item)=>{
              return(
                <>
                  <li key={item.id}>{item.emotion}</li>
                </>
              )
              })}
            </>
          )}
          
        </ul>
        {/* <ul className="CompareScoreSelect">
          {select.map((item,index)=>{
            return(
              <li className={indexNumber==index?"activeCompareSelect":""} key={index} onClick={()=>handleSelect(index)}>{item}</li>
            )
          })}
          
        </ul> */}
        <div className = "CompareEmotionsMain">
            <CompareEmotionGraphe
              value={values}
              label={labels}
            />
        </div>
      </div>
    </>
  )
}