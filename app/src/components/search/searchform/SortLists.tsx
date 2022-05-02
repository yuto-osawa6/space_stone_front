import { Modal } from "@mui/material";
import { execGetEmotionList, execMonthDuringHandler } from "@/lib/api/main";
import { useEffect, useRef, useState } from "react"
import { FaSort } from "react-icons/fa"
import { MdInsertEmoticon } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { ResetSortPeriodAction, SettingSortPeriodAction } from "@/store/sortperiod/actions";
import { EmotionSortItem } from "./EmotionSortItem";
import { SortList } from "./SortList";

interface sort {
  s:{
    // title:string
    sort:string
  }
}


type sortu = {
  title:string
  sort:string
}
type s = sortu[]

type emotion = {
  id:number
  emotion:string
}



const ini:s= [
  {
    title:"タイトル",
    sort:"title desc"
  },
  {
    title:"日付",
    sort:"created_at desc"
  },
  {
    title:"お気に入り",
    sort:"likes_count desc"
  },
  {
    title:"平均スコア",
    sort:"average_score desc"
  },
  {
    title:"アクセス",
    sort:"acsess_count desc"
  },
  {
    title:"レビュー数",
    sort:"review_count desc"
  },
  {
    title:"スレッド数",
    sort:"thread_count desc"
  },
  {
    title:"総合平均スコア",
    sort: "average_all_score desc"
  },
  {
    title:"ストーリー平均スコア",
    sort: "average_story_score desc"
  },
  {
    title:"アニメーション平均スコア",
    sort: "average_animation_score desc"
  },
  {
    title:"演出平均スコア",
    sort: "average_performance_score desc"
  },
  {
    title:"音楽平均スコア",
    sort: "average_music_score desc"
  },
  {
    title:"キャスト・キャラクター平均スコア",
    sort: "average_character_score desc"
  }
]



export const SortLists:React.FC = function SortListsFunc(){
  const [sort,setSort] = useState<string>("アクセス")
  const sortstore = useSelector((state: RootState) => state.sort);

  const ref = useRef<HTMLDivElement>(null!);
  const ref2 = useRef<HTMLDivElement>(null!);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpen2, setIsMenuOpen2] = useState(false);

  // const dispatch = useDispatch();

  useEffect(() => {
    const checkIfClickedOutside = (e:any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
      console.log(e.target)
      console.log(ref.current)
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
      console.log("aaaaa")
    };
  }, [isMenuOpen]);

  // emotion------------------------------

  // useEffect(() => {
  //   const checkIfClickedOutside = (e:any) => {
  //     // If the menu is open and the clicked target is not within the menu,
  //     // then close the menu
  //     if (isMenuOpen2 && ref2.current && !ref2.current.contains(e.target)) {
  //       setIsMenuOpen2(false);
  //     }
  //     console.log(e.target)
  //     console.log(ref2.current)
  //   };

  //   document.addEventListener("mousedown", checkIfClickedOutside);

  //   return () => {
  //     // Cleanup the event listener
  //     document.removeEventListener("mousedown", checkIfClickedOutside);
  //     console.log("aaaaa")
  //   };
  // }, [isMenuOpen2]);

  const handleClose = () => {
    setIsMenuOpen2(false)
  }

  const [emotions,setEmotions] = useState<emotion[]>([])
  const handlerOne = async() => {
    const res = await execGetEmotionList()
    if(res.status==200){
      setEmotions(res.data.emotionList)
    }
  }

  useEffect(()=>{
    handlerOne()
  },[])

  return(
    <>

    <div className = "emotionSort"
    ref={ref2}
    >
      <div className = "header-search-contents__boxes__Lists__right__Lists__logo">
        <MdInsertEmoticon
        style={{cursor:"pointer"}}
         onClick={() => setIsMenuOpen2(true)}
        />

      </div>
      
    </div>
    {isMenuOpen2 && (
         <Modal
         open={isMenuOpen2}
         onClose={handleClose}
         // onClose={false}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
       >
        <div className = "emotionSortList">
          {emotions.map((item)=>{
            return(
              <EmotionSortItem
              emotion={item}
              // title={item.title}
              // sort={item.sort}
              setSort={setSort}
              setIsMenuOpen2={setIsMenuOpen2}
              key={item.id}
              />
            )
          })}
        </div>
        </Modal>
      )}

     <div className = "header-search-contents__boxes__Lists__right__Lists"
     ref={ref}
     >
      <div className = "header-search-contents__boxes__Lists__right__Lists__logo">
        <FaSort/>

      </div>
      <div className = "header-search-contents__boxes__Lists__right__Lists__list"
      >
        <div className = "sort__list__title"
        onClick={() => setIsMenuOpen(true)}
        >
           { sort }順
        </div>
        {isMenuOpen && (
        <div className = "sort__lists"
        >
          {ini.map((item:sortu,index)=>{
            return(

              <SortList
              title={item.title}
              sort={item.sort}
              setSort={setSort}
              setIsMenuOpen={setIsMenuOpen}
              key={index}
              />
            )

          })}
     
          
        

        </div>
        )}
      </div>
      <div className = "header-search-contents__boxes__Lists__right__Lists__gridstyles">

      </div>
      </div>
    </>
  )
}