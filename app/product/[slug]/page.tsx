import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import Link from "next/link";
import GantiGambar from "./GantiGambar";
import NavbarTop from "@/components/NavbarTop";
import MasukKeranjang from "./MasukKeranjang";

interface Slug {
  slug: string;
}

interface Props {
  params: Slug;
}

export default async function Page({ params }: Props) {
  const supabase = createServerComponentClient({cookies})
  const {data: {user}} = await supabase.auth.getUser()

  const product = await supabase.from("products")
    .select("*, categories(id,name)")
    .eq("id", params.slug)
    .single();

  return (
    <>
      <NavbarTop user={user} />

      <div className="container mx-2 my-3">
        <div className="text-sm breadcrumbs mb-3">
          <ul>
            <li><Link href={`/`}>Beranda</Link></li> 
            <li><Link href={`/kategori/${product.data.categories.id}`}>{product.data.categories.name}</Link></li> 
            <li>{product.data.name}</li>
          </ul>
        </div>

        <div className="flex flex-wrap">
          <img alt="ecommerce" className="lg:w-1/3 w-full object-cover object-center rounded border border-gray-200" src={product.data.image ?? 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg'} />
          <div className="lg:w-1/2 w-full lg:pl-12 lg:pb-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.data.categories.name ?? "Kategori"}</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.data.name ?? "Nama Barang"}</h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                Stok : {product.data.stok}
              </span>
            </div>
            <p className="leading-relaxed">{product.data.description ?? "Deskripsi Barang"}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
            </div>
            <div className="flex items-center">
              <span className="title-font font-medium text-4xl text-gray-900">IDR {product.data.price.toLocaleString('id-ID')}</span>
              {/* @ts-ignore */}
              <MasukKeranjang item={product.data} />
              <button className="btn btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </button>
            </div>

            {
              user && <GantiGambar id={product.data.id} />
            }
            
          </div>
        </div>

      </div>
    </>
  )
}