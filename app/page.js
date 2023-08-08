"use client";

import Header from '@/components/Header'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Home() {

  const [productForm, setProductForm] = useState({})
  const [products, setProducts] = useState([])
  const [alert, setAlert] = useState("")
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [dropdown, setDropdown] = useState([
    {"_id":"64d1d148bc2da4f08837a16a","slug":"mango","quantity":"12","price":"19"}
  ])

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
        setAlert("Your product has been added");
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

  const onDropdownEdit = async (e) => {
    setQuery(e.target.value)
    if(!loading) {
      setLoading(true)
      const response = await fetch('/api/search?query=' + query)
      let jsonResponse = await response.json()
      setDropdown(jsonResponse.products)
      setLoading(false)
    }
  }
 
  return (
    <>
      <Header/>
      <div className='container mx-auto p-8'>
      <div className='text-green-800 text-center'>{alert}</div>
      <h1 className='text-3xl font-semibold mt-8 mb-4'>Search a Product</h1>
        {/* Search input and dropdown */}
        <div className='flex items-center space-x-4 mb-4'>
          <input onChange={onDropdownEdit} type='text' placeholder='Search for a product' className='w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400' />
          <select className='px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400'>
            <option value='all'>All</option>
            <option value='category1'>Category 1</option>
            <option value='category2'>Category 2</option>
            {/* Add more options as needed */}
          </select>
        </div>
        {loading && <svg
            width="25"
            height="25"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
            class="lds-spinner"
          >
            <g transform="rotate(0 50 50)">
              <circle cx="50" cy="50" fill="none" r="40" stroke="#000" stroke-width="10">
                <animate attributeName="stroke-dashoffset" dur="2s" from="0" to="502"></animate>
                <animate
                  attributeName="stroke-dasharray"
                  dur="2s"
                  values="150.6 100.4;1 250;150.6 100.4"
                ></animate>
              </circle>
            </g>
          </svg>
        }
        {dropdown.map(item => (
          <div key={item.slug} className='flex items-center justify-between p-4 bg-white shadow-md rounded-lg my-3 hover:bg-gray-100 transition duration-300'>
            <div className='flex-1'>
              <h3 className='text-lg font-semibold'>{item.slug}</h3>
              <p className='text-gray-500'>Quantity: {item.quantity}</p>
            </div>
            <div className='text-lg font-semibold text-green-600'>
              ₹{item.price}
            </div>
          </div>
        ))}

        <h1 className='text-3xl font-semibold mb-6'>Add a Product</h1>
        {/* Code for adding a product */}
        <form className='max-w-md mx-auto'>
          <div className='mb-4'>
            <label htmlFor="productName" className='block text-gray-600 mb-2'>Product Slug:</label>
            <input value={productForm?.slug || ""} onChange={handleChange} type="text" id="productName" name="slug" className='w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400' />
          </div>
          <div className='mb-4'>
            <label htmlFor="productQuantity" className='block text-gray-600 mb-2'>Quantity:</label>
            <input value={productForm?.quantity || ""} onChange={handleChange} type="text" id="productQuantity" name="quantity" className='w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400' />
          </div>
          <div className='mb-4'>
            <label htmlFor="productPrice" className='block text-gray-600 mb-2'>Price:</label>
            <input value={productForm?.price || ""} onChange={handleChange} type="number" id="productPrice" name="price" className='w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400' />
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
                <td className='py-4 px-6 text-left text-sm font-medium text-gray-800'>₹{product.price}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
