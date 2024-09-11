import {getCookie} from "cookies-next";
import axios from "axios";

const apiKey = 'w05KkI9AWhKxzvPFtXotUva-';

export default function DetailMenu({food}){
    if(!food)
    {
        return <h2>Loading...</h2>
    }
    return (
        <div>
            <h1>{food.name}</h1>
            <img src={food.image_url} alt={food.name} width={200} height={200} />
            <p> Created at:{new Date(food.createdAt).toLocaleDateString()}</p>
        </div>
    )
}

export async function getServerSideProps(context) {
    const {idMakanan} = context.params;
    const {req, res} = context;

    const token = getCookie("token", {req, res});

    if (!token) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    try {
        const response = await axios.get("https://api-bootcamp.do.dibimbing.id/api/v1/food/${idMakanan}",{
            headers: {
                "apiKey": apiKey,
                "Authorization": `Bearer ${token}`,
            },
        });

        return {
            props: {    
                food: response.data.data,
            },
        };

    } catch (error) {
        console.error('Error fetching food details:', error.response?.data);
        return {
            props: {
                food: null,
            },
        };
    }
}