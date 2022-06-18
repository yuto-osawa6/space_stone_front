import React, { memo, useCallback, useEffect } from "react"
import ReactDOMServer from 'react-dom/server';
import {MdWaves} from "react-icons/md"

const Quill =
  typeof window === "object" ? require("quill") : () => false;

  // const a = useCallback(()=>{

  // },[])

  // type Props = {
  //   number?:undefined
  // }
export const DefaultPasteForTitle = function DefaultPasteForTitleFunc(){
    const icons = Quill.import('ui/icons'); 
    const Inline = Quill.import('blots/inline');
      icons.spanblock = "Ss"
      icons.netflix = "N"; 
      icons.boxcontents = "BOX"; 
      icons.UnderlineWavy = "W1";
      icons.UnderlineWavy2 = "W2";
      icons.UnderlineWavy3 = "W3";
      
      class UnderlineWavy extends Inline { 
        static create() {
          return super.create();
        }
        static formats() {
          return true;
        }
      }
      UnderlineWavy.blotName = 'UnderlineWavy';
      UnderlineWavy.tagName = 'u';
      UnderlineWavy.className = 'UnderlineWavy';
      class UnderlineWavy2 extends Inline { 
        static create() {
          return super.create();
        }
        static formats() {
          return true;
        }
      }
      UnderlineWavy2.blotName = 'UnderlineWavy2';
      UnderlineWavy2.tagName = 'u';
      UnderlineWavy2.className = 'UnderlineWavy2';
      class UnderlineWavy3 extends Inline { 
        static create() {
          return super.create();
        }
        static formats() {
          return true;
        }
      }
      UnderlineWavy3.blotName = 'UnderlineWavy3';
      UnderlineWavy3.tagName = 'u';
      UnderlineWavy3.className = 'UnderlineWavy3';
      Quill.register(UnderlineWavy);
      Quill.register(UnderlineWavy2);
      Quill.register(UnderlineWavy3);
}