import React, {useEffect, useState} from 'react';
import {Container, Grid, styled} from "@mui/material";
import Header from "./components/Header";
import DappletList from "./components/DappletList";
import Search from "./components/Search";
import axios from "axios";
import {API_URL_BASE} from "./helpers/constants";
import {IDapplet} from "./types";
import useDappletSearch from "./helpers/useDappletSearch";
import MenuDrawer from "./components/MenuDrawer";


const StyledContainer = styled(Grid)(({theme}) => ({
    margin: '50px 0 50px 0',
    padding:'10px'
}));


const App: React.FC = () => {
    const [dappletsList, setDappletsList] = useState<IDapplet[] | []>([]);
    const [searchValue, setSearchValue] = useState<string | undefined>();
    const [filter,setFilter] = useState('');
    const [loading, setLoading] =useState(true);
    let currentOffset=0;

    // const {loading, error, dappletsList } = useDappletSearch(filter, currentOffset)

    const saveLocalStorageInitial=(data:IDapplet[] | [])=>{
        const savedDapplets = localStorage.getItem("dapplets-installations");
        if(!savedDapplets){
            let dappletInstallObj: { [key: string]: boolean } = {};
            for (let dapplet of data) {
                if(!dappletInstallObj[dapplet.id]) dappletInstallObj[dapplet.id] = false;
            }
            localStorage.setItem("dapplets-installations", JSON.stringify(dappletInstallObj));
                            }
    }

    //API call to load dapplets
    const loadDappletsPage = () => {
        let searchFilterString = JSON.stringify([{"property":"title", "value":searchValue}]);
        if(!searchValue) searchFilterString=JSON.stringify([]);
        setLoading(true);
        axios({
            method: 'GET',
            url: `${API_URL_BASE}dapplets?`,
            params: { limit: 10, start: currentOffset, filter:searchFilterString, sort:`[{"property":"title","direction":"ASC"}]`},
        })
            .then(({ data }) => {
                console.log('here i am', data.data)
                setDappletsList((prevDapplets) => [...prevDapplets, ...data.data]);
                ///HANDLE STORAGE RESET TODO
                saveLocalStorageInitial(data.data);
                setLoading(false);
            });
        currentOffset+=10;

    };
    const handleSearchValue=(val:string)=>{
        setSearchValue(val);
    }

    const handleScroll = (e:any) => {
        const scrollHeight = e.target.documentElement.scrollHeight;
        const currentHeight = Math.ceil(
            e.target.documentElement.scrollTop + window.innerHeight
        );

        if (currentHeight + 1 >= scrollHeight) {
            loadDappletsPage();
        }

    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        loadDappletsPage();
        return ()=>{
           window.removeEventListener('scroll', handleScroll);
        }
    }, [])


    useEffect(() => {
        if(searchValue)
        {
            setDappletsList([]);
            currentOffset=0;
            loadDappletsPage();
        }

    }, [searchValue]);

    return (
        <Grid container wrap='nowrap'>
            <Grid item>
                <MenuDrawer/>
            </Grid>
            <Grid item container direction="column" sx={{
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
                        <DappletList list={dappletsList} loading={loading}/>
                    </Grid>

                </StyledContainer>

            </Grid>
        </Grid>
    );
}

export default App;
