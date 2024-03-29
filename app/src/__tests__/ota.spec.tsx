import Home from '../pages/index'
import '@testing-library/jest-dom'
import { Header } from '@/components/applications/header/Header';
import axios from 'axios';
import { products_reds2 } from '@/lib/api/products_red';
import React from 'react'
import {rest, setupWorker} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import { handlers } from '@/mocks/handlers';
import { server } from '@/mocks/server';
import { mockProductReds } from '@/mocks/api/product_red';

import { getPage } from 'next-page-tester';
import { initTestHelpers } from 'next-page-tester'; 
import renderer from 'react-test-renderer';
import "whatwg-fetch"


// import { Otare2 } from "@/pages/ota/la/index"
// import MockAdapter from 'axios-mock-adapter';

// const server = setupWorker(
//   rest.get('http://localhost:3001/api/v1/products/red', (req, res, ctx) => {
//     // return res(ctx.json({message:"aa"}))
//     return res(ctx.status(500))
//   }),
// )
const ReactTestRenderer = require('react-test-renderer');

describe("Sampleコンポーネント", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('false is falsy', () => {
    expect(false).toBe(false);
  });

  // test('renders App component', async() => {
  //   server.use(
  //     rest.get('http://localhost:3001/api/v1/products/red', (req, res, ctx) => {
  //       // このケースではステータスコード500を返すようにした
  //       return res(ctx.status(200),ctx.json({message:"aiueo"}));
  //     })
  //   );

  //   render(<Ota2/>);

  //   expect(false).toBe(false);
  //   expect(screen.getByText('Welcome to Next.js!')).toBeInTheDocument();
  //   expect(screen.queryByText('Searches for JavaScript')).not.toBeInTheDocument()

  //   screen.debug();

  //   // expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();
  //   // await waitFor(() => screen.getByText('Welcome to Next.js!'))
  //   await waitFor(() => screen.findByText(/Signed in as/))

  //   screen.debug();
  // });
});



// describe('App', () => {
//   beforeAll(() => server.listen());
//   afterEach(() => server.resetHandlers());
//   afterAll(() => server.close());
//   test('false is falsy', async() => {
//     // message="aaaaaaa"
//     const message = {message:"aaaaaaa"}
//       render(<Home2
//     // data={ message}
//       />);
//     //     expect(false).toBe(false);
//     screen.debug();

//     //     // expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();
//     //     // await waitFor(() => screen.getByText('Welcome to Next.js!'))
//         await waitFor(() => screen.findByText(/Signed in as/))
    
//         screen.debug()
//       });
     

// });

// describe('App', () => {
//   beforeAll(() => server.listen())
//   afterEach(() => {
//     server.resetHandlers()
//     cleanup()
//   })
//   afterAll(() => server.close())

//   test('false is falsy', async() => {
//     const { render } = await getPage({
//       route: "/ota/la",
//     });
//     screen.debug();
//     render();
//     await waitFor(() => screen.findByText(/Signed in as/))
//     screen.debug()
//   });
// });

// describe('App', () => {
//   beforeAll(() => server.listen())
//   afterEach(() => {
//     server.resetHandlers()
//     cleanup()
//   })
//   afterAll(() => server.close())

//   test('false is falsy', async() => {
//     const message = {message:"aaaaaaa"}
//     const { container } = render(<Ota2 />)
//     screen.debug();
//     await waitFor(() => screen.findByText(/Signed in as/))
//     expect(container).toMatchSnapshot()
//     screen.debug();
//   });
// });

// describe('App', () => {
//   beforeAll(() => server.listen())
//   afterEach(() => {
//     server.resetHandlers()
//     cleanup()
//   })
//   afterAll(() => server.close())

//   test('false is falsy', async() => {
//     const message = {message:"aaaaaaa"}
//     const { container } = render(<Ota2 />)
//     fireEvent.click(screen.getByRole(/button/))
//     screen.debug();
//     await waitFor(() => screen.findByText(/aaaaaaaaaaaiu/))
//     // expect(container).toMatchSnapshot()
//     screen.debug();
//   });
// });