import { Header } from "@/components/applications/header/Header";
import { server } from "@/mocks/server";
import store from "@/store";
import {render, fireEvent, waitFor, screen, cleanup} from '@testing-library/react'
import { Provider } from "react-redux";
import renderer from 'react-test-renderer';
import { getPage } from "next-page-tester";
import "whatwg-fetch"
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

jest.mock('next/config', () => () => ({ publicRuntimeConfig: { } }));

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
});