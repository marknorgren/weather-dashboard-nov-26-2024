import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navigation from './components/Navigation';
import WeatherDetail from './pages/WeatherDetail';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Helmet>
        <title>Weather Dashboard</title>
      </Helmet>
      <div className="min-h-screen bg-neutral-light">
        <Navigation />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weather/:cityName" element={<WeatherDetail />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
