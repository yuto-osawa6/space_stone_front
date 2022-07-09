import { FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField } from "@mui/material"
import { useEffect, useMemo, useRef, useState } from "react"
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { HorizontalNonLinearStepper } from "./stepper/Stepper";
import { ProductFormList1 } from "./products_formlist/ProductFormList1";
import { ProductFormList2 } from "./products_formlist/ProductFormList2";
import { ProductFormList3 } from "./products_formlist/ProductFormList3";
import {ProductFormList4 } from "./products_formlist/ProductFormList4";
import { ProductFormList5 } from "./products_formlist/ProductFormList5";
import { execProductCreate } from "@/lib/api/admin/product";
import { pussingMessageDataAction } from "@/store/message/actions";
import { useDispatch } from "react-redux";
import { ErrorMessage } from "@/lib/ini/message";

type product = {
  title:string
  imageUrl:string
  description:string
  list:string | undefined
  year:string
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
  arasuziCopyright:string
}

type year_season = {
  year:string
  season:string[]
}

type character = {
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
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const AdminsAddProduct:React.FC<Props> = (Props) => {
  const [product,setProduct] = useState<product>({
    title:"",
    imageUrl:"",
    description:"",
    list:"",
    year:"",
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
    }],
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
    Props.setOpen(false)
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
    }
  };
  const childFunc = useRef<any>(!null)
  const childFunc2 = useRef<any>(!null)
  const childFunc3 = useRef<any>(!null)
  const childFunc4 = useRef<any>(!null)
  const childFunc5 = useRef<any>(!null)


  const dispatch = useDispatch()
  const handleSubmit = async() => {
    const res = await execProductCreate(product,genresArray,formatsArray,characterMiddleData,studiosArray,staffMiddle,episord)
    if(res.data.status==200){
      dispatch(pussingMessageDataAction({title:"productが作成されました。",select:1}))
    }else if(res.data.status==390){
      dispatch(pussingMessageDataAction({title:"既に存在するproductです。",select:0}))
    }else{
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    }
  }

  useEffect(()=>{
    if(allStepsCompleted()){
      handleSubmit()
    }
  },[Object.keys(completed).length])

  return(
    <>
      <Modal
        open={Props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <div className = "AdminsProduct">
            <div className = "FormProduct">
              <div className = "FormProductStepper">
                <HorizontalNonLinearStepper
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
                <ProductFormList1
                  activeStep = {activeStep}
                  childFunc={ childFunc}
                  completed = {completed}
                  setCompleted = {setCompleted}
                  handleNext={handleNext}
                  setProduct={setProduct}
                  product={product}
                />
                <ProductFormList2
                  activeStep = {activeStep}
                  childFunc2={ childFunc2}
                  completed = {completed}
                  setCompleted = {setCompleted}
                  handleNext={handleNext}
                  formatsArray={formatsArray}
                  setFormatsArray={setFormatsArray}
                  setGenresArray = {setGenresArray}
                />
                <ProductFormList3
                  activeStep = {activeStep}
                  childFunc3={ childFunc3}
                  completed = {completed}
                  setCompleted = {setCompleted}
                  handleNext={handleNext}
                  setCharacterMiddleData = {setCharacterMiddleData}
                  characterMiddleData = {characterMiddleData}
                />
                <ProductFormList4
                  activeStep = {activeStep}
                  childFunc4={ childFunc4}
                  completed = {completed}
                  setCompleted = {setCompleted}
                  handleNext={handleNext}
                  setStudiosArray={setStudiosArray}
                  staffMiddle={staffMiddle}
                  setStaffMiddle={setStaffMiddle}
                />
                {/* <ProductFormList5
                  activeStep = {activeStep}
                  childFunc5={ childFunc5}
                  completed = {completed}
                  setCompleted = {setCompleted}
                  handleNext={handleNext}   
                  episord={episord}
                  setEpisord={setEpisord}
                /> */}
            </div>
          </div>
        </>        
      </Modal>
    </>
  )
}