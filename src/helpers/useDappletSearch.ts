import { useEffect, useState } from 'react'
import axios from 'axios'
import {API_URL_BASE} from "./constants";
import {IDapplet} from "../types";

export default function useDappletSearch(searchFilterString:string, start:number) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [dappletsList, setDappletsList] = useState<IDapplet[] | []>([]);

    useEffect(() => {
        setDappletsList([])
    }, [searchFilterString])

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel:Function;
        axios({
            method: 'GET',
            url: `${API_URL_BASE}dapplets?`,
            params: { limit: 20, start: start, filter:searchFilterString, sort:`[{"property":"title","direction":"ASC"}]`},
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setDappletsList(prevDapplets => {
                return prevDapplets.concat(res.data.data);
            })
            setLoading(false);
        }).catch(e => {
            if (axios.isCancel(e)) return;
            setError(true);
        })
        return () => cancel()
    }, [searchFilterString, start])

    return { loading, error, dappletsList }
}
