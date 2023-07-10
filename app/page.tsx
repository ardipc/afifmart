import FormSearch from '@/components/FormSearch'
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import Link from 'next/link'

export default async function Index() {
  const supabase = createServerComponentClient({cookies})

  const {data: {user}} = await supabase.auth.getUser()
  const categories = await supabase.from('categories').select('*');
  const products = await supabase.from('products').select('*');

  return (
    <>
      <div className="w-full h-screen bg-white">
        <section className='container p-4'>
          <div className='flex justify-between place-items-center'>
            <h1 className='text-3xl font-bold'>AfifMart</h1>
            <div className='align-middle'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
              </svg>
            </div>
          </div>

          <FormSearch categories={categories} products={products} />

        </section>

        <section id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
          <div id="tabs" className="flex justify-between">
            <Link href="/" className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
              <svg className="inline-block mb-1 w-[24px] h-[24px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9"/>
              </svg>
              <span className="tab tab-home block text-xs">Beranda</span>
            </Link>
            <Link href="/saved" className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
              <svg className="inline-block mb-1 w-[24px] h-[24px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 19">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z"/>
              </svg>
              <span className="tab tab-explore block text-xs">Simpan</span>
            </Link>
            <Link href="/cart" className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
              <svg className="inline-block mb-1 w-[24px] h-[24px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"/>
              </svg>
              <span className="tab tab-kategori block text-xs">Keranjang</span>
            </Link>
            <Link href={user ? "/akun" : "/login"} className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
              <svg className="inline-block mb-1 w-[24px] h-[24px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-2 3h4a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"/>
              </svg>
              <span className="tab tab-whishlist block text-xs">
                {
                user ? 'Akun' : 'Masuk'
              }</span>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
