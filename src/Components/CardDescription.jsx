function CardDescription({ listData }) {

    return (
        <>
            Name:
            {listData.name}
            <br />
            Rating:
            {listData.rating}
            <br />
            Distance:
            {listData.distance}
        </>
    );
}
export default CardDescription;