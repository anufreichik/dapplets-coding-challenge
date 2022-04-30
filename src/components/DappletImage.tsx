import React from 'react';
import {Avatar} from "@mui/material";
import {useImageData} from "../helpers/useImageData";

interface IProps{
    title:string;
    icon:string;
}
const DappletImage:React.FC<IProps> =({title,icon}) => {
    const { status, data } = useImageData(icon);
    return (
        <Avatar
            alt={title}
            src={data}
            sx={{ width: 50, height: 50 }}
            variant="rounded"
        />
    );
};

export default DappletImage;
