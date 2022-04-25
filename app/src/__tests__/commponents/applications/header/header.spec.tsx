import { Header } from "@/components/applications/header/Header";
import { server } from "@/mocks/server";
import store from "@/store";
import {render, fireEvent, waitFor, screen, cleanup} from '@testing-library/react'
import { Provider } from "react-redux";
import renderer from 'react-test-renderer';
import { getPage } from "next-page-tester";
import "whatwg-fetch"
// import { getPage } from 'next-page-tester';
// import { initTestHelpers } from 'next-page-tester'; 
// initTestHelpers();
describe('App', () => {
  beforeAll(() => server.listen())
  afterEach(() => {
    server.resetHandlers()
    cleanup()
  })
  afterAll(() => server.close())

  test('false is falsy', async() => {
    const message = {message:"aaaaaaa"}
      render(
        <Provider store={store}>
          <Header
          locationNumber={1}
          />
        </Provider>
      );
    // screen.debug();

    // expect(tree).toMatchSnapshot();

    // screen.debug()
  });
});