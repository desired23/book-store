import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { Link } from 'react-router-dom'
import { useChangePasswordMutation } from '../../api/auth'

const Account = () => {
  const authState = useSelector((state:RootState)=>state.user.user)
  console.log(authState);


  return (
    <main className="w-4/5 mx-auto">
    <div className="account-info flex justify-center flex-col items-center">
        <h3 className='text-center font-bold text-2xl bg-slate-100 p-8 rounded-lg w-3/4 my-4'>Thông tin tài khoản</h3>
        <div className='w-full flex'>
          <div className='w-1/5 '>
            <ul>
              <li className='mb-1 bg-slate-100'><Link to={`/account`}>Thông tin cá nhân</Link></li>
              <li className='mb-1 bg-slate-100'><Link to={`/user/cart`}>Giỏ hàng</Link></li>
              <li className='mb-1 bg-slate-100'><Link to={`/account/orders`}>Đơn hàng</Link></li>
              <li className='mb-1 bg-slate-100'><Link to={`/account/changePassword`}>Đổi mật khẩu</Link></li>
            </ul>
          </div>
          <div className='px-10'>
            <h3>Người dùng {authState?.username}</h3>
            <h3>Email {authState?.email}</h3>
            <h3>_id {authState?._id}</h3>

          </div>
        </div>
    </div>
    </main>
  )
}

export default Account