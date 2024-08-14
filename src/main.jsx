import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Router'
import { Provider } from 'react-redux'
import store from './redux-store/store'
import GeminiProvider from './context/GeminiContext'

createRoot(document.getElementById('root')).render(
   <Provider store={store}>
      <GeminiProvider>
         <RouterProvider router={router} />
      </GeminiProvider>
   </Provider>,
)
