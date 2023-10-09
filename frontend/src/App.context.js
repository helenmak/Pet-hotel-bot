import {useEffect, useState, createContext, useContext} from 'react'
import {useTelegram}         from './hooks/useTelegram'
import api                   from './api/booking'


const initialState = {
  bookings: null,
}

const AppContext = createContext(initialState)

function useApp() {
  const [bookings, setBookings] = useState(null)
  
  const {tg, user} = useTelegram()
  
  useEffect(() => {
    getBookings()
  }, [])
  
  const getBookings = async () => {
    const response = await api.listBookings(user?.id)
    setBookings(response)
  }
  
  return {
    bookings,
    getBookings,
    setBookings,
  }
}


export const ProvideAppContext = (props) => {
  const context = useApp()
  
  return (
    <AppContext.Provider value={context}>
      {props.children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const ctx = useContext(AppContext)
  
  if (!ctx) {
    throw new Error("useAppContext() must be used within the <ProvideAppContext>")
  }
  
  return ctx
}



