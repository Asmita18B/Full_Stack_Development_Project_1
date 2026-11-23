function Fooditem() {
    const fooditem = [
        "dal",
        "chicken",
        "green vegetable",
        "roti",
        "salad",
        "milk",
    ]

    return (
        <>
          <h1>Helthy Food</h1>

          <ul className="list-group">
            {fooditem.map((item) => (
                <li key={item} className="list-group-item">
                    {item}
                </li>
            ))}
          </ul>
        </>
    )
}

export default Fooditem;