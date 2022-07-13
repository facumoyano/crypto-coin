import React from "react";
import useCrypto from "../hooks/useCrypto";
import { Snackbar, Alert as Alerta } from "@mui/material";

const Alert = () => {
    const { alert, setAlert } = useCrypto();

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlert({
            open: false,
        });
    };

    return (
        <Snackbar
            open={alert.open}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <Alerta
                onClose={handleClose}
                severity={alert.type}
                sx={{ width: "100%" }}
                variant="filled"
            >
                {alert.message}
            </Alerta>
        </Snackbar>
    );
};

export default Alert;
