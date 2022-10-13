import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';

export const StateContextProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const getResults = async (url) => {
        setLoading(true);

        const res = await fetch(`${baseUrl}${url}`, {
            method: 'GET',
            headers: {
                'X-User-Agent': 'desktop',
                'X-Proxy-Location': 'EU',
                'X-RapidAPI-Key': '5adebd6ac3msh1375692809c0822p1c4614jsn43641c09ee54',
                'X-RapidAPI-Host': 'google-search3.p.rapidapi.com'
            },
        });

        const data = await res.json();

        setResults(data);
        setLoading(false);
    };

    return (
        <StateContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, loading }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
