import React, { createContext, useState, useEffect } from "react";

const CryptoContext = createContext();

const CryptoProvider = ({ children }) => {
    const [moneda, setMoneda] = useState("USD");
    const [symbol, setSymbol] = useState("U$D");

    useEffect(() => {
        if (moneda === "USD") setSymbol("U$D");
        else if (moneda === "ARS") setSymbol("ARS");
    }, [moneda]);

    return (
        <CryptoContext.Provider
            value={{
                moneda,
                symbol,
                setMoneda,
            }}
        >
            {children}
        </CryptoContext.Provider>
    );
};
export { CryptoProvider };

export default CryptoContext;
