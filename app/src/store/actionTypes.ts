// *
// * action types
// * 一意となるキーを指定するので、Actionが増えるたびにここにキーを書く
// *

export const ActionTypes = {
  increment: "INCREMENT", // "INCREMENT"型
  decrement: "DECREMENT", // "DECREMENT"型
  countReset: "COUNT_RESET", // "COUNT_RESET"型

  searchProductsTexts: "SEARCH_PRODUCTS_TEXT",
  // searchProductsStyles: "SEARCH_PRODUCTS_STYLE",
  // pussingGenresData:"PUSSING_GENRES_DATA",
  searchClearTitle:"SEARCH_CLEAR_TITLE",

  setGenres: "SET_GENRES",
  setFFF:"Set_FFF",

  setGenre: "SET_GENRES2",
  setCCC:"Set_FFF2",

  todoGenres:"TODO_GENRES",
  deletetodoGenres:"DELETE_TODO_GENRES",
  deletetodoGenresOne:"DELETE_TODO_GENRES_ONE",
  deletetodoGenresAll:"DELETE_TODO_GENRES_ALL",
  deletetodoGenresExceptOne:"DELETE_TODO_GENRES_Except_One",




  setStyles: "SETSTYLES",

  todoStyles:"TODO_STYLES",
  deletetodoStyles:"DELETE_TODO_STYLES",
  deletetodoStylesAll:"DELETE_TODO_STYLES_ALL",

  sort : "SORT",

  grid :"GRID",

  user : "User",
  updateNickName : "UPDATE_NICK_NAME",
  updateBackgriundImage : "UPDATE_BACKGROUND_IMAGE",
  updateOverview : "UPDATE_OVER_VIEW",


  product:"SETPRODUCT",
  productshow: "SETPRODUCT2",

  Casts:"CASTS",
  DeleteCasts:"DELETE_CASTS",
  DeleteCastsOne:"DELETE_CASTS_ONE",
  DeleteCastsAll:"DELETE_CASTS_ALL",
  DeleteCastsExceptOne:"DELETE_CASTS_EXCEPT_ONE",

  DeliveryEndGteq:"DELIVERY_END_GTEQ",
  DeliveryStartGteq:"DELIVERY_START_GTEQ",
  PickupSearch:"PICKUP_SEARCH",
  PrivateSearch:"PRIVATE_SEARCH",
  NewSearch:"NEW_SEARCH",

  YearSearch:"YEAR_SEARCH",
  YearSearchDestroy:"YEAR_SEARCH_DESTROY",
  DuringSearch:"DURING_SEARCH",
  DuringSearchDestroy:"DURING_SEARCH_DESTROY",
  SeasonSearch:"SEASON_SEARCH",
  SeasonSearchDestroy:"SEASON_SEARCH_DESTROY",
  AllDeleteSubClass:"ALL_DELETE_SUB_CLASS",

  selectedArticle:"SELECTED_ARTICLE",
  deleteArticle:"DELETE_ARTICLE",

  // lefts navigate
  NavigateLeftArticle:"NAVIGATE_LEFT_ARTICLE",
  DeleteLeftArticle:"DELETE_LEFT_ARTICLE",

  NavigateLeftReviewData:"NAVIGATE_LEFT_REVIEW",
  DeleteLeftReview:"DELETE_LEFT_REVIEW",

  NavigateLeftThreadData:"NAVIGATE_LEFT_THREAD",
  DeleteLeftThread:"DELETE_LEFT_THREAD",

  // Manage subsearch
  OpenSubSearch:"OpenSubSearch",

  // sortPeriod
  setSortPeriod:"SET_SORT_PERIOD",
  resetSortPeriod:"RESET_SORT_PERIOD",

  // studio

  Studios:"STUDIOS",
  DeleteStudios:"DELETE_STUDIOS",
  DeleteStudiosOne:"DELETE_STUDIOS_ONE",
  DeleteStudiosAll:"DELETE_STUDIOS_ALL",
  DeleteStudiosExceptOne:"DELETE_STUDIOS_EXCEPT_ONE",


  // kisetsu
  todoKisetsu:"TODO_KISETSU",
  // deletetodo:"DELETE_TODO_STYLES",
  deletetodoKisetsuAll:"DELETE_TODO_KISETSU_ALL",
  

  // emotionSort
  emotionSort:"EMOTION_SORT",
  deleteEmotionSort:"DELETE_EMOTION_SORT",

  // reviewUpdate
  updateReviewState:"UPDATE_REVIEW_STATE",
  updateThreadState:"UPDATE_THREAD_STATE",

  // message
  pusshingMessage:"PUSSHING_MESSAGE",
  deleteingMessage:"DELETING_MESSAGE",
  selectDeleteMessage:"SELECT_DELETE_MESSAGE"

} as const;