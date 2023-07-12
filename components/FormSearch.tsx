"use client" 
import Link from "next/link"
import {useState} from "react"

interface Product {
  barcode: string;
  category_id: number;
  code: string
  created_at: string
  description: string;
  hpp: Number;
  id: number;
  image: string;
  is_publish: boolean;
  isi: string;
  name : string;
  price: number
  satuan: string
  stok: number
}

interface Category {
  created_at: string;
  description: string;
  id: number;
  name: string;
}

interface Products {
  data: Product[]
}

interface Categories {
  data: Category[]
}
interface SearchProps {
  products: Products;
  categories: Categories;
}

export default function FormSearch({products, categories} : SearchProps) {
  const [search, setsearch] = useState('')
  const [produk, setproduk] = useState(products.data)
  const [kategori, setkategori] = useState(categories.data)

  const onKeyupSearch = (keyCode : number) => {
    if (keyCode === 13) {
      let regExp = new RegExp(`${search}`, 'i')
      let findProduct = products.data.filter((item : any) => {
        return item.name.match(regExp)
      })
      setproduk(findProduct)
    }
  }

  const onClickSearch = () => {
    let regExp = new RegExp(`${search}`, 'i')
    let findProduct = products.data.filter((item: Product) => {
      return item.name.match(regExp)
    })
    setproduk(findProduct)
  }

  const onClickByKategori = (id : number) => {
    if(id > 0) {
      let findProduct = products.data.filter((item : any) => item.category_id === id)
      setproduk(findProduct)
    } else {
      setproduk(products.data)
    }
  }

  return (
    <>
      <section className="flex items-center my-3">
        <label htmlFor="simple-search" className="sr-only">Search</label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
            </svg>
          </div>
          <input value={search}
            onChange={
              e => setsearch(e.target.value)
            }
            onKeyUp={
              e => onKeyupSearch(e.keyCode)
            }
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Cari produk..."/>
        </div>
        <button onClick={e => onClickSearch()} className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
              strokeWidth={2}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </section>
      <div className='flex overflow-x-auto mb-3'>
        <span onClick={
            e => onClickByKategori(0)
          }
          className="inline-flex mx-1 items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
          SEMUA</span>
        {
        kategori.length > 0 && kategori.map((item : Category, index : number) => (
          <span key={
              `sd-${index}`
            }
            onClick={
              e => onClickByKategori(item.id)
            }
            className="inline-flex mx-1 items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
            {
            item.name
          }</span>
        ))
      } </div>

      <div className="grid grid-cols-2 gap-4 mb-16">
        {
        produk.length > 0 && produk.map((item : Product, index : number) => (
          <Link key={
              `key-${index}`
            }
            href={`/product/${item.id}`}
            className="group">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <img src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg" alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." className="h-full w-full object-cover object-center group-hover:opacity-75"/>
            </div>
            <h3 className="mt-4 text-sm text-gray-700">
              {
              item.name
            }</h3>
            <p className="text-lg font-medium text-gray-900">
              {
              item.price.toLocaleString('id-ID')
            }</p>
          </Link>
        ))
      } </div>
    </>
  )
}
