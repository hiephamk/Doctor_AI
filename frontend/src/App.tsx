import { BrowserRouter as Routers, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'

function App() {

  return (
    <Routers>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
      </Routes>
    </Routers>
  )
}

export default App
