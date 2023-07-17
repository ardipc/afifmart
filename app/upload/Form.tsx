"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Form() {
  const [keyGambar, setKeyGambar] = useState(0)
  const [gambar, setGambar] = useState(null)
  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handlePick = (e: any) => {
    const image = e.target.files[0]
    setGambar(image)
  }

  const handleClick = async (_: any) => {
    console.log(gambar)
    if (gambar) {
      setLoading(true)
      //@ts-ignore
      const filename = `${moment().format('yyyy-MM-DD')}/${moment().format('yyyyMMDDHHmmss')}-${gambar.name}`;
      const { data, error } = await supabase.storage
        .from("afifmart")
        .upload(filename, gambar, {
          cacheControl: "3600",
          upsert: false,
        });
      const filepath = data?.path;
      const FULL_PATH = `https://cymagsnihvppzuqevvge.supabase.co/storage/v1/object/public/afifmart/${filepath}`
      
      // proses to read and update

      setLoading(false)
      setKeyGambar(keyGambar + 1)
      router.push('/')
    }
  }

  function waktuProses(row) {

  }

  function jikaError(error) {

  }

  function jikaSelesai() {
    console.log
  }

  return (
    <div className="flex items-center align-middle my-4">
      <label className="label">
        <span className="label-text me-3 font-bold">Upload CSV File :</span>
      </label>
      <input key={`file-${keyGambar}`} onChange={e => handlePick(e)} type="file" className="file-input file-input-bordered w-full max-w-xs" />
      <button onClick={(e: any) => handleClick(e)} className="btn btn-primary ms-3">Upload</button>
    </div>
  )
}