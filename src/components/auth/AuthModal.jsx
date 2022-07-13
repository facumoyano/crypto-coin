import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { AppBar, Tabs, Tab, Typography } from "@mui/material";
import Login from "./Login";
import SignUp from "./SignUp";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import useCrypto from "../../hooks/useCrypto";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
};

const buttonLogin = {
    width: 85,
    height: 36,
    marginLeft: 3,
    backgroundColor: "#eebc1d",
    "&:hover": {
        backgroundColor: "#eebc1b",
    },
};

export default function AuthModal() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);

    const { setAlert } = useCrypto();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((res) => {
                setAlert({
                    open: true,
                    message: `Ingreso exitoso. Bienvenido ${res.user.email}`,
                    type: "success",
                });
                handleClose();
            })
            .catch((err) => {
                setAlert({
                    open: true,
                    message: err.message,
                    type: "error",
                });
                return;
            });
    };

    return (
        <div>
            <Button variant="contained" sx={buttonLogin} onClick={handleOpen}>
                Login
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AppBar
                        position="static"
                        sx={{
                            backgroundColor: "transparent",
                            color: "white",
                            borderRadius: 2,
                        }}
                    >
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="fullWidth"
                            sx={{ borderRadius: 10 }}
                        >
                            <Tab label="Login" />
                            <Tab label="Sign Up" />
                        </Tabs>
                    </AppBar>
                    {value === 0 && <Login handleClose={handleClose} />}
                    {value === 1 && <SignUp handleClose={handleClose} />}
                    <Box
                        sx={{
                            padding: 2,
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "center",
                            gap: 2,
                            fontSize: 20,
                        }}
                    >
                        <Typography color="white">
                            O ingresa con google
                        </Typography>
                        <GoogleButton
                            style={{ width: "100%", outline: "none" }}
                            onClick={signInWithGoogle}
                        />
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
