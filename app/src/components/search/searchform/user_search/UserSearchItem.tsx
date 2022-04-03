// import { useNavigate } from "react-router-dom"

import { useRouter } from "next/router"

type Props = {
  user:User
}
type User = {
  id:number
  nickname:string
  image:string
}

// const dammy = [{id:2,nickname:"aa",image:""},{id:2,nickname:"aa",image:""},{id:2,nickname:"aa",image:""},{id:2,nickname:"aa",image:""},{id:2,nickname:"aa",image:""},{id:2,nickname:"aa",image:""},{id:2,nickname:"aa",image:""},{id:2,nickname:"aa",image:""},{id:2,nickname:"aa",image:""},{id:2,nickname:"aa",image:""},{id:2,nickname:"aa",image:""},{id:2,nickname:"aa",image:""},{id:2,nickname:"aa",image:""}]

export const UserSearchItem:React.FC<Props> = (Props) => {
  const router = useRouter()

  const handleNavigate = () => {
    router.push(`/users/${Props.user.id}`)
  }

  return(
    <>
      <li
      className = "UserSearchItem"
      onClick={handleNavigate}
      style={{
        cursor:"pointer",
        display: "grid",
        gridTemplateColumns: "40px 1fr",
        gap: "10px",
        alignItems: "center",
        padding: "10px",
        color:"white"
        }}
      >
        <div className="">
          <img src={Props.user.image}
          style={{
            width:"100%",
            borderRadius:"100%"
          }}
          />
        </div>
        <div className=""
        style={{
          
        }}
        >
          {Props.user.nickname}
        </div>
      </li>
    </>
  )
}