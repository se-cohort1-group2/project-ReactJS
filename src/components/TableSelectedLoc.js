import styles from './Table.module.css';
import { RiEditBoxFill } from 'react-icons/ri'

function TableSelectedLoc ({name, item, handler}) {

    return(
        <div>
            <table className= {styles.table} style={{ margin: "-5px 0 0 0" }}>
                <thead>
                    <tr>
                        <th></th>
                        <th style={{ padding: "15px 10px 10px 5px" }}>{name}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key="selected location">
                         <td onClick={handler}>
                            <button className={styles.buttonedit}><RiEditBoxFill size={28}/></button>
                        </td>

                        <td>{item.ADDRESS}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TableSelectedLoc;