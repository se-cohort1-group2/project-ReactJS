function ViewAreaNameList({ list, handlerSelectArea }) {
    return (
        <div>
            <ul className="arealist">
                {list.map((item, i) => (
                    <li key={i}>
                        <input name="name" id={item.pln_area_n} key={i} type="radio" onClick={() => {
                            handlerSelectArea(item.pln_area_n);
                            //add handler to zoom into area
                        }}
                        />
                        <label htmlFor={item.pln_area_n}>
                            {item.pln_area_n}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ViewAreaNameList;