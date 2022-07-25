
import { PixelCrop } from 'react-image-crop'

export const getCanvasCroppedImg = (image:HTMLImageElement, crop:PixelCrop, fileName:string) => {
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
          return;
        }
        resolve(blob)
      },
      'image/jpeg',
      1
    );
  });
}


// export const TopimageSubmitHandler = () =>{
//   console.log(imageRef)
//   if (imageRef==undefined){
//     setHelperText("*画像が選択されていません")
//     return
//   }
//   // console.log(9999)
//   setSubmitLoading(true)
//   // console.log("aaa")
//   if (changeCrop!=undefined){
//   makeClientCrop(changeCrop)
//   console.log(changeCrop)
//   }else{
//   makeClientCrop(crop)
//   console.log(crop)
//   }
// }