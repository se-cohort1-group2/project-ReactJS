import OneMapAPI from "../api/OneMapAPI"; 

function funcGetPlanningArea(handler){
    const OneMapToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjk2NTYsInVzZXJfaWQiOjk2NTYsImVtYWlsIjoicGhvZWJleWtxQGdtYWlsLmNvbSIsImZvcmV2ZXIiOmZhbHNlLCJpc3MiOiJodHRwOlwvXC9vbTIuZGZlLm9uZW1hcC5zZ1wvYXBpXC92MlwvdXNlclwvc2Vzc2lvbiIsImlhdCI6MTY3Mzg2Mjg2NSwiZXhwIjoxNjc0Mjk0ODY1LCJuYmYiOjE2NzM4NjI4NjUsImp0aSI6ImIyMTc1YmJjZTE0N2FiMmZjOTJkZmEyZGNiZjczMzBmIn0.F5hSL5YmIbkY2isTnyaSOPZHRKPjeR7vjnwPwyWWbfM"
    // token expires Thursday 19th Jan 2023

    const apiGetPlanningArea = async() => {
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