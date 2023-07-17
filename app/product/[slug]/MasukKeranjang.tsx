"use client"

export default function MasukKeranjang({ item }: { item: any; }) {

  const handleKeranjang = (_: any) => {
    let keranjang = localStorage.getItem('keranjang');
    if(keranjang) {
      let parse = JSON.parse(keranjang);
      let findItem = parse.filter((row: any) => row.id === item.id)
      if(findItem.length != 1) {
        parse.push(item);
        localStorage.setItem('keranjang', JSON.stringify(parse))
        //@ts-ignore
        window.modal_barang_masuk_keranjang.showModal()
      } else {
        console.log('Barang sudah di keranjang')
        //@ts-ignore
        window.modal_produk_sudah_ada_dikeranjang.showModal()
      }
    } else {
      localStorage.setItem('keranjang', JSON.stringify([item]))
    }
    window.location.reload()
  }

  return (
    <button onClick={(e) => handleKeranjang(e)} className="flex ml-auto text-white btn btn-primary mx-2">Masukan Keranjang</button>
  )
}