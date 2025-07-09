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

const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
const Listing = lazy(() => import('./pages/admin/Listing'))
const BrandList = lazy(() => import('./pages/admin/BrandList'))
const ProductPartList = lazy(() => import('./pages/admin/ProductPartList'))
const Inventory = lazy(() => import('./pages/admin/Inventory'))
const Report = lazy(() => import('./pages/admin/Report'))

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
      {pathname !== "/login" && !pathname.startsWith('/admin') && <Navbar />}

      <Suspense fallback={<h1 className="text-center p-6">Loading…</h1>}>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/products' element={<Products />} />
          <Route path='/accessories/:device' element={<SparePartsAndAccessories />} />
          <Route path='/:device/:partdetail/:partId' element={<AccessoriesOverview />} />
          <Route path='/sellproduct' element={<SellProductDashboard />} />
          <Route path='/sellproduct/:device' element={<QuesAns />} />

          <Route path='admin' element={<Layout />}>
            <Route index element={<AdminDashboard />} />
            <Route path='listing' element={<Listing />} />
            <Route path='brandlist' element={<BrandList />} />
            <Route path='product-part-list' element={<ProductPartList />} />
            <Route path='inventory' element={<Inventory />} />
            <Route path='report' element={<Report />} />
          </Route>

          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Dashboard />} />
        </Routes>
      </Suspense>

      {pathname !== "/login" && !pathname.startsWith('/admin') && <Footer />}
    </>
  )
}

export default App
