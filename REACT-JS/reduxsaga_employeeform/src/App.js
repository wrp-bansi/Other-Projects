import './App.css';
import ShowEmployee from './components/ShowEmployee/ShowEmployee';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import CreateUser from './components/createEmployee';
import UpdateUser from './components/updateEmployee';




function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<ShowEmployee />}></Route>
      <Route path='/create' element={<CreateUser />}></Route>
      <Route path='/edit/:id' element={<UpdateUser />}></Route>
    </Routes>

    </BrowserRouter>

    </>
  )
}

export default App;
