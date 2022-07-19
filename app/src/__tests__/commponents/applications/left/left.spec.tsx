import Lefts from "@/components/applications/left/Lefts";
import { execLeftfetcher } from "@/lib/api/left";
import { GetError } from "@/lib/error/error";
import { API } from "@/mocks/handlers";
import { server } from "@/mocks/server";
import store from "@/store";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { MockedRequest, ResponseResolver, rest, restContext } from "msw";
import { Provider } from "react-redux";
import { setupServer } from "msw/node";
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


describe('Header', () => {
  // const mockFn = jest.fn();
  // const server = setupServer(
  //   rest.get(`${API}/products/left`, (req, res, ctx) => {
  //     return res(ctx.status(200))
  //   }),
  // )
  
  // beforeAll(() => server.listen())
  // afterEach(() => {
  //   server.resetHandlers()
  //   // cleanup()
  // })
  // afterAll(() => server.close())
  // Establish API mocking before all tests.
  beforeAll(() => server.listen());
  // Reset any request handlers that we may add during the tests,
  // so they don't affect other tests.
  afterEach(() => server.resetHandlers());
  // Clean up after the tests are finished.
  afterAll(() => server.close());

  // test('LeftComponent テスト 200', async() => {
  //   server.use(
  //     rest.get(`${API}/products/left`, async (req, res, ctx) => {
  //       // mockFn();
  //       return res(ctx.status(200),ctx.json({genres:[{
  //         id:1,
  //         name:"genre_test_name2",
  //         count:1
  //       }],
  //     }));
  //     })
  //   );
  //   render(<Provider store={store}>
  //    <Lefts
  //    locationNumber={0}
  //    />
  //   </Provider>)
  //   // await waitFor(() => expect(mockFn).toHaveBeenCalledTimes(1));
  //   await waitFor(() => screen.findByText(/genre_test_name2/))
  //   // expect(screen.findByText(/genre_test_name2/))
  //   // screen.debug()
  // });
  
  test('LeftComponent テスト 500', async() => {
    server.use(
      rest.get(`${API}/products/left`, (req, res, ctx) => {
        // mockFn();
        return res(ctx.status(500),ctx.json({message:"error"}));
      })
    );
    render(<Provider store={store}>
     <Lefts
     locationNumber={0}
     />
    </Provider>)
    // await waitFor(() => screen.findByText(/error/))
    // await expect(getExamples()).rejects.not.toThrow(GetExampleError);
      // const {data,error} = execLeft()
      await waitFor(() => expect(execLeftfetcher()).rejects.toThrow(Error))
      // await waitFor(() => screen.findByText(/genre_test_name/))
      screen.debug()
  });
  test('LeftComponent テスト 200', async() => {
    server.use(
      rest.get(`${API}/products/left`, async (req, res, ctx) => {
        // mockFn();
        return res(ctx.status(200),ctx.json({genres:[{
          id:1,
          name:"genre_test_name2",
          count:1
        }],
      }));
      })
    );
    render(<Provider store={store}>
     <Lefts
     locationNumber={0}
     />
    </Provider>)
    // await waitFor(() => expect(mockFn).toHaveBeenCalledTimes(1));
    await waitFor(() => screen.findByText(/genre_test_name2/))
    // expect(screen.findByText(/genre_test_name2/))
    // screen.debug()
  });
  // test('LeftComponent テスト 500', async() => {
  //   server.use(
  //     rest.get(`${API}/products/left`, (req, res, ctx) => {
  //       // mockFn();
  //       return res(ctx.status(500));
  //     })
  //   );
  //   render(<Provider store={store}>
  //    <Lefts
  //    locationNumber={0}
  //    />
  //   </Provider>)
  //   await waitFor(() => screen.findByText(/error/))
  //   // await expect(getExamples()).rejects.not.toThrow(GetExampleError);
  //     // const {data,error} = execLeft()
  //     // await waitFor(() => expect(execLeftfetcher()).rejects.toThrow(Error))
  //     // await waitFor(() => screen.findByText(/genre_test_name/))
  //     screen.debug()
  // });
});

// describe('Header', () => {
//   // const mockFn = jest.fn();
//   beforeAll(() => server.listen())
//   afterEach(() => {
//     server.resetHandlers()
//     cleanup()
//   })
//   afterAll(() => server.close())
//   test('LeftComponent テスト 5001', async() => {
//     server.use(
//       rest.get(`${API}/products/left`, (req, res, ctx) => {
//         // mockFn();
//         return res(ctx.status(500),ctx.json({message:"error"}));
//       })
//     );
//     render(<Provider store={store}>
//      <Lefts
//      locationNumber={0}
//      />
//     </Provider>)
//     await waitFor(() => screen.findByText(/error/))
//     // await expect(getExamples()).rejects.not.toThrow(GetExampleError);
//       // const {data,error} = execLeft()
//       // await waitFor(() => expect(execLeftfetcher()).rejects.toThrow(Error))
//       // await waitFor(() => screen.findByText(/genre_test_name/))
//       screen.debug()
//   });

// });
