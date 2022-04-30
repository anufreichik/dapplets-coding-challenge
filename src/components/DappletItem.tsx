import * as React from 'react';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import {styled} from '@mui/material/styles';
import MuiAccordion, {AccordionProps} from '@mui/material/Accordion';
import {IDapplet, ITagMap} from "../types";
import {Avatar, Chip, Grid} from "@mui/material";
import {useEffect, useState} from "react";
import DappletImage from "./DappletImage";

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({theme}) => ({
    border: `1px solid linear-gradient(165.4deg, #FFFFFF -10.07%, rgba(255, 255, 255, 0) 89.61%)`,
    marginBottom: '10px',
    borderRadius: '10px',
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 255, 0.3)',
    boxShadow: '10px 10px 40px rgba(156, 185, 222, 0.1)',
    '&:before': {
        display: 'none',
    },
}));

interface IProps {
    dapplet: IDapplet;
    tags: ITagMap;
}

const DappletItem: React.FC<IProps> = ({dapplet, tags}) => {
    const [installations, setInstallations] = useState(() => {
        // getting stored value
        const saved = localStorage.getItem("dapplets-installations");
        const initialValue = saved?JSON.parse(saved):'';
        return initialValue;
    });

    const handleDelete = (tagId: string) => {

    }

    const handleInstallClick=(id:string)=>{

    }

    return (
        <Accordion>
            <AccordionSummary
                // expandIcon={<MenuIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Grid container direction="row">
                    <Grid item container sm={1}>
                        <MenuIcon/>
                        <DappletImage title={dapplet.title} icon={dapplet.icon} />
                    </Grid>
                    <Grid item sm={4}><Typography>{dapplet.title}</Typography></Grid>
                    <Grid item sm={4}><Typography>{dapplet.description}</Typography></Grid>
                    <Grid item sm={2}>
                        <Grid container direction="row" spacing={1}>
                            {
                                dapplet.tags.map((el, index) => {
                                    if (tags[el])
                                        return (<Grid item key={index}><Chip label={tags[el].name} variant="outlined"
                                                                             onDelete={() => handleDelete(tags[el].id)}
                                                                             size="small"/></Grid>)
                                })
                            }

                        </Grid>
                    </Grid>
                    <Grid item sm={1}> <Chip label={installations[dapplet.id]?'INSTALL':'INSTALLED'} color="primary" size={"small"}
                                             disabled={installations[dapplet.id]}
                                             onClick={() => handleInstallClick(dapplet.id)}/></Grid>
                </Grid>

            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {dapplet.text_1}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
}

export default DappletItem;
