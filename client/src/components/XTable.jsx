import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  CircularProgress,
} from "@mui/material";

const XTable = ({ columns, rows, isLoading }) => {
  return isLoading ? (
    <Paper className="center">
      <CircularProgress />
    </Paper>
  ) : (
    <Paper>
      <Table>
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
    </Paper>
  );
};

export default XTable;
