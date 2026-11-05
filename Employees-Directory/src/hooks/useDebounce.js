import { useState,useEffect } from "react";
const useDebounce = (value,delay=400) =>{
    const [debouncedValue,setDebounceValue] = useState(value);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebounceValue(value);
        },delay)
        return () =>
        {
            clearTimeout(timer);
        };
    },[value,delay]);
    return debouncedValue;
};

export default useDebounce;