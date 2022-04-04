import { acsesses, emotionList, product, productReviews, productScores, productShow, productThreads, product_genres, userReview } from 'interfaces/product';
import { execAcsesscount, execCheckingHeart, execProductCreateHeart, execProductDeleteHeart, execProductShow } from 'lib/api/products';
import React, { useEffect, useRef, useState } from 'react';
// import { useParams,useNavigate } from 'react-router-dom'
// import { useOutlet } from "react-router"
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionSettingProductData2 } from 'store/product/actions';
import { RootState } from 'store';
import { BsFillHeartFill, BsHeart } from 'react-icons/bs'
import { OpenContext, OpenScoreContext, Productshowcontext } from 'contexttype/contexttype';
// import { UserModalSign } from 'component/aplication/lefts/UserModalSign';
// import { ScoreModal } from './show/ScoreModal';
// import { AdminsEditProduct } from 'component/admins/product/edit/AdminEditProduct';
// import ActionCable from 'actioncable'
// import { ChatModal } from "./show/chat/ChatModal"
import { pussingMessageDataAction } from 'store/message/actions';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { ErrorMessage } from 'lib/ini/message';
import { UserModalSign } from 'components/applications/user/UserModalSign';
import { useUser } from 'lib/data/user/useUser';
import Link from 'next/link';
// import { ErrorMessage } from "share/message";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });



var array:number[] = new Array()
for (let i = 0; i < 10; i++) {
  array.push(i)
}

type chatList = {
  created_at: string
  id: number
  message: string
  product_id: number
  user_id: number
}

type Props = {
  data:productShow
}

export const ProductShow:React.FC<Props> = (Props) => {
  const router = useRouter()
  const {pid} = router.query
  const params_id = pid
  // const [product,setProduct] = useState<product>()
  // const [productStore,setProductStore] = useState<product>()
  const [switchnumber,setSwitchnumber] = useState<number>(0)
  const [heart,setHeart] = useState<boolean>(false)
  const [heartId,setHeartId] = useState<number>()
  // const [loded,setLoded] = useState<boolean>(false)
  const [open,setOpen] = useState<boolean>(false)
  const [openscore,setOpenscore] = useState<boolean>(false)
  const [score,setScore] = useState<number | null>(Props.data.scored.score===null?Props.data.scored.score:Props.data.scored.score.value)
  const [scoreid,setScoreid] = useState<number | null>(null)
  // stats
  const [stats,setStats] = useState<number[]>(Props.data.stats.stats)
  const [acsesses,setAcsesses] = useState<acsesses>(Props.data.acsesses)
  const [likecount,setLikecount] = useState<number>(Props.data.products.likeCount)
  const [scoreaverage,setScoreaverage] = useState<string>(Props.data.products.averageScore)
  // userReview
  const [userReviews,setUserReviews] = useState<userReview[]>([])

  const ProductStore = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch();
  const colornumber:number = array[Math.floor(Math.random() * array.length)]
  const elm = useRef<HTMLDivElement>(null!);
  const elm2 = useRef<HTMLDivElement>(null!);
  // const user = useSelector((state: RootState) => state.user);
  const {userSwr,error} = useUser()
  console.log(userSwr)
  const user = userSwr

  // モーダル
  const modalopenJugde = () => setOpen(true)
  const modalopenJugde2 = () =>setOpenscore(true)
  // async 
  const [productReviews,setProductReviews] = useState<productReviews[]>([])
  const [productThreads,setProductThreads] = useState<productThreads[]>([])
  const [emotionLists,setEmotionLists] = useState<emotionList[]>([])
  const [productScores,setProductScores] = useState<productScores[]>([])
  const [userScore,setUserScore] = useState<productScores>()

  // let isMounted = true
  // const setdata = async() =>{
  //   if (ProductStore.id == Number(params_id)){
  //     setProductStore(ProductStore)
  //   }
  //   const res = await execProductShow(Number(params_id))
  //   if (res.data.status === 200) {
  //     if (isMounted) {
  //       console.log(res)
  //       if (ProductStore.id != Number(params_id)){
  //         dispatch(actionSettingProductData2(res.data.products));
  //       }   
  //       setProduct(res.data.products)
  //       setHeart(res.data.liked.liked)
  //       setLoded(true)
  //       setStats([...stats,...res.data.stats.stats])
  //       setAcsesses(res.data.acsesses)
  //       setLikecount(res.data.products.likeCount)
  //       setScoreaverage(res.data.products.averageScore)
        // if (res.data.liked.liked===true){
        //   setHeartId(res.data.liked.like.id)
        // }
        // if (res.data.scored.score==null){
        //   setScore(Props.data.products.scored.score)
        //   setScoreid(res.data.scored.score)
        // }
        // if (res.data.scored.score!=null){
        //   setScore(res.data.scored.score.value)
        //   setScoreid(res.data.scored.score.id)
        // }
  //       setUserReviews(res.data.products.userReviews)
  //       // async化
  //       setProductReviews(res.data.productReviews)
  //       setProductThreads(res.data.productThreads)
  //       setEmotionLists(res.data.emotionLists)
  //       // score2.0
  //       setProductScores(res.data.productScores)
  //       setUserScore(res.data.scored.score)     
  //     } 
  //   }else{
  //     navigate("/")
  //   }
  // } 
  
  // 放送日まで
  const [airing,setAiring] = useState<string>("")
  const handleSettingGetTime = () => {
    if(Props.data.products?.productEpisord==undefined)return
    if(Props.data.products?.productEpisord.releaseDate==undefined)return
      const now = new Date()
      const time = new Date(Props.data.products.productEpisord.releaseDate)
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
    if (Props.data.products==undefined) return
    if (Props.data.products.episords==undefined) return
    if(Props.data.products.episords[0]==undefined)return
    if(Props.data.products.episords[0].releaseDate==undefined){
      setFirstEpisord("")
      return
    }
    const firstE = new Date(Props.data.products.episords[0].releaseDate)
    console.log(firstE)
    setFirstEpisord(`${firstE.getFullYear()}-${firstE.getMonth()+1}-${firstE.getDate()} ${firstE.getHours()}時${firstE.getMinutes()}分`)
    const length = Props.data.products?.episords.filter(item => item.time !== undefined).length
    const time = Props.data.products?.episords.reduce((sum,i)=>i.time!=undefined?sum+new Date(i.time).getTime():sum,0)
    const duration = time/length
    const sec = Math.floor(duration/1000)%60
    const min = Math.floor(duration/1000/60)%60
    const hours = Math.floor(duration/1000/60/60)%24
    setAvgTime(`${min}分`)
  }

  const [yearSeason,setYearSeason] = useState<string>("")
  const handleSeasonSet = () => {
    const kisetsu = ["冬","春","夏","秋"]
    if (Props.data.products==undefined) return

    if(Props.data.products.productYearSeason.length==1){
      if(Props.data.products.productYearSeason[0].season.filter(item=>kisetsu.includes(item.name)).length==1){
        setYearSeason(`${Props.data.products.productYearSeason[0].year.slice(0,4)} ${Props.data.products.productYearSeason[0].season.filter(item=>kisetsu.includes(item.name)).sort((x,y)=>kisetsu.indexOf(x.name)-kisetsu.indexOf(y.name))[0].name}`)
      }else if(Props.data.products.productYearSeason[0].season.filter(item=>kisetsu.includes(item.name)).length>1){
        setYearSeason(`${Props.data.products.productYearSeason[0].year.slice(0,4)} ${Props.data.products.productYearSeason[0].season.filter(item=>kisetsu.includes(item.name)).sort((x,y)=>kisetsu.indexOf(x.name)-kisetsu.indexOf(y.name))[0].name} ~ ${Props.data.products.productYearSeason[0].season.filter(item=>kisetsu.includes(item.name)).sort((x,y)=>kisetsu.indexOf(x.name)-kisetsu.indexOf(y.name)).slice(-1)[0].name}`)
      }else{
        setYearSeason(`${Props.data.products.productYearSeason[0].year.slice(0,4)}`)
      }
    }


    if(Props.data.products.productYearSeason.length>1){
      if(Props.data.products.productYearSeason[0].season.filter(item=>kisetsu.includes(item.name)).length>0 && Props.data.products.productYearSeason[Props.data.products.productYearSeason.length-1].season.filter(item=>kisetsu.includes(item.name)).length>0){
        setYearSeason(`${Props.data.products.productYearSeason[0].year.slice(0,4)} ${Props.data.products.productYearSeason[0].season.filter(item=>kisetsu.includes(item.name)).sort((x,y)=>kisetsu.indexOf(x.name)-kisetsu.indexOf(y.name))[0].name} ~ ${Props.data.products.productYearSeason[Props.data.products.productYearSeason.length-1].year.slice(0,4)} ${Props.data.products.productYearSeason[Props.data.products.productYearSeason.length-1].season.filter(item=>kisetsu.includes(item.name)).sort((x,y)=>kisetsu.indexOf(y.name)-kisetsu.indexOf(x.name))[0].name}`)
      }else{
        setYearSeason(`${Props.data.products.productYearSeason[0].year.slice(0,4)} ~ ${Props.data.products.productYearSeason[Props.data.products.productYearSeason.length-1].year.slice(0,4)}`)
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
  useEffect(()=>{
    window.scrollTo({top:0,left:0})
    setSwitchnumber(colornumber)
  },[])

  // useEffect(()=>{
  //   setSwitchnumber(colornumber)
  //   setdata()
  //   return () => {
  //     isMounted = false
  //   };
  // },[])
  // useEffect(()=>{
   

  // },[])

  useEffect(()=>{
    acsesscount()
    handleSettingGetTime()
    handleSettingAvgTime()
    handleSeasonSet()
    if(Props.data.products==undefined)return
    settingNumberOfDigits(Props.data.products.likeCount)
  },[Props.data.products])


  useEffect(()=>{
    if (Props.data.products?.likeCount==undefined) return
    settingNumberOfDigits(likecount)
  },[likecount])


  useEffect(()=>{
    ceckingUserResouce()
  },[user.login])

  // useEffect(()=>{
  // },[acsesses])

  // acsesses
  const acsesscount = async() => {
    if (typeof Props.data.products === 'undefined') return
    const current_Today =  new Date()
    // doneyet(時間の修正)
    const res = await execAcsesscount(Props.data.products.id,current_Today )
    if(res.status === 200){
    }else{
    }
  }
  const ceckingUserResouce = async() => {
    if (typeof Props.data.products === 'undefined') return
    if (!user.login){
      return
    }
    const res = await execCheckingHeart(Props.data.products.id,user.user.id)
    if (res.status === 200) {
      // 確認
      console.log(res)
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
    if (typeof Props.data.products === 'undefined') return
    const res = await execProductCreateHeart(Props.data.products.id,user.user.id)
      console.log(res)
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
    if (typeof Props.data.products === 'undefined' || typeof heartId=== 'undefined') return
    const res = await execProductDeleteHeart(Props.data.products.id,heartId,user.user.id)
      console.log(res)
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
  // const [Channel,setChannel] = useState<any>(null)
  // const [chatList,setChatList] = useState<chatList[]>([])
  // const cable = ActionCable.createConsumer('ws://localhost:3001/cable');

  // useEffect(() => {
  //   if (product==undefined) return
  //   const channel = cable.subscriptions.create(
  //     {
  //       channel: 'ProductsChannel',
  //       id: product.id,
  //     },
  //     {
  //       received: (data) => {
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

  //  console.log(ProductStore)
  //  let countR = 0
  //  countR += 1
  //  console.log(countR)
  return(
    <>
      <div className = "product_show"
      >
        <div className = "product_show_contens">
          <div className = "product_show_contens01">
            <div className = "show_contents01_header">
              <div className = "show_contents01_header_top">
                <div className = "show_contents01_header_top_img">
                  {ProductStore.id==Number(params_id)?<img src = {ProductStore.imageUrl}></img>
                  :
                  <img src={Props.data.products?.imageUrl}></img>
                  }
                  <div className = "show_contents01_header_top_shadow">
                  </div>
                  {user.user.administratorGold==true&&(
                    <div className = "UserAdminEdit"
                    onClick={handleOpenEditProduct}
                    >
                      edit
                    </div>
                  )}
                </div>
              </div>
          
              <div className = "show_contents01_header_bottom" 
              >
                <div className = "show_contents01_header_bottom_left">
                  <div className = "show_contents01_header_bottom_left_image">
                    {ProductStore.id==Number(params_id)?<img src = {ProductStore.imageUrl}></img>
                    :
                    <img src = {Props.data.products?.imageUrl}></img>
                    }
                  </div>
                  <div className = "show_contents01_header_bottom_left_bottom">
                    <div className = "show_contents01_header_bottom_left_bottom_score">
                      Score　
                      {scoreaverage}
                    </div>
                    <div className = "show_contents01_header_bottom_left_bottom_likes">
                      {/* {loded&&(
                      <> */}
                      {user.login?
                      <>
                        { heart ? 
                        <>
                        <BsFillHeartFill
                        onClick = {deleteheart}
                        />
                        　
                        {scoreLenght}l
                        </>
                        : 
                        <>
                        <BsHeart
                        onClick = {createheart}
                        />
                        　
                         {scoreLenght}j
                        </>
                        }
                      </>
                      :
                        <>
                           <BsHeart
                           onClick={modalopenJugde}
                           />
                           　
                            {scoreLenght}o
                            
                            {/* {open&&(
                              <OpenContext.Provider value={{ open, setOpen }}>
                                <UserModalSig/>
                              </OpenContext.Provider>
                            )} */}
                        </>
                      }
                     
                    </div>
                  </div>
                </div>


                <div className = "show_contents01_header_bottom_right"
                ref = {elm2}
                >
                  <div className = "show_contents01_header_bottom_rightbox">
                    <div className = "show_contents01_header_bottom_right_title">
                      {ProductStore.id==Number(params_id)?ProductStore.title:Props.data.products?.title}
                    </div>
                    <div className = "show_contents01_header_bottom_right_descriptions">
                      {ProductStore.id!=Number(params_id)&&Props.data.products!=undefined&&(
                        <ReactQuill
                          className = "reviews_modal_quill"
                          value={Props.data.products!=undefined?Props.data.products.arasuzi:""} 
                          theme="bubble"
                          readOnly={true}
                        />
                      )}
                       {ProductStore.id==Number(params_id)&&(
                        <ReactQuill
                          className = "reviews_modal_quill"
                          value={ProductStore.arasuzi!=undefined?ProductStore.arasuzi:Props.data.products!=undefined?Props.data.products.arasuzi:""} 
                          theme="bubble"
                          readOnly={true}
                        />
                      )}
                    </div>
                    <div className = "show_contents01_header_bottom_right_netflix"
                    >
                      <a href = {ProductStore.id==Number(params_id)?ProductStore.list:Props.data.products?.list}>
                        公式サイトへ
                      </a>
                    </div>
                  </div>  
                </div>
              </div>

            <div className = "show_contents01_header_03" >
              <div className = "show_03">
                <div className = "show_03_title">
                  作品詳細
                </div>
                <div className = "show_03_list">
                  <ul>
                    {airing!=""&&(
                    <li>放送まで: {airing}</li>
                    )}
                    {/* ProductStore.id!=Number(params_id)&& */}
                    {Props.data.products!=undefined&&Props.data.products.productStyles.length>0&&(
                    <li>フォーマット: {Props.data.products.productStyles[0].name}</li>
                    )}
                     {/* {ProductStore.id==Number(params_id)&&ProductStore.productStyles!=undefined&&ProductStore.productStyles.length>0&&(
                    <li>フォーマット: {productStore?.productStyles[0].name}</li>
                    )} */}
                    {firstEpisord!=""&&(
                      <li>初回放送日: {firstEpisord}</li>
                    )}
                    <li>エピソード数: {Props.data.products?.episords.length}</li>
                    <li>一話平均: {avgTime}</li>
                    {Props.data.products?.productStudio.length>0&&(
                    <li className = "productShowStudio">スタジオ: {Props.data.products?.productStudio.map((item,index)=>{
                      return(
                        <span key = {item.id}>{item.company}
                        {index>=0&&index<Props.data.products.productStudio.length-1?",":""}
                        </span>
                      )
                    })}</li>
                    )}
                    {Props.data.products?.productYearSeason!=undefined&&Props.data.products?.productYearSeason.length>0&&(
                    <li>シーズン: {yearSeason}
                    </li>
                    )}
                    
           
                    
                  </ul>
                </div>
              </div>
            </div>


            <div className = "show_contents01_header_04 share_container01">
                <div className = "show_04">
                  {Props.data.products.productGenres.length>0&&(
                  <>
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
                        {Props.data.products?.productGenres.map((item:product_genres )=>{
                          return(
                            <li key = {item.id} className ={`p_contens_grid_color${switchnumber}g`}>{item.name}</li>
                          )
                        })}
                      </ul>
                    }
                  </div>
                  </>
                  )}
                </div>
              </div>

              <div className = "show_contens01_header_05 share_container01">
                <div className = "show_05"> 
                  <ul className = "show_05_navigation_menu">
                    <li
                    ><Link href={`/title/${params_id}`}>Top</Link></li>
                    {Props.data.products?.overview!=undefined&&(
                    <li
                    ><Link href="overview">Overview</Link></li>
                    )}
                      <li
                    ><Link href="episords">Episords</Link></li>
                    <li
                    ><Link href="review">Review</Link></li>
                    <li
                    ><Link href="thread">Thread</Link></li> 
                    {user.login==true?
                      <>
                        {/* <li
                        onClick={modalOpenChatRoom}
                        >ChatRoom</li> */}
                      </>
                      :
                      <>
                        <li 
                        onClick={modalopenJugde}
                        >ChatRoom</li>
                      </>
                     }
                  </ul>    
                </div>
              </div>
                {/* <Productshowcontext.Provider value={ {product,switchnumber,stats,acsesses,userReviews,setUserReviews,productReviews,setProductReviews,productThreads,setProductThreads,emotionLists,setEmotionLists,chatList,setChatList,Channel,productScores,setProductScores,setScore,score,scoreid,setScoreid,scoreaverage,setScoreaverage,setStats,openscore,setOpenscore,userScore,setUserScore} }>
                  {outlet}
                </Productshowcontext.Provider> */}
            </div>
          </div>
        </div>        
      </div>
      {open&&(
        <OpenContext.Provider value={{ open, setOpen }}>
          <UserModalSign/>
        </OpenContext.Provider>
      )}
      {/* {openEdit==true&&product!=undefined&&(
          <AdminsEditProduct
          product={product}
          openEdit = {openEdit}
          setOpenEdit = {setOpenEdit}
          />
      )}
       {openChatRoom&&product!=undefined&&(
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
