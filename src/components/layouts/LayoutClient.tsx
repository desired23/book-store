import React from 'react'
import { Outlet } from 'react-router-dom'

const LayoutClient = () => {
  return (
    <>
      <div>LayoutClient</div>
      <Outlet />
    </>
  )
}

export default LayoutClient