import MainSearch from "components/search/MainSearch"
import { ShareMain } from "components/share/main/ShareMain"

 const SearchIndex: React.FC& { getLayout: (page: any) => JSX.Element }  = () => {
  // const fallback= Props.fallback
  return(
    <>
      <MainSearch/>
    </>
  )
}

export default SearchIndex

// Home.getLayout = function getLayout(page) {
//   return (
//     <ShareMain>
//       {/* <NestedLayout>{page}</NestedLayout> */}
//       {page}
//     </ShareMain>
//   )
// }

SearchIndex.getLayout = (page) => {
  return (
    <ShareMain
      locationNumber={0}
    >
      <div className = "mainContents share_middle_container01">
        {page}
      </div>
    </ShareMain>
  )
}