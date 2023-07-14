import './globals.css'

export const metadata = {
  title: "AfifMart",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-background flex flex-col items-center">
          {children}
        </main>
        <dialog id="modal_produk_sudah_ada_dikeranjang" className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Peringatan!</h3>
            <p className="py-4">Barang sudah ada dikeranjang.</p>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </div>
          </form>
        </dialog>
        <dialog id="modal_barang_masuk_keranjang" className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Yeay!</h3>
            <p className="py-4">Barang disimpan dikeranjang.</p>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </div>
          </form>
        </dialog>
        <dialog id="modal_atas_nama" className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Hmmm!</h3>
            <p className="py-4">Pesanan kamu belum ada keterangan atas nama siapa.</p>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </div>
          </form>
        </dialog>
      </body>
    </html>
  )
}
