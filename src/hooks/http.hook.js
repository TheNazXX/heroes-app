import { useCallback, useState } from "react";

export const useHttp = () => {
    const [process, setProcess] = useState('waiting');

    const request = useCallback(async (url, method = 'GET', body = null, headers={'Content-Type': 'application/json'}) => {
        setProcess('loading');

        try{
            const response = await fetch(url, {method, body, headers});

            if(!response.ok){
                throw new Error(`Could not to fetch ${url}, status ${(await response).status}`)
            }

            const data = await response.json();
            setProcess('confirmed');
            return data;

        }catch (e){ 
            setProcess('error');
            throw e;
        };

    }, []);

    const clearError = useCallback(() => setProcess('waiting'), []);

    return {process, setProcess, clearError, request};
};

