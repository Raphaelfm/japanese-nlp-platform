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
      const response = await axios.get("http://localhost:3001/text-analysis", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTranslations(response.data);
    } catch (error) {
      console.error("Error fetching translations", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/text-analysis/${id}`, {
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
      <div className="overflow-x-auto">
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
      <div className="mt-6 text-center">
        <Link to="/translate" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-lg font-semibold transition-all">
          Back to Translate
        </Link>
      </div>
    </div>
  );
}
