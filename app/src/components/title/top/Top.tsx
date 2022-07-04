import { OpenContext, OpenReviewContext, OpenTheredContext, Productshowcontext } from "@/contexttype/contexttype"
import React, { memo, useContext, useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux";
import { updateReviewAction } from "@/store/reviewUpdate/actions";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  
} from 'chart.js';
import { Bar ,Line} from 'react-chartjs-2';
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { execSecondUpdateReview, execSecondUpdateThread } from "@/lib/api/products";
import { updateThreadAction } from "@/store/updateThread/actions";
import { useRouter } from "next/router";
import { ReviewModal } from "../modal/ReviewModal";
import { EditReviewModal } from "../edit/EditReviewModal";
import { UserModalSign } from "@/components/applications/user/UserModalSign";
import { ShowCloudsItems } from "./ShowCloudsItems";
import { TheredModal } from "../modal/TheredModal";
import { ShowCloudsItems2 } from "./ShowCloudsItems2";
import { EmotionItem } from "./EmotionItem";
import { EmotionUserList } from "../user/EmotionUserList";
import { ScoresListInProductShow } from "./ScoresListInProductShow";
import { ScoreUserList } from "../user/ScoreUserList";
import { ChatRoomInProductShow } from "../chat/ChatRoomInProductShow";
import { useUser } from "@/lib/data/user/useUser";
import { NextSeo } from "next-seo";
import { useWindowDimensions } from "@/hook/useWindowResize";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      display: false,
    },
    title: {
      display: true,
      text: 'Score',
    },
    tooltip: {
      intersect:false,
    }
  },
};

export const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      display: false,
    },
    filler: {
    },
    title: {
      display: true,
      text: 'Accsess',
    },
    tooltip: {
      // enabled: false,
      intersect:false,
    },
    scales: { //軸の設定
      xAxes: [{ //Y軸の設定
        // ticks: { //目盛りの設定
        //   beginAtZero: true, //開始値を0
        //   min: 0, //最小値
        //   max: 1000 //最大値
        // },
        scaleLabel: {
          display: true, // ラベルの表示・非表示
          labelString: 'x軸ラベル文字',
        },
      }],
    },
  },
    

};
var array:number[] = new Array()

type Props = {
  children?:React.ReactNode
}

export const Top:React.FC<Props> = memo(function TopFunc(Props){
  const props = useContext(Productshowcontext)
  const { userSwr,error } = useUser()
  const [open,setOpen] = useState<boolean>(false)
  // review
  const [openreview,setOpenreview] = useState<boolean>(false)
  const modalopenJugdereview = () => setOpenreview(true)
  const modalopenJugdetop = () =>setOpen(true)
  // thered
  const [openthered,setOpenthered] = useState<boolean>(false)
  const modalopenJugdethered = () => setOpenthered(true)
  const [content,setContent] = useState<string>("")
  const router = useRouter()

  const data = {
    // x 軸のラベル
    labels: ["10", "20", "30", "40", "50", "60","70","80","90","100"],
    datasets: [
      {
        label: 'Score',
        // データの値
        data: props.stats,
        // グラフの背景色
        backgroundColor: [
          'rgba(246, 61, 32, 0.8)',
          'rgba(255, 106, 0, 0.8)',
          'rgba(255, 165, 0, 0.8)',
          'rgba(138, 212, 43, 0.8)',
          'rgba(0, 198, 152, 0.8)',
          'rgba(0, 173, 255, 0.8)',
          'rgba(0, 102, 255, 0.8)',
          'rgba(110, 0, 255, 0.8)',
          'rgba(239, 0, 255, 0.8)',
          'rgba(255, 48, 115, 0.8)',
        ],
        // グラフの枠線の色
        borderColor: [
          'rgb(246 61 32)',
          'rgb(255 106 0)',
          'rgb(255 165 0)',
          'rgb(138 212 43)',
          'rgb(0 198 152)',
          'rgb(0 173 255)',
          'rgb(0 102 255)',
          'rgb(110 0 255)',
          'rgb(239 0 255)',
          'rgb(255 48 115)',
        ],
        // グラフの枠線の太さ
        borderWidth: 1,
      },
    ],
  };
  const data2 = {
    // x 軸のラベル
    labels: props.acsesses?.monthArray,
    datasets: [{
      label: 'Accsess',
      // xAxisID:'月',
      data: props.acsesses?.acsessArray,
      // fill: "origin",
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgb(75, 192, 192)',
    }]
  };
  // emotionList----------------------------------------------------
  const[emotionListLength,setEmotionListLength] = useState<number>(0)
  const handleSetupEmotionList = () => {
    if (props.product==undefined)return
    // doneyet-1(frontで処理するn+1問題、これでいいのかわからない) 
    const result = props.emotionLists.reduce( (accumulator, currentValue) => accumulator + currentValue.length,0 )
    setEmotionListLength(result)
  }
  useEffect(()=>{
    handleSetupEmotionList()
},[props.emotionLists])

  const [editOpenModal,setEditOpenModal] = useState<boolean>(false)
  const handleOpenEditOpenModal = () => setEditOpenModal(true)
  const dispatch = useDispatch()
  // review更新管理
  const updateReviewState = useSelector((state:RootState)=>state.updateReview)
  useEffect(()=>{
    if(updateReviewState.update == false)return
    handleSecondUpdateReview()
    dispatch(updateReviewAction(false))
  },[updateReviewState])
  const handleSecondUpdateReview = async() => {
    if(props.product==undefined)return
    const res = await execSecondUpdateReview(props.product?.id,userSwr.user.id)
    if(res.status==200){
      props.setUserReviews(res.data.userReview)
      props.setEmotionLists(res.data.emotionLists)
      props.setProductReviews(res.data.productReviews)
    }else{

    }
  }
  // -------------------------------
  const updateThreadState = useSelector((state:RootState)=>state.updateThread)
  useEffect(()=>{
    if(updateThreadState.update == false)return
    handleSecondUpdateThread()
    dispatch(updateThreadAction(false))
  },[updateThreadState])
  const handleSecondUpdateThread = async() => {
    if(props.product==undefined)return
    const res = await execSecondUpdateThread(props.product?.id)
    if(res.status==200){
      props.setProductThreads(res.data.productThreads)
    }else{

    }
  }
  // const [windowWidth,setWindowWidth] = useState<number>(0)
  // const a = useWindowDimensions()
  // useEffect(()=>{
  //   let vw = document.body.clientWidth
  //   setWindowWidth(vw)
  // },[a])
  return(
    <>
      <div className = {`show_top_contens`}> 
      <div className = {`show_top_dummy p_contens_grid_color${props.switchnumber}`}
      // style={{width:windowWidth}}
      >
      </div>
      <div className = "show_top_contens_grid">
      <div className = "show_contens_08_top share_container02">
        <div className = "show_08 show_episord_08 share_product_show_absolute">
          <div className = "show_08_title share_title01"> 
            エピソード
          </div>
          <ul className = "ProductShowEpisordList08">
            {props.product?.episords.map((item)=>{
              return(
                <React.Fragment key={item.episord}>
                {item.episord!=0&&(  
                <li 
                // className = {`p_contens_grid_color${props.switchnumber}border`}
                style={{
                  width:"fit-content"
                }}
                >{item.episord}話 {item.title}</li>
                )}
                </React.Fragment>
              )
            })} 
          </ul>
        </div>
      </div>
      <div className = "show_contens_06_top share_container02">
        <div className = "show_06 show_episord_08 share_product_show_absolute">
          <div className = "show_06_title share_title01"> 
            キャラクター
          </div>
          <ul className = "ProductShowEpisordList08">
            {props.product?.productCharacter.map((item)=>{
              return(
                <li 
                // className = {`p_contens_grid_color${props.switchnumber}border`}
                style={{
                  width:"fit-content"
                }}
                key={item.id}>{item.castName.name} {item.name}</li>
              )
            })}
          </ul>
          
          
        </div>
      </div>
      <div className = "show_contens_07_top share_container02">
        <div className = "show_07 show_episord_08 share_product_show_absolute">
          <div className = "show_06_Staff share_title01"> 
            スタッフ
          </div>
          <ul className = "ProductShowEpisordList08">
            {props.product?.productStaff.map((item)=>{
              return(
                <li 
                // className = {`p_contens_grid_color${props.switchnumber}border`}
                style={{
                  width:"fit-content"
                }}
                key={item.id}>{item.staffName.name} {item.name}</li>
              )
            })}
          </ul>
        </div>
      </div>
      

      <div className = "show_contens_08_top share_container02">
        <div className = "show_08 share_product_show_absolute">
          <div className = "show_06_Staff share_title01"> 
            スコア
          </div>
          <Bar data={data}
            options={options}
          />
          
          
        </div>
      </div>

      <div className = "show_contens_08_top share_container02">
        <div className = "show_08 share_product_show_absolute">
          <div className = "show_06_Staff share_title01"> 
            アクセス遷移
          </div>
          <Line data={data2}
          options={options2}
          />
          
          
        </div>
      </div>

      </div>
        <div className = "show_contents_review_and_thered">
        <div className = "show_contens_09_top">
          <div className = "show_09">
            <div className = "show_09_review share_title01"> 
              レビュー
            </div>
            {userSwr.login?
            <>
              <div className=""
              style={{display:"flex",gap:"10px"}}
              >
              {props.product!=undefined&&props.userReviews!=undefined&&((props.product.episords.filter(i=>i.id!=null).length)-props.userReviews.length)>=0&&(
                <div className = "show_09_review_write"
                style={{cursor:"pointer"}}
                onClick={modalopenJugdereview}
                > 
                レビューを作成
                </div>
              )}
              {openreview&&(
                <OpenReviewContext.Provider value={{ openreview, setOpenreview}}>
                  
                  <ReviewModal
                  product_id={props.product?.id}
                  user_id={userSwr.user.id}
                  product = {props.product}
                  userReview = {props.userReviews}
                  setUserReview = {props.setUserReviews}
                  setEmotionLists = {props.setEmotionLists}
                  setProductReviews = {props.setProductReviews}
                  />
                </OpenReviewContext.Provider>
              )}

              {props.product!=undefined&&props.userReviews.length>0&&(
              <div className = "show_09_review_write"
                onClick={handleOpenEditOpenModal}
                style={{cursor:"pointer"}}

              > 
                レビューの編集
              </div> 
              )}

                {editOpenModal&&(
                  <EditReviewModal
                  editOpenModal={editOpenModal}
                  setEditOpenModal={setEditOpenModal}
                  product_id={props.product?.id}
                  user_id={userSwr.user.id}
                  product = {props.product}
                  userReview = {props.userReviews}
                  setUserReview = {props.setUserReviews}
                  setEmotionLists = {props.setEmotionLists}
                  setProductReviews = {props.setProductReviews}
                  />
                )}
                </div>
            </>
            :
            <>
                <div className = "show_09_review_write"
                onClick={modalopenJugdetop}
                style={{cursor:"pointer"}}
                > 
                  レビューを作成
                </div>
            
                <>
                {open&&(
                    <OpenContext.Provider value={{ open, setOpen }}>
                      <UserModalSign/>
                    </OpenContext.Provider>
                )}
              </>
            </>
          }
            <div className = "show_09_review_contents"
            style={{wordBreak: "break-word"}}
            > 
              {props.productReviews.slice(0,4).map((item)=>{
                return(
                  <ShowCloudsItems
                  key={item.id}
                  item = {item}
                  productId={props.product?.id}
                  />
                )
              })}
            </div>
          </div>
        </div>

        <div className = "show_contens_10_top show_contens_09_top">
          <div className = "show_10 show_09">
            <div className = "show_10_thred share_title01 show_09_review"> 
              スレッド
            </div>
            {userSwr.login?
            <>
              <div className = "show_10_thred_write show_09_review_write"
              onClick={modalopenJugdethered}
              style={{cursor:"pointer"}}
              > 
                スレッドを作成
              </div>
              {openthered&&(
                <OpenTheredContext.Provider value={{ openthered, setOpenthered}}>
                  
                  <TheredModal
                  product_id={props.product?.id}
                  question={props.product?.questions}
                  user_id={userSwr.user.id}
                  setProductThreads = {props.setProductThreads}
                  />
                </OpenTheredContext.Provider>
              )}   
            </>
            :
            <>
              <div className = "show_10_review_write show_09_review_write"
                onClick={modalopenJugdetop}
                style={{cursor:"pointer"}}
              > 
                スレッドを作成
              </div>
                <>
                {open&&(
                    <OpenContext.Provider value={{ open, setOpen }}>
                      <UserModalSign/>
                    </OpenContext.Provider>
                )}
              </>
            </>
            }
              <div className = "show_09_review_contents"
                style={{wordBreak: "break-word"}}
              > 
              {props.productThreads.slice(0,4).map((item)=>{
                return(
                  <ShowCloudsItems2
                  key={item.id}
                  item = {item}
                  productId={props.product?.id}
                  />
                )
              })}
            </div>
          </div>
          

        </div>


      </div>

      <div className = "ProductShowTopbottom">
        <div className = "ProductShowTopbottomTitle"
          > 
          抱いた感情
        </div>
        <ul>
          {props.emotionLists.map((item)=>{
            return(
              <EmotionItem
              key = {item.id}
              item={item}
              emotionListLength={emotionListLength}
              />
            )
          })}
        </ul>
      </div>

      {userSwr.login==true&&props.userReviews.length>0&&(
        <div className = "ProductShowTopbottom">
          <div className = "ProductShowTopbottomTitle"
            > 
            {userSwr.user.nickname}さんが抱いた感情
          </div>
          <EmotionUserList
          />
        </div>
      )}
      
      {props.product!=undefined&&(
      <ScoresListInProductShow
      product = {props.product}
      score = {props.score}
      setScore = { props.setScore}
      productScores = {props.productScores}
      setProductScores = {props.setProductScores}

      scoreid = {props.scoreid}
      setScoreid = {props.setScoreid}
      scoreaverage = {props.scoreaverage}
      setScoreaverage= {props.setScoreaverage}
      stats = {props.stats}
      setStats = {props.setStats}
      userScore = {props.userScore}
      setUserScore = {props.setUserScore}

      />
      )}

      {props.product!=undefined&&props.userScore!=undefined&&(
      <ScoreUserList
        userScore = {props.userScore}
        nickname = {userSwr.user.nickname}
        // 追加
        scoreid = {props.scoreid}
        product = {props.product}
        setScore = { props.setScore}
        setProductScores = {props.setProductScores}
        setScoreaverage= {props.setScoreaverage}
        setStats = {props.setStats}
        setUserScore = {props.setUserScore}
        
      />
      )}
      {/* {props.product!=undefined&&(
      <ChatRoomInProductShow
      product={props.product}
      Channel = {props.Channel}
      chatList = {props.chatList}
      setChatList = {props.setChatList}
      />
      )}   */}
      </div>
      <div className="">
        {Props.children}
      </div>
    </>
  )
})