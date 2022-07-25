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
import Home from '@/pages';
import { ThisSeasonAnimeInfomation } from '@/components/mains/main_block/ThisSeasonAnimeInfomation';
import { product } from '@/interfaces/product';
import { testProductData } from '@/mocks/data/d_product'
import { Provider } from 'react-redux';
import store from '@/store';

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
// horyu-1 window is not defined が解決できないため保留

// import { Otare2 } from "@/pages/ota/la/index"
// import MockAdapter from 'axios-mock-adapter';

// const server = setupWorker(
//   rest.get('http://localhost:3001/api/v1/products/red', (req, res, ctx) => {
//     // return res(ctx.json({message:"aa"}))
//     return res(ctx.status(500))
//   }),
// )
// const ReactTestRenderer = require('react-test-renderer');

describe("this season list", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('this season', async() => {
    const d_products:product[] = [testProductData]
      render(
        <Provider store={store}>
        <ThisSeasonAnimeInfomation
        products = {d_products}
        currentSeason = ""
        >
        </ThisSeasonAnimeInfomation>
        </Provider>
      );
    // screen.debug();
  });

  test('main page', async() => {
    const d_products2:product[] = []
      render(
        <Provider store={store}>
        <ThisSeasonAnimeInfomation
        products = {d_products2}
        currentSeason = ""
        >
        </ThisSeasonAnimeInfomation>
        </Provider>
      );
    // screen.debug();
  });
});