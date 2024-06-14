import {AppBar, TablePagination} from "@mui/material";
import Box from "@mui/material/Box";
import {BsXLg} from "react-icons/bs";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {StationContext} from "../../../../ContextServer/StationContext";
import {useNavigate} from "react-router-dom";
import {
    DetailExitIcon,
    DetailPageBg,
    TableCells,
    TableHeader,
    TextWhite
} from "../../../../Componet/style-config/light-theme";

function StationFacUpdateListDetail(){
    const {FacCheckList, facRecordList} = useContext(StationContext);
    const [value, setValue] = React.useState('1');
    const navigate = useNavigate();

    useEffect(()=>{
        FacCheckList();
    },[]);


    //페이징 함수
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return(
        <div>
            <div className="Se-Detail01">
                <AppBar style={DetailPageBg}>
                    <Box sx={{width: '100%', typography: 'body1'}}>
                        <BsXLg style={DetailExitIcon}
                               onClick={() => {navigate(`/station/facility`)}}/>

                        <TabContext value={value}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList o aria-label="lab API tabs example">
                                    <Tab label="스마트그늘막 관리 수정이력" value="1"/>
                                </TabList>
                            </Box>


                            <TabPanel value="1">
                                <div style={{width: "100%", height: "89.5vh"}}>
                                    <TableContainer style={{marginTop: "0vh"}} sx={{
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
                                        <Table sx={{minWidth: 850}} aria-label="simple table">
                                            <TableHead style={TableHeader}>
                                                <TableRow>
                                                    <TableCell align={"center"} style={TextWhite}>구분</TableCell>
                                                    <TableCell align={"center"} style={TextWhite}>지점명</TableCell>
                                                    <TableCell align={"center"} style={TextWhite}>업로드시간</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    [...facRecordList]
                                                        ?.reverse()
                                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        .map(function (a, i) {
                                                            return (
                                                                <TableRow key={(rowsPerPage * page) + i}>
                                                                    <TableCell align={"center"} style={TableCells}>{a.fr_division}</TableCell>
                                                                    <TableCell align={"center"} style={TableCells}>{a.fr_code}</TableCell>
                                                                    <TableCell align={"center"} style={TableCells}>{a.update_time}</TableCell>
                                                                </TableRow>
                                                            )
                                                        })
                                                }
                                            </TableBody>
                                        </Table>
                                        <TablePagination
                                            variant="outlined"
                                            rowsPerPageOptions={[15, 30, 45, 100]}
                                            component="div"
                                            count={facRecordList.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            style={{width: "100%", backgroundColor: "#1c63c2", color: "white"}}
                                            size={"small"}
                                        />
                                    </TableContainer>
                                </div>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </AppBar>
            </div>
        </div>
    )
}
export default StationFacUpdateListDetail;