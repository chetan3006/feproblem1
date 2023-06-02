import Button from '@mui/material/Button';
import {Stack} from '@mui/material'; 
export default function header(){
    return(
        <div>
            <Stack direction="row">
            <h1>Finding Falcone!</h1>
            <Stack direction="row">
            <Button variant='text'>Reset</Button>
            <Button variant='text'>GeekTrustHome</Button>
            </Stack>
            </Stack>
        </div>
    )
    
}