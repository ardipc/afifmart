"use client"

import { useState } from "react"

export default function Form() {
  const [keyGambar, setKeyGambar] = useState(0)
  const [gambar, setGambar] = useState(null)

  const handlePick = (e: any) => {
    const image = e.target.files[0]
    setGambar(image)
  }

  const handleClick = (_: any) => {
    console.log(gambar)
    setKeyGambar(keyGambar + 1)
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