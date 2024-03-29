import { UserShowContext } from "@/contexttype/contexttype"
import { genre } from "@/interfaces/product"
import { execUserShowLikeGenresHandler } from "@/lib/api/users"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { deletingtodoGenresDataExceptOneAction } from "@/store/todogenres/actions"


type Props ={
}
export const UserShowLikesGenres:React.FC<Props> = function UserShowLikesGenresFunc(Props){
  const {user} = useContext(UserShowContext)
  const [genres,setGenres] = useState<genre[]>([])
  const setupHandler = async() =>{
  const res = await execUserShowLikeGenresHandler(user.id)
  if(res.status === 200){
    setGenres(res.data.genres)
  }else{

  }
  }
  useEffect(()=>{
    setupHandler()
  },[])

  const router = useRouter()
  const dispatch = useDispatch()
  const navigateHandler = (id:number) => {
 
    dispatch(deletingtodoGenresDataExceptOneAction(String(id)));
    router.push(`/search`)
    
  }
  return(
    <>
      <div className = "UserLikesGenres">
        <div className = "UserLikesGenresTitle"
        style={{
          fontWeight:"bold"
        }}
        >
          お気に入りした作品のジャンル ランキング順
        </div>
        <div className = "UserLikesGenresMain"
        style={{
          backgroundColor:"transparent",
          padding:0
        }}
        >
          <ul>
          {genres.map((item)=>{
            return(
              <li key={item.id}
              style={{
              cursor:"pointer",
              backgroundColor: "#20c791",
              color:"white",
              borderRadius: "5px"
            }}
              onClick={()=>navigateHandler(item.id)}
              >
                {item.name}
              </li>
            )
          })}
          </ul>
        </div>
      </div>
    </>
  )
}