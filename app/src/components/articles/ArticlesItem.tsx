import { Modal } from "@mui/material"
import { Article } from "@/interfaces/article"
import { execAcsessArticleCountHandler, execArticleArticleAssosiationsHandler, execArticleShowHandler } from "@/lib/api/article"
import { useEffect, useMemo, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { ArticleProductList } from "./products/ArticleProductList"
import { IoMdClose } from "react-icons/io"
import { ArticlesLists2 } from "./ArticleLists2"
import { EditArticleLists } from "./edit/EditArticleLists"
import { useRouter } from "next/router"
import { useUser } from "@/lib/data/user/useUser"
import { useLocale } from "@/lib/ini/local/local"

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

  type Props = {
    data:{
      article:Article
    }
  }

export const ArticlesItem:React.FC<Props> = function  ArticlesItemFunc(Props){
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
  const router = useRouter()
  // store
  const articleStore = useSelector((state: RootState) => state.article)
  // params
  const {aid} = router.query
  const params_id = aid as string
  // state
  const [on,Seton] = useState<boolean>(false)
  const [article,setArtlce] = useState<Article[]>([])
  const [article2,setArticle2] = useState<Article[]>([])
  const [data,setData] = useState<Article>(Props.data.article)
  const setAssociatedProduct = async() => {
    if (params_id==undefined) return
    const res = await execArticleArticleAssosiationsHandler(params_id)
    if (res.status==200){
      setArtlce(res.data.articles)  
      setArticle2(res.data.articles2)
    }else{
    }
  }
  useEffect(()=>{
    setAssociatedProduct()
},[params_id])
  const options = {
    scroll:false
  }
  const [open,setOpen] = useState<boolean>(true)
  const handleClose = () => {
    setOpen(false)
    router.push("/articles",undefined,options)
  }
  // acsess countーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
  useEffect(()=>{
    acsessCountHandler()
  },[Props.data.article.id])

  const acsessCountHandler = async() => {
    // var article_id:number = data.id
    // if(article_id==undefined) return
    const currentToday =  new Date()
    currentToday.setHours(currentToday.getHours())
    const res =  await execAcsessArticleCountHandler(Props.data.article.id,currentToday) 
    if(res.status === 200){
    }else{
    }
  }
  // user
  const {userSwr} = useUser()
  const userStore = userSwr
  const ref = useRef<HTMLDivElement>(null!)
  useEffect(()=>{
    if(ref.current==null) return
    ref.current.scrollTo({
      top: 0,
      left: 0,
    })
    if(data.id == Props.data.article.id) return
    setData(Props.data.article)
  },[Props.data.article.id])
  const {t} = useLocale()
  return(
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <>     
        <div className = "ProductReviewShow ArticleModal"
        ref = {ref}
        >
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
          </div>  
          <div className = "ProductReviewShowMain">
            <div className = "ProductReviewShowMainQuill">
              {Props.data.article.hashtagArticles.map((i:any)=>{
                return(
                  <div className="" key={i.id}>{i.name}</div>
                )
              })}
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
                
                >{t.Component.Article.ArticleItem1}</div>
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
                  
                  >{t.Component.Article.ArticleItem1}</div>
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
                >{t.Component.Article.ArticleItem2}</div>
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
            { article2.length>0?
              <div className = "ArticlesAssociateGenres ArticlesAssociateProducts">
                <div className="ArticlesAssociateProductsTitle margin_bottom_20"
                style={{ fontWeight: "bold" }}
                >{t.Component.Article.ArticleItem3}</div>
                <div className = "ArticlesContainerMain ArticlesAssociateArticlesBox"
                style={{padding:"0px"}}
                >
                {article2.map((item)=>{
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
      </Modal>
    </>
  )
}