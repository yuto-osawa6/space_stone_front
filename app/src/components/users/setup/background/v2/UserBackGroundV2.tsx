import React, { useState, useRef } from 'react'

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { Button, FormHelperText, Modal } from "@mui/material"

import { execUserBackgroundImageHandler, execUserTopImageHandler } from '@/lib/api/users'
import { useUser } from '@/lib/data/user/useUser'
import { getCanvasCroppedImg } from '../../topimage/submit/TopimageSubmit'
import { useDispatch } from 'react-redux'
import { pussingMessageDataAction } from '@/store/message/actions'
import { TailSpin } from 'react-loader-spinner'
import { submitSpin } from '@/lib/color/submit-spin'
import { mutate } from 'swr'
import { ErrorMessage } from '@/lib/ini/message'

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
  const [aspect, setAspect] = useState<number | undefined>(10 / 4)
  const dispatch = useDispatch()
  // loading
  const [loading,setLoading] = useState<boolean>(false)

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

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined)
    } else if (imgRef.current) {
      const { width, height } = imgRef.current
      setAspect(10 / 4)
      setCrop(centerAspectCrop(width, height, 10 / 4))
    }
  }

  // submit 
  const {userSwr} = useUser()
  const user_id =  userSwr.user.id

  const TopimageSubmitHandler = async() =>{
  setLoading(true)
  if (imgRef.current==undefined){
    dispatch(pussingMessageDataAction({title:"画像が選択されていません。",select:0}))
    return
  }
  if(completedCrop == undefined){
    dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    return
  }
  const croppedImageUrl = await getCanvasCroppedImg(imgRef.current,completedCrop,'newFile.jpeg');
  // setNewImage(croppedImageUrl);

  let fileReader = new FileReader();
  fileReader.readAsArrayBuffer(croppedImageUrl as Blob)
  var formData= new FormData();
  if (croppedImageUrl==undefined){
    dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    return
  }
  formData.append('bg_img', croppedImageUrl)
  formData.append("user_id",String(user_id))
  const res =  await execUserBackgroundImageHandler(user_id,formData as FormData)
  if(res.status==200){
    setLoading(false)
    mutate('/session_user')
    dispatch(pussingMessageDataAction({title:"背景画像を更新しました。",select:1}))
    closeHandler()
  }else{
    dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    return
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
              {/* <Button variant="contained"
                className = "TheredModalButton"
                onClick = { TopimageSubmitHandler }
              >
              Submit
              </Button> */}
              {/* {submitLoading==true&&(
                <>
                  loading(しばらくお待ちください)
                </>
              )} */}
              <Button variant="contained"
              className={"tail-spin-loading"}
              onClick = {TopimageSubmitHandler}
              >保存
              {loading==true&&(
                <TailSpin color={submitSpin.color} height={20} width={20} />
              )}
            </Button>
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