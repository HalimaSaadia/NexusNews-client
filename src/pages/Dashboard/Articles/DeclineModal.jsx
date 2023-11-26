import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from "react-select";
import Modal from 'react-modal';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';


const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width:'400px',
    padding:'50px '
  },
};




const DeclineModal = ({id,modalIsOpen,afterOpenModal,closeModal,refetch}) => {
    const axiosSecure = useAxiosSecure()
    const handleDecline = (e) => {
        e.preventDefault(id)
        const toastId = toast.loading("wait...")
        const form = e.target;
        const message = form.message.value;
        axiosSecure.patch(`/decline-state/${id}`,{message})
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount){
              Swal.fire({
                icon:"success",
                title:"Successfully Declined",
                confirmButtonColor:"#5e503f"
              })
              refetch()
              closeModal()
              toast.remove(toastId)
            }else{
              Swal.fire({
                icon:"info",
                title:"Article has been previously Declined",
                confirmButtonColor:"#5e503f"
              })
              closeModal()
              toast.remove(toastId)
            }
          }).catch(err => {
            Swal.fire({
              icon:"error",
              title: err.message,
              confirmButtonColor:"#5e503f"
            })
            toast.remove(toastId)
          })
        
        
    }
    return (
        <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={modalStyle}
        contentLabel="Example Modal"
      >

       

        <form onSubmit={handleDecline}>
        <TextField
          variant='standard'
          label="Decline Message"
          multiline
          rows={4}
          name="message"
         fullWidth
         sx={{
            mb:5
         }}

          
        />
        <Button type='submit' variant="contained" color='secondary'>Decline</Button>
        <Button sx={{ml:2}} variant='contained' color='tertiary' onClick={closeModal}>Cancel</Button>
        </form>
      </Modal>
    );
};

export default DeclineModal;