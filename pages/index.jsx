import { getCookie } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";

const apiKey = 'w05KkI9AWhKxzvPFtXotUva-';

export default function ListMenu({makanan}) {
  const router = useRouter();

  if (!makanan || makanan.length === 0) {
    return <h2>Tidak Ada Menu Tersedia</h2>;
  }
  return (
    <div>
      <h1>List Menu</h1>
      <ul>
        {makanan.map((item)=>(
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>{item.imageUrl}</p>
            <Image 
              src={item.image_url}
              alt={item.name}
              width={100}
              height={100}
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
