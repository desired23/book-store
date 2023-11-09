import { Rate } from 'antd';
import React, { useEffect } from 'react'
import Slider, { CustomArrowProps } from "react-slick";
import { useGetProductsQuery } from '../../api/product';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { loadBooks } from '../../store/book/productSlice';
import { IBook } from '../../interfaces/book';
import { Link } from 'react-router-dom';

const HomePage = () => {
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
  const { data: bookData } = useGetProductsQuery()
  const books = useSelector((state: RootState) => state.products.books);
  useEffect(() => {
    if (bookData && bookData.length > 0) {
      dispatch(loadBooks(bookData))
    }
  }, [bookData])


  const discountedBooks = books.filter(item => item.discount - item.price< 0)
  const highlyRatedBooks = books.filter(item => Number(item.averageRating) > 4)
  const topSellingBooks = books.filter(item => Number(item.soldCount) > 100)



  const handleDiscount = (item: IBook) => {
    const result = (((item.price - item.discount) / item.price)*100).toFixed()
    console.log(result);
    return result
  }
  return (
    <main className="w-4/5 mx-auto">
      <div className="items-center slider-and-banner lg:mx-auto ">
        <div className="slider">
          <div id="indicators-carousel" className="relative w-full " data-carousel="static">
            {/* Carousel wrapper */}
            <div className="relative overflow-hidden rounded-lg h-80 ">
              {/* Item 1 */}
              <div className="hidden duration-700 ease-in-out fit-slider-img" data-carousel-item="active">
                <a href="#"><img src="https://images-production.bookshop.org/spree/promo_banner_slides/desktop_images/290/original/Absolution_-_Hero_Banner_-_2048x600_v3_%281%29.jpg?1698764432" className="absolute block w-full h-full max-w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." /></a>
              </div>
              {/* Item 2 */}
              <div className="hidden duration-700 ease-in-out fit-slider-img" data-carousel-item>
                <a href="#"><img src="https://images-production.bookshop.org/spree/promo_banner_slides/desktop_images/289/original/MADDOW_Prequel_HC_bookshop_hero_desk_2048x600.jpg?1698764399" className="absolute block w-full h-full max-w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." /></a>
              </div>
              {/* Item 3 */}
              <div className="hidden duration-700 ease-in-out fit-slider-img" data-carousel-item>
                <a href="#"><img src="https://dispatch.barnesandnoble.com/content/dam/ccr/homepage/daily/2023/09/21/27547_Quote_A1_Booker-Prize-Shortlist_09-21.jpg" className="absolute block w-full h-full max-w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." /></a>
              </div>
            </div>
            {/* Slider indicators */}
            <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-9 left-1/2">
              <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to={0} />
              <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to={1} />
              <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to={2} />
            </div>
            {/* Slider controls */}
            <button className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 1 1 5l4 4" />
                </svg>
                <span className="sr-only">Previous</span>
              </span>
            </button>
            <button className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                </svg>
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>
        </div>
      </div>


      <div className="my-4 trending-home">
        <div className="p-4 title-section">
          <h3 className="text-4xl text-lime-950 font-pacifico">Giảm giá</h3>
          <p className="mt-4 text-lime-950">Đừng bỏ lỡ cơ hội sở hữu những cuốn sách yêu thích với giá ưu đãi </p>
        </div>
        <div className="tab-category">
          <div className="tab-content">
            <div className="tab-pane active">
              <div className="pb-4 text-right underline"><a className="text-sm hover:text-lime-950" href="#">Xem tất cả</a></div>
              <Slider {...settings} className="image-slider">
                {discountedBooks?.map((item: IBook) => {
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
                        <p className="text-xs text-stone-400 ">{item.authorId.map(item => (<a href='#'>{item.name}</a>))}</p>
                      </a>
                      <div className="flex w-full my-2 rev-sold">
                        {
                          item?.averageRating != null ? <Rate className='text-sm' disabled defaultValue={Number(item?.averageRating)} /> : <span className="text-gray-600 ml-3 text-sm hidden"></span>
                        }
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
          </div>
        </div>
      </div>
      <div className="hidden sm:block mid-banner">
        <a href="#"><img className="w-full" src="https://dispatch.barnesandnoble.com/content/dam/ccr/homepage/daily/2023/11/03B/27930_BB_B_BestBooksof2023_11-03.jpg" /></a>
      </div>
      <div className="my-4 trending-home">
        <div className="p-4 title-section">
          <h3 className="text-4xl text-lime-950 font-pacifico">Bán chạy</h3>
          <p className="mt-4 text-lime-950">Các cuốn sách bán chạy nhất trên thị trường! </p>
        </div>
        <div className="tab-category">
          <div className="tab-content">
            <div className="tab-pane active">
              <div className="pb-4 text-right underline"><a className="text-sm hover:text-lime-950" href="#">Xem tất cả</a></div>
              <Slider {...settings} className="image-slider">
                {topSellingBooks?.map((item: IBook) => {
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
                        <p className="text-xs text-stone-400 ">{item.authorId.map(item => (<a href='#'>{item.name}</a>))}</p>
                      </a>
                      <div className="flex w-full my-2 rev-sold">
                                                {
                          item?.averageRating != null ? <Rate className='text-sm' disabled defaultValue={Number(item?.averageRating)} /> : <span className="text-gray-600 ml-3 text-sm hidden"></span>
                        }
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
          </div>
        </div>
      </div>
      <div className="hidden sm:block mid-banner">
        <a href="#"><img src="https://dispatch.barnesandnoble.com/content/dam/ccr/homepage/daily/2023/10/23/28068_BB_D_Membership_DigitalContentIncl_10-23.png" /></a>
      </div>
      <div className="my-4 trending-home">
        <div className="p-4 title-section">
          <h3 className="text-4xl text-lime-950 font-pacifico">Đánh giá cao</h3>
          <p className="my-4 text-lime-950">Các cuốn sách được yêu thích nhất của cộng đồng</p>
        </div>
        <div className="tab-category">
          {/* Tab items */}
          {/* <div className="gap-4 tabs overflow-x-auto text-xs text-center">
            <a className="inline-block p-2 sm:px-4 sm:py-2 rounded-full tab-item active">
              Tâm lý - Kĩ năng sống
            </a>
            <a className="inline-block p-2 sm:px-4 sm:py-2 rounded-full tab-item">
              Kinh tế
            </a>
            <a className="inline-block p-2 sm:px-4 sm:py-2 rounded-full tab-item">
              Văn học
            </a>
            <a className="inline-block p-2 sm:px-4 sm:py-2 rounded-full tab-item">
              Manga
            </a>
            <div className="line" />
          </div> */}
          {/* Tab content */}
          <div className=" sm:py-8 tab-content">
            <div className="tab-pane active">
              <div className="p-4 text-right underline"><a className="text-sm hover:text-lime-950" href="#">Xem tất cả</a></div>
              <Slider {...settings} className="image-slider">
                {highlyRatedBooks?.map((item: IBook) => {
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
                        <p className="text-xs text-stone-400 ">{item.authorId.map(item => (<a href='#'>{item.name}</a>))}</p>
                      </a>
                      <div className="flex w-full my-2 rev-sold">
                                                {
                          item?.averageRating != null ? <Rate className='text-sm' disabled defaultValue={Number(item?.averageRating)} /> : <span className="text-gray-600 ml-3 text-sm hidden"></span>
                        }
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
            <div className="tab-pane">
              <h2>Angular</h2>
              <p>Angular is an application design framework and development platform for creating
                efficient and sophisticated single-page apps.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-8 pt-4 pb-8 bg-lime-950 mx-auto sm:grid sm:grid-cols-1 sm:justify-items-center">
        <div className="p-6 bg-white border border-gray-600 sm:w-4/6 sm:rounded-md lg:w-1/2">
          <div>
            <label className="block mb-6">
              <div className="p-4 text-center title-section">
                <h3 className="text-lg text-lime-950 font-pacifico">Đăng ký nhận thông tin</h3>
                <p className="text-xs my-4 text-lime-950">Hãy nhập email để nhận những thông tin mới
                  nhất từ
                  chúng tôi</p>
              </div>
              <input name="email" type="email" className="block w-full mt-1 text-xs text-gray-300 placeholder-gray-600 bg-transparent border-gray-600 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="joe.bloggs@example.com" required />
            </label>
            <div className="mb-6">
              <div className="text-center py-1 border-lime-950 border-2 rounded-lg hover:bg-lime-950 text-lime-950 hover:text-red-50 text-sm ">
                Subscribe
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

  )
}

export default HomePage