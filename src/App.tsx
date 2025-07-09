
import { Routes, Route, useLocation } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AdminDashboard from "./pages/admin/Dashboard"
import Products from './pages/Products'
import { Navbar } from './components/Navbar'
import SparePartsAndAccessories from './pages/SparePartsAndAccessories'
import Footer from './components/Footer'
import AccessoriesOverview from './pages/AccessoriesOverview'
import SellProductDashboard from './pages/SellProduct'
import QuesAns from './pages/SellProduct/QuesAns'
import Login from './pages/Login'
import Layout from './pages/admin/Layout'
import Listing from './pages/admin/Listing'
import { useEffect } from 'react'
import BrandList from './pages/admin/BrandList'
import ProductPartList from './pages/admin/ProductPartList'
import Inventory from './pages/admin/Inventory'
import Report from './pages/admin/Report'

export const App = () => {
  const {pathname} = useLocation()
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
      {
        pathname !== "/login" && !pathname.startsWith('/admin') && <Navbar/>
      }
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/searchmodel' element={<Products />} />
        <Route path='/accessories/:device' element={<SparePartsAndAccessories />} />
        <Route path='/:device/:accessories/:item' element={<AccessoriesOverview />} />
        <Route path='/sellproduct' element={<SellProductDashboard />} />
        <Route path='/sellproduct/:device' element={<QuesAns />} />
        <Route path='admin' element={<Layout/>}>
        <Route index element={<AdminDashboard/>}/>
        <Route path='listing' element={<Listing/>}/>
        <Route path='brandlist' element={<BrandList/>}/>
        <Route path='product-part-list' element={<ProductPartList/>}/>
        <Route path='inventory' element={<Inventory/>}/>
        <Route path='report' element={<Report/>}/>
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='*' element={<Dashboard />} />
      </Routes>
       {
         pathname !== "/login" && !pathname.startsWith('/admin') &&  <Footer/>
      }
    </>
  )
}

export default App
