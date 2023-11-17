import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { IBook } from '../../interfaces/book';
import { loadBooks } from '../../store/book/productSlice';
import { useGetProductByIdQuery, useGetProductsQuery } from '../../api/product';
import Slider, { CustomArrowProps } from 'react-slick';
import { Button, Image, InputNumber, Rate, message } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { Form } from 'antd';
import { useAddToCartMutation, useGetCartQuery } from '../../api/cart';
import { addToCartLocal } from '../../store/cart/cartSlice';

const ProductDetail = () => {
  const user = useSelector((state: RootState) => state.user)
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }: CustomArrowProps) => (
    <button
      {...props}
      className={
        "slick-prev slick-arrow" +
        (currentSlide === 0 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
      type="button"
    >
      <i className='fa fa-angle-left' aria-hidden='true'></i>
    </button>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }: CustomArrowProps) => (
    <button
      {...props}
      className={
        "slick-next slick-arrow" +
        (currentSlide === slideCount - 1 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
      type="button"
    >
      <i className='fa fa-angle-right' aria-hidden='true'></i>
    </button>
  );
  const settings = {
    // autoplay: true,
    initialSlide: 2,
    dots: false,
    infinite: true,
    speed: 500,
    adaptiveHeight: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 1200, // Khi màn hình có chiều rộng dưới 1200px
        settings: {
          slidesToShow: 3 // Hiển thị 3 slide
        }
      },
      {
        breakpoint: 992, // Khi màn hình có chiều rộng dưới 992px
        settings: {
          slidesToShow: 2 // Hiển thị 2 slide
        }
      },
      {
        breakpoint: 640, // Khi màn hình có chiều rộng dưới 768px
        settings: {
          slidesToShow: 1 // Hiển thị 1 slide
        }
      }
    ]
  };
  const dispatch = useDispatch()
  const books = useSelector((state: RootState) => state.products.books);
  const { refetch: refetchCart } = useGetCartQuery();
  const { id } = useParams()
  const { data: book } = useGetProductByIdQuery(id!)
  const [addToCart] = useAddToCartMutation()
  const handleDiscount = (item: IBook) => {
    const result = ((item.price - item.discount) / item.price).toFixed()
    return result
  }
  const onFinish = (values: { quantity: number }) => {
    if (user.isLoggedIn && id) {
      addToCart({
        bookId: id,
        quantity: values.quantity,
        price: book?.discount
      })
      refetchCart()
      message.success('addToCart Success')
    } else if (book) {

      dispatch(addToCartLocal({
        book: book,
        quantity: values.quantity
      }))
      message.success('addToCartLocal Success')
    }
  };
  return (
    <main className="w-4/5 mx-auto">
      {/* component */}
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 pt-16  mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <Image alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={book?.images[0].url} />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{book?.title}
                <h2 className="text-xs title-font text-gray-500 tracking-widest">{book?.categoryId.map(item => (<Link key={item._id} to={`/products/category/${item._id}`}>{item.name} </Link>))} </h2>
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  {
                    book?.averageRating != null ? <><Rate className='text-sm' disabled defaultValue={Number(book?.averageRating)} /><span className="text-gray-600 ml-3 text-sm">4 Reviews</span></> : <span className="text-gray-600 ml-3 text-sm">Chưa có đánh giá</span>
                  }


                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z">
                      </path>
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z">
                      </path>
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z">
                      </path>
                    </svg>
                  </a>
                </span>

              </div>
              <p className="leading-relaxed text-xs lg:text-sm h-20 overflow-hidden">{book?.description}</p>
              <div className='flex items-center jus'>
                <div className="flex  py-4">
                  <p className="text-lg font-bold text-red-500 ">{book?.discount.toLocaleString("vi-VN")}₫</p>
                  <p className="text-xs">- {book ? handleDiscount(book) : 0} %</p>
                </div>
                {/* <div className='text-sm text-gray-500 ml-6'>Số lượng {book?.stock}</div> */}
                <div className='text-sm text-gray-500 ml-10 flex'>
                  <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/d9e992985b18d96aab90969636ebfd0e.png" alt="" width={'32px'} /> Miễn phí vận chuyển</div>

              </div>

              <div className="flex mt-5">

                <Form initialValues={{quantity: 1}} name="" onFinish={onFinish} layout='inline'>
                  <Form.Item
                    label="Số lượng"
                    name="quantity"
                  >
                    <InputNumber  max={book?.stock} controls={true} style={{ maxWidth: "80%" }} />
                  </Form.Item>
                  <Button danger type="primary" htmlType="submit">Thêm vào giỏ hàng</Button>
                  <div></div>
                </Form>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z">
                    </path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="review w-full flex-col flex lg:flex-row">
        <div className=" flex justify-center items-center min-h-screen p-10 w-4/6">
          <div className="px-10 flex flex-col gap-2 p-5  text-lime-950">
            <h1 className="py-5 text-lg">Reviews</h1>
            {/* <div className="hidden sm:flex sm:justify-between sm:w-3/4 text-gray-600 border border-solid rounded-full border-lime-950">
          <input type="search" name="serch" placeholder="Search" className="w-4/5 h-10 px-5 ml-4 text-sm bg-white border-white shadow-none search-home focus:outline-none focus:rounded-full focus-within:border-none" />
          <button type="submit" className="mr-5">
            <svg className="w-4 h-4 fill-lime-950" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style={{enableBackground: "new 0 0 56.966 56.966"}} xmlSpace="preserve" width="512px" height="512px">
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z">
              </path>
            </svg>
          </button>
        </div> */}
            {/* Tags */}
            <div className="flex flex-wrap gap-2 w-full py-2">
              <span className="px-2 p-1 hover:border-lime-900 border rounded-full bg-opacity-30">Experience</span>
              <span className="px-2 p-1 hover:border-lime-900 border rounded-full bg-opacity-30">Quality</span>
              <span className="px-2 p-1 hover:border-lime-900 border rounded-full bg-opacity-30">Design</span>
              <span className="px-2 p-1 hover:border-lime-900 border rounded-full bg-opacity-30">Size</span>
              <span className="px-2 p-1 hover:border-lime-900 border rounded-full bg-opacity-30">Features</span>
              <span className="px-2 p-1 hover:border-lime-900 border rounded-full bg-opacity-30">Value</span>
              <span className="px-2 p-1 hover:border-lime-900 border rounded-full bg-opacity-30">Relplacement</span>
            </div>
            {/* Item Container */}
            <div className="flex flex-col gap-3 mt-14 overflow-scroll scrollbar h-96 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="inline-block relative">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <img className="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover" src="https://picsum.photos/id/646/200/200" alt="Profile picture" />
                      <div className="absolute top-0 left-0 w-full h-full rounded-full shadow-inner">
                      </div>
                    </div>
                    <svg className="fill-current text-white bg-green-600 rounded-full p-1 absolute bottom-0 right-0 w-6 h-6 -mx-1 -my-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M19 11a7.5 7.5 0 0 1-3.5 5.94L10 20l-5.5-3.06A7.5 7.5 0 0 1 1 11V3c3.38 0 6.5-1.12 9-3 2.5 1.89 5.62 3 9 3v8zm-9 1.08l2.92 2.04-1.03-3.41 2.84-2.15-3.56-.08L10 5.12 8.83 8.48l-3.56.08L8.1 10.7l-1.03 3.4L10 12.09z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-6">
                  <p className="flex items-baseline text-sm">
                    <span className="text-gray-600 font-bold">Mary T.</span>
                    <span className="ml-2 text-green-600 text-xs">Verified Buyer</span>
                  </p>
                  <div className="flex items-center mt-1">
                    <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg className="w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  </div>
                  <div className="flex items-center mt-4 text-gray-600">
                    <div className="flex items-center text-xs">
                      <span className="text-sm">Product Quality</span>
                      <div className="flex items-center ml-2">
                        <svg className="w-3 h-3 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg className="w-3 h-3 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg className="w-3 h-3 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg className="w-3 h-3 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg className="w-3 h-3 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center ml-4">
                      <span className="text-sm">Purchasing Experience</span>
                      <div className="flex items-center ml-2">
                        <svg className="w-3 h-3 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg className="w-3 h-3 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg className="w-3 h-3 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg className="w-3 h-3 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg className="w-3 h-3 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-sm">
                    <span className="font-bold">Sapien consequat eleifend!</span>
                    <p className="mt-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis
                      aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur.</p>
                  </div>
                  <div className="flex items-center justify-between mt-4 text-sm text-gray-600 fill-current">
                    <button className="flex items-center">
                      <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M5.08 12.16A2.99 2.99 0 0 1 0 10a3 3 0 0 1 5.08-2.16l8.94-4.47a3 3 0 1 1 .9 1.79L5.98 9.63a3.03 3.03 0 0 1 0 .74l8.94 4.47A2.99 2.99 0 0 1 20 17a3 3 0 1 1-5.98-.37l-8.94-4.47z" />
                      </svg>
                      <span className="ml-2">Share</span>
                    </button>
                    <div className="flex items-center">
                      <span>Was this review helplful?</span>
                      <button className="flex items-center ml-6">
                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M11 0h1v3l3 7v8a2 2 0 0 1-2 2H5c-1.1 0-2.31-.84-2.7-1.88L0 12v-2a2 2 0 0 1 2-2h7V2a2 2 0 0 1 2-2zm6 10h3v10h-3V10z" />
                        </svg>
                        <span className="ml-2">56</span>
                      </button>
                      <button className="flex items-center ml-4">
                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M11 20a2 2 0 0 1-2-2v-6H2a2 2 0 0 1-2-2V8l2.3-6.12A3.11 3.11 0 0 1 5 0h8a2 2 0 0 1 2 2v8l-3 7v3h-1zm6-10V0h3v10h-3z" />
                        </svg>
                        <span className="ml-2">10</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="inline-block relative">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <img className="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover" src="https://picsum.photos/id/646/200/200" alt="Profile picture" />
                      <div className="absolute top-0 left-0 w-full h-full rounded-full shadow-inner">
                      </div>
                    </div>
                    <svg className="fill-current text-white bg-green-600 rounded-full p-1 absolute bottom-0 right-0 w-6 h-6 -mx-1 -my-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M19 11a7.5 7.5 0 0 1-3.5 5.94L10 20l-5.5-3.06A7.5 7.5 0 0 1 1 11V3c3.38 0 6.5-1.12 9-3 2.5 1.89 5.62 3 9 3v8zm-9 1.08l2.92 2.04-1.03-3.41 2.84-2.15-3.56-.08L10 5.12 8.83 8.48l-3.56.08L8.1 10.7l-1.03 3.4L10 12.09z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-6">
                  <p className="flex items-baseline text-sm">
                    <span className="text-gray-600 font-bold">Mary T.</span>
                    <span className="ml-2 text-green-600 text-xs">Verified Buyer</span>
                  </p>
                  <div className="flex items-center mt-1">
                    <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg className="w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  </div>
                  <div className="flex items-center mt-4 text-gray-600">
                    <div className="flex items-center text-xs">
                      <span className="text-sm">Product Quality</span>
                      <div className="flex items-center ml-2">
                        <svg className="w-3 h-3 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg className="w-3 h-3 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg className="w-3 h-3 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg className="w-3 h-3 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg className="w-3 h-3 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center ml-4">
                      <span className="text-sm">Purchasing Experience</span>
                      <div className="flex items-center ml-2">
                        <svg className="w-3 h-3 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg className="w-3 h-3 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg className="w-3 h-3 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg className="w-3 h-3 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg className="w-3 h-3 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-sm">
                    <span className="font-bold">Sapien consequat eleifend!</span>
                    <p className="mt-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis
                      aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur.</p>
                  </div>
                  <div className="flex items-center justify-between mt-4 text-sm text-gray-600 fill-current">
                    <button className="flex items-center">
                      <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M5.08 12.16A2.99 2.99 0 0 1 0 10a3 3 0 0 1 5.08-2.16l8.94-4.47a3 3 0 1 1 .9 1.79L5.98 9.63a3.03 3.03 0 0 1 0 .74l8.94 4.47A2.99 2.99 0 0 1 20 17a3 3 0 1 1-5.98-.37l-8.94-4.47z" />
                      </svg>
                      <span className="ml-2">Share</span>
                    </button>
                    <div className="flex items-center">
                      <span>Was this review helplful?</span>
                      <button className="flex items-center ml-6">
                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M11 0h1v3l3 7v8a2 2 0 0 1-2 2H5c-1.1 0-2.31-.84-2.7-1.88L0 12v-2a2 2 0 0 1 2-2h7V2a2 2 0 0 1 2-2zm6 10h3v10h-3V10z" />
                        </svg>
                        <span className="ml-2">56</span>
                      </button>
                      <button className="flex items-center ml-4">
                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M11 20a2 2 0 0 1-2-2v-6H2a2 2 0 0 1-2-2V8l2.3-6.12A3.11 3.11 0 0 1 5 0h8a2 2 0 0 1 2 2v8l-3 7v3h-1zm6-10V0h3v10h-3z" />
                        </svg>
                        <span className="ml-2">10</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="inline-block relative">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <img className="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover" src="https://picsum.photos/id/646/200/200" alt="Profile picture" />
                      <div className="absolute top-0 left-0 w-full h-full rounded-full shadow-inner">
                      </div>
                    </div>
                    <svg className="fill-current text-white bg-green-600 rounded-full p-1 absolute bottom-0 right-0 w-6 h-6 -mx-1 -my-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M19 11a7.5 7.5 0 0 1-3.5 5.94L10 20l-5.5-3.06A7.5 7.5 0 0 1 1 11V3c3.38 0 6.5-1.12 9-3 2.5 1.89 5.62 3 9 3v8zm-9 1.08l2.92 2.04-1.03-3.41 2.84-2.15-3.56-.08L10 5.12 8.83 8.48l-3.56.08L8.1 10.7l-1.03 3.4L10 12.09z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-6">
                  <p className="flex items-baseline text-sm">
                    <span className="text-gray-600 font-bold">Mary T.</span>
                    <span className="ml-2 text-green-600 text-xs">Verified Buyer</span>
                  </p>
                  <div className="flex items-center mt-1">
                    <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <svg className="w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  </div>
                  <div className="flex items-center mt-4 text-gray-600">
                    <div className="flex items-center text-xs">
                      <span className="text-sm">Product Quality</span>
                      <div className="flex items-center ml-2">
                        <svg className="w-3 h-3 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg className="w-3 h-3 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg className="w-3 h-3 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg className="w-3 h-3 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg className="w-3 h-3 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center ml-4">
                      <span className="text-sm">Purchasing Experience</span>
                      <div className="flex items-center ml-2">
                        <svg className="w-3 h-3 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg className="w-3 h-3 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg className="w-3 h-3 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg className="w-3 h-3 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg className="w-3 h-3 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-sm">
                    <span className="font-bold">Sapien consequat eleifend!</span>
                    <p className="mt-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis
                      aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur.</p>
                  </div>
                  <div className="flex items-center justify-between mt-4 text-sm text-gray-600 fill-current">
                    <button className="flex items-center">
                      <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M5.08 12.16A2.99 2.99 0 0 1 0 10a3 3 0 0 1 5.08-2.16l8.94-4.47a3 3 0 1 1 .9 1.79L5.98 9.63a3.03 3.03 0 0 1 0 .74l8.94 4.47A2.99 2.99 0 0 1 20 17a3 3 0 1 1-5.98-.37l-8.94-4.47z" />
                      </svg>
                      <span className="ml-2">Share</span>
                    </button>
                    <div className="flex items-center">
                      <span>Was this review helplful?</span>
                      <button className="flex items-center ml-6">
                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M11 0h1v3l3 7v8a2 2 0 0 1-2 2H5c-1.1 0-2.31-.84-2.7-1.88L0 12v-2a2 2 0 0 1 2-2h7V2a2 2 0 0 1 2-2zm6 10h3v10h-3V10z" />
                        </svg>
                        <span className="ml-2">56</span>
                      </button>
                      <button className="flex items-center ml-4">
                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M11 20a2 2 0 0 1-2-2v-6H2a2 2 0 0 1-2-2V8l2.3-6.12A3.11 3.11 0 0 1 5 0h8a2 2 0 0 1 2 2v8l-3 7v3h-1zm6-10V0h3v10h-3z" />
                        </svg>
                        <span className="ml-2">10</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="comment w-2/6">
          {/* review item */}
          <div className="mx-auto bg-white shadow-lg rounded-lg my-32 px-4 py-4 ">
            <div className="mb-1 tracking-wide px-4 py-4">
              <h2 className="text-gray-800 font-semibold mt-1">67 Users reviews</h2>
              <div className="border-b -mx-8 px-8 pb-3">
                <div className="flex items-center mt-1">
                  <div className=" w-1/5 text-indigo-500 tracking-tighter">
                    <span>5 star</span>
                  </div>
                  <div className="w-3/5">
                    <div className="bg-gray-300 w-full rounded-lg h-2">
                      <div className=" w-7/12 bg-indigo-600 rounded-lg h-2" />
                    </div>
                  </div>
                  <div className="w-1/5 text-gray-700 pl-3">
                    <span className="text-sm">51%</span>
                  </div>
                </div>{/* first */}
                <div className="flex items-center mt-1">
                  <div className="w-1/5 text-indigo-500 tracking-tighter">
                    <span>4 star</span>
                  </div>
                  <div className="w-3/5">
                    <div className="bg-gray-300 w-full rounded-lg h-2">
                      <div className="w-1/5 bg-indigo-600 rounded-lg h-2" />
                    </div>
                  </div>
                  <div className="w-1/5 text-gray-700 pl-3">
                    <span className="text-sm">17%</span>
                  </div>
                </div>{/* second */}
                <div className="flex items-center mt-1">
                  <div className="w-1/5 text-indigo-500 tracking-tighter">
                    <span>3 star</span>
                  </div>
                  <div className="w-3/5">
                    <div className="bg-gray-300 w-full rounded-lg h-2">
                      <div className=" w-3/12 bg-indigo-600 rounded-lg h-2" />
                    </div>
                  </div>
                  <div className="w-1/5 text-gray-700 pl-3">
                    <span className="text-sm">19%</span>
                  </div>
                </div>{/* thierd */}
                <div className="flex items-center mt-1">
                  <div className=" w-1/5 text-indigo-500 tracking-tighter">
                    <span>2 star</span>
                  </div>
                  <div className="w-3/5">
                    <div className="bg-gray-300 w-full rounded-lg h-2">
                      <div className=" w-1/5 bg-indigo-600 rounded-lg h-2" />
                    </div>
                  </div>
                  <div className="w-1/5 text-gray-700 pl-3">
                    <span className="text-sm">8%</span>
                  </div>
                </div>{/* 4th */}
                <div className="flex items-center mt-1">
                  <div className="w-1/5 text-indigo-500 tracking-tighter">
                    <span>1 star</span>
                  </div>
                  <div className="w-3/5">
                    <div className="bg-gray-300 w-full rounded-lg h-2">
                      <div className=" w-2/12 bg-indigo-600 rounded-lg h-2" />
                    </div>
                  </div>
                  <div className="w-1/5 text-gray-700 pl-3">
                    <span className="text-sm">5%</span>
                  </div>
                </div>{/* 5th */}
              </div>
            </div>
            <div className="w-full px-4">
              <h3 className="font-medium tracking-tight">Review this item</h3>
              <p className="text-gray-700 text-sm py-1">
                give your opinion about this item.
              </p>
              <button className="bg-gray-100 border border-gray-400 px-3 py-1 rounded  text-gray-800 mt-2">write
                a review</button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="series">
    <h3 className="font-pacifico text-4xl p-4">Bộ sách</h3>
    <Slider {...settings} className="image-slider">
                {books?.map((item: IBook) => {
                  return (
                    <div className="flex flex-col text-center border shadow-lg row justify-between">
                      <div className=" inline-block overflow-hidden wrap-book-addcart">
                        <a className="book-img mw-100" href="#"><img className="mx-auto mt-4 text-center book-img" src={item.images[0].url} alt="San pham" /></a>
                        {/* <div className="absolute bottom-0 left-0 right-0 w-full pt-2 quick-add mw-100"><a className="px-2 py-2 text-xs border rounded-lg btn-add border-lime-950" href="#">Thêm
                          nhanh</a></div> */}
      {/* </div>
                      <Link to={`/products/${item._id}`}>
                        <h2 className="truncate px-8 text-sm font-medium overflow-hidden">{item.title}</h2>
                      </Link>
                      <a href="#">
                        <p className="text-xs text-stone-400 ">{item.authorId.map(item=>(<a href='#'>{item.name}</a>))}</p>
                      </a>
                      <div className="flex w-full my-2 rev-sold">
                        <Rate className='w-1/2 text-sm' disabled defaultValue={2.5} />
                        <p className="text-xs">Đã Bán {item.soldCount}</p>
                      </div>
                      <div className="flex justify-center pb-4">
                        <p className="text-sm font-bold text-red-500 ">{item.discount.toLocaleString("vi-VN")}₫</p>
                        <p className="text-xs">- {handleDiscount(item)} %</p>
                      </div>
                    </div>)
                })


                }
              </Slider> */}
      {/* </div>  */}
      <div className="same-category">
        <h3 className="font-pacifico text-4xl p-4">Cùng thể loại</h3>
        <Slider {...settings} className="image-slider">
          {books?.map((item: IBook) => {
            return (
              <div className="flex flex-col text-center border shadow-lg row justify-between">
                <div className=" inline-block overflow-hidden wrap-book-addcart">
                  <a className="book-img mw-100" href="#"><img className="mx-auto mt-4 text-center book-img" src={item.images[0].url} alt="San pham" /></a>
                  {/* <div className="absolute bottom-0 left-0 right-0 w-full pt-2 quick-add mw-100"><a className="px-2 py-2 text-xs border rounded-lg btn-add border-lime-950" href="#">Thêm
                          nhanh</a></div> */}
                </div>
                <Link to={`/products/${item._id}`}>
                  <h2 className="truncate px-8 text-sm font-medium overflow-hidden">{item.title}</h2>
                </Link>
                <a href="#">
                  <p className="text-xs text-stone-400 ">{item.authorId.map(item => (<a key={item._id} href='#'>{item.name}</a>))}</p>
                </a>
                <div className="flex w-full my-2 rev-sold">
                  <Rate className='w-1/2 text-sm' disabled defaultValue={2.5} />
                  <p className="text-xs">Đã Bán {item.soldCount}</p>
                </div>
                <div className="flex justify-center pb-4">
                  <p className="text-sm font-bold text-red-500 ">{item.discount.toLocaleString("vi-VN")}₫</p>
                  <p className="text-xs">- {handleDiscount(item)} %</p>
                </div>
              </div>)
          })


          }
        </Slider>
      </div>
    </main>

  )
}

export default ProductDetail