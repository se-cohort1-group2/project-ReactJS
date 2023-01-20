import OneMapAPI from "../api/OneMapAPI";

function funcGetRoute(startLoc, endDest, travelType, handlerPolyline) {

    const searchParams ={
        start: startLoc,
        end: endDest,
        routeType: travelType,
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjk2NTYsInVzZXJfaWQiOjk2NTYsImVtYWlsIjoicGhvZWJleWtxQGdtYWlsLmNvbSIsImZvcmV2ZXIiOmZhbHNlLCJpc3MiOiJodHRwOlwvXC9vbTIuZGZlLm9uZW1hcC5zZ1wvYXBpXC92MlwvdXNlclwvc2Vzc2lvbiIsImlhdCI6MTY3NDE2NDU4MSwiZXhwIjoxNjc0NTk2NTgxLCJuYmYiOjE2NzQxNjQ1ODEsImp0aSI6IjEwM2VlYzUzNTQ3NTgwNmQ1MGI5OWQzNWY3ZTg0NmQzIn0.wy7To0TUxuy5biHrcwf2pdu9DDRLX85kKU3QxJL7-H8"
        // token expires Monday 23rd Jan 2023
    }

    const apiGet = async () => {
        const response = await OneMapAPI.get(`/privateapi/routingsvc/route?start=${searchParams.start}&end=${searchParams.end}&routeType=${searchParams.routeType}&token=${searchParams.token}`)
        const routeGeometry = response.data.route_geometry;
        
        handlerPolyline(routeGeometry);
    }

    apiGet();
}

export default funcGetRoute;