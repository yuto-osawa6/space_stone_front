import { useEffect, useState } from "react";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

const { executeRecaptcha } = useGoogleReCaptcha()

export const execSetreCaptchaToken = async() => {
  // if (process.env.NODE_ENV == "production"){
  
    if (!executeRecaptcha) {

      console.log("rev")
      return
    }
    // console.log("rev")
    console.log("n")
    const reCaptchaToken = await executeRecaptcha('ReviewModal');
    console.log(reCaptchaToken)
  return reCaptchaToken
  // }else{
  //   return "local"
  // }
}

