import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL_BASE} from "./constants";

const cache:any = {};

export const useImageData = (icon:string) => {
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState('');

    useEffect(() => {
        if (!icon) return;

        const fetchData = async () => {
            setStatus('fetching');
            if (cache[icon]) {
                const data = cache[icon];
                setData(data);
                setStatus('fetched');
            } else {
                const response =  await axios.get(`${API_URL_BASE}files/${icon}`,
                    {  responseType: 'blob',}
                )
                const data = await response.data;
                const urlObj:string = window.URL.createObjectURL(new Blob([data]));
                cache[icon] = urlObj
                setData(urlObj);
                setStatus('fetched');
            }
        };

        fetchData();
    }, [icon]);

    return { status, data };
};
