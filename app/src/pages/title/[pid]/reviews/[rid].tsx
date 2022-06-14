import { ShareMain } from "@/components/share/main/ShareMain"
import { ProductShow } from "@/components/title/productShow"
import { ProductReviews } from "@/components/title/review/form/ProductReviews"
import { ProductShowReviews } from "@/components/title/review/ProductReviews"
import { product } from "@/interfaces/product"
import { review, review_comments } from "@/interfaces/review"
import { ssr_url } from "@/lib/client/clientssr"
import { GetServerSideProps } from "next"
// import Error from "next/error"
import nookies from 'nookies'
import  Custom404  from "@/pages/4e04" 
import { CustomError } from "@/pages/CustomError"
import Error from "@/pages/_error"


export const getServerSideProps: GetServerSideProps = async(context) => {
  const cookies = nookies.get(context)
  const { pid,rid } = context.query
  try{
    // const query_params = new URLSearchParams(params); 
    const [res] = await Promise.all([
      fetch(`${ssr_url}/products/${pid as string}/reviews/${rid as string}?page=1`,{
        headers:{
          "access-token": `${cookies._access_token}`,
          "client": `${cookies._client}`,
          "uid": `${cookies._uid}`
        }
      }), 
    ]);
    
    const [data] = await Promise.all([
      res.json()
    ]);
    if(data.status ==200){
    return { 
      props: { 
        data
      } 
    };
  }else{
    // return {props: { statesCode:res.status}}
    return { notFound:true}
  }
  }catch{
    // return  {props: { statesCode:500}}
    return { notFound:true}
  }
}

// type Props = {
//   data:productShow
// }


type Props = {
  data:{
    product:product
    review:review
    reviewComments:review_comments[]
    status:number
  },
  statesCode:number,
  message:string
}

const ReviewShow: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  console.log(Props)
  // const fallback= Props.fallback
  // if (Props.statesCode){
  //   // ReviewShow.getLayout = false
  //   return(
  //     <>
  //       <Error statusCode={Props.statesCode}></Error>
  //     </>
  //   )
  // }
  return(
    <>
      <ProductReviews
        data={Props.data}
      />
    </>
  )
}

export default ReviewShow

ReviewShow.getLayout = (page) => {
  // console.log(p)
  // if(p.statesCode==400){
  //   <>

  //   </>
  // }
  return (
    <ShareMain
      locationNumber={1}
    >
      <ProductShow
      // data = {Props.data}
      >
        <ProductShowReviews>
          {page}
        </ProductShowReviews>
      </ProductShow>   
    </ShareMain>
  )
}