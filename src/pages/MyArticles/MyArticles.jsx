import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArticleRow from "./ArticleRow";
import Loader from "../../shared/Loader/Loader";

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

export default function MyArticles() {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);

  const {
    isPending:articlesLoading,
    data: articles = [],
    refetch,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      if (loading) {
        return [];
      }
      const result = await axiosSecure.get(`/my-articles/${user?.email}`);
      return result.data;
    },
  });

  if (!loading) {
    refetch();
  }

  if(articlesLoading){
    return <Loader />
  }


  return (
    <TableContainer
      sx={{ maxWidth: "md", mx: "auto", my: 5 }}
      component={Paper}
    >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow sx={{ bgcolor: "#5e503f" }}>
            <StyledTableCell>SN</StyledTableCell>
            <StyledTableCell align="">TITLE</StyledTableCell>
            <StyledTableCell align="right">DETAILS</StyledTableCell>
            <StyledTableCell align="right">STATUS</StyledTableCell>
            <StyledTableCell align="right">PREMIUM</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {articles?.map((row, idx) => (
          <ArticleRow refetch={refetch} key={row._id} row={row} idx={idx} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
