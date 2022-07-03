import { useEffect, useState } from "react"

export const useScroll = () => {
  const [scrollY, setScrollY] = useState(0)
  const [prevScrollY,setPrevScrollY] = useState(0)
  let set_position = 0;
  const handleScroll = () => {

    setScrollY(window.scrollY)
    if (set_position < document.documentElement.scrollTop) {
      // console.log(`down`);
    } else {
      // console.log(`up`);
    }
    // console.log(set_position,document.documentElement.scrollTop)
    // console.log(set_position < document.documentElement.scrollTop)

    setPrevScrollY(set_position)
    set_position = document.documentElement.scrollTop;
    
  }

  useEffect(()=> {
    window.addEventListener('scroll', handleScroll )
  }, [])
  return {scrollY,prevScrollY}
}