import { Box } from '@mui/material';
import { DotLoader } from 'react-spinners';

const Loader = () => {
    return (
        <Box sx={{ minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",}}><DotLoader loading={true} color='#5e503f' size={80} /></Box>
    );
};

export default Loader;