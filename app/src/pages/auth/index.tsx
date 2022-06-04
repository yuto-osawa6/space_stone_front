import { ShareMain } from "@/components/share/main/ShareMain"
import { GetServerSideProps, GetStaticProps } from "next"
import nookies from 'nookies'


export const getServerSideProps: GetServerSideProps = async(ctx) => {
  const cookies = nookies.get(ctx)
  console.log(ctx)
  // console.log(cookies)
  nookies.set(ctx, '_client', ctx.query.client_id as string, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  })
  nookies.set(ctx, '_access_token', ctx.query.auth_token as string, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  })
  nookies.set(ctx, '_uid', ctx.query.uid as string, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  })


  return { 
    redirect: {
      permanent: false, // 永続的なリダイレクトかどうか
      destination: ctx.query.aa as string, // リダイレクト先
    },
  props: { 
          // data
        } 
  };

}

type Props = {
}

const AuthCallback: React.FC<Props>& { getLayout: (page: any) => JSX.Element } = (Props) => {
  return(
    <>

    </>
  )
}
export default AuthCallback

AuthCallback.getLayout = function getLayout(page) {
  return (
    <ShareMain>
      {page}
    </ShareMain>
  )
}