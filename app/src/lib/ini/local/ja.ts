import { ErrorMessage } from "../message";
import { ArticleMessageJa } from "./ja/ArticleMessageJa";
import { AdminAriticleMessageJa, MessageJa, SettingUserModalMessageJa } from "./ja/ja-error";
import { LeftMessageJa } from "./ja/LeftMessageJa";
import { UserMessageJa } from "./ja/UserMessageJa";

export default {
  domain:"MeruPlanet",
  Logo:{
    G:"Meru",
    F:"Planet",
    SUBTITLE:"めるぷらねっと"
  },
  Headers:{
    TOP: "Home",
    SEARCH: "Search",
    ARTICLE: "Article",
    REVIEWS: "Review",
    THREAD: "Thread",
    USERMENU: "UserMenu"
  },
  SubHeader:{
    TOP: "ホーム",
    SEARCH: "検索",
    ARTICLE: "記事",
    REVIEWS: "レビュー",
    THREAD: "スレッド",
    SINGIN: "ログイン",
    USERMENU: "ユーザーメニュー"
  },
  UserInfomation:{
    SIGNIN:"Log in",
    MYPAGE:"マイページ",
    SETTING:"設定",
    LOGOUT:"ログアウト",
    ADMIN:"アドミン"
  },
  SubMenu:{
    QUESTIONNAIRE: "先週のアンケート",
    THISSEASON: "今シーズンの作品",
    LASTSEASON: "昨シーズンの作品",
    NEXTSEASON: "来シーズンの作品",
    MOVIE: "映画情報（今シーズン）",
    NEWS: "おしらせ",
    TOP10: "Top10",
    TOP100: "Top100",
    TIER: "過去のTier情報",
    LASTQUESTIONNAIRE: "過去のアンケート結果"
  },
  Admin:{
    Article:{
      TITLE_VALIDATION:"タイトルを入力してください。"
    }
  },
  Message:MessageJa,
  ErrorMessage:ErrorMessage,
  Component:{
    AdminsArticle:AdminAriticleMessageJa,
    SettingUserModal:SettingUserModalMessageJa,


    Lefts:LeftMessageJa,
    USER:UserMessageJa,
    Article:ArticleMessageJa
  }
}