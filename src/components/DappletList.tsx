import React, {useEffect, useState} from 'react';
import DappletItem from "./DappletItem";
import {IDapplet, ITag, ITagMap} from "../types";
import axios from "axios";
import {API_URL_BASE} from "../helpers/constants";

interface IProps{
    list:IDapplet[] | [];
}

const DappletList:React.FC<IProps> = ({list}) => {

    const [tagsData, setTagsData]  = useState<ITag[] | []>([]);
    const [tagsObj, setTagsObj]  = useState<ITagMap>({});

    useEffect(()=>{
        //https://dapplets-hiring-api.herokuapp.com/api/v1/tags
        axios.get(`${API_URL_BASE}tags`)
            .then((res) => {
                if(res && res.data.success) {
                    setTagsData(res.data.data);
                    //let obj: Record<string, ITag> = {};
                    let obj: ITagMap = {};
                    for(let el of res.data.data){
                        if(!obj[el.id]) obj[el.id]=el;
                    }
                    setTagsObj(obj);
                }
            })
    },[])

    return (
        <>
            {list.map(el=><DappletItem key={el.id} dapplet={el} tags={tagsObj}/>)}
        </>

    );
};

export default DappletList;
