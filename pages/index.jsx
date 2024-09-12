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
    return <h2>Tidak Ada Menu Tersedia</h2>;
  }
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <h1>List Menu</h1>
      <ul>
        {makanan.map((item)=>(
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>{item.imageUrl}</p>
            <img 
              src={item.imageUrl}
              alt={item.name}
              width={150}
              height={150}
              style={{ cursor: 'pointer', borderRadius: '8px', objectFit: 'cover' }}
              onClick={() => router.push(`/${item.id}`)}
              />
              <p>[{item.ingredients}]</p>
              <h1>{item.price}</h1>
              <p>{item.priceDiscount}</p>
              <p>{item.rating}</p>
              <p>{item.totalLikes}</p>
              <p>{item.isLike}</p>
            <button onClick={() => router.push(`/${item.id}`)}>Detail</button>
          </li>
        ))}
      </ul>
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
