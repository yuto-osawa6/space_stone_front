import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'
import { Header } from 'components/applications/header/Header';
import { LeftsArticles } from 'components/applications/left/leftMenus/LeftArticles'

describe("Sampleコンポーネント", () => {
  test("should first", () => {
    // render(<Header
    //   locationNumber={1}
    //   />)
    render(
      <LeftsArticles></LeftsArticles>
    )
    // const { getByText } = render(<Sample />);
    // expect(getByText("Nextjs+Jestのサンプルサプリ")).toBeTruthy();
    expect(1).toBeTruthy();
  });
});