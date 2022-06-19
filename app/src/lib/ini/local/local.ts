import { useRouter } from 'next/router'
import en from './en';
import ja from './ja';


export const useLocale = () => {
  const { locale } = useRouter();
  // const t = locale === "en"?en:ja
  const t = ja
  // let t = undefined
  // switch (locale) {
  //   case "ja":
  //     t = ja
  //     break;
  //   case "en":
  //     t = en
  //     break;
  //   default:
  //     t = {};
  // }
  return { locale, t };
}