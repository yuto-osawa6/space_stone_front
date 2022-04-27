import { Modal } from "@mui/material"
import { Article } from "interfaces/article"
import { execAcsessArticleCountHandler, execArticleArticleAssosiationsHandler, execArticleShowHandler } from "@/lib/api/article"
import { useEffect, useMemo, useState } from "react"
// import ReactQuill from "react-quill"
import { useSelector } from "react-redux"
// import { useNavigate, useParams } from "react-router-dom"
import { RootState } from "@/store"
import { ArticleProductList } from "./products/ArticleProductList"
import { IoMdClose } from "react-icons/io"
import { ArticlesLists2 } from "./ArticleLists2"
import { EditArticleLists } from "./edit/EditArticleLists"
import { useRouter } from "next/router"

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;


export const ArticlesItem:React.FC = () => {
  const modules =  useMemo(() => (
    {
    toolbar:{ 
      container:[
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      ["blockquote"],
      ["code-block"],
      [{ list:  "ordered" }, { list:  "bullet" }],
      [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
      ['UnderlineWavy','UnderlineWavy2','UnderlineWavy3'],
    ],
    handlers: {
    },
    clipboard: {
      matchVisual: false
      }
    },
  }
  ),[]);
  // use
  // const navigate = useNavigate()
  // const params = useParams();
  const router = useRouter()
  // store
  const articleStore = useSelector((state: RootState) => state.article)
  // params
  const {aid} = router.query
  const params_id = aid as string
  // state
  const [on,Seton] = useState<boolean>(false)
  const [article,setArtlce] = useState<Article[]>([])
  const [data,setData] = useState<Article>()

  const setdata = async() => {
    if (params_id==undefined) return
    const res = await execArticleShowHandler(params_id)
    if (res.status==200){
      console.log(res)
      setData(res.data.article) 
    }else{
    }
  }
  

  const setAssociatedProduct = async() => {
    if (params_id==undefined) return
    const res = await execArticleArticleAssosiationsHandler(params_id)
    if (res.status==200){
      console.log(res)
      setArtlce(res.data.articles)  
    }else{
    }
  }
  useEffect(()=>{
    if (articleStore.id == Number(params_id)){
      Seton(true)
    }else{
    setdata()
    }
    setAssociatedProduct()
  },[articleStore])
  // 
  

  const [open,setOpen] = useState<boolean>(true)
  const handleClose = () => {
    setOpen(false)
    // navigate("/articles")
  }

  // acsess countーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
  useEffect(()=>{
    acsessCountHandler()
  },[data,articleStore.id])

  const acsessCountHandler = async() => {
    if (articleStore.id == Number(params_id)){
      var article_id:number|undefined = articleStore.id 
    }else{
      var article_id:number|undefined = data?.id
    }
      if(article_id==undefined) return
      const currentToday =  new Date()
      // doneyet (react側の時間設定 世界標準時間になっている) 
      currentToday.setHours(currentToday.getHours() + 9)
      const res =  await execAcsessArticleCountHandler(article_id,currentToday) 
      if(res.status === 200){
        console.log(res)
      }else{

      }
  }

  // user
  const userStore = useSelector((state:RootState)=>state.user)
  return(
    <>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <>      */}
      <div className = "ProductReviewShow ArticleModal">
        <div className = "ProductReviewShowTop">
          <div className = "ProductReviewShowTopImg">
            <img src = 
            {on==true?
              articleStore.articleProducts.length !=0?
                articleStore.articleProducts[0].imageUrl
                :""
                // doneyet初期画像セットする必要あり。また、画像を乱数表示するかどうか。
              :data?.articleProducts.length !=0?
                data?.articleProducts[0].imageUrl
              :""
            }       
            ></img>
            <div className = "ProductReviewShowTopImgShadow"></div>
            {userStore.user.administratorGold==true&&( 
              <EditArticleLists
                article = {on==true?articleStore:data}
              /> 
            )}
          </div>  
          <div className = "ProductReviewShowTopCenter">
            <div className = "ProductReviewShowTopCenterTitle">
              {on==true?articleStore.title:data?.title}
            </div>
            <div className = "ProductReviewShowTopCenterUser">
            </div>
          </div>
          {/* <div className="CloseButton"
          onClick={handleClose}
          >
            <IoMdClose/>
          </div> */}
        </div>  
        <div className = "ProductReviewShowMain">
          <div className = "ProductReviewShowMainQuill">
            <ReactQuill
              className="quill_reviews"
              modules={modules} 
              value={on==true?articleStore.content:data!=undefined?data.content:""} 
              theme="bubble" 
              readOnly={true}
            />     

          </div>
        {on==true?
          articleStore.articleProducts.length>0?
          <>
          <div className = "ArticlesAssociateProducts">
            <div className="ArticlesAssociateProductsTitle margin_bottom_20"
            style={{ fontWeight: "bold" }}
            
            >関連のあるタイトル</div>
            <div className = "ArticlesAssociateProductsBox">
            {articleStore.articleProducts.map((item)=>{
              return(
                <ArticleProductList
                key={item.id}
                product={item}
                />
              )
            })}
            </div>    
          </div>
           
           </>
          : 
          ""
        :data?.articleProducts.length !=0?
          <>
            <div className = "ArticlesAssociateProducts">
            <div className="ArticlesAssociateProductsTitle margin_bottom_20"
            style={{ fontWeight: "bold" }}
            
            >関連のあるタイトル</div>
            <div className = "ArticlesAssociateProductsBox">
            {data?.articleProducts.map((item)=>{
              return(
                <ArticleProductList
                key={item.id}
                product={item}
                />
              )
            })}
            </div>    
          </div>
          </>
          :""
      }
        { article.length>0?
          <div className = "ArticlesAssociateGenres ArticlesAssociateProducts">
            <div className="ArticlesAssociateProductsTitle margin_bottom_20"
            style={{ fontWeight: "bold" }}
            >関連度の高い記事</div>
            <div className = "ArticlesContainerMain ArticlesAssociateArticlesBox"
            style={{padding:"0px"}}
            >
            {article.map((item)=>{
              return(
                <ArticlesLists2
                id={item.id}
                article={item}
                key={item.id}
                />
              )
            })}
            </div>
           </div>
           :""
           }
        </div>
        </div>
      </>
    // </Modal>
    // </>
  )
}