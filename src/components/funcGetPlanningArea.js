import OneMapAPI from "../api/OneMapAPI";

function funcGetPlanningArea(handler) {

    const OneMapToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjk2NTYsInVzZXJfaWQiOjk2NTYsImVtYWlsIjoicGhvZWJleWtxQGdtYWlsLmNvbSIsImZvcmV2ZXIiOmZhbHNlLCJpc3MiOiJodHRwOlwvXC9vbTIuZGZlLm9uZW1hcC5zZ1wvYXBpXC92MlwvdXNlclwvc2Vzc2lvbiIsImlhdCI6MTY3NDE2NDU4MSwiZXhwIjoxNjc0NTk2NTgxLCJuYmYiOjE2NzQxNjQ1ODEsImp0aSI6IjEwM2VlYzUzNTQ3NTgwNmQ1MGI5OWQzNWY3ZTg0NmQzIn0.wy7To0TUxuy5biHrcwf2pdu9DDRLX85kKU3QxJL7-H8"
    // token expires Monday 23rd Jan 2023

    const apiGetPlanningArea = async () => {
        try {
            const AreaPolygonData = await OneMapAPI.get(`/privateapi/popapi/getAllPlanningarea?token=${OneMapToken}`)
            AreaPolygonData.data.sort((a, b) => a.pln_area_n.localeCompare(b.pln_area_n))
            const removedOTHERS = AreaPolygonData.data.filter(area => area.pln_area_n !== "OTHERS")
            handler(removedOTHERS)
            console.log(AreaPolygonData.data)
        } catch (error) {
            console.log(error.message)
        }
    }
    apiGetPlanningArea();
}

export default funcGetPlanningArea;