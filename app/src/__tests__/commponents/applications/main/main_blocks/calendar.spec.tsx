import '@testing-library/jest-dom'
import React from 'react'
import {render, fireEvent, waitFor, screen, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import { server } from '@/mocks/server';
import "whatwg-fetch"
import { product } from '@/interfaces/product';
import { testProductData } from '@/mocks/data/d_product'
import { Provider } from 'react-redux';
import store from '@/store';
import { CalendarProduct } from '@/components/mains/main_block/Calendar';
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
      deliveryStart: d_products,
      episordStart: d_products2,
      scores: {1:"70"}
    }
      render(
        <Provider store={store}>
        <CalendarProduct
        calendarData={data}
          // data={data}
        >
        </CalendarProduct>
        </Provider>
      );
    screen.debug();
  });

  test('next season no data', async() => {
    const d_products:product[] = []
    const d_products2:product[] = []

    const data:any = {
      deliveryStart: [],
      episordStart: [],
      scores: {1:"70"}
    }
      render(
        <Provider store={store}>
        <CalendarProduct
         calendarData={data}
        >
        </CalendarProduct>
        </Provider>
      );
    screen.debug();
  });
});