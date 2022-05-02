import { Button, FormHelperText, Modal } from "@mui/material"
import { execUserBackgroundImageHandler } from "@/lib/api/users";
import { useCallback, useEffect, useRef, useState } from "react"
import ReactCrop, { Crop } from 'react-image-crop';
// import ReactCrop from "react-image-crop/dist/ReactCrop";
import 'react-image-crop/dist/ReactCrop.css';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateBacgroundImageAction } from "@/store/user/actions";

type Props = {
  on:boolean
  setOn:React.Dispatch<React.SetStateAction<boolean>>
}

export const UserBackgroupdModal:React.FC<Props> = (Props) => {
  // dispatch
  const dispatch = useDispatch()
  const UserStore = useSelector((state:RootState)=>state.user)
  // ref
  const reactCropRef = useRef<HTMLDivElement>(null!)
  const reactCropRef2 = useRef<ReactCrop>()
  // store
  const user_id = useSelector((state:RootState)=>state.user).user.id
  const [crop, setCrop] = useState<Crop>(
    {
  unit: '%',
  x: 0,
  y:0,
  width:0,
  height:0,
  // aspect: 10
});
  const [preview, setPreview] = useState<string>();
  const [newImage,setNewImage] = useState<any>();
  const [imageRef,setImageRef] = useState<HTMLImageElement>();

  const [changeCrop,setChangeCrop] = useState<Crop>()
  const [submitLoading,setSubmitLoading] = useState<boolean>(false)
  const [helperText,setHelperText] = useState<string>("")
  const changeOnHandler = () => Props.setOn(true)
  const closeHandler = () => Props.setOn(false)

  // image 

  // const setPreviewHandler = (image:string) => {
  //   // setPreview(image)
  //   return new Promise((resolve, reject) => {
  //     resolve(setPreview(image))
  //   })
  // }

  const imageFileChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
    console.log(e.target)
    
    if (e.target.files && e.target.files.length > 0) {
      const { files } = e.target;
      console.log(files)
      
      const reader = new FileReader();

      reader.addEventListener("load", () =>
      setPreview(reader.result as string))
      reader.readAsDataURL(e.target.files[0]);

      // validation
      if(helperText.length>0){
        setHelperText("")
      } 
    }
  }

  const cropChangeHandler = (crop: Crop, percentageCrop: Crop) => {
   
    setCrop(crop)
  }

  const onCropCompleteHandler = (crop: Crop, percentageCrop: Crop) => {
    console.log("aaa")
    setChangeCrop(crop)
  }


  const onImageLoadedHandler = useCallback((image: HTMLImageElement) => {
    setImageRef(image)
    
  },[])

  useEffect(()=>{
    if (imageRef==undefined)return
    const { width,height } = imageRef.getBoundingClientRect()
    console.log(width)
    console.log(height)
    console.log(width*3/10)
    console.log(width*3/10<height)
    if(width*3/10<height){
    setCrop({
      unit: 'px',
      x: 0,
      y:0,
      width:width,
      height:3/10*width,
      // width:200,
      // height:250,
      aspect: 10 / 3
    })
    setChangeCrop({
      unit: 'px',
      x: 0,
      y:0,
      width:width,
      height:3/10*width,
      // width:200,
      // height:250,
      aspect: 10 / 3
    })
  }else{
    setCrop({
      unit: 'px',
      x: 0,
      y:0,
      width:10/3*height,
      height:height,
      aspect: 10 / 3
    })

    setChangeCrop({
      unit: 'px',
      x: 0,
      y:0,
      width:10/3*height,
      height:height,
      aspect: 10 / 3
    })
  }


  },[imageRef,preview as string])

  const makeClientCrop = async(crop:Crop) => {
    // console.log(imageRef)
    if (imageRef&&crop.width && crop.height) {
      console.log(imageRef)
      const croppedImageUrl = await getCroppedImg(imageRef,crop,'newFile.jpeg');
      console.log(croppedImageUrl)
      setNewImage(croppedImageUrl);

      let fileReader = new FileReader();
      fileReader.readAsArrayBuffer(croppedImageUrl as Blob)
      console.log(fileReader)

      var formData= new FormData();
      if (croppedImageUrl==undefined) return
      formData.append('bg_img', croppedImageUrl)
      formData.append("user_id",String(user_id))

      console.log(croppedImageUrl)
      const res =  await execUserBackgroundImageHandler(user_id,formData as FormData)
      if(res.status==200){
        setSubmitLoading(false)
        dispatch(updateBacgroundImageAction(UserStore.user,res.data.background))
        closeHandler()

      }
     

    }else{
      console.log("aaa")
      console.log(imageRef)
      console.log(crop.width)
    }
  }

  const getCroppedImg = (image:HTMLImageElement, crop:Crop, fileName:string) => {

    const canvas = document.createElement('canvas');
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;
    if (ctx==null)return

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return new Promise<Blob>((resolve, reject) => {
      // canvas.toDataURL
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            console.error('Canvas is empty');
            return;
          }
        
          resolve(blob)
        },
        'image/jpeg',
        1
      );

    });

  }

  // submit

  const submitHandler = () =>{
    console.log(imageRef)
    if (imageRef==undefined){
      setHelperText("*画像が選択されていません")
      return
    }
    // console.log(9999)
    setSubmitLoading(true)
    // console.log("aaa")
    if (changeCrop!=undefined){
    makeClientCrop(changeCrop)
    console.log(changeCrop)
    }else{
    makeClientCrop(crop)
    console.log(crop)
    }
  }


  return(
    <>
     <Modal
      open={Props.on}
      onClose={closeHandler}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
        <>
          <div className = "UserBackgroupdModal">
            <div className = "UserBackgroupdModalTitle">
              背景画像の変更
            </div>
            <FormHelperText>{helperText}</FormHelperText>
            <div className = "inputFile">
              <label>ファイルの選択
              <input type = "file" accept="image/*" onChange={imageFileChangeHandler}></input>
              </label>
            </div>
            <div className = "UserBackgroupdModalPaddingBox"
              ref={reactCropRef}
            >
              {preview !=undefined&&(
              <ReactCrop 
              // ref={reactCropRef2}
              src={preview} 
              crop={crop}
              locked={true}
              ruleOfThirds={true}
              onChange={cropChangeHandler}
              onComplete={onCropCompleteHandler}
              onImageLoaded={onImageLoadedHandler}
              />
             )}
              {/* <img src={newImage} /> */}
            </div>
            <div className = "UserBackgroupdModalSubmit">
              <Button variant="contained"
                className = "TheredModalButton"
                onClick = { submitHandler }
              >
              Submit
            </Button>
              {submitLoading==true&&(
                <>
                  loading(しばらくお待ちください)
                </>
              )}
            </div>
          </div>
        </>

      </Modal>
    </>
  )
}