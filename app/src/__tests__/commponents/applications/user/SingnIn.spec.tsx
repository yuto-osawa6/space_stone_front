import { Header } from "@/components/applications/header/Header";
import { server } from "@/mocks/server";
import store from "@/store";
import {render, fireEvent, waitFor, screen, cleanup} from '@testing-library/react'
import { Provider } from "react-redux";
import renderer from 'react-test-renderer';
import { getPage } from "next-page-tester";
import { Ota2 } from '@/components/ota/Ota';
import { UserCertification } from '@/components/applications/user/UserCertification' 
import { getCurrentUserMock } from "@/mocks/api/user/signin";
import Cookies from "js-cookie";
import { rest } from "msw";


describe('Header', () => {
  beforeAll(() => server.listen())

  beforeEach(() => {
    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: '_access_token=token; _client=client; _uid=uid;',
    });
});
  afterEach(() => {
    server.resetHandlers()
    cleanup()
  })
  afterAll(() => server.close())
  // check responseが起動しないため、
  // test('google認証テスト', async() => {
  //   // const { container } = 
  //   render(<Provider store={store}>
  //    <UserCertification/>
  //   </Provider>)
  //   fireEvent.click(screen.getByText(/SignIn/i))
  //   screen.debug();
  //   fireEvent.click(screen.getByText(/Googleでログイン/i))
  //   // await screen.findByText('Clicked once')
  //   // await screen.findByRole("button");
  //   screen.debug();
  //   await waitFor(() => screen.findByText(/UserMenu/))
  //   screen.debug();
  //   // await waitFor(() => screen.findByText(/Signed in as/))
  //   // expect(container).toMatchSnapshot()
  // });
  test('サインインテスト(cookie)', async() => {
    render(<Provider store={store}>
     <UserCertification/>
    </Provider>)
    await waitFor(() => screen.findByText(/UserMenu/))
    // screen.debug()
  });
  test('サインアウトテスト', async() => {
    render(<Provider store={store}>
     <UserCertification/>
    </Provider>)
    fireEvent.click(screen.getByText(/UserMenu/i))
    fireEvent.click(screen.getByText(/ログアウト/i))
    await waitFor(() => screen.findByText(/SignIn/))
    screen.debug()
  });
});