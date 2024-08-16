import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  CircularProgress,
  TableContainer,
  TablePagination,
} from "@mui/material";

const XTable = ({
  columns,
  rows,
  isLoading,
  page,
  rowsPerPage,
  onPageChange,
  count,
  onRowsPerPageChange,
}) => {
  return isLoading ? (
    <Paper className="center">
      <CircularProgress />
    </Paper>
  ) : (
    <Paper>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((h, i) => (
                <TableCell key={i}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r, index) => (
              <TableRow key={index}>
                {Object.values(r).map((c, i) => (
                  <TableCell key={i}>{c}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 100, 500]}
        page={page}
        rowsPerPage={rowsPerPage}
        component="div"
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        count={count}
      ></TablePagination>
    </Paper>
  );
};

export default XTable;
