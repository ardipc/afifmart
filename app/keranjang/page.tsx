// @ts-nocheck
'use client'

import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useEffect, useState} from "react";

import type {User}
from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation";
import NavbarTop from "@/components/NavbarTop";

export default function Page() {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(false)
  const [keranjang, setKeranjang] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    async function getUser() {
      const {data} = await supabase.auth.getUser()
      setUser(data.user);
    }

    function getKeranjang() {
      let txtKeranjang = localStorage.getItem('keranjang');
      if(txtKeranjang) {
        let keranjang = JSON.parse(txtKeranjang);
        let addQty = keranjang.map((item: any) => { return {...item, quantity: 1} });
        setKeranjang(addQty);
        updateTotal(addQty);
      }
    }

    getKeranjang()
    getUser()
  }, [])

  const setDynamicQty = (e: any, id: any) => {
    let findIndex = keranjang.findIndex((row: any) => row.id === id);
    let copyState = [...keranjang]
    copyState[findIndex]['quantity'] = e.target.value
    setKeranjang(copyState)
    localStorage.setItem('keranjang', JSON.stringify(copyState))
    updateTotal(copyState)
  }

  const updateTotal = (data: any) => {
    let total = 0;
    data.map((item: any) => total += (item.price * item.quantity));
    setSubtotal(total);
  }

  const hapusBarang = (e: any, item: any) => {
    let find = keranjang.filter((row: any) => row.id != item.id);
    setKeranjang(find)
    localStorage.setItem('keranjang', JSON.stringify(find))
    updateTotal(find)
  }

  return (
    <>
      <NavbarTop user={user} />
      
      <section className="container">
        
        <div className="overflow-x-auto mt-3 mb-6">
          <table className="table">
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Nama</th>
                <th>Harga</th>
                <th>Quantity</th>
                <th>Satuan</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                keranjang.map((item, index) => (
                  <tr key={`row-${index}`}>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={item.image ?? 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg'} alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{item.name}</div>
                          <div className="text-sm opacity-50">{item.categories.name} | Stok : {item.stok}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {item.price.toLocaleString('id-ID')}
                    </td>
                    <td>
                      <input type="number" onChange={e => setDynamicQty(e, item.id)} value={item.quantity} placeholder="Quantity" className="input input-bordered w-20 max-w-xs" />
                    </td>
                    <td>{item.satuan}</td>
                    <td>
                      {(item.price * item.quantity).toLocaleString('id-ID')}
                    </td>
                    <th>
                      <button onClick={e => hapusBarang(e, item)} className="btn btn-ghost btn-xs">Hapus</button>
                    </th>
                  </tr>
                ))
              }
              
            </tbody>
          </table>
        </div>

      </section>

      {
        keranjang.length > 0 &&
          <div className="fixed bottom-0 w-full px-8">
            <button className="my-8 mx-2 ml-auto float-right px-5 py-2 btn btn-primary text-sm font-bold tracking-wide rounded-full">Pesan Sekarang</button>
            <button className="bottom-0 mx-2 my-8 float-right px-5 py-2 btn btn-neutral text-sm font-bold tracking-wide rounded-full">Grand Total : {subtotal.toLocaleString('id-ID')}</button>
          </div>
      }

    </>
  );
}
