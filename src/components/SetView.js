import { useMap } from 'react-leaflet';

function SetView({ marker, zoom }) {
    const map = useMap();
    map.setView(marker, zoom)
}

export default SetView;