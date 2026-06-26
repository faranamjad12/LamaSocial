import SinglePost from "./components/singlepost/SinglePost";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";

// function App() {
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/post/:id" element={<SinglePost />} />
        </Route>

        {/* <Route path="/update/:id" element={<Home />} /> */}
        <Route path="/logout" element={<Navigate to="/login" replace />} />
        {/* <Route path="/home" element={<Home />} /> */}
        {/* <Route exact path="/">
          <Home />
        </Route> */}

        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/login">
          <Login />
        </Route> */}
        <Route path="/register" element={<Register />} />
        {/* <Route path="/register">
          <Register />
        </Route> */}
        <Route path="/profile/:username" element={<Profile />} />
        {/* <Route path="/profile/:username">
          <Profile />
        </Route> */}
        {/* <Route path="/post/:id" element={<SinglePost />} />  */}
      </Routes>
    </Router>
  );
};

export default App;
