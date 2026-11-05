import { useState,useEffect } from "react";
const useFetch = (url) =>{
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("");

    useEffect(()=>{
        const fecthData = async () =>{
            try{
                setLoading(true);
                setError("");

                const response = await fetch(url);

                if(!response.ok){
                    throw new Error("Data not Fount !")
                }

                const result = await response.json();
                setData(result);
            }
         catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
        };

        fecthData();
    },[url]);

    return {data,loading,error};
};
export default useFetch;