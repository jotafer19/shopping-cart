import { useState, useEffect } from "react"

export default function useFetchData() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch("https://fakestoreapi.com/products/")
                if (!response.ok) {
                    throw new Error("server error")
                }
                const data = await response.json();
                setData(data)
            } catch(error) {
                setError(error);
            } finally {
                setTimeout(() => setIsLoading(false), 500)
            }
        } 

        getData();
    }, [])

    return { data, error, isLoading }
}