import CurCoord from './CurCoord';
import { useState } from "react";

const CountNearby = (props) => {

    const [closeToUserPoints, setCloseToUserPoints] = useState([]);

    const handlerCurrentCoord = (latitude, longitude) => {

        const placeholderSetOfPoints = [];

        props.latLon.forEach(individual_point => {

            

            if ((Math.abs(individual_point.Latitude - latitude) < 0.01) && 
                (Math.abs(individual_point.Longitude - longitude) < 0.01)) {
                    console.log(individual_point.Latitude, individual_point.Longitude);
                    // push the coordinates into the arr
                    placeholderSetOfPoints.push({latitude: individual_point.Latitude, 
                                                 longitude: individual_point.Longitude});

                    setCloseToUserPoints(placeholderSetOfPoints);

            }
        });

    };

    return (
        <div>
            <CurCoord onCurrentCoord = {handlerCurrentCoord} />
            {closeToUserPoints.length > 0 &&
                <h2>
                There are {closeToUserPoints.length} available taxis in the vicinity.
                </h2>
            }
            <h2>List of nearest available taxis' coordinates</h2>
            <ul>
                {closeToUserPoints.map((item, index) => <li key={index}>{item.latitude}, {item.longitude}</li>)}
            </ul>
        </div> 
    );
};

export default CountNearby;
