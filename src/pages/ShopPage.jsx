import useFetchData from "../data/fetch";
import CardContainer from "../components/card-container/CardContainer";
import Loader from "../components/loader/Loader";
import styles from "../App.module.css"


export default function ShopPage() {
  const { data, error, isLoading } = useFetchData();

  return (
    <div className={styles.screen}>
      {isLoading ? (
        <Loader />
      ) : ( error ? (
        <p>{error}</p>
      ) : (
        <CardContainer data={data} />
      ))}
    </div>
  );
}
