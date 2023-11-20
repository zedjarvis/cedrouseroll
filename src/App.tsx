import { Outlet } from 'react-router-dom'
import { useHead } from 'unhead'

function App() {
  useHead({
    titleTemplate: '%s ← Cedrouseroll Omondi'
  })
  return (
    <>
     <Outlet />
    </>
  )
}

export default App
