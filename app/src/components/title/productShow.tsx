import { acsesses, emotionList, product, productReviews, productScores, productShow, productThreads, product_genres, userReview } from '@/interfaces/product';
import { execAcsesscount, execCheckingHeart, execProductCreateHeart, execProductDeleteHeart, execProductShow } from '@/lib/api/products';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
// import { useParams,useNavigate } from 'react-router-dom'
// import { useOutlet } from "react-router"
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionSettingProductData2 } from '@/store/product/actions';
import { RootState } from '@/store';
import { BsFillHeartFill, BsHeart } from 'react-icons/bs'
import { OpenContext, OpenScoreContext, Productshowcontext } from '@/contexttype/contexttype';
// import { UserModalSign } from 'component/aplication/lefts/UserModalSign';
// import { ScoreModal } from './show/ScoreModal';
// import { AdminsEditProduct } from 'component/admins/product/edit/AdminEditProduct';
// import ActionCable from 'actioncable'
// import { ChatModal } from "./show/chat/ChatModal"
import { pussingMessageDataAction } from '@/store/message/actions';
import { useRouter } from 'next/router';
import { ErrorMessage } from '@/lib/ini/message';
import { ScoreModal } from './modal/ScoreModal';
import { UserModalSign } from '@/components/applications/user/UserModalSign';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useUser } from '@/lib/data/user/useUser';
import { ChatModal } from './chat/ChatModal';
import { AdminsEditProduct } from '@/components/admins/product/edit/AdminEditProduct';
import { useWindowDimensions } from '@/hook/useWindowResize';
let ActionCable:any;
if (typeof window !== 'undefined') {
  ActionCable = require('actioncable');
}
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// const ActionCable = dynamic(() => import("actioncable"), { ssr: false });



// var array:number[] = new Array()
// for (let i = 0; i < 10; i++) {
//   array.push(i)
// }

type chatList = {
  created_at: string
  id: number
  message: string
  product_id: number
  user_id: number
}

type Props = {
  children:ReactNode
  active:number
  // data: productShow
}

export const ProductShow:React.FC<Props> = function ProductShowFunc(Props){
  const router = useRouter()
  const {pid} = router.query
  const params_id = pid
  const [product,setProduct] = useState<product>()
  const [productStore,setProductStore] = useState<product>()
  const [switchnumber,setSwitchnumber] = useState<number>()
  const [heart,setHeart] = useState<boolean>(false)
  const [heartId,setHeartId] = useState<number>()
  const [loded,setLoded] = useState<boolean>(false)
  const [open,setOpen] = useState<boolean>(false)
  const [openscore,setOpenscore] = useState<boolean>(false)
  const [score,setScore] = useState<number | null>(null)
  const [scoreid,setScoreid] = useState<number | null>(null)
  // stats
  const [stats,setStats] = useState<number[]>([])
  const [acsesses,setAcsesses] = useState<acsesses>()
  const [likecount,setLikecount] = useState<number>(0)
  const [scoreaverage,setScoreaverage] = useState<string>("")
  // userReview
  const [userReviews,setUserReviews] = useState<userReview[]>([])

  const ProductStore = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch();
  // const colornumber:number = array[Math.floor(Math.random() * array.length)]
  const elm = useRef<HTMLDivElement>(null!);
  const elm2 = useRef<HTMLDivElement>(null!);
  // const user = useSelector((state: RootState) => state.user);
  const {userSwr} = useUser()

  // モーダル
  const modalopenJugde = () => setOpen(true)
  const modalopenJugde2 = () =>setOpenscore(true)
  // async 
  const [productReviews,setProductReviews] = useState<productReviews[]>([])
  const [productThreads,setProductThreads] = useState<productThreads[]>([])
  const [emotionLists,setEmotionLists] = useState<emotionList[]>([])
  const [productScores,setProductScores] = useState<productScores[]>([])
  const [userScore,setUserScore] = useState<productScores>()

  let isMounted = true
  const setdata = async() =>{
    if (ProductStore.id == Number(params_id)){
      setProductStore(ProductStore)
    }
    const res = await execProductShow(Number(params_id))
    if (res.data.status === 200) {
      if (isMounted) {
        if (ProductStore.id != Number(params_id)){
          dispatch(actionSettingProductData2(res.data.products));
        }   
        setProduct(res.data.products)
        setHeart(res.data.liked.liked)
        setLoded(true)
        setStats([...stats,...res.data.stats.stats])
        setAcsesses(res.data.acsesses)
        setLikecount(res.data.products.likeCount)
        setScoreaverage(res.data.products.averageScore)
        if (res.data.liked.liked===true){
          setHeartId(res.data.liked.like.id)
        }
        if (res.data.scored.score==null){
          setScore(res.data.scored.score)
          setScoreid(res.data.scored.score)
        }
        if (res.data.scored.score!=null){
          setScore(res.data.scored.score.value)
          setScoreid(res.data.scored.score.id)
        }
        setUserReviews(res.data.products.userReviews)
        // async化
        setProductReviews(res.data.productReviews)
        setProductThreads(res.data.productThreads)
        setEmotionLists(res.data.emotionLists)
        // score2.0
        setProductScores(res.data.productScores)
        setUserScore(res.data.scored.score)     
      } 
    }else{
      // navigate("/")
    }
  } 
  
  // 放送日まで
  const [airing,setAiring] = useState<string>("")
  const handleSettingGetTime = () => {
    if(product?.productEpisord==undefined)return
    if(product?.productEpisord.releaseDate==undefined)return
      const now = new Date()
      const time = new Date(product.productEpisord.releaseDate)
      const duration = (time.getTime() - now.getTime())
      const sec = Math.floor(duration/1000)%60
      const min = Math.floor(duration/1000/60)%60
      const hours = Math.floor(duration/1000/60/60)%24
      const days = Math.floor(duration/1000/60/60/24)
      setAiring(`${days}日${hours}時間${min}分${sec}秒`)
  }
  const[avgTime,setAvgTime] = useState<string>("")
  const[firstEpisord,setFirstEpisord] = useState<string>("")
  const handleSettingAvgTime = () => {
    if (product==undefined) return
    if (product.episords==undefined) return
    if(product.episords[0]==undefined)return
    if(product.episords[0].releaseDate == undefined){
      setFirstEpisord("0")
      setAvgTime("0分")
      return
    }
    const firstE = new Date(product.episords[0].releaseDate)
    setFirstEpisord(`${firstE.getFullYear()}-${firstE.getMonth()+1}-${firstE.getDate()} ${firstE.getHours()}時${firstE.getMinutes()}分`)
    const length = product?.episords.filter(item => item.time !== undefined).length
    const time = product?.episords.reduce((sum,i)=>i.time!=undefined?sum+new Date(i.time).getTime():sum,0)
    const duration = time/length
    const sec = Math.floor(duration/1000)%60
    const min = Math.floor(duration/1000/60)%60
    const hours = Math.floor(duration/1000/60/60)%24
    setAvgTime(`${min}分`)
  }

  const [yearSeason,setYearSeason] = useState<string>("")
  const handleSeasonSet = () => {
    const kisetsu = ["冬","春","夏","秋"]
    if (product==undefined) return

    if(product.productYearSeason.length==1){
      if(product.productYearSeason[0].season.filter(item=>kisetsu.includes(item.name)).length==1){
        setYearSeason(`${product.productYearSeason[0].year.slice(0,4)} ${product.productYearSeason[0].season.filter(item=>kisetsu.includes(item.name)).sort((x,y)=>kisetsu.indexOf(x.name)-kisetsu.indexOf(y.name))[0].name}`)
      }else if(product.productYearSeason[0].season.filter(item=>kisetsu.includes(item.name)).length>1){
        setYearSeason(`${product.productYearSeason[0].year.slice(0,4)} ${product.productYearSeason[0].season.filter(item=>kisetsu.includes(item.name)).sort((x,y)=>kisetsu.indexOf(x.name)-kisetsu.indexOf(y.name))[0].name} ~ ${product.productYearSeason[0].season.filter(item=>kisetsu.includes(item.name)).sort((x,y)=>kisetsu.indexOf(x.name)-kisetsu.indexOf(y.name)).slice(-1)[0].name}`)
      }else{
        setYearSeason(`${product.productYearSeason[0].year.slice(0,4)}`)
      }
    }


    if(product.productYearSeason.length>1){
      if(product.productYearSeason[0].season.filter(item=>kisetsu.includes(item.name)).length>0 && product.productYearSeason[product.productYearSeason.length-1].season.filter(item=>kisetsu.includes(item.name)).length>0){
        setYearSeason(`${product.productYearSeason[0].year.slice(0,4)} ${product.productYearSeason[0].season.filter(item=>kisetsu.includes(item.name)).sort((x,y)=>kisetsu.indexOf(x.name)-kisetsu.indexOf(y.name))[0].name} ~ ${product.productYearSeason[product.productYearSeason.length-1].year.slice(0,4)} ${product.productYearSeason[product.productYearSeason.length-1].season.filter(item=>kisetsu.includes(item.name)).sort((x,y)=>kisetsu.indexOf(y.name)-kisetsu.indexOf(x.name))[0].name}`)
      }else{
        setYearSeason(`${product.productYearSeason[0].year.slice(0,4)} ~ ${product.productYearSeason[product.productYearSeason.length-1].year.slice(0,4)}`)
      }
    }
  }

  const [scoreLenght,setScoreLength] = useState<string>("")
  // 1k 1m setting 
  const settingNumberOfDigits = (i:number) => {
    const integerDigit = String(i).length; 
    if (integerDigit>3&&integerDigit<7){
      const ii = i.toLocaleString()
      setScoreLength(String(ii).slice( 0, -1 )+"k")
    }else if(integerDigit>=7){
      const ii = i.toLocaleString()
      setScoreLength(String(ii).slice( 0, -5 )+"m")
    }else{
      setScoreLength(String(i))
    }

  }
  // useEffect(()=>{
  //   // if(typeof window !== "undefined"){
  //     window.scrollTo({top:0,left:0})
  //   // }
  // },[])

  useEffect(()=>{
    if(params_id===undefined)return
    const array:number[] = [1,2,3,4,5,6,7,8,9,0]
    const colorNumber:number = array[Math.floor(Math.random() * array.length)]
    setSwitchnumber(colorNumber)
    setdata()
    return () => {
      isMounted = false
    };
  },[params_id])

  useEffect(()=>{
    acsesscount()
    handleSettingGetTime()
    handleSettingAvgTime()
    handleSeasonSet()
    if(product==undefined)return
    settingNumberOfDigits(product.likeCount)
  },[product])


  useEffect(()=>{
    if (product?.likeCount==undefined) return
    settingNumberOfDigits(likecount)
  },[likecount])


  useEffect(()=>{
    ceckingUserResouce()
  },[userSwr.login])

  useEffect(()=>{
  },[acsesses])

  // acsesses
  const acsesscount = async() => {
    if (typeof product === 'undefined') return
    const current_Today =  new Date()
    // doneyet(時間の修正)
    const res = await execAcsesscount(product.id,current_Today )
    if(res.status === 200){
    }else{
    }
  }
  const ceckingUserResouce = async() => {
    if (typeof product === 'undefined') return
    if (!userSwr.login){
      return
    }
    const res = await execCheckingHeart(product.id,userSwr.user.id)
    if (res.status === 200) {
      // 確認
      setHeart(res.data.liked.liked)
      if (res.data.liked.liked===true){
        setHeartId(res.data.liked.like)
      }
      // 2.0 userResouce
      if(res.data.resouce.userScore >0){
      setScore(res.data.resouce.userScore[0].value)
      setScoreid(res.data.resouce.userScore[0].id)
      }
      setUserReviews(res.data.resouce.userReview)
      // setReview

    }else{
    }
  }

  const createheart = async() => {
    // doneyet エラー表示 上のも下も
    if (typeof product === 'undefined') return
    const res = await execProductCreateHeart(product.id,userSwr.user.id)
    if (res.data.status === 200) {
      setHeartId(res.data.like.id)
      setHeart(true)
      setLikecount(res.data.likeCount)
      dispatch(pussingMessageDataAction(res.data.message))
    }else if(res.data.status === 440){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message440,select:0}))
    }else{
      dispatch(pussingMessageDataAction({title:"予期しないエラーが発生しました。もう一度試すか、お問い合わせください。",select:0}))
    }
  }
  const deleteheart = async() => {
    if (typeof product === 'undefined' || typeof heartId=== 'undefined') return
    const res = await execProductDeleteHeart(product.id,heartId,userSwr.user.id)
    if (res.data.status === 200) {
      setHeart(false)
      setLikecount(res.data.likeCount)
      dispatch(pussingMessageDataAction(res.data.message))
    }else if(res.data.status === 440){
      dispatch(pussingMessageDataAction({title:ErrorMessage.message440,select:0}))
    }else{
      dispatch(pussingMessageDataAction({title:"予期しないエラーが発生しました。もう一度試すか、お問い合わせください。",select:0}))
    }
  }

  const [openModal,setOpenModal] = useState<boolean>(true)
  const ModalCloseHandler= () => setOpenModal(false)
  // --------------------------------------admin
  const [openEdit,setOpenEdit] = useState<boolean>(false)
  const handleOpenEditProduct = () => {
    setOpenEdit(true)
  }
  //  channel--------------------------------------------------
  const [Channel,setChannel] = useState<any>(null)
  const [chatList,setChatList] = useState<chatList[]>([])
  // const cable = ActionCable.createConsumer('ws://localhost:3001/cable');

  // useEffect(() => {
  // const cable = ActionCable.createConsumer('ws://localhost:3001/cable');
  //   if (product==undefined) return
  //   const channel = cable.subscriptions.create(
  //     {
  //       channel: 'ProductsChannel',
  //       id: product.id,
  //     },
  //     {
  //       received: (data:any) => {
  //         setChatList(data.chatList)
  //       },
  //     }
  //   )
  //   setChannel(channel)
  //   return () => {
  //     channel.unsubscribe()
  //   }
  // }, [product?.id])

  //  const [openChatRoom,setOpenChatRoom] = useState<boolean>(false)
  //  const modalOpenChatRoom = () => setOpenChatRoom(true)
  // width 100vw
  // const [windowWidth,setWindowWidth] = useState<number>(0)
  // const a = useWindowDimensions()
  // useEffect(()=>{
  //   let vw = document.body.clientWidth
  //   setWindowWidth(vw)
  // },[a])
  return(
    <>
      <div className = "product_show"
      >
        <div className = "product_show_contens">
          <div className = "product_show_contens01">
            <div className = "show_contents01_header">
              <div className = "show_contents01_header_top"
              // style={{width:windowWidth}}
              >
                <div className = "show_contents01_header_top_img">
                  {ProductStore.id==Number(params_id)?<img src = {ProductStore.imageUrl}></img>
                  :
                  <img src={product?.imageUrl}></img>
                  }
                  <div className = "show_contents01_header_top_shadow">
                  </div>
                  {userSwr.user!=undefined&&userSwr.user.administratorGold==true&&(
                    <div className = "UserAdminEdit"
                    onClick={handleOpenEditProduct}
                    >
                      edit
                    </div>
                  )}
                  
                </div>
                <div className = "show_contents01_header_bottom_left show_contents01_header_bottom_leftv2">
                  <div className = "show_contents01_header_bottom_left_image">
                    {/* {ProductStore.id==Number(params_id)?<img src = {ProductStore.imageUrl}></img>
                    :
                    <img src = {product?.imageUrl}></img>
                    } */}
                  </div>
                  <div className = "show_contents01_header_bottom_left_bottom">
                    <div className = "show_contents01_header_bottom_left_bottom_score">
                    {loded&&(
                      <>
                      {userSwr.login&&(
                        <>
                          <div 
                          >
                            Score　
                            {scoreaverage}
                          </div>
                          {openscore&&(
                            <OpenScoreContext.Provider value={{ openscore, setOpenscore,score,setScore,scoreid,setScoreid,scoreaverage,setScoreaverage,stats,setStats }}>
                              <ScoreModal
                              product_id={product?.id}
                              user_id={userSwr.user.id}
                              />
                            </OpenScoreContext.Provider>
                          )}
                        </>
                      )}
                      {!userSwr.login&&(
                        <>
                          <div 
                          onClick = {modalopenJugde}
                          >
                            Score　
                            {scoreaverage}
                          
                          </div>
                        </>
                      )}
                      </>
                    )}
                    {!loded&&(
                      <>
                      Score　
                      {scoreaverage}

                      </>
                    )}

                    </div>
                    <div className = "show_contents01_header_bottom_left_bottom_likes">
                      {loded&&(
                      <>
                      {userSwr.login&&(
                      <>
                        { heart ? 
                        <>
                        <BsFillHeartFill
                        onClick = {deleteheart}
                        />
                        　
                        {scoreLenght}
                        </>
                        : 
                        <>
                        <BsHeart
                        onClick = {createheart}
                        />
                        　
                         {scoreLenght}
                        </>
                        }
                       

                      </>
                      )}
                      {!userSwr.login&&(
                        <>
                           <BsHeart
                           onClick={modalopenJugde}
                           />
                           　
                            {scoreLenght}
                            
                            {open&&(
                              <OpenContext.Provider value={{ open, setOpen }}>
                                <UserModalSign/>
                              </OpenContext.Provider>
                            )}
                        </>
                      )}
                        </>
                      )}
                      {!loded&&(
                        <>
                          <BsHeart/>
                          　
                          {scoreLenght}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
          
              <div className = "show_contents01_header_bottom" 
              >
                {/* <div className = "show_contents01_header_bottom_left">
                  <div className = "show_contents01_header_bottom_left_image">
                    {ProductStore.id==Number(params_id)?<img src = {ProductStore.imageUrl}></img>
                    :
                    <img src = {product?.imageUrl}></img>
                    }
                  </div>
                  <div className = "show_contents01_header_bottom_left_bottom">
                    <div className = "show_contents01_header_bottom_left_bottom_score">
                    {loded&&(
                      <>
                      {userSwr.login&&(
                        <>
                          <div 
                          >
                            Score　
                            {scoreaverage}
                          </div>
                          {openscore&&(
                            <OpenScoreContext.Provider value={{ openscore, setOpenscore,score,setScore,scoreid,setScoreid,scoreaverage,setScoreaverage,stats,setStats }}>
                              <ScoreModal
                              product_id={product?.id}
                              user_id={userSwr.user.id}
                              />
                            </OpenScoreContext.Provider>
                          )}
                        </>
                      )}
                      {!userSwr.login&&(
                        <>
                          <div 
                          onClick = {modalopenJugde}
                          >
                            Score　
                            {scoreaverage}
                          
                          </div>
                        </>
                      )}
                      </>
                    )}
                    {!loded&&(
                      <>
                      Score　
                      {scoreaverage}

                      </>
                    )}

                    </div>
                    <div className = "show_contents01_header_bottom_left_bottom_likes">
                      {loded&&(
                      <>
                      {userSwr.login&&(
                      <>
                        { heart ? 
                        <>
                        <BsFillHeartFill
                        onClick = {deleteheart}
                        />
                        　
                        {scoreLenght}
                        </>
                        : 
                        <>
                        <BsHeart
                        onClick = {createheart}
                        />
                        　
                         {scoreLenght}
                        </>
                        }
                       

                      </>
                      )}
                      {!userSwr.login&&(
                        <>
                           <BsHeart
                           onClick={modalopenJugde}
                           />
                           　
                            {scoreLenght}
                            
                            {open&&(
                              <OpenContext.Provider value={{ open, setOpen }}>
                                <UserModalSign/>
                              </OpenContext.Provider>
                            )}
                        </>
                      )}
                        </>
                      )}
                      {!loded&&(
                        <>
                          <BsHeart/>
                          　
                          {scoreLenght}
                        </>
                      )}
                    </div>
                  </div>
                </div> */}


                <div className = "show_contents01_header_bottom_right"
                ref = {elm2}
                >
                  <div className = "show_contents01_header_bottom_rightbox">
                    <div className = "show_contents01_header_bottom_right_title">
                      {ProductStore.id==Number(params_id)?ProductStore.title:product?.title}
                    </div>
                    <div className = "show_contents01_header_bottom_right_descriptions">
                      {ProductStore.id!=Number(params_id)&&product!=undefined&&(
                        <ReactQuill
                          className = "reviews_modal_quill ovevierReactQuill"
                          value={product!=undefined?product.arasuzi:""} 
                          theme="bubble"
                          readOnly={true}
                        />
                      )}
                      {ProductStore.id==Number(params_id)&&(
                        <ReactQuill
                          className = "reviews_modal_quill ovevierReactQuill QuillContainer1"
                          // value={ProductStore.arasuzi!=undefined?ProductStore.arasuzi:product?.arasuzi} 
                          value={ProductStore.arasuzi!=undefined?ProductStore.arasuzi:product!=undefined?product.arasuzi:""} 
                          // value={""} 
                          theme="bubble"
                          readOnly={true}
                        />
                      )}
                    </div>
                    {/* <div className = "show_contents01_header_bottom_right_netflix"
                  
                    >
                      他、関連サービス
                      {product?.annict!=undefined&&product?.annict!=0&&(
                        <a href = {`https://cal.syoboi.jp/tid/${product?.shoboi}`} target="_blank" rel="noopener noreferrer">
                          しょぼいカレンダー
                        </a>
                      )}
                      {product?.annict!=undefined&&product?.annict!=0&&(
                        <a href = {`https://annict.com/works/${product?.annict}`} target="_blank" rel="noopener noreferrer">
                          Annict
                        </a>
                      )}
                      {product?.list!=undefined&&product?.list.length!=0&&(
                        <a href = {ProductStore.id==Number(params_id)?ProductStore.list:product?.list} target="_blank" rel="noopener noreferrer">
                          公式サイト
                        </a>
                      )}
                    </div> */}
                  </div>  
                </div>
              </div>
            <div className="">
            <div className = "show_contents01_header_03" >
              <div className = "show_03">
                <div className = "show_03_title">
                  作品詳細
                </div>
                <div className = "show_03_list show_03_list_box">
                  <ul>
                    {airing!=""&&(
                    <li>放送まで: {airing}</li>
                    )}
                    {/* {ProductStore.id!=Number(params_id)&&product!=undefined&&product.productStyles.length>0&&(
                    <li>フォーマット: {product.productStyles[0].name}</li>
                    )} */}
                    {/* {ProductStore.id==Number(params_id)&&ProductStore.productStyles!=undefined&&ProductStore.productStyles.length>0&&(
                    <li>フォーマット: {productStore?.productStyles[0].name}</li>
                    )} */}
                    {product!=undefined&&product.productStyles.length>0&&(
                    <li>フォーマット: {product?.productStyles[0].name}</li>
                    )}
                    {firstEpisord!=undefined||firstEpisord!="0"&&(<li>初回放送日: {firstEpisord}</li>)}
                    {product!=undefined&&product?.episords.length>0&&(<li>エピソード数: {product?.episords.length}</li>)}
                    {avgTime !=undefined||avgTime != "0分"&&(
                    <li>一話平均: {avgTime}</li>
                    )}
                    {product!=undefined&&product?.productStudio.length>0&&(
                    <li className = "productShowStudio"> スタジオ: 
                    {product?.productStudio.map((item,index)=>{
                      return(
                        <span key = {item.id}>{item.company}
                        {index>=0&&index<product.productStudio.length-1?",":""}
                        </span>
                      )
                    })}</li>
                    )}
                    {product?.productYearSeason!=undefined&&product?.productYearSeason.length>0&&(
                    <li>シーズン: {yearSeason}
                    </li>
                    )}
                    
           
                    
                  </ul>
                </div>
              </div>
            </div>


            <div className = "show_contents01_header_04 share_container01">
                <div className = "show_04">
                  <div className = "show_04_title share_title01">
                    ジャンル
                  </div>
                  <div className = "show_04_list">
                    {ProductStore.productGenres!=undefined&&ProductStore.id==Number(params_id)?
                      <ul>
                        {ProductStore.productGenres.map((item:product_genres )=>{
                          return(
                            <li key = {item.id} className ={`p_contens_grid_color${switchnumber}g`}>{item.name}</li>
                          )
                        })}
                      </ul> 
                    :
                      <ul>
                        {product?.productGenres.map((item:product_genres )=>{
                          return(
                            <li key = {item.id} className ={`p_contens_grid_color${switchnumber}g`}>{item.name}</li>
                          )
                        })}
                      </ul>
                    }
                  </div>
                </div>
              </div>

              <div className = "show_contents01_header_03" >
              <div className = "show_03">
                <div className = "show_03_title">
                  他サービス
                </div>
                <div className = "show_03_list other_service show_03_list_box">
                  <ul>
                      {product?.annict!=undefined&&product?.annict!=0&&(
                        <li><a href = {`https://cal.syoboi.jp/tid/${product?.shoboi}`} target="_blank" rel="noopener noreferrer">
                          しょぼいカレンダー
                        </a></li>
                      )}
                      {product?.annict!=undefined&&product?.annict!=0&&(
                        <li><a href = {`https://annict.com/works/${product?.annict}`} target="_blank" rel="noopener noreferrer">
                          Annict
                        </a></li>
                      )}
                      {product?.list!=undefined&&product?.list.length!=0&&(
                        <li><a href = {ProductStore.id==Number(params_id)?ProductStore.list:product?.list} target="_blank" rel="noopener noreferrer">
                          公式サイト
                        </a></li>
                      )}
                  </ul>
                </div>
              </div>
            </div>

            </div>

              <div className = "show_contens01_header_05 share_container01"
              style={{
                margin: "0px"
              }}
              >
                <div className = "show_05"> 
                  <ul className = "show_05_navigation_menu">
                    <li
                    className={Props.active == 0? `merupla_show active_titile_show p_contens_grid_color${switchnumber}g`:"merupla_show"}
                    style={{
                      width: "100%"
                    }}
                    ><Link href={`/title/${params_id}`}>Top</Link></li>
                    {product?.overview!=undefined&&(
                    <li
                    style={{
                      width: "100%"
                    }}
                    className={Props.active == 1? `merupla_show active_titile_show p_contens_grid_color${switchnumber}g`:"merupla_show"}
                    ><Link href={`/title/${params_id}/overview`}>Overview</Link></li>
                    )}
                    <li
                    style={{
                      width: "100%"
                    }}
                      className={Props.active == 2? `merupla_show active_titile_show p_contens_grid_color${switchnumber}g`:"merupla_show"}
                    ><Link href={`/title/${params_id}/episords`}>Episords</Link></li>
                    <li
                    style={{
                      width: "100%"
                    }}
                    className={Props.active == 3? `merupla_show active_titile_show p_contens_grid_color${switchnumber}g`:"merupla_show"}
                    ><Link href={`/title/${params_id}/reviews`}>Review</Link></li>
                    <li
                    style={{
                      width: "100%"
                    }}
                    className={Props.active == 4? `merupla_show active_titile_show p_contens_grid_color${switchnumber}g`:"merupla_show"}
                    ><Link href={`/title/${params_id}/threads`}>Thread</Link></li> 
                    {/* {userSwr.login==true?
                      <>
                        <li
                        onClick={modalOpenChatRoom}
                        >ChatRoom</li>
                      </>
                      :
                      <>
                        <li 
                        onClick={modalopenJugde}
                        >ChatRoom</li>
                      </>
                     } */}
                  </ul>    
                </div>
              </div>
                <Productshowcontext.Provider value={ {product,switchnumber,stats,acsesses,userReviews,setUserReviews,productReviews,setProductReviews,productThreads,setProductThreads,emotionLists,setEmotionLists,chatList,setChatList,Channel,productScores,setProductScores,setScore,score,scoreid,setScoreid,scoreaverage,setScoreaverage,setStats,openscore,setOpenscore,userScore,setUserScore} }>
                  {Props.children}
                </Productshowcontext.Provider>
            </div>
          </div>
        </div>        
      </div>
      {openEdit==true&&product!=undefined&&(
        <AdminsEditProduct
        product={product}
        openEdit = {openEdit}
        setOpenEdit = {setOpenEdit}
        />
      )}
       {/* {openChatRoom&&product!=undefined&&(
          <ChatModal
            product = {product}
            openChatRoom = {openChatRoom}
            setOpenChatRoom = {setOpenChatRoom}
            Channel = {Channel}
            chatList = {chatList}
            setChatList = {setChatList}
          />
        )} */}

      
    </>
  )
} 
