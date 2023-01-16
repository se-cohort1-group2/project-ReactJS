import styles from './Table.module.css';
import { RiEditBoxFill } from 'react-icons/ri'

function TableSelectedLoc ({name, item, handler}) {

    return(
        <div>
            <table className= {styles.table}>
                <thead>
                    <tr>
                        <th></th>
                        <th>{name}</th>
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