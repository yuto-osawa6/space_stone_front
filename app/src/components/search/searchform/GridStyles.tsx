import { execChangeGrid, execsetGrid } from "lib/api/main";
import { MouseEventHandler, useEffect, useRef, useState } from "react"
import { BsGrid1X2Fill } from "react-icons/bs";
import { FaSort, FaTh, FaThLarge, FaThList } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { GridAction } from "store/grid/actions";
import { sortAction } from "store/sort/actions";


export const GridStyles:React.FC = () => {
  const g = useSelector((state: RootState) => state.grid);
  const [grid,setGrid] = useState<string>(g.grid)



  const dispatch = useDispatch();

  const handleClickChange = (e:React.MouseEvent<SVGElement, MouseEvent>) => { 
    // const [grid,setGrid] = useState<string>("")
    const name = (e.currentTarget as SVGElement).dataset.name as string
    setGrid(name)
    

  }



  const changeGridexec = async() => {
    console.log(grid)
    const res = await execChangeGrid(grid)
    if (res.status === 200) {
      dispatch(GridAction(res.data.grid))
  }
  }

  useEffect(()=>{
    changeGridexec()
  },[grid])
  
  return(
    <>
      <div className = "gridLists">
        <FaTh
        data-name = "01"
        className={g.grid=="01"?"activeGridStyles":""}
        onClick={(e)=> handleClickChange(e)}
        />
        <FaThLarge
        className={g.grid=="02"?"activeGridStyles":""}
        data-name = "02"
        onClick={(e)=> handleClickChange(e)}
        />
        <FaThList
        className={g.grid=="03"?"activeGridStyles":""}
        data-name = "03"
        onClick={(e)=> handleClickChange(e)}
        />
        {/* <BsGrid1X2Fill
        className={g.grid=="04"?"activeGridStyles":""}
        data-name = "04"
        onClick={(e)=> handleClickChange(e)}
        /> */}
      </div>
    </>
  )
}