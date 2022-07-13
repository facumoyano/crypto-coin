import React from "react";
import { Button } from "@mui/material";

const SelectButton = ({ children, selected, onClick }) => {
    return (
        <Button
            onClick={onClick}
            sx={{
                border: "1px solid gold",
                borderRadius: 5,
                padding: 2,

                fontFamily: "Montserrat",
                cursor: "pointer",
                backgroundColor: selected ? "gold" : "",
                color: selected ? "black" : "",
                fontWeight: selected ? 700 : 500,
                "&:hover": {
                    backgroundColor: "gold",
                    color: "black",
                },
                width: "22%",
            }}
        >
            {children}
        </Button>
    );
};

export default SelectButton;
