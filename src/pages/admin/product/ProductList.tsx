import React, { useState } from 'react';
import { Button, Divider, Popconfirm, Radio, Skeleton, Table, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useDeleteProductMutation, useGetProductsQuery } from '../../../api/product';
import { IBook } from '../../../interfaces/book';
import { CategoryIdType } from '../../../interfaces/category';
import { AuthorIdType } from '../../../interfaces/author';
import { Link } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ImageList from '../../../components/layouts/Common/imageList';
import moment from 'moment';
import Search from 'antd/es/input/Search';
import type { NotificationPlacement } from 'antd/es/notification/interface';

interface DataType {
  key: string;
  title: string;
  authorId: AuthorIdType[];
  price: number;
  description: string;
  categoryId: CategoryIdType[];
  stock: number;
  publishedAt: Date;
  updatedAt: Date;
  createdAt: Date;
}
// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.title === 'Disabled User', // Column configuration not to be checked
    name: record.title,
  }),
};
const Context = React.createContext({ name: 'Xóa' });


const ProductList = () => {
  const [searchText, setSearchText] = useState('')
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
  const { data: bookData, isLoading } = useGetProductsQuery()
  const [removeBook, { isLoading: isRemoveLoading }] = useDeleteProductMutation()


  const confirm = (id: string) => {
    console.log(id);
    removeBook(id).unwrap().then(( data ) => {
      openNotification('topRight', data?.title)
    })
  }
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: NotificationPlacement, titleProduct: string) => {
    api.success({
      message: `Thông báo`,
      description: <Context.Consumer>{({ name }) => `${name} thành công ${titleProduct}!`}</Context.Consumer>,
      placement,
    });
  };
  const columns: ColumnsType<DataType> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Author',
      dataIndex: 'authorId',
      key: 'authorId',
      render: (authorId: AuthorIdType[]) => (
        // Render danh sách tác giả dựa trên authorId
        <ul>
          {authorId.map((item) => (
            <li key={item._id}>{item.name}</li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Book Images',
      dataIndex: 'images',
      key: 'image',
      render: (text) => <ImageList images={text || [""]} />
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Category',
      dataIndex: 'categoryId',
      key: 'categoryId',
      render: (categoryId: CategoryIdType[]) => (
        // Render danh sách danh mục dựa trên categoryId
        <ul>
          {categoryId.map((item) => (
            <li key={item._id}>{item.name}</li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Published At',
      dataIndex: 'publishedAt',
      key: 'publishedAt',
      render: (text) => (
        <span>{moment(text).format('DD-MM-YYYY')}</span>
      )
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: "Action",
      key: "action",
      render: ({ key: id }) => {
        return (
          <>
            <Popconfirm
              placement="topLeft"
              title={"Are you fucking sure?"}
              onConfirm={() => confirm(id)}
              okText="Yes"
              cancelText="No"
              okButtonProps={{ style: { backgroundColor: 'red' } }}
            >
              <Button>
                {isRemoveLoading ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  "Delete"
                )}
              </Button>
            </Popconfirm>
            <Button type="primary" danger className="ml-2">
              <Link to={`/admin/product/${id}/edit`}>Edit</Link>
            </Button>
          </>
        );
      },
    },
  ];


  const data: DataType[] = (Array.isArray(bookData) ? bookData : []).filter(item => item.title.toLowerCase().includes(searchText.toLowerCase())).map((item: IBook) => ({
    key: item._id || 'defaultKey',
    title: item.title,
    authorId: item.authorId,
    price: item.price,
    description: item.description,
    categoryId: item.categoryId,
    images: item.images,
    stock: item.stock,
    publishedAt: item.publishedAt,
    updatedAt: item.updatedAt,
    createdAt: item.createdAt
  }))
  return (
    <>{contextHolder}
      <h2 className='text-2xl py-4'>Quản lý sản phẩm</h2>
      <div>
        <Radio.Group
          onChange={({ target: { value } }) => {
            setSelectionType(value);
          }}
          value={selectionType}
        >
          <Radio value="checkbox">Checkbox</Radio>
          <Radio value="radio">radio</Radio>
        </Radio.Group>
        <>
          <Popconfirm
            placement="topRight"
            title={"Are you fucking sure?"}
            okText="Yes"
            cancelText="No"
          >
            <Button>
              {isRemoveLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                "Xóa đã chọn"
              )}
            </Button>
          </Popconfirm>
          <Button type="primary" ghost className="ml-2">
            <Link to={`/admin/products/add`}>Thêm mới</Link>
          </Button>
        </>
        <Divider />
        <Search className='w-1/3 pb-4 ' placeholder="input search " enterButton onChange={(e) => setSearchText(e.target.value)} />
        {isLoading ? <Skeleton /> : <Table className='w-fit'
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
        />}

      </div>
    </>

  );
}

export default ProductList