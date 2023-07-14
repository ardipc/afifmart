"use client"
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavbarTop({ user }: {
  user: User | null
}) {
  const router = useRouter();

  const [keranjang, setKeranjang] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const handleOnKeyDown = (e: any) => {
    console.log(e.keyCode)
    if(e.keyCode === 13) {
      if(e.target.value) {
        router.push(`/cari?name=${e.target.value}`)
      }
    }
  }

  useEffect(() => {
    function getKeranjang() {
      let txtKeranjang = localStorage.getItem('keranjang');
      if(txtKeranjang) {
        let keranjang = JSON.parse(txtKeranjang);
        setKeranjang(keranjang);
        let total = 0;
        keranjang.map((item: any) => total += item.price)
        setSubtotal(total);
      }
    }

    getKeranjang()
  }, [router]);

  return (
    <div className="navbar bg-base-100">
      <div className='navbar-start'>
        <Link href={'/'} className="btn btn-ghost normal-case text-xl me-4">Afif Mart</Link>
        <div className="form-control mx-1">
          <input onKeyDown={e => handleOnKeyDown(e)} type="text" placeholder="Cari barang..." className="input input-bordered w-24 md:w-auto" />
        </div>
      </div>
      <div className='navbar-center hidden lg:flex'>
        {
          user &&
            <ul className="menu menu-horizontal px-1 z-[1]">
              <li><Link href={`/upload`}>Upload</Link></li>
              {/* <li tabIndex={0}>
                <details>
                  <summary>Kategori</summary>
                  <ul className="p-2">
                    <li><a>Submenu 1</a></li>
                    <li><a>Submenu 2</a></li>
                  </ul>
                </details>
              </li> */}
              <li><a>Laporan</a></li>
            </ul>
        }
      </div>
      <div className='navbar-end'>
        <div className="dropdown dropdown-end mx-1">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <span className="badge badge-sm indicator-item">{keranjang.length}</span>
            </div>
          </label>
          <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div className="card-body">
              <span className="font-bold text-lg">{keranjang.length} Barang</span>
              <span className="text-info">Subtotal: {subtotal.toLocaleString('id-ID')}</span>
              <div className="card-actions">
                <Link href={`/keranjang`} className="btn btn-primary btn-block">Lihat Keranjang</Link>
              </div>
            </div>
          </div>
        </div>
        {
          user ? <>
            <div className="dropdown dropdown-end ms-1">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <Link href={`/akun`} className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                {/* <li><a>Settings</a></li> */}
                <li><Link href={`/logout`}>Logout</Link></li>
              </ul>
            </div>
          </> : <>
            <Link href={`/login`} className="btn btn-neutral mx-2">Masuk</Link>
          </>
        }
      </div>
    </div>
  )
}