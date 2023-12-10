import { Grid } from '@mui/material';
import Loader from '../../Assets/Images/loader.gif';
import './Loader.scss'


const MiniLoader =(props)=>{
    return (
        <Grid display={"flex"} flexDirection={"row"} justifyContent={"center"} className="mini-loader"> 
            <img alt="loader" src={Loader} height={props.height?props.height:100} width={props.width?props.width:100} />
        </Grid> 
      )
}

export default MiniLoader;