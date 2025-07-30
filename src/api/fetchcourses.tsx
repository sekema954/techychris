//fetch courses

import { useEffect, useState } from "react"
interface courseProp  {
    id: string;
    title: string;
    description: string;
    image: string;
    level: "Beginner" | "Intermediate" | "Advanced"; // You can adjust this as needed
    duration: string;
    price: number;
    rating: number;
    instructor: string;
    tags: string[];
    courseUrl: string;
}
const useFetchCourses = () => {
    const [courses, setCourses] = useState<courseProp[]>([]);
    const [isLoading, setLoading] = useState(false);
    useEffect(()=>{
        const fetchCourses = async () => {
            const url = 
            import.meta.env.PROD
            ? `${import.meta.env.VITE_HEROKU_URL}/api/courses`
            :"http://localhost:3000/api/courses"; //Same with this. Add your heroku link in front of /api/courses
            const options = {
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                },
            }
            try{
                const response = await fetch(url, options);
                if(!response.ok) {
                    throw new Error(`Failed to retrieve courses ${response.status}`,);
                }
                const result = await response.json();
                setCourses(result);
                setLoading(true);
                console.log(result);
            } catch(err){
                console.error(`Internal Server Error`, err);
            } finally{
                setLoading(false);
            }
        }
        fetchCourses();
    }, [])
    return {isLoading, courses}
}

export default useFetchCourses