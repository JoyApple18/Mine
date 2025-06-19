import { useState } from "react"
import { supabase } from "./supabaseClient"

export default function Login() {
  const [email, setEmail] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    await supabase.auth.signInWithOtp({ email })
    alert("Periksa email kamu untuk login link.")
  }

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto space-y-4">
      <input
        className="w-full border rounded p-2"
        placeholder="Masukkan email kamu"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Masuk</button>
    </form>
  )
}
