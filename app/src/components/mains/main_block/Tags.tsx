import { tags } from "@/interfaces/main"
import { TagsGrid } from "./tags/TagsGrid"
import { TagsTop100 } from "./tags/TagsTop100"
// import { TagsGrid } from "./TagsGrid"
// import { TagsTop100 } from "./TagsTop100"

type Props = {
tags:tags[]
tagsTop100:tags[]
}
export const Tags:React.FC<Props> = function TagsFunc(Props){
  console.log(Props)

  return(
    <>
      <div className = "TagsContainer">
        <div className = "TagsContainerRow ShareMiddleContainerTitleRow">
          <div className = "TagsContainerTitle share_middle_container_title">
            年・シーズン
          </div>     
   
          {/* <div className = "TagsContainerRowAction share_middle_container_right_text">
            もっと見る
          </div> */}
        </div>     
        <div className = "TagsContainerGrid">
          {Props.tags.map((item,index)=>{
            return(
               <TagsGrid
                tag = {item}
                key = {index}
              />
              )
            })}
          </div>
        {Props.tagsTop100.length!=0&&(
          <>
            <div className = "TagsContainerRow ShareMiddleContainerTitleRow">
              <div className = "TagsContainerTitle share_middle_container_title">
                期別TOP100
              </div>     
              {/* <div className = "TagsContainerRowAction share_middle_container_right_text">
                もっと見る
              </div> */}
            </div>
            <div className = "TagsContainerGrid">
              {Props.tagsTop100.map((item)=>{
                return(
                  <TagsTop100
                    tag = {item}
                    key={item.tagId}
                  />
            
                  )
                })}
                
            </div> 
          </>
        )}
      </div>  
    </>
  )
}