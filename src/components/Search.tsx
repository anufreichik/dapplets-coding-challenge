import React from 'react';
import {Grid, InputAdornment, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {debounce} from "../helpers/func";

interface IProps{
    search:(val:string)=>void;
}
const Search:React.FC<IProps> = ({search}) => {

    const handleChangeDebounce = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        search(e.target.value);
    }, 500);

    return (
        <>
            <Grid item xs={false} sm={1}/>
            <Grid item xs={12} sm={10}>
                <TextField
                    id="filter"
                    variant='outlined'
                    label="Search"
                    sx={{width: '868px', height: '40px', borderRadius: '10px'}}
                    onChange={handleChangeDebounce}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon/>
                            </InputAdornment>
                        ),
                    }}

                />
            </Grid>
            <Grid item xs={false} sm={1}/>
        </>

    )
        ;
};

export default Search;
