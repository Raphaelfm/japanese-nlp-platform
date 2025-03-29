import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { handleAuthError } from "../utils/auth";
import API from "../utils/apiRoutes";

export default function GetAllUsersPage() {
  interface Users {
    id: number;
    username: string;
    role: string;
  }

  const [translations, setUsers] = useState<Users[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTranslations();
  }, []);

  const fetchTranslations = async () => {
    try {
      const response = await axios.get( API.user.getAll, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching translations", error);
      handleAuthError(error as AxiosError, navigate);
    }
  };

  return (
    <div className="container mx-auto p-6 text-white">
      <h2 className="text-3xl font-bold mb-4 text-center">All Users</h2>

      {/* TABELA PARA DESKTOP */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg">
          <thead>
            <tr className="bg-gray-700">
              <th className="py-3 px-6 text-left">User</th>
            </tr>
          </thead>
          <tbody>
            {translations.length > 0 ? (
              translations.map((item) => (
                <tr key={item.id} className="border-b border-gray-700">
                  <td className="py-2 px-6">{item.username}</td>                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4">No translations available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CARDS PARA MOBILE */}
      <div className="md:hidden flex flex-col gap-4">
        {translations.length > 0 ? (
          translations.map((item) => (
            <div key={item.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <p className="text-lg font-semibold text-gray-300">Original:</p>
              <p className="mb-2 text-gray-100">{item.username}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-300">No translations available</p>
        )}
      </div>

      {/* Botão de voltar */}
      <div className="mt-6 text-center">
        <Link to="/translate" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-lg font-semibold transition-all">
          Back to Translate
        </Link>
      </div>
    </div>
  );
}
