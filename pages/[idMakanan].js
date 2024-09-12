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
    <div>
      <h1>{food.name || 'Nama Makanan Tidak Tersedia'}</h1>
      <img
        src={food.imageUrl || '/path/to/default-image.png'} // Ganti dengan URL gambar default jika perlu
        alt={food.name || 'Gambar Makanan'}
        width={200}
        height={200}
        style={{ borderRadius: '8px', objectFit: 'cover' }} // Styling tambahan untuk tampilan gambar
      />
      <p>Created at: {food.createdAt ? new Date(food.createdAt).toLocaleDateString() : 'Tanggal Tidak Tersedia'}</p>
      <p><a href="/">Kembali ke List Menu</a></p>
      <button onClick={handleLogout}>Logout</button>
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
