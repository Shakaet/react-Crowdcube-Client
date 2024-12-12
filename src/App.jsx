import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useLoaderData } from 'react-router-dom'

function App() {
     
  let data= useLoaderData()

  return (
    <>
     
      <h1 className='text-5xl'>Total User :{data.length}</h1>
    </>
  )
}

export default App
