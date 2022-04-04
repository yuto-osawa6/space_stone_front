import MainSearch from "components/search/MainSearch"
import { ShareMain } from "components/share/main/ShareMain"
import { ProductShow } from "components/title/productShow"
import { productShow } from "interfaces/product"
import { GetServerSideProps } from "next"


// export const getServerSideProps: GetServerSideProps = async(context) => {
//   const { pid } = context.query
//   const params = {
//     active:"1",
//     last:"2"
//   }
//   const query_params = new URLSearchParams(params); 
//   const [productShowRes] = await Promise.all([
//     fetch(`${process.env.API_PATH_V1}/products/${pid}`), 
//     // fetch(`${process.env.API_PATH_V1}/mainblocks/mains/pickup?`+ query_params),
//     // fetch(`${process.env.API_PATH_V1}/mainblocks/mains/update_tier_list?`+ new URLSearchParams(tierParams))
//     // fetch(`${process.env.ApiPathV1}/mainblocks/mains/update_tier_list?`+)
//   ]);
//   const [data] = await Promise.all([
//     productShowRes.json()
//   ]);
//   return { 
//     props: { 
//       data
//     } 
//   };
// }

// type Props = {
//   data:productShow
// }

const TitleIndex: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  console.log(Props)
  // const fallback= Props.fallback
  return(
    <>
      <ProductShow
      data = {Props.data}
      >
      </ProductShow>
    </>
  )
}

export default TitleIndex

TitleIndex.getLayout = (page) => {
  return (
    <ShareMain
      locationNumber={1}
    >
      {/* <div className = "mainContents share_middle_container01"> */}
        {page}
      {/* </div> */}
    </ShareMain>
  )
}