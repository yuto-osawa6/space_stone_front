import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'
import { Header } from '@/components/applications/header/Header';
import { Ota } from '@/components/ota/Ota';
// import { LeftsArticles } from 'components/applications/left/leftMenus/LeftArticles'

describe("Sampleコンポーネント", () => {
  // ダミーのpropsを定義
  // let dummyProps: ;
  // beforeEach(() => {
  //   dummyProps = {
  //     userId: 1,
  //     id: 1,
  //     title: 'dummy title 1',
  //     body: 'dummy body 1',
  //   };
  // });
  test("should first", () => {
    render(<Ota></Ota>)
    // // render(<Header
    // //   locationNumber={1}
    // //   />)
    // render(
    //   // <LeftsArticles></LeftsArticles>
    // )
    // const { getByText } = render(<Sample />);
    // expect(getByText("Nextjs+Jestのサンプルサプリ")).toBeTruthy();
    expect(1+1).toBe(2);
  });
});