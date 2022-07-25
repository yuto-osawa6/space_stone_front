// // import { Quill } from "react-quill";
// // // import Delta from "quill-delta";

import { useEffect } from "react"

// import dynamic from "next/dynamic";

// // import dynamic from 'react/dynamic'
// // const Quill = dynamic(() => require("react-quill"), { ssr: false });
const Quill =
  typeof window === "object" ? require("quill") : () => false;

  // const Clipboard = Quill.import('modules/clipboard')
  // const Delta = Quill.import('delta')
// const Clipboard = Quill.import("modules/clipboard")

// // const Clipboard = dynamic(() =>  Quill.import("modules/clipboard"), { ssr: false });

// // const Clipboard = 
// //   typeof window === "object" ?import("modules/clipboard"):() => false;

// export class PlainClipboard extends Clipboard {
//   onPaste(e: any) {
//     e.preventDefault();
//     const range = this.quill.getSelection();
//     const text = e.clipboardData.getData("text/plain");

//     const itemsToPaste = text.split("\r\n").filter((item: string) => item);
//     console.log(itemsToPaste);
//     console.log("TEXT", JSON.stringify(text));
//     const Delta = Quill.import('delta')
//     const delta = new Delta()
//       .retain(range.index)
//       .delete(range.length)
//       .insert(text);
//     const index = text.length + range.index;
//     const length = 0;
//     this.quill.updateContents(delta, "silent");
//     this.quill.setSelection(index, length, "silent");
//   }
// }

export const DefaultPaste = function DefaultPaste(){
  useEffect(()=>{
    const Clipboard = Quill.import('modules/clipboard')
    const Delta = Quill.import('delta')
    class PlainClipboard extends Clipboard {
      onPaste (e:any) {
        if (e.defaultPrevented || !this.quill.isEnabled()) return
        let range = this.quill.getSelection()
        const text = e.clipboardData.getData('text')
        let delta = new Delta().retain(range.index)
        let scrollTop = this.quill.scrollingContainer.scrollTop
        this.container.focus()
        this.quill.selection.update(Quill.sources.SILENT)
        setTimeout(() => {
          // ここだけ変更箇所 本来はconvert()
          const pastedDelta = new Delta().insert(text)
          delta = delta.concat(pastedDelta).delete(range.length)
          this.quill.updateContents(delta, Quill.sources.USER)
          // range.length contributes to delta.length()
          this.quill.setSelection(delta.length() - range.length, Quill.sources.SILENT)
          this.quill.scrollingContainer.scrollTop = scrollTop
          this.quill.focus()
        }, 1)
      }
    }
    Quill.register('modules/clipboard', PlainClipboard, true)
    // setQuillLoaded(true)
  },[])
}