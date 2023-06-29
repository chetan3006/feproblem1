import Button from '@mui/material/Button';
import {Stack} from '@mui/material'; 
import {Grid} from '@mui/material';
export default function Header({clearFormData}){
    let handlereset=()=>{
        clearFormData();
       window.location.reload()

    }
    let handlegeektrust=()=>{
        window.location.href='https://www.geektrust.com/'

    }

    return(
        <div>
            <Stack direction="row">
            <Grid container spacing={2}>
            <Grid item xs={8}>
            <h1>Finding Falcone!</h1>
            </Grid>
            <Grid item xs={12} md={4}>
            <Stack direction="row" justifyContent="space-around" alignItems="center" alignContent="space-between">
            <Button onClick={handlereset} variant='text'>Reset</Button>
            <Button onClick={handlegeektrust} variant='text'>GeekTrustHome</Button>
            </Stack>
            </Grid>
            </Grid>
            </Stack>
            
        </div>
    )
    
}