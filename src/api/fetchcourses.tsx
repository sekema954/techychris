import { useEffect, useState } from "react"
import { CoursesProp } from "../components/courseCard"

export const useFetchCourses = () => {
    const [courses, setCourses] = useState<CoursesProp[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');


    useEffect(()=>{
        const fetchCourses = async () => {
            try{
                setLoading(true);
                //const url = import.meta.env.MODE === 'development' 
                //? `${import.meta.env.VITE_DEV_URL}/api/courses`
               // : `${import.meta.env.VITE_PROD_URL}/api/courses`

                const response = await fetch("", {
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json'
                    }
                });
                if(!response.ok) {
                    const errorData = await response.json();
                    setError(`${response.status}, ${errorData}`);
                    throw new Error(`Failed to get courses.${response.status}`);
                };

                const result = await response.json();
                setCourses(result.data);
            } catch(err:any) {
                setError(err.message);
                console.error(`${err.message}`, err);
            } finally{
                setLoading(false);
            }
        }
        fetchCourses();
    }, []);
    return{ courses, error, isLoading };
}