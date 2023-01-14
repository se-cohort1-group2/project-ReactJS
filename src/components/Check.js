
function Check({ marker, polygon }) {

    const handlerCheck = () => {
        var poly = ([
            [51.51, -0.08],
            [51.503, -0.06],
            [51.51, -0.047]
        ])



        console.log(poly)
    }
    return (
        <button onClick={handlerCheck}>Check marker in polygon</button>
    );
};

export default Check;