import React from 'react'
import LoginFormContainer from '../components/LoginFormContainer'
import ImageContainer from '../components/ImageContainer'

export default function Login() {
  return (
    <div style={{display:"flex", alignItems: "center"}}>  
    <ImageContainer/>
        <LoginFormContainer/>
    <ImageContainer/>
    </div>
  )
}
