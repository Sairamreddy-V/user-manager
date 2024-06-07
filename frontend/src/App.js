import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './components/Header'
import Users from './components/Users'
import AddUser from './components/AddUser';
import UserDetails from './components/UserDetails'
import './App.css';

const App=()=>(
  <BrowserRouter>
    <Header/>
    <Routes>
        <Route exact path="/" element={<Users/>}/>
        <Route exact path="/add-user" element={<AddUser/>}/>
        <Route exact path="/user-details/:id" element={<UserDetails/>}/>
    </Routes>
  </BrowserRouter>
)

export default App;
