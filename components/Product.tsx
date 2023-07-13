import Link from "next/link";

export default function Product({ product }: { product: any; }) {
  const item = product;
  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure><img src={item.image ?? 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg'} alt="Gambar Produk"/></figure>
      <div className="card-body">
        <Link href={`/product/${item.id}`} className='cursor-pointer'><h2 className="font-bold text-xl">{item.name}</h2></Link>
        <p className='text-2xl'>IDR {item.price.toLocaleString('id-ID')}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Keranjang</button>
        </div>
      </div>
    </div>
  )
}