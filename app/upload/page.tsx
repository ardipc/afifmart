import NavbarTop from "@/components/NavbarTop";

import { cookies } from 'next/headers'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Form from "./Form";

export default async function Page() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <>
      <NavbarTop user={user} />
      <div className='container'>
        <Form />
      </div>
    </>
  )
}