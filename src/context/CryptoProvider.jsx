import React, { createContext, useState, useEffect } from "react";
import { CoinList } from "../api/api";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";

const CryptoContext = createContext();

const CryptoProvider = ({ children }) => {
    const [moneda, setMoneda] = useState("USD");
    const [symbol, setSymbol] = useState("U$D");
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        type: "success",
    });
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) setUser(user);
            else setUser(null);
        });
    }, []);

    useEffect(() => {
        if (moneda === "USD") setSymbol("U$D");
        else if (moneda === "ARS") setSymbol("ARS");
    }, [moneda]);

    useEffect(() => {
        if (user) {
            const coinRef = doc(db, "watchlist", user.uid);
            var unsuscribe = onSnapshot(coinRef, (coin) => {
                if (coin.exists()) {
                    setWatchlist(coin.data().coins);
                } else {
                }
            });
            return () => {
                unsuscribe();
            };
        }
    }, [user]);

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios(CoinList(moneda));
        setCoins(data);
        setLoading(false);
    };

    return (
        <CryptoContext.Provider
            value={{
                moneda,
                symbol,
                setMoneda,
                coins,
                loading,
                fetchCoins,
                alert,
                setAlert,
                user,
                watchlist,
                setWatchlist,
            }}
        >
            {children}
        </CryptoContext.Provider>
    );
};
export { CryptoProvider };

export default CryptoContext;
