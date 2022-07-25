import { useLocale } from "@/lib/ini/local/local";
import { useEffect, useState } from "react";


export const useStyleJa = (name:string) => {
  const [nameStyle,setNameStyle] = useState<string>("")
  useEffect(()=>{
    if(name == "TV show"){
      setNameStyle("アニメ")
    }else if(name == "Movie"){
      setNameStyle("映画")
    }else{
      setNameStyle(name)
    }
  },[])

  return { nameStyle };
}