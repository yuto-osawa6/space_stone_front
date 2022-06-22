import '@testing-library/jest-dom'
import React from 'react'
import {render, fireEvent, waitFor, screen, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import { server } from '@/mocks/server';
import "whatwg-fetch"
import { ThisSeasonAnimeInfomation } from '@/components/mains/main_block/ThisSeasonAnimeInfomation';
import { product } from '@/interfaces/product';
import { testProductData } from '@/mocks/data/d_product'
import { Provider } from 'react-redux';
import store from '@/store';
import { NextSeasonAnimeInfomation } from '@/components/mains/main_block/NextSeasonAnimeInfomation';
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
describe("this season list", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('next season', async() => {
    const d_products:product[] = [testProductData]
    const d_products2:product[] = [testProductData]
    const data:any = {
        products:d_products,
        products2:d_products2,
        currentSeason:"test",
        currentSeason2:"test2",
        scores: {
          avgScore: {1:"70"},
          avgScore2: {1:"70"}
      }
    }
      render(
        <Provider store={store}>
        <NextSeasonAnimeInfomation
          data={data}
        >
        </NextSeasonAnimeInfomation>
        </Provider>
      );
    // screen.debug();
  });

  test('next season no data', async() => {
    const d_products:product[] = []
    const d_products2:product[] = []

    const data:any = {
      products:d_products,
      products2:d_products2,
      currentSeason:"",
      currentSeason2:"",
      scores: {
        avgScore: {},
        avgScore2: {}
    }
  }
      render(
        <Provider store={store}>
        <NextSeasonAnimeInfomation
          data={data}
        >
        </NextSeasonAnimeInfomation>
        </Provider>
      );
    // screen.debug();
  });
});