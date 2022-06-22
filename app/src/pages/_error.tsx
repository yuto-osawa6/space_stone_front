import React from 'react';
import { NextPage, NextPageContext } from 'next';
import { ShareMain } from '@/components/share/main/ShareMain';
interface Props {
    statusCode: number;
}
const Error: NextPage<Props>& { getLayout: (page: any) => JSX.Element } = ({ statusCode }) => {
  return <div>{statusCode}エラーが発生しましたy</div>;
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
