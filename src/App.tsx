import React, {useEffect, useState} from 'react';
import {Container, Grid, styled} from "@mui/material";
import Header from "./components/Header";
import DappletList from "./components/DappletList";
import Search from "./components/Search";
import axios from "axios";
import {API_URL_BASE} from "./helpers/constants";
import {IDapplet} from "./types";


const StyledContainer = styled(Grid)(({theme}) => ({
    margin: '50px 0 50px 0',
    padding:'10px'
}));


const App: React.FC = () => {
    const [dappletsList, setDappletsList] = useState<IDapplet[] | []>([]);
    const [searchValue, setSearchValue] = useState('');

    const handleSearchValue=(val:string)=>{
        setSearchValue(val);
    }

    useEffect(() => {
        const savedDapplets = localStorage.getItem("dapplets-installations");

        axios.get(`${API_URL_BASE}dapplets?limit=20&start=0&filter=[]&sort=[{"property":"title","direction":"ASC"}]`)
            .then((res) => {
                if (res && res.data.success) {
                    setDappletsList(res.data.data);
                    if(!savedDapplets){
                        let dappletInstallObj:{[key:string]:boolean} ={};
                        for(let dapplet of res.data.data)
                        {
                            dappletInstallObj[dapplet.id] = false;
                        }
                        localStorage.setItem("dapplets-installations", JSON.stringify(dappletInstallObj));
                    }
                }
                else setDappletsList([]);
            })
    }, [])

    useEffect(() => {
        let searchFilterString = JSON.stringify([{"property":"title", "value":searchValue}]);
        if(!searchValue.length) searchFilterString=JSON.stringify([]);

        axios.get(`${API_URL_BASE}dapplets?limit=20&start=0&filter=${searchFilterString}&sort=[{"property":"title","direction":"ASC"}]`)
            .then((res) => {
                setDappletsList(res.data.data);
            })

    }, [searchValue]);

    return (
        <Container>
            <Grid container direction="column" sx={{
                background: 'linear-gradient(180deg, rgba(185, 251, 255, 0.2) 0%, rgba(227, 220, 255, 0.2) 100%)',
                backdropFilter: 'blur(30px)'
            }}>
                <Grid item>
                    <Header/>
                </Grid>
                <Grid item container sx={{margin: '20px 0 16px 0'}}>
                    <Search search={handleSearchValue}/>
                </Grid>
                <StyledContainer item container>

                    <Grid item xs={12} >
                        <DappletList list={dappletsList}/>
                    </Grid>

                </StyledContainer>
            </Grid>
        </Container>
    );
}

export default App;
