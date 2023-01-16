import OneMapAPI from "../api/OneMapAPI"

function funcSearch(userSearchText, userPageNum,handlerSearchResults){
    
    const searchParams = {
        searchText: userSearchText,
        returnGeom: "Y",
        getAddrDetails: "Y",
        pageNum: userPageNum
    }
    const apiGet = async () =>{
        try {
            const response = await OneMapAPI.get(`/commonapi/search?searchVal=${searchParams.searchText}&returnGeom=${searchParams.returnGeom}&getAddrDetails=${searchParams.getAddrDetails}&pageNum=${searchParams.pageNum}`)

            const searchResults = {...response.data.results}

            if (Object.keys(searchResults).length > 0){                
                handlerSearchResults(searchResults);
                console.log(searchResults);
            } else {
                handlerSearchResults("No Results Found");
            }
            
        } catch (error){
            console.log(error.message);
        }
    }

    apiGet();
    
}

export default funcSearch;