import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

const XTable = ({ heads, rows }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {heads.map((h, i) => (
            <TableCell key={i}>{h}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((r, index) => (
          <TableRow key={index}>
            {r.map((c, i) => (
              <TableCell key={i}>{c}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default XTable;
