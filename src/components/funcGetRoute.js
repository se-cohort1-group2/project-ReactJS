import OneMapAPI from "../api/OneMapAPI";

function funcGetRoute(startLoc, endDest, travelType, handlerPolyline) {

    const searchParams ={
        start: startLoc,
        end: endDest,
        routeType: travelType,
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjk2NzQsInVzZXJfaWQiOjk2NzQsImVtYWlsIjoibHllLnlvbmcueGluLjk2NjBAZ21haWwuY29tIiwiZm9yZXZlciI6ZmFsc2UsImlzcyI6Imh0dHA6XC9cL29tMi5kZmUub25lbWFwLnNnXC9hcGlcL3YyXC91c2VyXC9zZXNzaW9uIiwiaWF0IjoxNjczNzYzNjk0LCJleHAiOjE2NzQxOTU2OTQsIm5iZiI6MTY3Mzc2MzY5NCwianRpIjoiODRjNTA4YmE3ZjUxZjkwNTdhZjg1ODBlMDY4ZGZlMmUifQ.5eWWvN2RThAzy7TXft0tSqgIxk16fJkFcFWsvIoNWMM"
    }

    const apiGet = async () => {
        const response = await OneMapAPI.get(`/privateapi/routingsvc/route?start=${searchParams.start}&end=${searchParams.end}&routeType=${searchParams.routeType}&token=${searchParams.token}`)
        const routeGeometry = response.data.route_geometry;
        
        handlerPolyline(routeGeometry);
    }

    apiGet();
}

export default funcGetRoute;