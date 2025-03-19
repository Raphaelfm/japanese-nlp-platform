import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

export default function GetAllTranslationsPage() {
  interface Translation {
    id: number;
    text: string;
    translated: string;
    sentiment: string;
  }

  const [translations, setTranslations] = useState<Translation[]>([]);

  useEffect(() => {
    fetchTranslations();
  }, []);

  const fetchTranslations = async () => {
    try {
      const response = await axios.get("https://japanese-nlp-platform-production.up.railway.app/text-analysis", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTranslations(response.data);
    } catch (error) {
      console.error("Error fetching translations", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://japanese-nlp-platform-production.up.railway.app/text-analysis/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTranslations(translations.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting translation", error);
    }
  };

  return (
    <div className="container mx-auto p-6 text-white">
      <h2 className="text-3xl font-bold mb-4 text-center">All Translations</h2>

      {/* TABELA PARA DESKTOP */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg">
          <thead>
            <tr className="bg-gray-700">
              <th className="py-3 px-6 text-left">Original</th>
              <th className="py-3 px-6 text-left">Translation</th>
              <th className="py-3 px-6 text-left">Sentiment</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {translations.length > 0 ? (
              translations.map((item) => (
                <tr key={item.id} className="border-b border-gray-700">
                  <td className="py-2 px-6">{item.text}</td>
                  <td className="py-2 px-6">{item.translated}</td>
                  <td className="py-2 px-6">{item.sentiment}</td>
                  <td className="py-2 px-6 text-center">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete translation"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
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
              <p className="mb-2 text-gray-100">{item.text}</p>

              <p className="text-lg font-semibold text-gray-300">Translation:</p>
              <p className="mb-2 text-gray-100">{item.translated}</p>

              <p className="text-lg font-semibold text-gray-300">Sentiment:</p>
              <p className="mb-2 text-gray-100">{item.sentiment}</p>

              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white flex items-center justify-center gap-2 w-full mt-2"
              >
                <FaTrash /> Delete
              </button>
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
