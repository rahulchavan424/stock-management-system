"use client";

import Header from '@/components/Header'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Home() {

  const [productForm, setProductForm] = useState({})
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/product')
      let jsonResponse = await response.json()
      setProducts(jsonResponse.products)
    }
    fetchProducts();
  }, [])

  const addProduct = async (e) => {

    e.preventDefault();

    try {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productForm),
      });

      if (response.ok) {
        // Product added successfully, you can handle the response as needed
        console.log('Product added successfully');
        // You might want to clear the form or update the list of products
        setProductForm({});
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleChange = (e) => {
    setProductForm({...productForm, [e.target.name]: e.target.value})
  }
 
  return (
    <>
      <Header/>
      <div className='container mx-auto p-8'>
      <h1 className='text-3xl font-semibold mt-8 mb-4'>Search a Product</h1>
        {/* Search input and dropdown */}
        <div className='flex items-center space-x-4 mb-4'>
          <input type='text' placeholder='Search for a product' className='w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400' />
          <select className='px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400'>
            <option value='all'>All</option>
            <option value='category1'>Category 1</option>
            <option value='category2'>Category 2</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <h1 className='text-3xl font-semibold mb-6'>Add a Product</h1>
        {/* Code for adding a product */}
        <form className='max-w-md mx-auto'>
          <div className='mb-4'>
            <label htmlFor="productName" className='block text-gray-600 mb-2'>Product Slug:</label>
            <input onChange={handleChange} type="text" id="productName" name="slug" className='w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400' />
          </div>
          <div className='mb-4'>
            <label htmlFor="productQuantity" className='block text-gray-600 mb-2'>Quantity:</label>
            <input onChange={handleChange} type="text" id="productQuantity" name="quantity" className='w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400' />
          </div>
          <div className='mb-4'>
            <label htmlFor="productPrice" className='block text-gray-600 mb-2'>Price:</label>
            <input onChange={handleChange} type="number" id="productPrice" name="price" className='w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400' />
          </div>
          <button onClick={addProduct} type="submit" className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300'>Add Product</button>
        </form>
        <h1 className='text-3xl font-semibold mt-8 mb-6'>Display Current Stock</h1>
        {/* Code for displaying current stock */}
        <table className='w-full border-collapse'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='py-3 px-6 text-left text-sm font-semibold text-gray-700'>Product Name</th>
              <th className='py-3 px-6 text-left text-sm font-semibold text-gray-700'>Quantity</th>
              <th className='py-3 px-6 text-left text-sm font-semibold text-gray-700'>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => {
              return <tr key={product.slug} className='border-b border-gray-200'>
                <td className='py-4 px-6 text-left text-sm font-medium text-gray-800'>{product.slug}</td>
                <td className='py-4 px-6 text-left text-sm font-medium text-gray-800'>{product.quantity}</td>
                <td className='py-4 px-6 text-left text-sm font-medium text-gray-800'>{product.price}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
