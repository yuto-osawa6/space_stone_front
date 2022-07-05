import { UserShowContext } from "@/contexttype/contexttype"
import { useContext, useMemo,useState,useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { UserShowLikeGenres } from "./UserShowLikeGenres"
import { UserShowLikeProducts } from "./UserShowLikeProducts"
import { UserShowOverviewEmotion } from "./UserShowOverviewEmotion"
import { UserShowOverviewScore } from "./UserShowOverviewScore"
import { UserShowOverviewScoreEmotion } from "./UserShowOverviewScoreEmotion"
import { UserTierList } from "./UserTierList"
import { product } from "@/interfaces/product"
import { execGetUserTier, execGetUserTierUserPage } from "@/lib/api/mains/main_blocks"
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { execChangeScoreArrayies } from "@/lib/api/users"
import { UserTierList2 } from "./UsetTierList2"
import { useRouter } from "next/router"
import { UserBackgroupdSetUp } from "@/components/users/setup/background/UserBackgroundSetUp"
import { UserOverviewSetUp } from "@/components/users/setup/overview/UserOverviewSetUp"
import { CreateTier } from "@/components/mains/tier/setup/CreateTier"
import { UpdateTier } from "@/components/mains/tier/setup/UpdateTier"
import { useUser } from "@/lib/data/user/useUser"
import { TouchBackend } from "react-dnd-touch-backend"
import { isMobile } from "react-device-detect"

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

type UserTier = {
  group: number
  id: number
  product: product
  tier: number
  userId: number
}
type tierProduct = {
  id:number
  avg:string
  imageUrl:string
  title:string
}


export const UserShowOverview:React.FC=function UserShowOverviewFunc(){
  const {userSwr} = useUser()
  const LoginUserStore = userSwr
  const router = useRouter()
  const {uid} =router.query
  const user_id = uid
  const modules = useMemo(()=>({
    toolbar:{ 
      container:[
      [{ header: 1 },{ header: 2 }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      ["blockquote"
    ],
      [{ list:  "ordered" }, { list:  "bullet" }],
      [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
      ["image"],
    ],
  }
  }
  ),[])
  const {user} = useContext(UserShowContext)

  // tier create update
  const [openTier,setOpenTier] = useState<boolean>(false)
  const handleOpenTierCreateModal = () =>  setOpenTier(true)
  const [openTierUpdate,setOpenTierUpdate] = useState<boolean>(false)
  const handleOpenTierUpdateModal = () => {setOpenTierUpdate(true)
  }

  // tier
  const [products, setProducts] = useState<product[]>()
  const [currentSeason,setCurrentSeason] = useState<string>("")
  const [tierProduct,setTierProduct] = useState<tierProduct>()
  const [updateTier,setUpdateTier] = useState<boolean>(false)

  const [userTier,setUserTier] = useState<UserTier[]>([])
  const handleGetUserTier = async()=>{

    const res = await execGetUserTierUserPage(LoginUserStore.user.id,1)
    if(res.status == 200){
      setCurrentSeason(res.data.currentSeason)
      setProducts(res.data.products)
      res.data.userTier.forEach((i:any)=>{
        const tier = i.tier
      if(0<=tier&&tier<=10){
      Object.assign(i,{group:5})
      }else if(10<tier&&tier<=30) {
      Object.assign(i,{group:4})
      }else if(30<tier&&tier<=50){
      Object.assign(i,{group:3})
      }else if(50<tier&&tier<=70){
        Object.assign(i,{group:2})
      }else if(70<tier&&tier<=90){
        Object.assign(i,{group:1})
      }else if(90<tier&&tier<=100){
        Object.assign(i,{group:0})
      }else{

      }
    })
      setUserTier(res.data.userTier)
    }else{
    }
  }

  useEffect(()=>{
    if(user.id!=LoginUserStore.user.id)return
    if(LoginUserStore.login!=true)return
    handleGetUserTier()
  },[LoginUserStore.login])
  useEffect(()=>{
    if(updateTier==false)return
    setUpdateTier(false)
    handleGetUserTier()
  },[updateTier])

  // score change action
  const scoreArray = ['平均','総合','ストーリー','アニメーション','演出','音楽','キャラクター']
  const [scoreArrayies,setScoreArrayies] = useState<number[]>([])
  const [indexNumber,setIndexNumber] = useState<number>(0)
  const handleChangeScores = async(index:number) => {
    const res = await execChangeScoreArrayies(user.id,index)
    if(res.status == 200){
      if(res.data.scoreArrayies[10]!=undefined){
        res.data.scoreArrayies[9] = res.data.scoreArrayies[9] +res.data.scoreArrayies[10]
      }
      setIndexNumber(index)
      setScoreArrayies(res.data.scoreArrayies)
    }else{

    }
  }

  useEffect(()=>{
    setScoreArrayies(user.score)
  },[])
  return(
    <>
      
      <div className = "UserShowOutletLeft">
        
        <div className = "UserShowOverview">
          <div className = "UserShowOverviewTitle"
          style={{
            fontWeight:"bold"
          }}
          >
            概要
          </div>
          {LoginUserStore.user.id == Number(user_id)&&(
            <div className = "UsersShowTopSettingList"
            style={{display:"flex",gap:"10px",margin:"0px 20px 0px 20px",fontSize: "0.8rem",color: "#01adff"}}
            >
                <>
                  <UserBackgroupdSetUp/>
                  <UserOverviewSetUp/>
                </>   
            </div>
          )}
          <div className = "UserShowOverviewContents">
            {user.overview!=undefined&&user.overview!="<p><br></p>"||LoginUserStore.user.overview!=""&&LoginUserStore.user.overview!="<p><br></p>"?

          
            <ReactQuill
              className = "reviews_modal_quill"
              // ref={quillref}
              modules={modules} value={LoginUserStore.user.id == Number(user_id)?LoginUserStore.user.overview:user.overview} 
              theme="bubble"
              readOnly={true}
              style={{
                padding:"20px"
              }}
              
            />
            :
            <div className="UserShowOverviewContentsNo">
              まだ投稿されていません。
            </div>
            }
          </div>
          
        </div>
      </div>

      <div className = "UserShowOutletRight">
        {user!=undefined&&user.tier!=undefined&&(
          <div className = "UserShowOverview">
            <div className = "UserShowOverviewTitle"
                style={{
                fontWeight:"bold"
              }}
              >
              MyTier ({currentSeason})
              </div>
              {updateTier==false&&(
                <>
              {user.id==LoginUserStore.user.id&&(
              <>
                {userTier.length==0&&(
                  <div className="editTierButton"
                  onClick={handleOpenTierCreateModal}
                  style={{
                    cursor:"pointer",
                    display:"flex",gap:"10px",margin:"0px 20px 20px 20px",fontSize: "0.8rem",color: "#01adff"
                  }}
                  >
                    Tierを作成する
                  </div>
                  )}
                  {userTier.length!=0&&(
                  <div className="editTierButton"
                  onClick={handleOpenTierUpdateModal}
                  style={{
                    cursor:"pointer",
                    display:"flex",gap:"10px",margin:"0px 20px 20px 20px",fontSize: "0.8rem",color: "#01adff"
                  }}
                  >
                    Tierを更新する
                  </div>
                  )}
                
                <UserTierList
                userTier={userTier}
                />
                </>
                )}
                {user.id!=LoginUserStore.user.id&&(
                <UserTierList2
                  user = {user}
                />
                )}
                </>
              )}
          </div>
          )}

        <div className = "UserShowOverview">
          <div className = "UserShowOverviewTitle"
            style={{
            fontWeight:"bold"
          }}
          >
            お気に入りした作品のジャンルTop4
          </div>
          <div className = "UserShowOverviewLikes"
          style={{
            display: "flex",
            flexFlow: "wrap",
          }}
          >
            {user.likeGenres.map((item)=>{
              return(
                <UserShowLikeGenres
                  key={item.id}
                  genre={item}
                />
              )
            })}
          </div>     
        </div>
        <div className = "UserShowOverview">
          <div className = "UserShowOverviewTitle"
          style={{
            fontWeight:"bold"
          }}
          >
            スコア
          </div>
          <ul
          style={{
            margin: "0px 20px",
            display: "flex",
            overflow: "scroll",
            gap: "10px",
            flexFlow: "wrap"
          }}
          >
            {scoreArray.map((item,index)=>{
              return(
                <>
                  <li
                  style={index==indexNumber?{cursor:"pointer",color:"#ff3073"}:{cursor:"pointer"}}
                  onClick={()=>handleChangeScores(index)}
                  >{item}</li>
                </>
              ) 
            })}
          </ul>
          <div className = "UserShowOverviewLikes">
            <UserShowOverviewScore
            score = {scoreArrayies}
            />
          </div>     
        </div>

        <div className = "UserShowOverview">
          <div className = "UserShowOverviewTitle"
            style={{
              fontWeight:"bold"
            }}
          >
            頻繁に抱いた感情
          </div>
          <div className = "UserShowOverviewLikes">
            {user.emotions.slice(0,10).map((item)=>{
              return(
                <UserShowOverviewEmotion
                  key = {item.id}
                  user = {user}
                  emotion = {item}
                  emotionCount = {user.emotionCount[item.id]}
                />
              )
            })}
          </div>     
        </div>

        <div className = "UserShowOverview">
          <div className = "UserShowOverviewTitle"
            style={{
              fontWeight:"bold"
            }}
          >
            高スコアをつけた作品に抱いた感情
          </div>
          <div className = "UserShowOverviewLikes">
            {user.scoreEmotions.slice(0,10).map((item)=>{
              return(
                <UserShowOverviewScoreEmotion
                  key = {item.id}
                  user = {user}
                  emotion = {item}
                  emotionCount = {user.scoreEmotionCount[item.id]}
                />
              )
            })}
          </div>     
        </div>


      </div>
      {openTier&&products!=undefined&&(
        <DndProvider backend={isMobile?TouchBackend:HTML5Backend}>
        <CreateTier
          products = {products}
          season = {currentSeason}
          open = {openTier}
          setOpen = {setOpenTier}
          setUpdateTier={setUpdateTier}
        />
        </DndProvider>
      )}
      {openTierUpdate&&products!=undefined&&(
        <DndProvider backend={isMobile?TouchBackend:HTML5Backend}>
        <UpdateTier
          products = {products}
          season = {currentSeason}
          open = {openTierUpdate}
          setOpen = {setOpenTierUpdate}
          userTier = {userTier}

          setUpdateTier = {setUpdateTier}
        />
        </DndProvider>
      )}
    </>
  )
}