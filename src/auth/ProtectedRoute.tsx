import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    const redirectTo = `${location.pathname}${location.search}${location.hash}`

    return <Navigate to={`/login?redirect=${encodeURIComponent(redirectTo)}`} replace />
  }

  return <Outlet />
}
