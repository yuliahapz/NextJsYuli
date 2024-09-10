import { getCookie } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/router";

const apiKey = 'w05KkI9AWhKxzvPFtXotUva-';

export default function ListMenu({makanan}) {
  const router = useRouter();

  if (!makanan) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <h1>List Menu</h1>
      <ul>
        {makanan.map(makanan=>(
          <li key={makanan.id}>
            <h3>{makanan.name}</h3>
            <p>{makanan.description}</p>
            <button onClick={() => router.push(`/makanan/${makanan.id}`)}>Detail</button>
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
  const response = await axios.get("https://api-boothcamp.do.dibimbing.id/api/v1/food", {
    headers: {
      "Content-Type": "application/json",
      apiKey: apiKey,
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    props: {
      makanan: response.data.data,}
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
