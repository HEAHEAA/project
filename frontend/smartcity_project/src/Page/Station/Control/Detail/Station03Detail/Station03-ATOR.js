import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import {TableCells, TableHeader, TextWhite} from "../../../../../Componet/style-config/light-theme";

function Station03ATOR({page, rowsPerPage, dvList}) {
    return (
        <div>
            <TableContainer style={{marginTop: "-3vh", cursor: "default"}} sx={{
                "&::-webkit-scrollbar": {
                    width: 10,
                    height: 10,
                    cursor: "default"
                },
                "&::-webkit-scrollbar-track": {
                    backgroundColor: "#565656",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#282828",
                    borderRadius: 0
                }
            }}>
                <Table sx={{minWidth: "100%", fontSize: 11}} aria-label="simple table" className="cw02Table">
                    <TableHead style={TableHeader}>
                        <TableRow>
                            <TableCell size={"small"} align={"center"} style={TextWhite}>전원여부</TableCell>
                            <TableCell size={"small"} align={"center"} style={TextWhite}>열림여부</TableCell>
                            <TableCell size={"small"} align={"center"} style={TextWhite}>측정시간</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            [...dvList]
                                ?.reverse()
                                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                ?.map(function (arr, inx) {
                                    return (
                                        <TableRow key={(rowsPerPage * page) + inx} className="tableHover">
                                            <TableCell size={"small"} style={TableCells}> {arr.pwr === null ? '자동' : '수동'} </TableCell>
                                            <TableCell size={"small"} style={TableCells}> {arr.open === null ? '닫힘' : '열림'} </TableCell>
                                            <TableCell size={"small"} style={TableCells}> {arr.dtm} </TableCell>
                                        </TableRow>
                                    )
                                })
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Station03ATOR;