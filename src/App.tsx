import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './auth/ProtectedRoute'

const HomePage        = lazy(() => import('./app/pages/HomePage'))
const CollectionPage  = lazy(() => import('./app/pages/CollectionPage'))
const ProductPage     = lazy(() => import('./app/pages/ProductPage'))
const ConfiguratorPage = lazy(() => import('./app/pages/ConfiguratorPage'))
const AtelierPage      = lazy(() => import('./app/pages/AtelierPage'))
const JournalPage      = lazy(() => import('./app/pages/JournalPage'))
const JournalArticlePage = lazy(() => import('./app/pages/JournalArticlePage'))
const AboutPage        = lazy(() => import('./app/pages/AboutPage'))
const LookbookPage     = lazy(() => import('./app/pages/LookbookPage'))
const LoginPage        = lazy(() => import('./app/pages/LoginPage'))
const MyDesignsPage    = lazy(() => import('./app/pages/MyDesignsPage'))
const AccountPage      = lazy(() => import('./app/pages/AccountPage'))
const CartPage         = lazy(() => import('./app/pages/CartPage'))
const CheckoutPage     = lazy(() => import('./app/pages/CheckoutPage'))
const OrderConfirmationPage = lazy(() => import('./app/pages/OrderConfirmationPage'))
const SharedDesignPage = lazy(() => import('./app/pages/SharedDesignPage'))
const NotFoundPage     = lazy(() => import('./app/pages/NotFoundPage'))

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/"                    element={<HomePage />} />
        <Route path="/collection"          element={<CollectionPage />} />
        <Route path="/collection/:modelId" element={<ProductPage />} />
        <Route path="/configure"           element={<ConfiguratorPage />} />
        <Route path="/atelier"             element={<AtelierPage />} />
        <Route path="/journal"             element={<JournalPage />} />
        <Route path="/journal/:articleId"  element={<JournalArticlePage />} />
        <Route path="/about"               element={<AboutPage />} />
        <Route path="/lookbook"            element={<LookbookPage />} />
        <Route path="/login"               element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/my-designs"        element={<MyDesignsPage />} />
          <Route path="/account"           element={<AccountPage />} />
          <Route path="/cart"              element={<CartPage />} />
          <Route path="/checkout"          element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        </Route>
        <Route path="/shared-design"       element={<SharedDesignPage />} />
        <Route path="/shared-design/:shareId" element={<SharedDesignPage />} />
        <Route path="*"                    element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
