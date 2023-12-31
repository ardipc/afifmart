"use client"

import Image from "next/image";
import Link from "next/link";

export default function Product({ product }: { product: any; }) {
  const item = product;
  const handleKeranjang = (_: any) => {
    let keranjang = localStorage.getItem('keranjang');
    if(keranjang) {
      let parse = JSON.parse(keranjang);
      let findItem = parse.filter((row: any) => row.id === item.id)
      if(findItem.length != 1) {
        parse.push(item);
        localStorage.setItem('keranjang', JSON.stringify(parse))
        //@ts-ignore
        window.modal_barang_masuk_keranjang.showModal()
      } else {
        console.log('Barang sudah di keranjang')
        //@ts-ignore
        window.modal_produk_sudah_ada_dikeranjang.showModal()
      }
    } else {
      localStorage.setItem('keranjang', JSON.stringify([item]))
    }
  }

  return (
    <>
      <div className="card card-compact bg-base-100 shadow-xl">
        <figure>
          {/* <img src={item.image ?? 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg'} alt="Gambar Produk"/> */}
          <Image width={500} height={500} src={item.image ?? 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg'} alt="Gambar Produk" />
        </figure>
        <div className="card-body">
          <Link href={`/product/${item.id}`} className='cursor-pointer'><h2 className="font-bold text-xl">{item.name}</h2></Link>
          <p className='text-2xl'>IDR {item.price.toLocaleString('id-ID')}</p>
          <div className="card-actions justify-end">
            <button onClick={e => handleKeranjang(e)} className="btn btn-primary">Keranjang</button>
          </div>
        </div>
      </div>
    </>
  )
}