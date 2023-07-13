import NavbarTop from '@/components/NavbarTop'
import Product from '@/components/Product'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function Index({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const supabase = createServerComponentClient({ cookies })

  let halaman = Number(searchParams.page ?? 1);
  let page = searchParams.action === 'next' ? halaman += 1 : searchParams.action === 'prev' ? halaman -= 1 : halaman;
  let size = 32;

  let from = (size * page) - size;
  let to = (size * page) - 1;

  const { data: { user } } = await supabase.auth.getUser()
  const categories = await supabase.from('categories').select('*');
  const products = await supabase.from('products').select('*, categories(id, name)').range(from, to);

  return (
    <>
      <NavbarTop user={user} />

      <div className='container'>
        <section className="kategori my-4">
          <div className='flex overflow-x-auto'>
            <Link href={`/`} className="btn btn-outline me-2">SEMUA</Link>
            {
              categories.data?.length && categories.data.map((item, index) => (
                <Link href={`/kategori/${item.id}`} key={`cat-${index}`} className="btn btn-outline me-2">{item.name}</Link>
              ))
            }
          </div>
        </section>
        <section className='mx-2 mb-3 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8'>
          {
            //@ts-ignore
            products.data?.length > 0 && products.data?.map((item, index) => (
              <Product product={item} key={`product-${index}`} />
            ))
          }
        </section>

        <div className="join my-6 flex justify-center">
          <Link href={`/?action=prev&page=${halaman}`} className="join-item btn">«</Link>
          <button className="join-item btn">Halaman {halaman}</button>
          <Link href={`/?action=next&page=${halaman}`} className="join-item btn">»</Link>
        </div>
      </div>
    </>
  )
}
