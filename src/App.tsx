import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'
import './App.css'
import Home from './Pages/Home'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import { LoginResponse } from "./Utils/Types";

function App() {
  const queryClient = new QueryClient()
  const [user, setUser] = useLocalStorage<LoginResponse>("user", {
    id: 0,
    name: "",
    token: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id === 0) {
      navigate("/login");
    }
  }, [user]);

  return (
    <QueryClientProvider client={queryClient}>
    <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser}/>}></Route>
        <Route path="/login" element={<SignIn setUser={setUser} />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
    </Routes>
    </QueryClientProvider>
  )
}

export default App
