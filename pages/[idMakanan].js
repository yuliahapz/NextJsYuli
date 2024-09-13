// pages/[idMakanan].js
import { getCookie } from 'cookies-next';
import axios from 'axios';

const apiKey = 'w05KkI9AWhKxzvPFtXotUva-';

const handleLogout = () => {
  deleteCookie('token');
  window.location.href = '/login';
}
export default function DetailMenu({ food }) {
  if (!food) {
    return <h2>Menu Tidak Tersedia</h2>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-8 max-w-lg text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {food.name || 'Nama Makanan Tidak Tersedia'}
        </h1>
        
        <img
          src={food.imageUrl || '/path/to/default-image.png'} 
          alt={food.name || 'Gambar Makanan'}
          className="mx-auto w-48 h-48 object-cover rounded-lg shadow-md mb-6"
        />

        <p className="text-gray-600 mb-4">
          {food.description || 'Deskripsi Tidak Tersedia'}
        </p>

        <p className="text-sm text-gray-500">
          Dibuat pada: {food.createdAt ? new Date(food.createdAt).toLocaleDateString() : 'Tanggal Tidak Tersedia'}
        </p>

        <a href="/" className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
          Kembali ke List Menu
        </a>
        
        <button 
          onClick={handleLogout} 
          className="mt-4 inline-block bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300">
          Logout
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { idMakanan } = context.params;
  const { req, res } = context;
  const token = getCookie('token', { req, res });

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const response = await axios.get(`https://api-bootcamp.do.dibimbing.id/api/v1/foods/${idMakanan}`, {
      headers: {
        'apiKey': apiKey,
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log('Data Detail Makanan:', response.data); // Log data untuk debug

    return {
      props: {    
        food: response.data.data, // Pastikan struktur data sesuai
      },
    };

  } catch (error) {
    console.error('Terjadi Kesalahan Mengambil Data Detail Makanan:', error.response?.data || error.message);
    return {
      props: {
        food: null,
      },
    };
  }
}
