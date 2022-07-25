import { useEffect, DependencyList } from 'react'
// // type DependencyList = readonly unknown[]
// // import DependencyList

// export function useDebounceEffect(
//   fn: () => void,
//   waitTime: number,
//   deps?: DependencyList,
// ) {
//   useEffect(() => {
//     if(deps==undefined)return
//     const t = setTimeout(() => {
//       fn.apply(undefined, deps)
//     }, waitTime)

//     return () => {
//       clearTimeout(t)
//     }
//   }, deps)
// }
