import {useEffect} from "react"
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom'

import {useTelegram}   from "./hooks/useTelegram"
import Header from "./components/Header/Header"

import ProductList  from "./pages/ProductList"
import NewBooking from './pages/NewBooking'

import {ProvideAppContext} from './App.context'

import styles from './App.module.css'


function App() {
  const {tg} = useTelegram()
  
  const navigate = useNavigate()
  const location = useLocation()
  
  
  const handleBackClick = () => {
    navigate(-1)
  }

  
  useEffect(() => {
    tg.ready()
  
    tg.BackButton.onClick(handleBackClick)
    return () => {
      tg.BackButton.offClick(handleBackClick)
    }
  }, [])
  
  
  if (location.pathname !== '/') {
    tg.BackButton.show()
  } else {
    tg.BackButton.hide()
  }
  

  return (
    <div className={styles.app}>
      <Header />
      
      <Routes>
        <Route index element={<ProductList />}/>
        <Route path='request-sitting' element={<NewBooking />}/>
      </Routes>
    </div>
  )
}


function AppWithContext(props) {
  return (
    <ProvideAppContext>
      <App {...props} />
    </ProvideAppContext>
  )
}

export default AppWithContext
