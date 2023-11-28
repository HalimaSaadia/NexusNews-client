import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Box, Button, Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Loader from "../../../shared/Loader/Loader";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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





export default function AllUsers() {
  const axiosSecure = useAxiosSecure();
  const { isPending: allUsersLoading, data: allUsers,refetch } = useQuery({
    queryFn: async () => {
      const result = await axiosSecure.get("/all-users");
      return result.data;
    },
  });
  
  const handleMakeAdmin =(id,userName)=> {
    const toastId = toast.loading("Updating...")
    axiosSecure.patch(`/make-user-admin/${id}`)
    .then(res => {
        refetch()
        Swal.fire({
            icon:'success',
            title:`${userName} is Admin Now`,
            confirmButtonColor:"#5e503f",
        })
        toast.remove(toastId)
    }).catch(error => {
        Swal.fire({
            icon:'error',
            title: error.message,
            confirmButtonColor:"#5e503f",
        })
        toast.remove(toastId)
    })
  }

  if(allUsersLoading){
    return <Loader />
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <TableContainer sx={{ width: "80%" }} component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>S.N</StyledTableCell>
              <StyledTableCell>Profile</StyledTableCell>

              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell align="right">Role</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers?.map((user, idx) => (
              <StyledTableRow key={user._id}>
                <StyledTableCell component="th" scope="row">
                  {idx + 1}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Avatar sx={{ bgcolor: 'green[500]' }} variant="rounded">
                   <img src={user?.userImage} alt="" />
                  </Avatar>
                </StyledTableCell>
                <StyledTableCell align="">{user?.userName}</StyledTableCell>
                <StyledTableCell align="">{user?.userEmail}</StyledTableCell>
                <StyledTableCell align="right">
                  {user?.role === "admin" ? (
                   <> Admin <AdminPanelSettingsIcon color="secondary"/></>
                  ) : (
                    <Button onClick={() => handleMakeAdmin(user?._id, user?.userName)} color="secondary" disabled={user?.role === 'admin' ? true : false} variant="contained">
                      Make Admin 
                    </Button>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
