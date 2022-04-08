import { UserShow } from "interfaces/user"
import { useMemo } from "react"
// import ReactQuill from "react-quill"
import { useSelector } from "react-redux"
import { RootState } from "store"

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;


type Props = {
  user: UserShow
}

export const UserOverviewTop:React.FC<Props> = (Props) => {
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
    // handlers: {
    // },
  }
  }
  ),[])
  const LoginUserStore = useSelector((state:RootState)=>state.user)
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
          <div className = "UserShowOverviewContents">
            {Props.user.overview!=undefined?

           
            <ReactQuill
              className = "reviews_modal_quill"
              // ref={quillref}
              modules={modules} value={LoginUserStore.user.id == Props.user.id?LoginUserStore.user.overview:Props.user.overview} 
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
    </>
  )
}