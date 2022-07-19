import { useEffect, useState } from "react";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

const { executeRecaptcha } = useGoogleReCaptcha()

export const execSetreCaptchaToken = async() => {
  // if (process.env.NODE_ENV == "production"){
  
    if (!executeRecaptcha) {

      return
    }
    // console.log("rev")
    const reCaptchaToken = await executeRecaptcha('ReviewModal');
  return reCaptchaToken
  // }else{
  //   return "local"
  // }
}

