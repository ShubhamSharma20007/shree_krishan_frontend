// main.tsx
import { BrowserRouter as Router } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { ThemeProvider } from './components/theme-provider.tsx'
ModuleRegistry.registerModules([AllCommunityModule]);
import App from "./App.tsx"
import { ProductContext, ProductContextProvider } from './context/productContext.tsx';
import { Toaster } from 'react-hot-toast';
createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
   <Router>
  <ProductContextProvider>
     <App />
   </ProductContextProvider>
     <Toaster/>
   </Router>
  </ThemeProvider>,
)