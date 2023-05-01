import RegisterForm from "./components/RegisterForm";
import {Route, Routes} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

function App() {
    return (
        <div className="App">
            <Navbar/>
            <Routes>
                <Route path={'/login'} element={<LoginForm/>}/>
                <Route path={'/register'} element={<RegisterForm/>}/>
                <Route path={'*'} element={<Home/>}/>
            </Routes>
        </div>
    );
}

export default App;
