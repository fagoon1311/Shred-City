import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Button } from './components/ui/button'
import AppLayout from './layouts/AppLayout'
import LandingPage from './pages/landing'
import { ThemeProvider } from './components/themeprovider'
import Shop from './pages/shop'
import MyMemberships from './pages/mymemberships'
import ProtectedRoute from './components/protectedroute'

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
        path:'/my-memberships',
        element:(
          <ProtectedRoute>
            <MyMemberships />
          </ProtectedRoute>
        )
      }
  
    ]
  }
])

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
    <RouterProvider router={router}/>
    </ThemeProvider>
  )
}

export default App
