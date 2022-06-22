import { Header } from "@/components/applications/header/Header";
import { server } from "@/mocks/server";
import store from "@/store";
import {render, fireEvent, waitFor, screen, cleanup} from '@testing-library/react'
import { Provider } from "react-redux";
import renderer from 'react-test-renderer';
import { getPage } from "next-page-tester";
import "whatwg-fetch"

// import * as nextRouter from 'next/router';

// nextRouter.useRouter = jest.fn();
// nextRouter.useRouter.mockImplementation(() => ({ route: '/' }));
jest.mock("next/router", () => ({
  useRouter() {
      return {
          route: "/",
          pathname: "",
          query: "",
          asPath: "",
          locale:"ja"
      };
  },
}));

// import "whatwg-fetch"
// import { getPage } from 'next-page-tester';
// import { initTestHelpers } from 'next-page-tester'; 
// initTestHelpers();
describe('Header', () => {
  beforeAll(() => server.listen())
  afterEach(() => {
    server.resetHandlers()
    cleanup()
  })
  afterAll(() => server.close())

  test('snapshot', async() => {
    const { container } = render(<Provider store={store}>
      <Header
      locationNumber={1}
      />
    </Provider>)
    screen.debug();
    // await waitFor(() => screen.findByText(/Signed in as/))
    expect(container).toMatchSnapshot()

   
  });
  // test('snapshot', async() => {
  //   const { container } = render(<Ota2/>)
  //   // await waitFor(() => screen.findByText(/Signed in as/))
  //   expect(container).toMatchSnapshot()
  // });
});