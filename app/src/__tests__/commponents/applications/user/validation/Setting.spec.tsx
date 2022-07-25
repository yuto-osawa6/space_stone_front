import { server } from "@/mocks/server";
import store from "@/store";
import {render, fireEvent, waitFor, screen, cleanup, getByTestId} from '@testing-library/react'
import { Provider } from "react-redux";
import { UserCertification } from '@/components/applications/user/UserCertification' 
import { SettingUserModal } from "@/components/applications/user/setting/SettingUserModal";
import { RenderHook } from "@fullcalendar/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import '@testing-library/jest-dom'
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

describe('Setting', () => {
  beforeAll(() => server.listen())
  afterEach(() => {
    cleanup()
    server.resetHandlers()
  })
  afterAll(() => server.close())
  window.alert = jest.fn();
  window.confirm = jest.fn();


  // test('validation test', async() => {
  //    const {container}= render(<Provider store={store}>
  //    <SettingUserModal
  //     settngModalOpen={true}
  //     setSettingModalOpen={() => {}}
  //    />
  //   </Provider>)
  //   const field = screen.getByRole('input').querySelector('input')
  //   const input = screen.getByRole('input').querySelector('input') as HTMLElement ;
  //   // validation
  //   fireEvent.click(screen.getByText('保存'))
  //   screen.debug()
  //   await waitFor(() => screen.findByText('3文字以上で入力してください。'))
  //   screen.debug()
  //   expect(screen.getByText('3文字以上で入力してください。')).toBeInTheDocument();
  //   fireEvent.change(input, {target: {value: '1234567891011121314151617181920'}})
  //   fireEvent.click(screen.getByText('保存'))
  //   await waitFor(() => screen.findByText('20文字以内で入力してください。'))
  //   expect(screen.getByText('20文字以内で入力してください。')).toBeInTheDocument();
  //   fireEvent.change(input, {target: {value: 'test'}})
  //   expect(field?.value).toEqual("test")
  //   fireEvent.click(screen.getByText('保存'))
  //   screen.debug()
  // });

  test('user delete test', async() => {
  //   const {container}= render(<Provider store={store}>
  //   <SettingUserModal
  //    settngModalOpen={true}
  //    setSettingModalOpen={() => {}}
  //   />
  //  </Provider>)
  //   // screen.debug()
  //   fireEvent.click(screen.getByText('Delete'))
  //   // screen.debug()
  //   window.confirm = jest.fn(() => true)
  //   screen.debug()
 });
});