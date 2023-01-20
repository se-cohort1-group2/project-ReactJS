import styles from './Table.module.css';
import { AiFillPlusCircle } from 'react-icons/ai';

function TableSearchResults ({ list, handlerAdd }) {

    return(
        <div>
            <table className={styles.table} style={{ margin: "0 0 0 0" }}>
                {/* <thead>
                    <tr>
                        <th></th>
                        <th>Search Results</th>
                    </tr>
                </thead> */}
                <tbody>
                    {Object.entries(list).map(([key, value]) => (
                        <tr key={key}>
                            <td onClick={() => handlerAdd(key, value)}>
                                <button className={styles.buttonplus}><AiFillPlusCircle size={28}/></button>
                            </td>
                            <td>{value.ADDRESS}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableSearchResults;