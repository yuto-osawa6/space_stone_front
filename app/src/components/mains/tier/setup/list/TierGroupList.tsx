import { product } from "interfaces/product"
import { useCallback, useRef,useEffect,useState, memo } from "react"
import { useDrop } from "react-dnd"
import { Draggable } from "../draggle/Draggable"
import { ItemType } from "../type/ItemType"

type DragItem  = {
  id:number
  index: number
  product:product
  group:number
}
type Props = {
  group:Group
  moveItem23: (dragIndex: number, hoverIndex: number, group: number, pregroup: any | undefined, id: number) => void
  index:number
  id:number
  setGroupProduct: React.Dispatch<React.SetStateAction<Group[]>>
}
type Group = {
  products:product[]
  group:number
}
export const TierGroupList: React.FC<Props> = memo((Props) => {
  const [{isOver,isOverCurrent,canDrop}, ref] = useDrop({
    accept: ItemType.Box,
    drop(dragItem: DragItem) {
    // try{
      const dragIndex = dragItem.index;
      if (dragItem.group === Props.group.group) return;
      const targetIndex = Props.group.products.length
      Props.moveItem23(dragIndex, targetIndex, Props.group.group,dragItem.group,dragItem.id);
      dragItem.index = targetIndex;
      dragItem.group = Props.group.group
    // }catch(e){
    //   // console.log(e)
    // }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop()
    }),
  });
  const moveItem2 = useCallback((dragIndex: number, hoverIndex: number,group: number,pregroup:any | undefined,id:number) => {
    try{
    Props.setGroupProduct((prevState:Group[]) => {
      const copy0009 = prevState.slice()
      const groupItem = copy0009.filter(i=>i.group==group)[0]
      if(group==pregroup){
        const Item =  copy0009.filter(i=>i.group==group)[0].products[dragIndex]
      if(Item==undefined){
        return prevState
      }  
      const newItems = groupItem.products.filter((_, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, Item);
      // console.log(groupItem)
      // console.log(copy0009,group,newItems,Item,id)
      copy0009[group]={products:newItems,group:group}
      }else{
      }
      return copy0009
    })
    }catch(e){
    }
  }, []);
  const renderCard = useCallback(
    (item: product, index: number) => {
      return (
        <Draggable
        key={item.id}
        product = {item}
        index= {index}
        moveCard={moveItem2}
        group={Props.group.group}
      />
      )
    },
    [],
  )
  // const [onCharge,setOnCharge] = useState<boolean>(false)
  // const backgroundColor = isOver&&canDrop? "red" : "aliceblue"
  const [tier,setTier] = useState<string>("")
  const [color,setColor] = useState<string>("")
 
  useEffect(()=>{
    switch (Props.group.group) {
      case 0:
        setTier("S")
        setColor('rgb(255 48 115)')
        break;
      case 1:
        setTier("A")
        setColor('rgb(110 0 255)')
        break;
      case 2:
        setTier("B")
        setColor('rgb(0 173 255)')
        break;
      case 3:
        setTier("C")
        setColor('rgb(0 198 152)')
        break;
      case 4:
        setTier("D")
        setColor('rgb(255 106 0)')
        break;
      case 5:
        setTier("E")
        setColor('rgb(26 37 47)')
        break;
      case 6:
        setTier("")
        setColor('rgb(26 37 47)')
        break;
      default:
    }
  },[])
  return(
    <>
      <div className={['group', Props.group.group].join(' ')}
      ref={ref}
      >
        <h2
        style={{
          width: "fit-content",
          zIndex: "1220",
          position: "relative",
          left: "5px",
          color:isOver?"white":color,
          borderRadius:"5px",
          padding:"0px 5px 0px 5px",
          backgroundColor: isOver?color:"aliceblue"
        }}
        >
          {tier}
          <span className='count'>({Props.group.products.length})</span>
        </h2>
        <ul className='list' 
        style={{
          width:"100%",
          // minHeight:"97px",
          minHeight: "86px",
          display:"grid",
          // gridTemplateColumns: "repeat(auto-fill,52.5px)",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          columnGap:"10px",
          rowGap:"10px",
          gap: "10px",
          top: "-10px",
          position: "relative",
          border: `1px solid ${color}`,
          borderRadius:"5px",
          padding:"10px",
          backgroundColor: isOver?color:"",
          alignItems: "center",
        }}
        >
          {Props!=undefined&&(
            <>
              {Props.group.products.map((item, i) => renderCard(item,i))}
            </>
          )}
        </ul>
      </div>
    </>
  )
})
