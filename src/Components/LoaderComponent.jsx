import React from 'react'
import '../css/App.css'

export default function LoaderComponent() {
  return (
    <div className='lds-ring centered'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}