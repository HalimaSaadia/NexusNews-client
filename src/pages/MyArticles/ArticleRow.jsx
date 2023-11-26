import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditArticle from "./EditArticle";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: theme.palette.secondary,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ArticleRow = ({ row, idx, refetch }) => {
  const axiosSecure = useAxiosSecure();
 

  const handleDelete = () => {
  
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5e503f",
      cancelButtonColor: "#d33",
     denyButtonColor:"#5e503f",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Please wait...")
        axiosSecure.delete(`/delete-article/${row._id}}`)
        .then((res) => {
          console.log(res.data);
          if(res.data.deletedCount){
          Swal.fire({
            confirmButtonColor: "#5e503f",
            title: "Deleted!",
            text: "Your Article has been deleted.",
            icon: "success",
          });
          toast.remove(toastId)
          }
          toast.remove(toastId)
          refetch()
        })
        .catch(error => {
            Swal.fire({
                confirmButtonColor: "#5e503f",
                title: error.message,
                icon: "Error",
              });
              toast.remove(toastId)
        })
      }
    });
  };
  return (
    <StyledTableRow>
      <StyledTableCell align="">{idx + 1}</StyledTableCell>
      <StyledTableCell sx={{ width: "40%", overflow: scrollY }} scope="row">
        <Typography variant="h6"> {row.title}</Typography>
      </StyledTableCell>
      <StyledTableCell align="right">
        <Link to={`/details/${row._id}`}>
          <Button color="tertiary" variant="contained">
            Details
          </Button>
        </Link>
      </StyledTableCell>
      <StyledTableCell align="right">
        {row.state}
        {row.state === "decline" && <Button>Admin FeedBack</Button>}{" "}
      </StyledTableCell>
      <StyledTableCell align="right">
        {row.isPremium ? "Yes" : "No"}
      </StyledTableCell>
      <StyledTableCell align="right">
        {" "}
        <EditIcon
          onClick={openModal}
          sx={{ color: "#c6ac8f", cursor: "pointer" }}
        />{" "}
      </StyledTableCell>
      <StyledTableCell align="right">
        <DeleteIcon
          onClick={() => handleDelete(row._id)}
          sx={{ color: "brown", cursor: "pointer" }}
        />
      </StyledTableCell>
      <EditArticle
        openModal={openModal}
        modalIsOpen={modalIsOpen}
        afterOpenModal={afterOpenModal}
        closeModal={closeModal}
        row={row}
        refetch={refetch}
      />
    </StyledTableRow>
  );
};

export default ArticleRow;
