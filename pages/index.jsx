import { deleteCookie, getCookie } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/router";

const apiKey = 'w05KkI9AWhKxzvPFtXotUva-';

export default function ListMenu({makanan}) {
  const router = useRouter();

  const handleLogout =()=> {
    deleteCookie("token");
    router.push("/login");
  }

  if (!makanan || makanan.length === 0) {
    return <h2 className="text-center text-2xl font bold text-gray-800">Tidak Ada Menu Tersedia</h2>;
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between items-center p-6 bg-white shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">List Menu</h1>
          <button onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4">
        {makanan.map((item)=>(
          <div key={item.id}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer flex flex-col items-center justify-center"
            onClick={() => router.push(`/${item.id}`)}>
              <img 
                src={item.imageUrl}
                all={item.name}
                className="w-full h-48 object-cover rounded-lg mb-4"/>

            <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{item.name}</h3>
            <p className="text-sm text-gray-600 mb-2 text-center line-clamp-2">{item.description}</p>
            <p className="text-sm text-black-400 mb-2 text-center line-clamp-2">Ingredients: {item.ingredients}</p>
            <h1 className="text-md font-bold text-gray-900 mb-2 text-center">Price: {item.price} USD</h1>
            {item.priceDiscount && (
              <p className="text-red-500 mb-2 text-center">Discounted Price: {item.priceDiscount} USD</p>
            )}
            <p className="text-yellow-500 mb-2 text-center">Rating : {item.rating}</p>
            <p className="text-gray-500 mb-2 text-center">Total Likes : {item.totalLikes}</p>
            <p className="text-gray-500 text-center">Liked: {item.isLike ? 'Yes' : 'No'}</p>
            </div>
        ))}
    </div>
  </div>
  );
}
export async function getServerSideProps(context) {
  const { req, res } = context;
  const token = getCookie("token", { req, res });

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
  const response = await axios.get("https://api-bootcamp.do.dibimbing.id/api/v1/foods", {
    headers: {
      "Content-Type": "application/json",
      apiKey: apiKey,
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data);
  
  return {
    props: {
      makanan: response.data.data,
    },
  };
} catch (error) {
  console.error('Error fetching data:', error.response?.data);
  
  return {
    props: {
      makanan: [],
    },
  };
}
}
