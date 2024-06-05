import useFetchData from "../data/fetch"
import CardContainer from "../components/card-container/CardContainer"
import Card from "../components/item-card/Card"
import Loader from "../components/loader/Loader"

export default function ShopPage() {
    const { data, error, isLoading } = useFetchData()
    console.log(data)

    
    if (isLoading) return <Loader />
    if (error) return <p>{error}</p>
    
    return (
        <CardContainer>
            {data.map(item => <Card key={item.id} item={item} />)}
        </CardContainer>
    )
}