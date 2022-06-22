import { useEffect, useState } from "react";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'


export const execSetreCaptchaToken = async() => {
  if (process.env.NODE_ENV == "production"){
  const { executeRecaptcha } = useGoogleReCaptcha()
    if (!executeRecaptcha) {
      return
    }
    const reCaptchaToken = await executeRecaptcha('ReviewModal');
    console.log(reCaptchaToken)
  return reCaptchaToken
  }else{
    return "local"
  }
}

