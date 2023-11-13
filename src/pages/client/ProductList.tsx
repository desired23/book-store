import { Button, Card, Form, Input, InputNumber, List, Rate, Select, Space } from 'antd'
import React, { useEffect } from 'react'
import { useGetProductsQuery } from '../../api/product';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { loadBooks } from '../../store/book/productSlice';
import { IBook } from '../../interfaces/book';
import { Link } from 'react-router-dom';
import { useGetCategoriesQuery } from '../../api/category';
import { loadCategories } from '../../store/category/categorySlice';
import numeral from 'numeral';
import { useGetAuthorsQuery } from '../../api/author';
const ProductList = () => {
  const dispatch = useDispatch()
  const { data: bookData } = useGetProductsQuery()
  const { data: categoryData } = useGetCategoriesQuery()
  const { data: authors } = useGetAuthorsQuery()

  const books = useSelector((state: RootState) => state.products.books);
  const favoriteCategories = useSelector((state: RootState) => state.categories.categories);
  useEffect(() => {
    if (bookData && bookData.length > 0) {
      dispatch(loadBooks(bookData))
    }
    if (categoryData && categoryData.length > 0) {
      dispatch(loadCategories(categoryData))
    }

  }, [bookData, categoryData])
  const handleDiscount = (item: IBook) => {
    const result = (((item.price - item.discount) / item.price) * 100).toFixed()
    return result
  }
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  return (
    <main className="w-4/5 mx-auto">
      {/* component */}
      <section className="bg-white dark:bg-gray-900">
        <div className="container  py-10 mx-auto">
          <h1 className="w-48 h-2 mx-auto bg-gray-200 rounded-lg dark:bg-gray-700" />
          <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
          <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg sm:w-80 dark:bg-gray-700" />
          <div className="relative block text-right">
            <div>
              <button type="button" className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" id="menu-button" aria-expanded="false" aria-haspopup="true">
                Sort
                <svg className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
              <div className="py-1" role="none">

                <a href="#" className="font-medium text-gray-900 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-0">Most Popular</a>
                <a href="#" className="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-1">Best Rating</a>
                <a href="#" className="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-2">Newest</a>
                <a href="#" className="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-3">Price: Low to High</a>
                <a href="#" className="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-4">Price: High to Low</a>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between ">
            <div className="xl:block  w-1/4 filter-sidebar hidden">
              <div>
                <h3 className='uppercase text-xs text-lime-900 font-bold'>Danh mục phổ biến</h3>
                <ul className='pl-2'>
                  {favoriteCategories?.map((item) => {
                    console.log(favoriteCategories);
                    if (item.books?.some((item: IBook) => Number(item.soldCount) > 100)) {
                      console.log("ok")
                      return <li key={item._id}>
                        <Link className=' uppercase text-xs text-lime-900' to={`/products/category/${item._id}`}>{item.name}</Link>
                      </li>
                    }
                  })}
                </ul>
              </div>
              <div className=''>
                <h3 className='uppercase text-xs text-lime-900 font-bold py-3'>Đánh giá</h3>
                <div className='uppercase text-xs text-lime-900'><Rate className='text-xs' disabled defaultValue={3} />  từ 3 sao</div>
                <div className='uppercase text-xs text-lime-900'><Rate className='text-xs' disabled defaultValue={4} />  từ 4 sao</div>
                <div className='uppercase text-xs text-lime-900'><Rate className='text-xs' disabled defaultValue={5} />  từ 5 sao</div>
              </div>
              <div>
                <h3 className='uppercase text-xs text-lime-900 font-bold py-3'>Mức giá</h3>
                <span className='uppercase text-[11px]'>Chọn khoảng giá</span>
                <Form
                  name="basic"
                  wrapperCol={{ span: 16 }}
                  style={{ maxWidth: 600 }}
                  initialValues={{}}
                  onFinish={onFinish}
                  autoComplete="off"
                  layout='horizontal'
                >

                  <Space.Compact block>
                    <InputNumber
                      controls={false}
                      parser={(value) => numeral(value).value()}
                      formatter={(value) => numeral(value).format('0,0')} style={{ width: 100, textAlign: 'center' }} placeholder="Từ" />
                    <Input
                      className="site-input-split"
                      style={{
                        backgroundColor: 'white',
                        width: 30,
                        border: 'solid 1px',
                        // borderLeft: 1 ,
                        // borderRight: 1,
                        pointerEvents: 'none',
                      }}
                      placeholder="-"
                      disabled
                    />
                    <InputNumber
                      parser={(value) => numeral(value).value()}
                      formatter={(value) => numeral(value).format('0,0')}
                      controls={false}
                      className="site-input-right"
                      style={{
                        width: 100,
                        textAlign: 'center',
                      }}
                      placeholder="đến"
                    />
                  </Space.Compact>


                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button className='mt-2 text-xs uppercase' ghost type="primary" htmlType="submit">
                    Áp dụng
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 2,
                lg: 3,
                xl: 3,
                xxl: 6
              }}
              className='xl:w-3/4'
              pagination={{
                showSizeChanger: true,
                pageSizeOptions: ["2", "10", "50", "100", "1000"],
                position: "both"
              }}

              dataSource={books}
              renderItem={item => (
                <List.Item key={item._id}>
                  <Card key={item._id} className="flex flex-col text-center border shadow-lg row">
                    <div className="relative inline-block overflow-hidden wrap-book-addcart">
                      <a className="block book-img mw-100" href="#"><img className="mx-auto mt-4 text-center book-img" src={item.images[0].url} alt="San pham" /></a>
                      <div className="absolute bottom-0 left-0 right-0 w-full p-2 quick-add mw-100"><a className=" py-2 text-xs border rounded-lg btn-add border-lime-950" href="#">Thêm
                        nhanh</a></div>
                    </div>
                    <a href="#">
                      <h2 className="truncate px-8 text-sm font-medium overflow-hidden">{item.title}</h2>
                    </a>
                    <a href="#">
                      <p className="text-sm text-stone-400 ">{item.authorId.map(item => (<a key={item._id} href='#'>{item.name}</a>))}</p>
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
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </div>
      </section>
    </main>

  )
}

export default ProductList