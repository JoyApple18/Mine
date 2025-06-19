import { useEffect, useState } from "react"
import { supabase } from "./supabaseClient"
import Chat from "./Chat"
import Login from "./Login"

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
        Rela <span className="text-sm block text-gray-500">Bercerita tanpa harus dikenal</span>
      </h1>
      {session ? <Chat session={session} /> : <Login />}
    </div>
  )
}

export default App
