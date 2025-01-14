import { RouterProvider } from 'react-router'
import './index.css'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { router } from './routes'

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Pizza Shop" />
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}
