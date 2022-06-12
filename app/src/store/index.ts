import { combineReducers, createStore } from 'redux';

import { countReducer } from './counter/reducer';
import { searchProdcutsReducer } from './search/reducer';
// import { SettingGenresDatetypes } from './genres/types';
import { settiongGenresReducer } from './genres/reducer';
import { settiongtodoGenresReducer } from './todogenres/reducer';
import { settiongStylesReducer } from './styles/reducer';
import { settiongtodoStylesReducer } from './todostyles/reducer';
// import { sortEmotionReducer, sortReducer } from './sort/reducer';
import { GridReducer } from './grid/reducer';
import { userReducer } from './user/reducer';
import { settiongProductReducer } from './product/reducer';
import { SettingCastsReducer } from './casts/reducer';
import { SettiongSubSearchesReducer } from './subsearches/reducer';
import { YearSearchReducer } from './year/reducer';
import { SeasonSearchReducer } from './season/reducer';
import { TimeSearchReducer } from './during/reducer';
import { SettingArticleReducer } from './article/reducer';
import { SettingLeftArticleReducer } from './lefts/article/reducer';
import { SettingLeftReviewReducer } from './lefts/review/reducer';
import { SettingLeftThreadReducer } from './lefts/thread/reducer';
import { SettiongOpenCloseManegementSubSearchReducer } from './subsearchopenmanagement/reducer';
import { SortPeriodReducer } from './sortperiod/reducer';
import { SettingStudiosReducer } from './studios/reducer';
import {settiongtodoKisetsuReducer} from './kisetsu/reducer'
import { sortEmotionReducer } from './emotion/reducer';
import { sortReducer } from './sort/reducer';
import { updateReviewReducer } from './reviewUpdate/reducer';
import { updateThreadReducer } from './updateThread/reducer';
import { topMessageReducer } from './message/reducer';
import { subMenuReducer } from './submenu/reducer';
// import { settiongtodoGenresReducer } from './todogenres/reducer';
// import { settiongtododGenresReducer } from './todogenre/reducer';



// import { settiongGenresReducer2 } from './genre/reducer';


// *
// * store 本体
// *

// Reducerを増やすときは、ここに追加
const rootReducer = combineReducers({
  counter: countReducer,
  search : searchProdcutsReducer,
  genres : settiongGenresReducer,
  styles : settiongStylesReducer,
  todogenres:settiongtodoGenresReducer,
  todostyles:settiongtodoStylesReducer,
  sort : sortReducer,
  grid : GridReducer,
  user :userReducer,

  product :settiongProductReducer,

  cast : SettingCastsReducer,
  subsearch : SettiongSubSearchesReducer,
  // todogenre:settiongtododGenresReducer,
  yearsearch : YearSearchReducer,
  timesearch :  TimeSearchReducer,
  seasonsearch :SeasonSearchReducer,
  article : SettingArticleReducer,
  leftArticle : SettingLeftArticleReducer,
  leftReview:SettingLeftReviewReducer,
  leftThread:SettingLeftThreadReducer,
  OpenCloseSubSearch:SettiongOpenCloseManegementSubSearchReducer,
  SortPeriod:SortPeriodReducer,
  // genre : settiongGenresReducer2
  studios:SettingStudiosReducer,
  kisetsu:settiongtodoKisetsuReducer,
  sortEmotion:sortEmotionReducer,
  updateReview:updateReviewReducer,
  updateThread:updateThreadReducer,
  message:topMessageReducer,
  submenu:subMenuReducer

});

// states type
export type RootState = ReturnType<typeof rootReducer>; // ReturnType<typeof fn>は、fnの返り値の型

// store
const store = createStore(rootReducer);

export default store;