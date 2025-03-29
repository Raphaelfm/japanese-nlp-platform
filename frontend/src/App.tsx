import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TranslationPage from './pages/TranslationPage';
import GetAllTranslationsPage from './pages/GetAllTranslationsPage';
import Navbar from './components/Navbar';
import { JSX } from 'react';
import { getToken } from './utils/auth';
import GetAllForAdminPage from './pages/GetAllForAdminPage';
import GetAllUsersPage from './pages/GetAllUsersPage';

// PrivateRoute com verificação do token válido
const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  return getToken() ? element : <Navigate to="/" replace />;
};

function App() {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-700 text-white min-h-screen flex flex-col">
      <Navbar />
      <div className="flex justify-center items-center flex-grow p-6">
        <Routes>
          {/* Redireciona para /translate se já estiver autenticado */}
          <Route path="/" element={getToken() ? <Navigate to="/translate" /> : <LoginPage />} />

          {/* Paginas acessíveis sem login */}
          <Route path="/register" element={<RegisterPage />} />

          {/* Páginas privadas */}
          <Route path="/translate" element={<PrivateRoute element={<TranslationPage />} />} />
          <Route path="/translations" element={<PrivateRoute element={<GetAllTranslationsPage />} />} />
          <Route path="/allTranslations" element={<PrivateRoute element={<GetAllForAdminPage />} />} />
          <Route path="/allUsers" element={<PrivateRoute element={<GetAllUsersPage />} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
