import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TranslationPage from './pages/TranslationPage';
import GetAllTranslationsPage from './pages/GetAllTranslationsPage';
import Navbar from './components/Navbar';
import { JSX } from 'react';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token !== null;
};

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  return isAuthenticated() ? element : <Navigate to="/" replace />;
};

function App() {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-700 text-white min-h-screen flex flex-col">
      <Navbar />
      <div className="flex justify-center items-center flex-grow p-6">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/translate" element={<PrivateRoute element={<TranslationPage />} />} />
          <Route path="/translations" element={<PrivateRoute element={<GetAllTranslationsPage />} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
