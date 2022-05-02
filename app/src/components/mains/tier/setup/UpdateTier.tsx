import { Button, FormHelperText, Modal } from "@mui/material"
import { product } from "@/interfaces/product"
import { execCreateTierHandler } from "@/lib/api/mains/main_blocks"
import { useUser } from "@/lib/data/user/useUser"
import { ErrorMessage } from "@/lib/ini/message"
import { useCallback, useEffect, useState } from "react"
import { useDrop } from "react-dnd"
import { IoMdClose } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { pussingMessageDataAction } from "@/store/message/actions"
import { mutate } from "swr"
import { DraggableFistContainer } from "./draggle/DraggableFistContainer"
import { TierGroupList } from "./list/TierGroupList"
// import { TierGroupList } from "./TierGroupList"
// import { DraggableFistContainer } from "./tier_group/DraggableFistContainer"

export const ItemType = {
  Box: "BOX",
  s:"s",
  a:"a",
  b:"b",
  c:"c",
  d:"d",
  e:"e",
}

type Props = {
  products: product[]
  season: string
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  open: boolean
  userTier:UserTier[]
  setUpdateTier?: React.Dispatch<React.SetStateAction<boolean>>
}
type Group = {
  products:product[]
  group:number
}
type DragItem  = {
  id:number
  index: number
  product:product
  group:number
}
type tiers= {
  group:number
  product:number[]
}
type UserTier = {
  group: number
  id: number
  product: product
  tier: number
  userId: number
}

export const UpdateTier:React.FC<Props> = function UpdateTierFunc(Props){
  const [firstProduct,setFirstProduct] = useState<product[]>([])
  // const user = useSelector((state:RootState)=>state.user)
  const {userSwr} = useUser()
  const [groupProduct,setGroupProduct] = useState<Group[]>([
    {
      products:[],
      group:0,
    },
    {
      products:[],
      group:1,
    },{
      products:[],
      group:2, 
    },{
      products:[],
      group:3,  
    },{
      products:[],
      group:4,
    },{
      products:[],
      group:5,
    }
    ,{
      products:[],
      group:6,
    },

])

useEffect(()=>{
  const array = Props.userTier.map(i=>i.product.id)
  const group6_array = Props.products.filter(i=> array.includes(i.id)==false)
  console.log(Props)
  setFirstProduct(Props.products.filter(i=> array.includes(i.id)))
  const copy = groupProduct.slice()
  copy[0] = {group:0,products:Props.userTier.filter(i=>i.group==0).map(i=>i.product)}
  copy[1] = {group:1,products:Props.userTier.filter(i=>i.group==1).map(i=>i.product)}
  copy[2] = {group:2,products:Props.userTier.filter(i=>i.group==2).map(i=>i.product)}
  copy[3] = {group:3,products:Props.userTier.filter(i=>i.group==3).map(i=>i.product)}
  copy[4] = {group:4,products:Props.userTier.filter(i=>i.group==4).map(i=>i.product)}
  copy[5] = {group:5,products:Props.userTier.filter(i=>i.group==5).map(i=>i.product)}
  copy[6] = {group:6,products:group6_array }
  setGroupProduct(copy)
},[])
 
  const handleClose = () => {
    Props.setOpen(false)
  }
  const [validateText,setValidateText] = useState<string>("")
  const moveItem23 = useCallback((dragIndex: number, hoverIndex: number,group: number,pregroup:any | undefined,id:number) => {
    console.log(dragIndex,hoverIndex,group,pregroup,id)
      if(validateText!=""){
        setValidateText("")
      }
      setGroupProduct((prevState:Group[]) => {
        // 元あったグループの削除
        const copy0008 = prevState.slice()
        const Item =  copy0008.filter(i=>i.group==pregroup)[0].products.filter(i=>i.id==id)[0]
        const preGroupItem = copy0008.filter(i=>i.group==pregroup)
        const newItems = preGroupItem[0].products.filter((i, idx) => i.id !== id);
        const GroupItem = copy0008.filter(i=>i.group==group)
        const groupItem = GroupItem[0].products.filter(i=>i.id!==id)
        groupItem.splice(hoverIndex, 0, Item);
        copy0008[pregroup]={products:newItems,group:pregroup}
        copy0008[group]={products:groupItem,group:group}
        return copy0008
      })
  }, []);


  const renderCard = useCallback(
    (card: Group, index: number) => {
      return (
        <TierGroupList
          key={card.group}
          group={card}
          index={index}
          id={card.group}
          moveItem23={moveItem23}
          setGroupProduct = {setGroupProduct}
        />
      )
  },[],)

  useEffect(()=>{
    console.log(groupProduct)
  },[groupProduct])
  // --------------------
  const [,ref] = useDrop({
    accept: ItemType.Box,
    drop(dragItem: DragItem) {
    try{
      const dragIndex = dragItem.index;
      if (dragItem.group === 6) return;
      const targetIndex = groupProduct[6].products.length
      moveItem23(dragIndex, targetIndex, 6,dragItem.group,dragItem.id);
      dragItem.index = targetIndex;
      dragItem.group = 6
    }catch(e){
      console.log(e)
    }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop()
    }),
  });
  // submit --------------------------------
  const dispatch = useDispatch()
  const handleCreateTier = async() => {
   const product_length = groupProduct.filter(i=>i.group!=6).reduce((sum,i)=>i.products.length + sum,0)
  //  if(product_length==0){
  //   setValidateText("Tierリストにコンテンツがありません。")
  //    return
  //  }
   const createTierProduct:tiers[] = [{
     group:0,
     product:[]
   }]
   const FixedProductTier = groupProduct.filter(i=>i.group!=6).slice()
   FixedProductTier.map((i,index)=>{
    const array = i.products.map(i=>i.id)
    createTierProduct[index] = {group:index,product:array}
   })
   const res = await execCreateTierHandler(createTierProduct,Props.season,userSwr.user.id)
   console.log(res)
   if (res.data.status == 200){
    if (Props.setUpdateTier!=undefined){
      Props.setUpdateTier(true)
    }
      console.log("aa")
      // mutate('/mainblocks/mains/update_tier_list/1')
      // mutate('/mainblocks/mains/user_this_season_tier/1')
      dispatch(pussingMessageDataAction(res.data.message))
      Props.setOpen(false)
   }else{
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
   }
  }

  return(
    <>
     <Modal
        open={Props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
        {groupProduct.map(i=>i.products).length>0&&(
          <>
        <div className="Tier"
        style={{
          left: "50%",
          transform: "translate(-50%, 0%)",
          backgroundColor: "aliceblue",
          position: "absolute",
          width: "95%",
          borderRadius: "5px",
          outline:"none",
          padding: "20px",
          overflow:"scroll",
          maxHeight: "100vh",  
          paddingBottom: "130px", 
          bottom:"0"
        }}
        >
          <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px"
          }}  
          >
          <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "1.0rem",
            fontWeight: "bold",
          }}
          >
            Tierの作成
          </div>
          <Button variant="outlined"
              className = "modal_review_richtext_close"
              onClick = {handleClose}
            >
              <IoMdClose/>
              Close
          </Button>
          </div>
          <div className=""
          style={{
            height:"100%",
          }}
          >
          {groupProduct.slice(0,6).map((item,index)=>renderCard(item,index))}
          </div>
         
        </div>
        <div
          ref={ref}
          style={{
            position: "fixed",
            bottom: "0",
            backgroundColor: "#1a252f",
            width: "95%",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "20px",
            minHeight:"115px",
          }}
        >
          <FormHelperText
          style={{
            marginBottom:"5px",
            color:"red"
          }}
          >{validateText}</FormHelperText>
          <div className=""
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "10px"
          }}
          >
          <div className=""
          style={{
            display:"flex",
            overflow:"scroll",
            gap:"10px",
            alignItems: "center",
          }}
          >
            {groupProduct[6].products.map((item,index)=>{
              return(
                <DraggableFistContainer
                  key =  {item.id}
                  product={item}
                  index = {index}
                  group = {6}
                />
              )
            })}
          </div>
          <div className = "TierSubmit">
            <Button
            onClick={handleCreateTier}
            className = "TierSubmitButton"
            style={{backgroundColor:"aliceblue",height: "75px"}}
            >
              Submit
            </Button>
          </div>
          </div>
        </div>
        </>
        )}
        </>
      </Modal>
    </>
  )
}