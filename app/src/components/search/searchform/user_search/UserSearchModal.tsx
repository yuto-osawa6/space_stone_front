import { Modal } from "@mui/material"
import { display } from "@mui/system"
import { execUserSearch } from "@/lib/api/main"
import { useEffect, useRef, useState } from "react"
import { IoMdClose } from "react-icons/io"
import InfiniteScroll from "react-infinite-scroller"
import { UserSearchItem } from "./UserSearchItem"

type Props = {
  openUserSearchModal: boolean
  setOpenUserSearchModal: React.Dispatch<React.SetStateAction<boolean>>
}
type User = {
  id:number
  nickname:string
  image:string
}
const dammy:User[] = [{id:2,nickname:"aa",image:""},{id:2,nickname:"aa",image:""},{id:2,nickname:"aa",image:""},{id:2,nickname:"aa",image:""},{id:2,nickname:"aa",image:""},{id:2,nickname:"aa",image:""},{id:2,nickname:"aa",image:""},{id:2,nickname:"aa",image:""},{id:2,nickname:"aa",image:""},{id:2,nickname:"aa",image:""},{id:2,nickname:"aa",image:""},{id:2,nickname:"aa",image:""},{id:2,nickname:"aa",image:""},{id:2,nickname:"aa",image:""},{id:2,nickname:"aa",image:""},{id:2,nickname:"aa",image:""},{id:2,nickname:"aa",image:""},{id:2,nickname:"aa",image:""},{id:2,nickname:"aa",image:""}]

export const UserSearchModal:React.FC<Props> = function UserSearchModalFunc(Props){
  const handleClose = () => {
    Props.setOpenUserSearchModal(false)
  }
  // ------------------------
  const [user,setUser] = useState<User[]>([])
  const handleFirst = async() => {
    if(inputText=="")return
    const res = await execUserSearch(inputText,1)
    try{
      if(res.status === 200){
        setUser(res.data.user)
        setFirstloding(true)
      }else{

      }
    }catch(e){
    }
  } 
  //  title --------------------
  const [inputText,setInputText] = useState<string>("")
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFirstloding(false)
      setPage2(2)
      setHasMore(true);
      setInputText(value)
  }

  useEffect(()=>{
    const timer = setTimeout(() => {
      handleFirst()
    }, 500)
    return () => clearTimeout(timer)
  },[inputText])
  // scroll
  const [loaded,setLoaded] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState(true); 
  const [firstloding,setFirstloding] = useState<boolean>(false);

  const [page2,setPage2] = useState<number>(2)
  const loader =<div className="loader" key={0}>Loading ...</div>;
  const scrollRef = useRef<HTMLUListElement>(null);
  const scrollParentRef = scrollRef.current
  const handleScrollingExec = async () => {
    setLoaded(true)
    if(loaded==true)return
    const res = await execUserSearch(inputText,page2)
    if (res.status === 200) {
      setPage2(page2+1)
      if (res.data.user.length < 1) {
        setHasMore(false);
        setLoaded(false)
        return;
      }
      setUser([...user,...res.data.user])
      setLoaded(false)
    }
  }


  return(
    <>
      <Modal
        open={Props.openUserSearchModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <div className=""
          style={{
            maxHeight: "90%",
            width: "80%",
            backgroundColor: "#363949",
            position: "relative",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius:"10px"
          }}
          >
            <div className=""
            style={{
              paddingTop: "10px",
              margin: "10px",
              fontSize: "1.2rem",
              fontWeight:"bold",
              display:"flex",
              justifyContent:"space-around",
              color:"white"
            }}  
            >
              Search for User
            <div className="CloseButton"
              style={{
                top: "10px",
                width: 30,
                height: 30,
              }}
              onClick={handleClose}
            >
              <IoMdClose/>
              </div>
            </div>
            <div className=""
            style={{
              padding: "10px",
              backgroundColor: "white",
              fontSize: "1.2rem"
            }}
            >
              <input 
                type="text" 
                name="name" 
                placeholder=""
                value={inputText}
                autoComplete="off"
                onChange={handleChange}
                style={{
                  width: "100%",
                  outline: "none"
                }}
              />
            </div>
            <ul className="SearchUserModal"
            ref={scrollRef}
            style={{
              paddingBottom: "20px",
              maxHeight: "70vh",
              overflow: "scroll"
            }}
            >
            {firstloding&&(
            <InfiniteScroll
              loadMore={handleScrollingExec}    
              hasMore={hasMore}  
              loader={loader}
              useWindow={false}
              getScrollParent={() => scrollParentRef}
              >      
                {user.map((item)=>{
                  return(
                    <UserSearchItem
                      key={item.id}
                      user = {item}
                    />
                    )
                  })}
                </InfiniteScroll>
                )}
            </ul>
          </div>
        </>
      </Modal>
    </>
  )
}