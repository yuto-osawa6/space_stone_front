import { Productshowcontext } from "@/contexttype/contexttype"
import { useContext, useEffect,useMemo } from "react"
// import ReactQuill, { Quill } from "react-quill"
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

export const Overview:React.FC = function OverviewFunc(){
  const props = useContext(Productshowcontext)

  const handleSetUp = () => {

  }
  useEffect(()=>{
    handleSetUp()
  },[])

  const modules =  useMemo(() => (
    {
    toolbar:{ 
      container:[
      // [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      // [{ script:  "sub" }, { script:  "super" }],
      ["blockquote"],
      ["code-block"],
      [{ list:  "ordered" }, { list:  "bullet" }],
      [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
      // ["link", "image", "video"],
      ['netflix'],
      ['boxcontents'],   
    ],
    handlers: {
    },
    clipboard: {
      matchVisual: false
      }
    },
  }
  ),[]);

  return(
    <>
      {props.product?.overview!=undefined&&(
        <>
          <div className = {`show_top_contens`}> 
          <div className = {`show_top_dummy p_contens_grid_color${props.switchnumber}`}>
          </div>
          <div className="Overview">
            <div className = "OverviewTitle"
            style={{fontSize: "1.2rem",
              marginBottom: "20px",
              position: "relative",
              fontWeight:"bold"
            }}
            >
              Overview
            </div>
            <ReactQuill
              className = "ovevierReactQuill"
              // ref={quillref2}
              modules={modules} 
              value={props.product?.overview} 
              theme="bubble"
              placeholder="preview"
              readOnly={true}
                
              />
         
          </div>
        
        
         </div>
         </>
      )}    
    </>
  )
}