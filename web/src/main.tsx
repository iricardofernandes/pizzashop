import ReactDOM from 'react-dom/client'
import { enableMSW } from './api/mocks'
import { App } from './app'

const root = document.getElementById('root')

enableMSW().then(() => {
  ReactDOM.createRoot(root!).render(<App />)
})
