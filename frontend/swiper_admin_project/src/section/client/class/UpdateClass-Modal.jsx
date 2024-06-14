import Box from "@mui/material/Box";
import {ModalStyles} from "../../../theme/mui-style-query.jsx";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {useContext} from "react";
import {ClientContext} from "../../../context/client/ClientContext.jsx";
import {Grid} from "@mui/material";
import TextField from "@mui/material/TextField";

function UpdateClassModal({open, handleClose}) {
    const {
        classValue, setClassValue,
        ClientClassUpdate
    } = useContext(ClientContext);


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={ModalStyles}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <strong>권한 수정</strong>
                </Typography>
                로그인 권한자를 수정 할 수 있습니다.
                <hr/>


                <Grid container spacing={5} className="modal-grid">
                    <Grid item xs={12} sm={12}>
                        <span>권한 명</span>
                        <TextField
                            id="outlined-multiline-static"
                            fullWidth
                            placeholder="권한 명 입력"
                            name="user_class_name"
                            value={classValue.user_class_name}
                            onChange={(e) => setClassValue({...classValue, user_class_name: e.target.value})}
                        />
                    </Grid>
                </Grid>
                <br/>

                <Button type={"submit"} variant="contained" fullWidth onClick={() => {
                    if (window.confirm('정말 수정 하시겠습니까?')) {
                        ClientClassUpdate();
                        handleClose();
                    }
                }}>
                    수정완료
                </Button>
                <Button
                    variant="contained"
                    color={"inherit"}
                    fullWidth sx={{marginTop: 1}}
                    onClick={() => {
                        handleClose();
                    }}
                >
                    목록으로
                </Button>

            </Box>
        </Modal>
    )
}

export default UpdateClassModal;