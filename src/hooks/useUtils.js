import { useState, useEffect } from "react";
import API from "../utils/API";

export const useUtils = (apiMethod, dependencies) => {
    const [fetchedData, setFetchedData] = useState(null);

    useEffect(() => {
        console.log("API method:" , apiMethod);
        API.apiMethod()
            .then(res => {
                console.log(res);
            })
    })
};