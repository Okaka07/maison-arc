import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

const AUTH_STORAGE_KEY = 'maison-arc-auth-session'
const DEMO_EMAIL = 'alexandre.moreau@example.com'
const DEMO_PASSWORD = 'maisonarc2026'

export type AuthUser = {
  name: string
  email: string
  preferredSize: string
  defaultMonogram: string
  memberSince: string
}

type LoginCredentials = {
  email: string
  password: string
}

type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
}

const DEFAULT_USER: AuthUser = {
  name: 'Alexandre Moreau',
  email: DEMO_EMAIL,
  preferredSize: 'EU 42 / UK 9 / US 10',
  defaultMonogram: 'AM',
  memberSince: '2024',
}

const AuthContext = createContext<AuthContextValue | null>(null)

function readStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') {
    return null
  }

  const stored = window.localStorage.getItem(AUTH_STORAGE_KEY)

  if (!stored) {
    return null
  }

  try {
    return JSON.parse(stored) as AuthUser
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser())

  useEffect(() => {
    if (user) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
      return
    }

    window.localStorage.removeItem(AUTH_STORAGE_KEY)
  }, [user])

  async function login({ email, password }: LoginCredentials) {
    const normalizedEmail = email.trim().toLowerCase()

    if (normalizedEmail !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      throw new Error('Use the demo account credentials to access the private client area.')
    }

    setUser(DEFAULT_USER)
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.')
  }

  return context
}

export const authDemoCredentials = {
  email: DEMO_EMAIL,
  password: DEMO_PASSWORD,
}
