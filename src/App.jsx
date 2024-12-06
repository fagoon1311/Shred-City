import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Button } from './components/ui/button'
import AppLayout from './layouts/AppLayout'
import LandingPage from './pages/landing'
import { ThemeProvider } from './components/themeprovider'
import Shop from './pages/shop'
import MyMemberships from './pages/mymemberships'
import ProtectedRoute from './components/protectedroute'
import Item from './pages/item'
import MyCart from './pages/mycart'
import CartContextProvider from './context/CartContextProvider'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children:[
      {
        path:'/',
        element: <LandingPage />
      },
      {
        path:'/shop',
        element:<Shop />
      },
      {
        path:'/item/:id',
        element:<Item />
      },
      {
        path:'/my-memberships',
        element:(
          <ProtectedRoute>
            <MyMemberships />
          </ProtectedRoute>
        )
      },
      {
        path:'/my-cart',
        element:(
          <ProtectedRoute>
            <MyCart />
          </ProtectedRoute>
        )
      }
  
    ]
  }
])

function App() {
  return (
    <CartContextProvider>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <RouterProvider router={router}/>
      </ThemeProvider>
    </CartContextProvider>
  )
}

export default App
