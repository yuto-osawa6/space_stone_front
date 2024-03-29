import { FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField } from "@mui/material"
import { useEffect, useMemo, useRef, useState } from "react"
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { execProductCreate, execProductEditSetup, execProductUpdate } from "@/lib/api/admin/product";
import { ProductFormList1Edit } from "./edit_form/ProductFormList1Edit";
import { ProductFormList2Edit } from "./edit_form/ProductFormList2Edit";
import { ProductFormList3Edit } from "./edit_form/ProductFormList3Edit";
import { ProductFormList4Edit } from "./edit_form/ProductFormList4Edit";
import { ProductFormList5Edit } from "./edit_form/ProductFormList5Edit";
import { StepperEdit } from "./StepperEdit";
import { product, productForm } from "@/interfaces/product";
import { useDispatch } from "react-redux";
import { pussingMessageDataAction } from "@/store/message/actions";
import { ErrorMessage } from "@/lib/ini/message";


type product_form = {
  title:string
  imageUrl:string
  description:string
  list:string | undefined
  year:string
  years:string[]
  kisetsu:string[]
  delivery_start:Date | null
  delivery_end:Date | null
  imageUrl2:string | undefined
  imageUrl3:string | undefined
  imageUrlh1:string | undefined
  imageUrlh2:string | undefined
  imageUrlh3:string | undefined
  wikiEn:string | undefined
  copyright:string | undefined
  annitictId:number | undefined
  shoboiTid:number | undefined
  yearSeason:year_season[]
  overview:string | undefined
  arasuziCopyright:string
}

type year_season = {
  year:string
  season:string[]
}

type character = {
  id:number | null
  castId:string
  characterName:string
  characterImage:string
}

type character2 = {
  castId:string
  characterName:string
}

type episord = {
  episordNumber:number
  episordTittle:string
  episordArasuzi:string
  episordImageUrl:string
  episordTime:Date | null
  episordReleaseDate:Date | null
}

type Props = {
  product:product
  openEdit: boolean
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export const AdminsEditProduct:React.FC<Props> = (Props) => {
  //  product
  const [product,setProduct] = useState<product_form>({
    title:"",
    imageUrl:"",
    description:"",
    list:"",
    year:"",
    years:[],
    kisetsu:[],
    delivery_start:null,
    delivery_end:null,
    imageUrl2:"",
    imageUrl3:"",
    imageUrlh1:"",
    imageUrlh2:"",
    imageUrlh3:"",
    wikiEn:"",
    copyright:"",
    annitictId:undefined,
    shoboiTid:undefined,
    yearSeason:[{
      year:"",
      season:[]
    }]
    ,
    overview:"",
    arasuziCopyright:""
  })
  const [formatsArray,setFormatsArray] = useState<string[]>([])
  const [genresArray,setGenresArray] = useState<string[]>([])
  const [characterMiddleData,setCharacterMiddleData] = useState<character[]>([])
  const [studiosArray,setStudiosArray] = useState<string[]>([])
  const [staffMiddle,setStaffMiddle] = useState<character2[]>([])
  const [episord,setEpisord] = useState<episord[]>([])
  // ------------------------------------------------
  const [open,setOpen] = useState<boolean>(true)
  const handleClose = () => {
    Props.setOpenEdit(false)
  }
  // step
  const [activeStep, setActiveStep] = useState<number>(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const steps = ['ProductSetting', 'Formats & Genres', 'Character & Cast','Staff & Studio'];
  const totalSteps = () => {
    return steps.length;
  };
  const completedSteps = () => {
    return Object.keys(completed).length;
  };
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };
  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };
  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleComplete = () => {
    switch(activeStep){
    case 0:
      childFunc.current()
      break
    case 1:
      childFunc2.current()
    break  
    case 2:
      childFunc3.current()
    break 
    case 3:
      childFunc4.current()
    break
    case 4:
      childFunc5.current()
    break
    }

  };
  const childFunc = useRef<any>(!null)
  const childFunc2 = useRef<any>(!null)
  const childFunc3 = useRef<any>(!null)
  const childFunc4 = useRef<any>(!null)
  const childFunc5 = useRef<any>(!null)
  // 送信
  const dispatch = useDispatch()
  const handleSubmit = async() => {
    if (formProduct==undefined) return
    // koko
    const res = await execProductUpdate(formProduct.id,product,genresArray,formatsArray,characterMiddleData,studiosArray,staffMiddle,episord)
    if(res.data.status==200){
      dispatch(pussingMessageDataAction({title:"productが更新されました。",select:1}))
    }else{
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    }
  }

  useEffect(()=>{
    if(allStepsCompleted()){
      handleSubmit()
    }
  },[Object.keys(completed).length])


// ------------------------------------------------
const [formProduct,setFormProduct] = useState<productForm>()

  const handleFirst = async() => {
    const res = await execProductEditSetup(Props.product.id)
    setEpisord(res.data.product.formEpisord)
    setFormProduct(res.data.product)
  }
  useEffect(()=>{
    handleFirst()
  },[])

  return(
    <>
      <Modal
        open={Props.openEdit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <div className = "AdminsProduct">
            <div className = "FormProduct">
              <div className = "FormProductStepper">
                <StepperEdit
                  activeStep = {activeStep}
                  setActiveStep = {setActiveStep}
                  completed = {completed}
                  setCompleted = {setCompleted}
                  handleComplete = {handleComplete}
                  allStepsCompleted={allStepsCompleted}
                  handleNext={handleNext}
                  completedSteps={completedSteps}
                  totalSteps={totalSteps}
                />
              </div>
                {formProduct!=undefined&&(
                <>
                <ProductFormList1Edit
                  activeStep = {activeStep}
                  childFunc={ childFunc}
                  completed = {completed}
                  setCompleted = {setCompleted}
                  handleNext={handleNext}
                  setProduct={setProduct}
                  product={product}
                  formProduct = {formProduct}
                />
                <ProductFormList2Edit
                  activeStep = {activeStep}
                  childFunc2={ childFunc2}
                  completed = {completed}
                  setCompleted = {setCompleted}
                  handleNext={handleNext}
                  formatsArray={formatsArray}
                  setFormatsArray={setFormatsArray}
                  setGenresArray = {setGenresArray}
                  formProduct = {formProduct}
                />
                <ProductFormList3Edit
                  activeStep = {activeStep}
                  childFunc3={ childFunc3}
                  completed = {completed}
                  setCompleted = {setCompleted}
                  handleNext={handleNext}
                  setCharacterMiddleData = {setCharacterMiddleData}
                  characterMiddleData = {characterMiddleData}
                  formProduct = {formProduct}
                />
                <ProductFormList4Edit
                  activeStep = {activeStep}
                  childFunc4={ childFunc4}
                  completed = {completed}
                  setCompleted = {setCompleted}
                  handleNext={handleNext}
                  setStudiosArray={setStudiosArray}
                  staffMiddle={staffMiddle}
                  setStaffMiddle={setStaffMiddle}
                  formProduct = {formProduct}
                />
                </>
                )}
            </div>
          </div>
        </>        
      </Modal>
    </>
  )
}