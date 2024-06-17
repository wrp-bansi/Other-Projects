import moment from 'moment';
export const products = [
    {

      id: 1,
      productTitle: 'Product 1',
      category: 'Category A',
      price: 25,
      quantity: 1,
      sku: 112,
      stock: 10,
      status: 'In Stock',
      createDate: moment().format('DD MM YY, h:mm:ss a'),
      lastUpdateDate: moment().format('DD MM YY, h:mm:ss a'),
    },
    {
      id: 2,
      productTitle: 'Product 2',
      category: 'Category B',
      price: 19,
      quantity: 1,
      sku: 112,
      stock: 0,
      status: 'Out of Stock',
      createDate: moment().format('DD MM YY, h:mm:ss a'),
      lastUpdateDate:moment().format('DD MM YY, h:mm:ss a')
    },

    {

      id: 3,
      productTitle: 'Product 3',
      category: 'Category c',
      price: 80,
      quantity: 1,
      sku: 112,
      stock: 50,
      status: 'In Stock',
      createDate: moment().format('DD MM YY, h:mm:ss a'),
      lastUpdateDate: moment().format('DD MM YY, h:mm:ss a'),
    },
    {
      id: 4,
      productTitle: 'Product 4',
      category: 'Category d',
      price: 30,
      quantity: 1,
      sku: 112,
      stock: 0,
      status: 'Out of Stock',
      createDate: moment().format('DD MM YY, h:mm:ss a'),
      lastUpdateDate:moment().format('DD MM YY, h:mm:ss a')
    },
  ];