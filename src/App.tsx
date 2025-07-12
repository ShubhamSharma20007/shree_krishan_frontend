import { Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import Footer from './components/Footer'
import { lazy, Suspense, useEffect } from 'react'

import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import SparePartsAndAccessories from './pages/SparePartsAndAccessories'
import AccessoriesOverview from './pages/AccessoriesOverview'
import SellProductDashboard from './pages/SellProduct'
import QuesAns from './pages/SellProduct/QuesAns'
import Login from './pages/Login'
import Layout from './pages/admin/Layout'
import { ProgressBar } from 'react-loader-spinner';
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
const Listing = lazy(() => import('./pages/admin/Listing'))
const BrandList = lazy(() => import('./pages/admin/BrandList'))
const ProductPartList = lazy(() => import('./pages/admin/ProductPartList'))
const Inventory = lazy(() => import('./pages/admin/Inventory'))
const Report = lazy(() => import('./pages/admin/Report'))
const Contact = lazy(() => import('./pages/admin/Contact'))
import ProtectedRoute from './components/protectedRoute';
import NotFound from './pages/NotFound'
import ForgotPassword from './pages/ForgotPassword'
import VerifyOtp from './pages/VerifyOtp'
import ResetPassword from './pages/ResetPassword'


const Loader =()=><div className='min-h-screen flex items-center justify-center w-full'>
<ProgressBar
  visible={true}
  height="80"
  width="80"
  ariaLabel="progress-bar-loading"
  />

</div>

export const App = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        console.log('Prevented default Save (Ctrl+S) behavior');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      {pathname !== "/login" && !pathname.startsWith('/admin') && pathname !== '/forgot-password' && pathname !== '/verify-otp' && pathname !== '/reset-password' && <Navbar />}

      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/products' element={<Products />} />
          <Route path='/accessories/:device' element={<SparePartsAndAccessories />} />
          <Route path='/:device/:partdetail/:partId' element={<AccessoriesOverview />} />
          <Route path='/sellproduct' element={<SellProductDashboard />} />
          <Route path='/sellproduct/:device' element={<QuesAns />} />

          <Route path='admin' element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index path='dashboard' element={<AdminDashboard />} />
            <Route path='listing' element={<Listing />} />
            <Route path='brandlist' element={<BrandList />} />
            <Route path='product-part-list' element={<ProductPartList />} />
            <Route path='inventory' element={<Inventory />} />
            <Route path='report' element={<Report />} />
            <Route path='contact-report' element={<Contact />} />
          </Route>

          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/verify-otp' element={<VerifyOtp />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>

      {pathname !== "/login" && !pathname.startsWith('/admin') && pathname !== '/forgot-password' && pathname !== '/verify-otp' && pathname !== '/reset-password' && <Footer />}
    </>
  )
}

export default App
