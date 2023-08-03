import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import AdminPanel from './pages/AdminPanel'
import CreateRestaurant from './pages/CreateRestaurant'
import CreateFood from './pages/CreateFood'
import Food from './pages/Food'
import UpdateRestaurant from './pages/UpdateRestaurant'
import DeletedRestaurant from './pages/DeletedRestaurant'
import UpdatePutFood from './pages/UpdatePutFood'
import CreateFoodInputs from './pages/CreateFoodInputs'
import DeleteFoodPage from './pages/DeleteFoodPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin-panel' element={<AdminPanel />} />
        <Route path='/create_restaurant' element={<CreateRestaurant />} />
        <Route path='/create-food' element={<CreateFood />} />
        <Route path='/foods/:id' element={<Food />} />
        <Route path='/food' element={<UpdatePutFood />} />
        <Route path='/create/food/inputs/:id' element={<CreateFoodInputs/>} />
        <Route path='/restaurant/update' element={<UpdateRestaurant />} />
        <Route path='/restaurant/delete' element={<DeletedRestaurant />} />
        <Route path='/delete/food' element={<DeleteFoodPage />} />
      </Routes>
    </>
  )
}

export default App
