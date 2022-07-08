import React from 'react';
import { NextPage, NextPageContext } from 'next';
import { ShareMain } from '@/components/share/main/ShareMain';
interface Props {
    statusCode: number;
}
const Error: NextPage<Props>& { getLayout: (page: any) => JSX.Element } = ({ statusCode }) => {
  if(statusCode == 404){
    return  <div className = "errorNextPage">{statusCode}エラーが発生しました。ページが存在していないか、メンテナンス中の可能性があります。</div>;
  }
  return <div className = "errorNextPage">{statusCode}エラーが発生しました。再度やり直すかお問い合わせください。</div>;
};

Error.getInitialProps = async ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode ?? 500 : 404;
  return { statusCode };
};

Error.getLayout = (page) => {
  return (
    <ShareMain
      locationNumber={0}
    >
      {page}
    </ShareMain>
  )
}

export default Error;
