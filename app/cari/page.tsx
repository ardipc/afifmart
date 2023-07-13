import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import Link from "next/link";
import NavbarTop from "@/components/NavbarTop";
import Product from "@/components/Product";

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const supabase = createServerComponentClient({cookies})
  const {data: {user}} = await supabase.auth.getUser()

  const products = await supabase.from('products')
    .select('*, categories(id, name)')
    .like('name', `%${searchParams.name}%`);

  return (
    <>
      <NavbarTop user={user} />

      <div className="container mx-2 my-3">
        <div className="text-sm breadcrumbs mb-3">
          <ul>
            <li><Link href={`/`}>Beranda</Link></li> 
            <li>Cari</li> 
            <li>{searchParams.name}</li> 
          </ul>
        </div>

        <section className='mx-2 mb-6 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8'>
          {
            //@ts-ignore
            products.data?.length > 0 && products.data?.map((item, index) => (
              <Product product={item} key={`product-${index}`} />
            ))
          }
        </section>

      </div>
    </>
  )
}