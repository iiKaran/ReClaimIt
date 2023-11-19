import "./App.css";
import Navbar from "./components/navbar"
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Grid from "./components/Grid";
import Form from "./components/Form";
import Home from "./components/Home"
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="dark:bg-gray-900">
      <Navbar></Navbar>
    <Routes>
      <Route path="/" index element={<Home></Home>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/signup" element={<SignUp></SignUp>}></Route>
      <Route path="/allitems" element={<Grid></Grid>}></Route>
      <Route path="/newitem" element={<Form></Form>}></Route>
    </Routes>
    </div>
  );
}

export default App;
