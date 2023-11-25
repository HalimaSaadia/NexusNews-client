import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditArticle from "./EditArticle";
import { useState } from "react";

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

const ArticleRow = ({ row, idx,refetch }) => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  // openModal,modalIsOpen,afterOpenModal,closeModal
  return (
    <StyledTableRow>
      <StyledTableCell align="">{idx + 1}</StyledTableCell>
      <StyledTableCell sx={{ width: "40%", overflow: scrollY }} scope="row">
        <Typography variant="h6"> {row.title}</Typography>
      </StyledTableCell>
      <StyledTableCell align="right">Details</StyledTableCell>
      <StyledTableCell align="right">
        {row.state}
        {row.state === "decline" && <Button>Admin FeedBack</Button>}{" "}
      </StyledTableCell>
      <StyledTableCell align="right">
        {row.isPremium ? "Yes" : "No"}
      </StyledTableCell>
      <StyledTableCell align="right">
        <Button onClick={openModal}>
          {" "}
          <EditIcon sx={{ color: "#c6ac8f", cursor: "pointer" }} />{" "}
        </Button>
      </StyledTableCell>
      <StyledTableCell align="right">
        <DeleteIcon sx={{ color: "brown", cursor: "pointer" }} />
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
