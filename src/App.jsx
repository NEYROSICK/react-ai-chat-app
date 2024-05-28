import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./components/ThemeProvider";
import { ModeToggle } from "./components/ModeToggle";
import Home from "./pages/Home";
import initLocalization from "./i18n";

function App() {
  initLocalization();
  // useEffect(() => {
  // const sendMessage = async () => {
  //   const chatCompletion = await openai.chat.completions.create({
  //     messages: [{ role: "user", content: "Ehm... Hi, ChatGPT!" }],
  //     model: "gpt-3.5-turbo",
  //   });

  //   console.log("chatCompletion");
  //   console.log(chatCompletion);
  // };

  // const sendMessage = async () => {
  //   try {
  //     const response = await fetch("https://api.openai.com/v1/chat/completions", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
  //       },
  //       body: JSON.stringify({
  //         model: "gpt-3.5-turbo",
  //         messages: [{ role: "user", content: "Ehm... Hi, ChatGPT!" }],
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.statusText}`);
  //     }

  //     const chatCompletion = await response.json();
  //     console.log("chatCompletion", chatCompletion);
  //   } catch (error) {
  //     console.error("Error fetching chat completion:", error);
  //   }
  // };

  // sendMessage();
  // }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/">
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route index element={<Home />} />
            <Route path="/chat/:uid" element={<Home />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;

