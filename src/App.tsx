import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import "./styles/App.css";
import PokemonDetailsPage from './pages/PokemonDetailsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<PokemonDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
