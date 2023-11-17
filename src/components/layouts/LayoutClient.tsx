import { Badge, Button, Dropdown, MenuProps, Modal, Select, Tabs, TabsProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/auth/authSlice';
import { PURGE } from 'redux-persist';
import { useGetCartQuery } from '../../api/cart';
import { ICartState, loadCart } from '../../store/cart/cartSlice';
import { setSearchTerm, setSearchType } from '../../store/search/searchSlice';
import { selectCategory } from '../../store/category/categorySlice';

const LayoutClient = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const authState = useSelector((state: RootState) => state.user);
  const getCart: ICartState = useSelector((state: RootState) => state.carts)
  const searchTerm = useSelector((state:RootState)=>state.search.searchTerm)
  const searchType = useSelector((state:RootState)=>state.search.searchType)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data: cartData, isSuccess: fetchCartSuccess } = useGetCartQuery()
  const onChange = (key: string) => {
    console.log(key);
  };
  const optionsSearch = [{
    value: 'bookTitle',
    label: 'Tên sách',
  },
  {
    value: 'authorName',
    label: 'Tác giả',
  },
  {
    value: 'categoryName',
    label: 'Danh mục',
  },

]
  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'Đăng nhập',
      children: <Login setModalState={setModal2Open} />
    },
    {
      key: '2',
      label: 'Đăng ký',
      children: <Register setModalState={setModal2Open} />

    }
  ];
  const [items, setItems] = useState<MenuProps['items']>([
    {
      label: 'Thông tin tài khoản',
      key: '1',
    },
    {
      label: <Link to={`/account/orders`}>Đơn hàng</Link>,
      key: '2',
    },
    {
      label: <Link to={`/home`} onClick={() => handleLogout()} >Đăng xuất</Link>,
      key: '3',
    },
  ]);
  const handleLogout = async() => {
     dispatch(logout())
     dispatch({ type: PURGE, key: ["user"] });
    // navigate('/home')
    navigate('/home', { replace: true })
  }
  useEffect(() => {
    if (items) {
      const updatedItems = [...items];
      if (authState.user?.role === "admin") {
        updatedItems[4] = {
          label: <Link to={`/admin/dashboard`} >Vào trang admin</Link>,
          key: 4
        }
        setItems(updatedItems)
      }
    }
  }, [authState])
  useEffect(() => {
    
      if (authState.user && fetchCartSuccess) {
        dispatch(loadCart(cartData))
    }
  }, [authState, fetchCartSuccess])

const handleSearch = ()=>{
  navigate(`/products?searchType=${searchType}&search=${searchTerm}`);
}

  return (
    <>
      <header >
        <div className="sm:flex sm:justify-center sm:flex-col gap-2 news bg-lime-950 lg:flex-row">
          <div className="hidden sm:hidden w-1/6  lg:block"> </div>
          <div id="controls-carousel" className="relative lg:w-4/6" data-carousel="static">
            {/* Carousel wrapper */}
            <div className="relative h-6 overflow-hidden text-center rounded-lg md:h-10 text-xs">
              {/* Item 1 */}
              <div className="hidden py-2 duration-700 ease-in-out " data-carousel-item>
                <a className="italic text-center text-white">Up to 30% Off Pre-Orders</a>
              </div>
              {/* Item 2 */}
              <div className="hidden py-2 duration-700 ease-in-out " data-carousel-item="active">
                <a className="italic text-center text-white">Explore All Kids' Special Offers</a>
              </div>
              {/* Item 3 */}
              <div className="hidden py-2 duration-700 ease-in-out " data-carousel-item>
                <a className="italic text-center text-white">Buy One, Get One 50% Off Books for All
                  Ages</a>
              </div>
            </div>
            {/* Slider controls */}
            <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg className="w-2 h-2 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 1 1 5l4 4" />
                </svg>
                <span className="sr-only">Previous</span>
              </span>
            </button>
            <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg className="w-2 h-2 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                </svg>
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>
          <div className=" lg:w-1/6 pb-2 text-center"><a href="#" className=" hover:underline text-xs italic text-center text-white">Xem tất cả</a>
          </div>
        </div>
        <nav className="bg-white border-gray-200 dark:border-gray-600 dark:bg-gray-900 w-4/5 mx-auto sm:hidden">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl flex-row">
            <a className="flex items-center" href="#"><img className="mx-auto w-44 sm:hidden" src="https://res.cloudinary.com/dqzopvk2t/image/upload/v1697453349/z3s7ujxvlpkssanl9o6t.png" alt="true" /></a>
            <button data-collapse-toggle="mega-menu-full" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mega-menu-full" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
            <div id="mega-menu-full" className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
              <ul className="flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
                <li>
                  <div className="flex mb-3  wrapper-user-cart-wishlist sm:hidden justify-evenly">
                    {authState.isLoggedIn ? <Dropdown placement="bottom" arrow={{ pointAtCenter: true }} menu={{ items }}>
                      <a onClick={(e) => e.preventDefault()}>
                        <svg className="mx-1 w-8 " viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.24000000000000005" />
                          <g id="SVGRepo_iconCarrier">
                            <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" strokeWidth="0.552" strokeLinecap="round" strokeLinejoin="round" />
                          </g>
                        </svg>
                      </a>
                    </Dropdown> : <a className="p-0" onClick={() => setModal2Open(true)}><svg className="mx-3 w-9 " viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.24000000000000005" />
                      <g id="SVGRepo_iconCarrier">
                        <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" strokeWidth="0.552" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                    </svg>
                    </a>}
                    <Link to={"/user/cart"}>
                    <Badge count={getCart.items.length} showZero>
                      <svg className="mx-1 w-8 " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                      <g id="SVGRepo_iconCarrier">
                        <path d="M16 8H17.1597C18.1999 8 19.0664 8.79732 19.1528 9.83391L19.8195 17.8339C19.9167 18.9999 18.9965 20 17.8264 20H6.1736C5.00352 20 4.08334 18.9999 4.18051 17.8339L4.84718 9.83391C4.93356 8.79732 5.80009 8 6.84027 8H8M16 8H8M16 8L16 7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7L8 8M16 8L16 12M8 8L8 12" stroke="#000000" strokeWidth="0.4800000000000001" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                    </svg>
                    </Badge>
                    </Link>
                    <a href="#"><svg className="mx-1 w-8 " viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.6640000000000001" stroke="#000000" fill="none">
                      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                      <g id="SVGRepo_iconCarrier">
                        <path d="M9.06,25C7.68,17.3,12.78,10.63,20.73,10c7-.55,10.47,7.93,11.17,9.55a.13.13,0,0,0,.25,0c3.25-8.91,9.17-9.29,11.25-9.5C49,9.45,56.51,13.78,55,23.87c-2.16,14-23.12,29.81-23.12,29.81S11.79,40.05,9.06,25Z">
                        </path>
                      </g>
                    </svg></a>
                  </div>
                </li>
                <li>
                  <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</a>
                </li>
                <li>
                  <button id="mega-menu-full-dropdown-button" data-collapse-toggle="mega-menu-full-dropdown" className="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">Company
                    <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
                    </svg></button>
                </li>
                <li>
                  <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">Marketplace</a>
                </li>
                <li>
                  <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">Resources</a>
                </li>
                <li>
                  <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                </li>
                <li>
                  <div className="w-full flex justify-between sm:text-gray-600 border border-solid rounded-full border-lime-950 sm:hidden mb-4">
                    <Select defaultValue={'Tìm kiếm theo'} onChange={(e) => dispatch(setSearchType(e))} placeholder='Tìm theo' options={optionsSearch} />
                    <input type="search" name="serch" onChange={(e)=>{
                      dispatch(setSearchTerm(e.target.value))
                      dispatch(selectCategory(null))
                    }} placeholder="Search" className="w-4/5 h-10 px-5 ml-4 text-sm bg-white border-white shadow-none search-home focus:outline-none focus:rounded-full focus-within:border-none" />
                    <button type="submit" className="mr-5">
                      <svg className="w-4 h-4 fill-lime-950" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" enableBackground={'new 0 0 56.966 56.966'} xmlSpace="preserve" width="512px" height="512px">
                        <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                      </svg>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div id="mega-menu-full-dropdown" className="mt-1 bg-white border-gray-200 shadow-sm border-y dark:bg-gray-800 dark:border-gray-600 hidden">
            <div className="grid max-w-screen-xl px-4 py-5 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:grid-cols-3 md:px-6">
              <ul aria-labelledby="mega-menu-full-dropdown-button">
                <li>
                  <a href="#" className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="font-semibold">Online Stores</div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Connect with third-party
                      tools that
                      you're already using.</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="font-semibold">Segmentation</div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Connect with third-party
                      tools that
                      you're already using.</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="font-semibold">Marketing CRM</div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Connect with third-party
                      tools that
                      you're already using.</span>
                  </a>
                </li>
              </ul>
              <ul>
                <li>
                  <a href="#" className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="font-semibold">Online Stores</div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Connect with third-party
                      tools that
                      you're already using.</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="font-semibold">Segmentation</div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Connect with third-party
                      tools that
                      you're already using.</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="font-semibold">Marketing CRM</div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Connect with third-party
                      tools that
                      you're already using.</span>
                  </a>
                </li>
              </ul>
              <ul className="hidden md:block">
                <li>
                  <a href="#" className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="font-semibold">Audience Management</div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Connect with third-party
                      tools that
                      you're already using.</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="font-semibold">Creative Tools</div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Connect with third-party
                      tools that
                      you're already using.</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="font-semibold">Marketing Automation</div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Connect with third-party
                      tools that
                      you're already using.</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="flex items-center justify-center w-4/5 mx-auto wrapper-logo-bar flex-col sm:flex-row">
          <Link to={'/home'} className="hidden logo sm:block "><img src="https://res.cloudinary.com/dqzopvk2t/image/upload/v1697453349/z3s7ujxvlpkssanl9o6t.png" alt="true" width="240px" /></Link>
          <div className="hidden sm:flex justify-between sm:text-gray-600 border border-solid rounded-full border-lime-950 sm:hidden w-fit mb-4">
            <Select defaultValue={'Tìm kiếm theo'} onChange={(e) => dispatch(setSearchType(e))} placeholder='Tìm theo' options={optionsSearch} />
            <input type="search" name="serch" onChange={(e)=>{
                      dispatch(setSearchTerm(e.target.value))
                      dispatch(selectCategory(null))
                    }} placeholder="Search" className="w-4/5 h-10 px-5 ml-4 text-sm bg-white border-white shadow-none search-home focus:outline-none focus:rounded-full focus-within:border-none" />
            <button type="submit" className="mr-5" onClick={()=>handleSearch()}>
              <svg className="w-4 h-4 fill-lime-950" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" enableBackground={'new 0 0 56.966 56.966'} xmlSpace="preserve" width="512px" height="512px">
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>
          {/* <div className="hidden sm:block mr-5"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="2em"
      viewBox="0 0 448 512">
      <path
        d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
    </svg></a>
    </div> */}
            <div className="search-container sm:w-1/2">
            <div className="hidden sm:flex sm:justify-between  text-gray-600 border border-solid rounded-full border-lime-950">
            <Select defaultValue={'Tìm theo'} onChange={(e) => dispatch(setSearchType(e))} placeholder='Tìm theo' options={optionsSearch} />
            <input type="search" name="serch" onChange={(e)=>{
                      dispatch(setSearchTerm(e.target.value))
                      dispatch(selectCategory(null))
                    }} placeholder="Search" className="w-4/5 h-10 px-5 ml-4 text-sm bg-white border-white shadow-none search-home focus:outline-none focus:rounded-full focus-within:border-none" />
            <button type="submit" className="mr-5" onClick={()=>handleSearch()}>
              <svg className="w-4 h-4 fill-lime-950" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" enableBackground={'new 0 0 56.966 56.966'} xmlSpace="preserve" width="512px" height="512px">
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>
          <div className='search-result w-full relative hidden'>
            <div className='text-center h-32 absolute z-50 bg-white border left-0 right-0 rounded-md mt-2'>Loading ...</div>
          </div>
            </div>
          <div className="hidden sm:flex sm:mb-3 wrapper-user-cart-wishlist">
            {authState.isLoggedIn ? <Dropdown placement="bottom" arrow={{ pointAtCenter: true }} menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <svg className="mx-1 w-8 " viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.24000000000000005" />
                  <g id="SVGRepo_iconCarrier">
                    <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" strokeWidth="0.552" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                </svg>
              </a>
            </Dropdown> : <a className="p-0" onClick={() => setModal2Open(true)}><svg className="mx-3 w-9 " viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.24000000000000005" />
              <g id="SVGRepo_iconCarrier">
                <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" strokeWidth="0.552" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
            </a>}
            <Link to={"/user/cart"} className="p-0" >
            <Badge  size="small" count={getCart.items.length} showZero>
              <svg className="mx-1 w-9 " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
              <g id="SVGRepo_iconCarrier">
                <path d="M16 8H17.1597C18.1999 8 19.0664 8.79732 19.1528 9.83391L19.8195 17.8339C19.9167 18.9999 18.9965 20 17.8264 20H6.1736C5.00352 20 4.08334 18.9999 4.18051 17.8339L4.84718 9.83391C4.93356 8.79732 5.80009 8 6.84027 8H8M16 8H8M16 8L16 7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7L8 8M16 8L16 12M8 8L8 12" stroke="#000000" strokeWidth="0.4800000000000001" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
            </Badge>
            </Link>
            <a className="p-0" href="#"><svg className="mx-3 w-9 " viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.6640000000000001" stroke="#000000" fill="none">
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
              <g id="SVGRepo_iconCarrier">
                <path d="M9.06,25C7.68,17.3,12.78,10.63,20.73,10c7-.55,10.47,7.93,11.17,9.55a.13.13,0,0,0,.25,0c3.25-8.91,9.17-9.29,11.25-9.5C49,9.45,56.51,13.78,55,23.87c-2.16,14-23.12,29.81-23.12,29.81S11.79,40.05,9.06,25Z">
                </path>
              </g>
            </svg>
            </a>
          </div>
        </div>
        <nav className="w-4/5 py-4 mx-auto">
          <div className="nav-header">
            <ul className="hidden justify-between  lg:w-4/5 xl:text-sm  font-medium sm:flex sm:text-xs">
              <li className="px-1 lg:px-4 py-2 lg:border-r lg:border-x-neutral-600"><Link to={'/home'} className="uppercase" >Trang
                chủ</Link></li>
              <li className="px-1 lg:px-4 py-2 lg:border-x lg:border-x-neutral-600"><a className="uppercase" href="#">Mới ra
                mắt</a></li>
              <li className="px-1 lg:px-4 py-2 lg:border-x lg:border-x-neutral-600">
              <Link to={'/products'} className="uppercase" >Sản phẩm</Link>
              </li>
              <li className="px-1 lg:px-4 py-2 lg:border-x lg:border-x-neutral-600"><a className="uppercase" href="#">Bán
                chạy</a></li>
              <li className="px-1 lg:px-4 py-2 lg:border-x lg:border-x-neutral-600"><a className="uppercase" href="#">trẻ em</a>
              </li>
              <li className="px-1 lg:px-4 py-2 lg:border-x lg:border-x-neutral-600"><a className="uppercase" href="#">Lưu
                niệm</a></li>
              <li className="px-1 lg:px-4 py-2 lg:border-l lg:border-x-neutral-600"><a className="uppercase" href="#">Khuyến
                mại</a></li>
            </ul>
          </div>
        </nav>
      </header>
      <Modal
        title={<img className='w-40 flex justify-center' src='https://res.cloudinary.com/dqzopvk2t/image/upload/v1697453349/z3s7ujxvlpkssanl9o6t.png' />}
        centered
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        open={modal2Open}
        onCancel={() => setModal2Open(false)}
      >
        <Tabs centered destroyInactiveTabPane={true} defaultActiveKey="1" items={tabItems} onChange={onChange} />

      </Modal>
      <Outlet />
      <footer className="bg-white dark:bg-gray-900">
        <div className="w-full max-w-screen-xl p-4 py-6 mx-auto lg:py-8">
          <div className="md:flex md:justify-between lg:justify-evenly">
            <div className="mb-6 md:mb-0">
              <Link to={'/home'} className="flex items-center">
                <img src="https://res.cloudinary.com/dqzopvk2t/image/upload/v1697453349/z3s7ujxvlpkssanl9o6t.png" className="h-20 mr-3" alt="FlowBite Logo" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources
                </h2>
                <ul className="font-medium text-gray-500 dark:text-gray-400">
                  <li className="mb-4">
                    <a href="https://flowbite.com/" className="hover:underline">Flowbite</a>
                  </li>
                  <li>
                    <a href="https://tailwindcss.com/" className="hover:underline">Tailwind CSS</a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us
                </h2>
                <ul className="font-medium text-gray-500 dark:text-gray-400">
                  <li className="mb-4">
                    <a href="https://github.com/themesberg/flowbite" className="hover:underline ">Github</a>
                  </li>
                  <li>
                    <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">Discord</a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal
                </h2>
                <ul className="font-medium text-gray-500 dark:text-gray-400">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
            </span>
            <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                  <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">Facebook page</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                  <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                </svg>
                <span className="sr-only">Discord community</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                  <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">Twitter page</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">GitHub account</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">Dribbble account</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

    </>
  )
}

export default LayoutClient