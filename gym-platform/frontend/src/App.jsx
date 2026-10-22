import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Classes from './pages/Classes'
import Pricing from './pages/Pricing'
import Admin from './pages/Admin'
import SixPack from './components/SixPack'
import Chest from './components/Chest'
import Strength from './components/Strength'
import Flexibility from './components/Flexibility'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-black text-slate-100 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sixpack" element={<SixPack />} />
              <Route path="/chest" element={<Chest />} />
              <Route path="/strength" element={<Strength />} />
              <Route path="/flexibility" element={<Flexibility />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}
