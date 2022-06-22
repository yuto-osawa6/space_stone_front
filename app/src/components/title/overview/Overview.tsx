import { Productshowcontext } from "@/contexttype/contexttype"
import { DefaultPasteForTitle } from "@/lib/ini/quill/QuillEffectForTitle";
import { useContext, useEffect,useMemo } from "react"
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

export const Overview:React.FC = function OverviewFunc(){
  const a = useMemo(()=>{
    DefaultPasteForTitle()
  },[])
  a
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
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      ["blockquote"],
      ["code-block"],
      [{ list:  "ordered" }, { list:  "bullet" }],
      [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
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