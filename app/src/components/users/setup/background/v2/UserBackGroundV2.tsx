import React, { useState, useRef } from 'react'

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from 'react-image-crop'
// import { canvasPreview } from './canvasPreview'
// import { useDebounceEffect } from './useDebounceEffect'
import 'react-image-crop/dist/ReactCrop.css'
import { Button, FormHelperText, Modal } from "@mui/material"

import { execUserBackgroundImageHandler, execUserTopImageHandler } from '@/lib/api/users'
import { useUser } from '@/lib/data/user/useUser'
import { getCanvasCroppedImg } from '../../topimage/submit/TopimageSubmit'

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

type Props = {
  on:boolean
  setOn:React.Dispatch<React.SetStateAction<boolean>>
}


const UserBackgroupdModalV2:React.FC<Props> = function TopimageV2func(Props) {
  const closeHandler = () => Props.setOn(false)
  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState<number | undefined>(10 / 3)

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result as string || ''),
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  // useDebounceEffect(
  //   async () => {
  //     if (
  //       completedCrop?.width &&
  //       completedCrop?.height &&
  //       imgRef.current &&
  //       previewCanvasRef.current
  //     ) {
  //       // We use canvasPreview as it's much faster than imgPreview.
  //       canvasPreview(
  //         imgRef.current,
  //         previewCanvasRef.current,
  //         completedCrop,
  //         scale,
  //         rotate,
  //       )
  //     }
  //   },
  //   100,
  //   [completedCrop, scale, rotate],
  // )

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined)
    } else if (imgRef.current) {
      const { width, height } = imgRef.current
      setAspect(10 / 3)
      setCrop(centerAspectCrop(width, height, 10 / 3))
    }
  }

  // submit 
  const {userSwr} = useUser()
  const user_id =  userSwr.user.id

  const TopimageSubmitHandler = async() =>{
  console.log(imgRef)

  if (imgRef.current==undefined){
    // setHelperText("*画像が選択されていません")
    return
  }
  if(completedCrop == undefined) return
  const croppedImageUrl = await getCanvasCroppedImg(imgRef.current,completedCrop,'newFile.jpeg');
  console.log(croppedImageUrl)
  // setNewImage(croppedImageUrl);

  let fileReader = new FileReader();
  fileReader.readAsArrayBuffer(croppedImageUrl as Blob)
  console.log(fileReader)

  var formData= new FormData();
  if (croppedImageUrl==undefined) return
  formData.append('bg_img', croppedImageUrl)
  formData.append("user_id",String(user_id))
  // formData.append("user_id",String(1))


  console.log(croppedImageUrl)
  console.log(formData)
  const res =  await execUserBackgroundImageHandler(user_id,formData as FormData)
  if(res.status==200){
    console.log(res)
    // setSubmitLoading(false)
    // dispatch(updateBacgroundImageAction(userSwr.user,res.data.background))
    // closeHandler()
  }else{

  }
  }

  return (
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
          <div className="App">
            <div className="Crop-Controls">
              {/* <input type="file" accept="image/*" onChange={onSelectFile} /> */}
              <div className = "inputFile">
                <label>ファイルの選択
                <input type = "file" accept="image/*" onChange={onSelectFile}></input>
                </label>
              </div>
              {/* <div>
                <label htmlFor="scale-input">Scale: </label>
                <input
                  id="scale-input"
                  type="number"
                  step="0.1"
                  value={scale}
                  disabled={!imgSrc}
                  onChange={(e) => setScale(Number(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="rotate-input">Rotate: </label>
                <input
                  id="rotate-input"
                  type="number"
                  value={rotate}
                  disabled={!imgSrc}
                  onChange={(e) =>
                    setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
                  }
                />
              </div> */}
              <div>
                {/* <button onClick={handleToggleAspectClick}>
                  Toggle aspect {aspect ? 'off' : 'on'}
                </button> */}
              </div>
            </div>
            {Boolean(imgSrc) && (
              <ReactCrop
                // className = {"cropCircle"}
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspect}
                style={{
                  // "borderRadius": "100%"
                }}
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={imgSrc}
                  style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            )}
            <div>
            <div className = "UserBackgroupdModalSubmit">
              <Button variant="contained"
                className = "TheredModalButton"
                onClick = { TopimageSubmitHandler }
              >
              Submit
              </Button>
              {/* {submitLoading==true&&(
                <>
                  loading(しばらくお待ちください)
                </>
              )} */}
            </div>
              {/* {completedCrop!=undefined && (
                <canvas
                  ref={previewCanvasRef}
                  style={{
                    border: '1px solid black',
                    objectFit: 'contain',
                    width: completedCrop.width,
                    height: completedCrop.height,
                  }}
                />
              )} */}
            </div>
          </div>
        </div>
      </>
    </Modal>
  )
}

export default UserBackgroupdModalV2