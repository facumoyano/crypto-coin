import * as React from "react";
import Drawer from "@mui/material/Drawer";
import useCrypto from "../hooks/useCrypto";
import { Avatar, Box, Typography, Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";

export default function TemporaryDrawer() {
    const { user, setAlert, watchlist, coins, symbol } = useCrypto();

    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const logOut = () => {
        signOut(auth);
        setAlert({
            open: true,
            type: "success",
            message: "Logout exitoso!",
        });
        toggleDrawer();
    };

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const removeFromWatchList = async (coin) => {
        const coinRef = doc(db, "watchlist", user.uid);

        try {
            await setDoc(
                coinRef,
                {
                    coins: watchlist.filter((watch) => watch !== coin?.id),
                },
                { merge: "true" }
            );

            setAlert({
                open: true,
                message: `${coin.name} Eliminada exitosamente!`,
                type: "success",
            });
        } catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: "error",
            });
        }
    };

    return (
        <div>
            {["right"].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Avatar
                        onClick={toggleDrawer(anchor, true)}
                        sx={{
                            height: 38,
                            width: 38,
                            marginLeft: 2,
                            cursor: "pointer",
                            backgroundColor: "#eebc1d",
                        }}
                        src={user.photoURL}
                        alt={user.displayName || user.email}
                    />
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <Box
                            sx={{
                                width: 350,
                                padding: 5,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                fontFamilty: "Monospace",
                            }}
                        >
                            <Box
                                sx={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "20px",
                                    height: "92%",
                                }}
                            >
                                <Avatar
                                    src={user.photoURL}
                                    alt={user.displayName || user.email}
                                    sx={{
                                        width: 200,
                                        height: 200,
                                        cursor: "pointer",
                                        backgroundColor: "#eebc1d",
                                        objectFit: "contain",
                                    }}
                                />
                                <Typography
                                    sx={{
                                        width: "100%",
                                        fontSize: 25,
                                        textAlign: "center",
                                        fontWeight: "bolder",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    {user.displayName || user.email}
                                </Typography>
                                <Box
                                    sx={{
                                        flex: 1,
                                        width: "100%",
                                        backgroundColor: "#a7a7a7",
                                        borderRadius: 3,
                                        padding: 3,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: 2,
                                        overflowY: "scroll",
                                        color: "white",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: 20,
                                            textShadow: "0 0 5px black",
                                        }}
                                    >
                                        Tu lista
                                    </Typography>
                                    {coins.map((coin) => {
                                        if (watchlist.includes(coin.id)) {
                                            return (
                                                <Box
                                                    sx={{
                                                        borderRadius: 2,
                                                        color: "black",
                                                        width: "100%",
                                                        padding: 1,
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-between",
                                                        alignItems: "center",
                                                        backgroundColor:
                                                            "#eebc1d",
                                                        boxShadow:
                                                            "0 0 3px black",
                                                        fontFamily: "Roboto",
                                                    }}
                                                >
                                                    <Typography>
                                                        {coin.name}
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >
                                                        {symbol}
                                                        {numberWithCommas(
                                                            coin.current_price.toFixed(
                                                                2
                                                            )
                                                        )}
                                                        <AiFillDelete
                                                            style={{
                                                                cursor: "pointer",
                                                            }}
                                                            fontSize="18"
                                                            onClick={() =>
                                                                removeFromWatchList(
                                                                    coin
                                                                )
                                                            }
                                                        />
                                                    </Box>
                                                </Box>
                                            );
                                        }
                                    })}
                                </Box>
                            </Box>
                            <Button
                                variant="contained"
                                onClick={logOut}
                                sx={{
                                    height: "8%",
                                    width: "100%",
                                    backgroundColor: "#eebc1d",
                                    marginTop: 2,
                                }}
                            >
                                Logout
                            </Button>
                        </Box>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
