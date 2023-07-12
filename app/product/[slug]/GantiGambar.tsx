"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import moment from "moment"
import { useState } from "react"

export default function GantiGambar({ id }: { id: string }) {
  const supabase = createClientComponentClient()
  const [gambar, setGambar] = useState(null)

  const clickUpload = async () => {
    // console.log(gambar)
    // const {data} = await supabase.storage.getBucket('afifmart')
    // console.log(data)
    if (gambar) {
      //@ts-ignore
      const filename = `${moment().format('yyyy-MM-DD')}/${gambar.name}`;
      const { data, error } = await supabase.storage
        .from("afifmart")
        .upload(filename, gambar, {
          cacheControl: "3600",
          upsert: false,
        });
      const filepath = data?.path;
      const FULL_PATH = `https://cymagsnihvppzuqevvge.supabase.co/storage/v1/object/public/afifmart/${filepath}`
      await supabase.from("products").update({ image: FULL_PATH }).eq("id", id)
    }
  }

  const handlePick = (e: any) => {
    setGambar(e.target.files[0])
  }

  return (
    <div className="mb-3">
      <label htmlFor="formFile" className="mb-2 inline-block text-neutral-700 dark:text-neutral-200">Ganti Gambar</label>
      <input onChange={e => handlePick(e)} type="file" className="file-input file-input-bordered file-input-sm w-full max-w-xs mb-2" />
      <button className="btn btn-primary btn-sm" onClick={() => clickUpload()}>Upload</button>
    </div>
  )
}