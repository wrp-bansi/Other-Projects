import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { decrementStock, deleteProductAsync, incrementStock, loadProducts } from '../../Slices/Users/thunk'
import { Link } from 'react-router-dom';
import ProductForm from '../../Components/Comman/ProductForm';
import { getAllProductsFromDB } from '../../Helper/indexedDB';
import './table.css';
import { CSVLink } from 'react-csv';
import Navbar from '../../Components/Comman/Navbar/Navbar';
import Sidebar from '../../Components/Comman/Sidebar/slidebar';
import { showToast } from '../../Components/Comman/Tostityfy/toast';


const InventoryTable = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.inventory.products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const filteredProducts = products.filter(product =>
    product.productTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const csvData = products.map(product => ({
    'Product Title': product.productTitle,
    'Category': product.category,
    'Price': product.price,
    'Quantity': product.quantity,
    'SKU': product.sku,
    'Stock': product.stock,
    'Status': product.status,
    'Create Date': product.createDate,
    'Last Update Date': product.lastUpdateDate,
  }));

  const toggleProductSelection = (productId) => {
    const isSelected = selectedProducts.includes(productId);
    if (isSelected) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const product = await getAllProductsFromDB();
        dispatch(loadProducts(product));
      } catch (error) {

        showToast('Error loading todos:', 'error')
      }
    };

    fetchProducts();
  }, [dispatch]);

  const editProduct = (productId) => {
    const productToEdit = products.find(product => product.id === productId);
    setIsEditing(true);
    setEditingProduct(productToEdit);
  };

  const cancelEditProduct = () => {
    setIsEditing(false);
    setEditingProduct(null);
  };

  const deleteProductoflist = (productId) => {
    showToast('Product deleted successfully!', 'success');
    dispatch(deleteProductAsync(productId));
  };

  const stockIncrement = (productId) => {
    dispatch(incrementStock(productId));
  };

  const stockDecrement = (productId) => {
    dispatch(decrementStock(productId));
  };


  return (
    <>


      <Navbar setSearchQuery={setSearchQuery} searchQuery={searchQuery} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />
      <Sidebar />
      <div className="container-fluid">
        <main style={{ marginLeft: '5px', marginTop: '100px', marginRight: '10px' }}>
          <div >
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <button className="btn btn-danger" onClick={() => {
                selectedProducts.forEach(productId => dispatch(deleteProductAsync(productId)));
                setSelectedProducts([]);
              }}>Delete All Items</button>

              <CSVLink data={csvData} filename={'inventory.csv'} className="btn btn-success">Download CSV</CSVLink>
            </div>
            {isEditing ? (
              <ProductForm isEditing={true} product={editingProduct} onCancelEdit={cancelEditProduct} />
            ) : (
              <div className="mt-3">
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Check</th>
                      <th>Product Title</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>SKU</th>
                      <th>Stock</th>
                      <th>Status</th>
                      <th>Create Product Date</th>
                      <th>Last Update Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((item, index) => (
                      <tr key={`product_${item.id}_${index}`}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(item.id)}
                            onChange={() => toggleProductSelection(item.id)}
                          />
                        </td>
                        <td >{item.productTitle}</td>
                        <td>{item.category}</td>
                        <td>{item.price}</td>
                        <td>{item.sku}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <button className="btn btn-sm btn-secondary me-2" onClick={() => stockDecrement(item.id)}>-</button>
                            <span>{item.stock}</span>
                            <button className="btn btn-sm btn-secondary ms-2" onClick={() => stockIncrement(item.id)}>+</button>
                          </div>
                        </td>
                        <td>{item.status}</td>
                        <td>{item.createDate}</td>
                        <td>{item.lastUpdateDate}</td>
                        <td>
                          <Link to={`/edit/${item.id}`} className="btn btn-outline-secondary me-2" onClick={() => editProduct(item.id)}>Edit</Link>
                          <Button variant="outline-danger" onClick={() => deleteProductoflist(item.id)}>Delete</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </div>
        </main>

      </div>
    </>
  );
};

export default InventoryTable;
