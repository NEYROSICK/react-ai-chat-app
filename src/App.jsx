import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Chat from "./components/Chat";
import { ThemeProvider } from "./components/ThemeProvider";
import { ModeToggle } from "./components/ModeToggle";
import Home from "./pages/Home";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle className="absolute top-6 right-6" />
      <Routes>
        <Route path="/">
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route index element={<Home />} />
            <Route path="/:uid" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;

