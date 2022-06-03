import { ShareMain } from "@/components/share/main/ShareMain"
import { GetServerSideProps, GetStaticProps } from "next"
import nookies from 'nookies'


// export const getServerSideProps: GetServerSideProps = async(ctx) => {
//   const cookies = nookies.get(ctx)
//   nookies.set(ctx, '_client', ctx.query.client_id as string, {
//     maxAge: 30 * 24 * 60 * 60,
//     path: '/',
//   })
//   nookies.set(ctx, '_access_token', ctx.query.auth_token as string, {
//     maxAge: 30 * 24 * 60 * 60,
//     path: '/',
//   })
//   nookies.set(ctx, '_uid', ctx.query.uid as string, {
//     maxAge: 30 * 24 * 60 * 60,
//     path: '/',
//   })


//   return { 
//     redirect: {
//       permanent: false, // 永続的なリダイレクトかどうか
//       destination: ctx.query.aa as string, // リダイレクト先
//     },
//   props: { 
//           // data
//         } 
//   };

// }

type Props = {
}

const ErrorPage403: React.FC<Props>& { getLayout: (page: any) => JSX.Element } = (Props) => {
  return(
    <>
      エラーが発生しました。もう一度やり直すか、お問合せください。
    </>
  )
}
export default ErrorPage403

ErrorPage403.getLayout = function getLayout(page) {
  return (
    <ShareMain>
      {page}
    </ShareMain>
  )
}