import { FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField } from "@mui/material"
import { useEffect, useMemo, useRef, useState } from "react"
import ReactQuill from "react-quill"
// import { Navigate, useNavigate } from "react-router-dom"

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



// type product = {
//   title :string
//   imageUrl :string

// }

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

  // titleKa:string | undefined
  // titleEn:string | undefined
  // titleRo:string | undefined
  // wiki:string | undefined
  wikiEn:string | undefined
  copyright:string | undefined
  annitictId:number | undefined
  shoboiTid:number | undefined


  yearSeason:year_season[]
  // time:Date | null
}

type year_season = {
  year:string
  season:string[]
}

type character = {
  // characterId:number
  castId:string
  characterName:string
  characterImage:string
  // characterImageUrl?:string
}

type character2 = {
  // characterId:number
  castId:string
  characterName:string
  // characterImageUrl?:string
}

type episord = {
  episordNumber:number
  episordTittle:string
  episordArasuzi:string
  episordImageUrl:string
  episordTime:Date | null
  episordReleaseDate:Date | null
}

export const AdminsAddProduct:React.FC = () => {
  //  product
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
    // time:null,
    yearSeason:[{
      year:"",
      season:[]
    }]
  })
  const [formatsArray,setFormatsArray] = useState<string[]>([])
  const [genresArray,setGenresArray] = useState<string[]>([])

  const [characterMiddleData,setCharacterMiddleData] = useState<character[]>([])

  const [studiosArray,setStudiosArray] = useState<string[]>([])

  const [staffMiddle,setStaffMiddle] = useState<character2[]>([])

  const [episord,setEpisord] = useState<episord[]>([])


  


  // ------------------------------------------------

  const [open,setOpen] = useState<boolean>(true)
  // const navigate = useNavigate()
  const handleClose = () => {
    setOpen(false)
    // navigate("/admins")
  }

  // step
  const [activeStep, setActiveStep] = useState<number>(0);

  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});


  const steps = ['ProductSetting', 'Formats & Genres', 'Character & Cast','Staff & Studio','Episord'];

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

    console.log(allStepsCompleted())

   
  };

  const handleComplete = () => {
    
    switch(activeStep){
    case 0:
      console.log(childFunc)
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

    // setCompleted({[0]:true})
    // return
    // const newCompleted =completed
    // newCompleted[activeStep] = true;
    // setCompleted(newCompleted);
    // handleNext();
  };
  console.log(completed)
  const childFunc = useRef<any>(!null)
  const childFunc2 = useRef<any>(!null)
  const childFunc3 = useRef<any>(!null)
  const childFunc4 = useRef<any>(!null)
  const childFunc5 = useRef<any>(!null)



  const handleSubmit = async() => {
      // console.log("ラストですよ")
      const res = await execProductCreate(product,genresArray,formatsArray,characterMiddleData,studiosArray,staffMiddle,episord)
      if(res.status=200){
        console.log(res)
      }else{

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
        open={open}
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
                  // handleComplete={handleComplete}
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

                <ProductFormList5
                  activeStep = {activeStep}
                  childFunc5={ childFunc5}
                  completed = {completed}
                  setCompleted = {setCompleted}
                  handleNext={handleNext}
                  
                  episord={episord}
                  setEpisord={setEpisord}
                />

            </div>
          </div>

        </>        
      </Modal>
    </>
  )
}