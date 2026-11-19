import { useState, type FormEvent } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../auth/AuthProvider'

export default function Login() {
  const { session } = useAuth()
  const local = useLocation()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  const destino = (local.state as { de?: string } | null)?.de ?? '/'
  if (session) return <Navigate to={destino} replace />

  async function entrar(e: FormEvent) {
    e.preventDefault()
    setErro('')
    setEnviando(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
    setEnviando(false)
    if (!error) return
    if (error.message === 'Invalid login credentials') setErro('Email ou senha incorretos.')
    else if (error.message.includes('fetch')) setErro('Sem conexão com o servidor. Verifique a internet e tente de novo.')
    else setErro(`Não foi possível entrar: ${error.message}`)
  }

  return (
    <main className="min-h-dvh grid place-items-center px-4">
      <form onSubmit={entrar} className="w-full max-w-sm bg-panel border border-line rounded-2xl p-6 grid gap-4">
        <div>
          <p className="text-sm font-bold text-red uppercase tracking-wide">Maper</p>
          <h1 className="text-3xl">Consulta UNIPEGA</h1>
        </div>
        <label className="grid gap-1 text-sm font-medium">
          Email
          <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="h-12 px-3 rounded-lg border border-line bg-bg text-base" />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Senha
          <input type="password" required autoComplete="current-password" value={senha} onChange={(e) => setSenha(e.target.value)}
            className="h-12 px-3 rounded-lg border border-line bg-bg text-base" />
        </label>
        {erro && <p role="alert" className="text-no text-sm">{erro}</p>}
        <button disabled={enviando} className="h-12 rounded-lg bg-red text-white font-bold disabled:opacity-60">
          {enviando ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </main>
  )
}
