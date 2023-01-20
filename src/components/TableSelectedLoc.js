import styles from './Table.module.css';
import { AiFillDelete } from 'react-icons/ai';

function TableSelectedLoc({ name, item, handler, editStatus, setPosition }) {

    return (
        <div>
            <table className={styles.table} style={{ marginBottom: "0" }}>
                <thead>
                    <tr>
                        <th style={{ padding: "0px 10px 0px 10px", backgroundColor: 'white' }}>{name}</th>
                        <th style={{ padding: "0px 10px 0px 10px", backgroundColor: 'white' }}></th>
                    </tr>
                </thead>
                <tbody>
                    <tr key="selected location">
                        <td style={{ width: "85%" }}>{item.ADDRESS}</td>
                        {!editStatus && <td onClick={() => {
                            handler(name)
                        }}>
                            <button className={styles.buttonedit} onClick={() => setPosition(null)}><AiFillDelete size={20} /></button>
                        </td>}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TableSelectedLoc;