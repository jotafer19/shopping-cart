import useFetchData from "../data/fetch"
import CardContainer from "../components/card-container/CardContainer"
import Loader from "../components/loader/Loader"

export default function ShopPage() {
    const { data, error, isLoading } = useFetchData()
    
    if (isLoading) return <Loader />
    if (error) return <p>{error}</p>
    
    return (
        <div className="screen">
            <CardContainer data={data} />  
        </div>
    )
}