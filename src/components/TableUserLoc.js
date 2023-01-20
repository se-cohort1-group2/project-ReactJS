import styles from './Table.module.css';
import { AiFillMinusCircle } from 'react-icons/ai';

function TableUserLoc ({ name, list, handler }) {

    return(
        <div>
            <table className={styles.table} style={{ marginTop: "0" }}>
                <thead>
                    <tr>
                        <th></th>
                        <th>{name}</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(list).map(([key, value]) => (
                        <tr key={key}>
                            <td onClick={() => handler(key, value)}>
                                <button className={styles.buttonminus}><AiFillMinusCircle size={28}/></button>
                            </td>
                            <td>{value.ADDRESS}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableUserLoc;