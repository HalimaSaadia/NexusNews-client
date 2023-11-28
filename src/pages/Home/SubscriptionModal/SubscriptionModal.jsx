import { Box, Button, Typography } from "@mui/material";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "10px",
    width: "300px",
  },
};

const SubscriptionModal = () => {
  const { modalIsOpen, afterOpenModal, closeModal } = useContext(AuthContext)
  
  return (
  <Box>
      <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={modalStyle}
      contentLabel="Example Modal"
    >
          <ClearIcon sx={{cursor:'pointer'}} onClick={closeModal} />
      <Typography
        align="center"
        variant="h4"
        sx={{py: 2, fontWeight: 700,fontSize:{xs:"16px",sm:'28px',md:'28px',lg:'32px'} }}
      >
        🎉WellCome to NexusNews🎉
      </Typography>
      <Typography align="center" sx={{ pb: 2, }} >
        Unlock Exclusive Context, Early access and Special offer by subscribing
        To Our Newsletter
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Link to="/subscription">
          <Button variant="contained" color="secondary">
            Take Subscription
          </Button>
        </Link>
      </Box>

    
    </Modal>
  </Box>
  );
};

export default SubscriptionModal;
