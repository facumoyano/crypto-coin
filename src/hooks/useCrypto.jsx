import { useContext } from "react";
import CryptoContext from "../context/CryptoProvider";

const useCrypto = () => {
    return useContext(CryptoContext);
};

export default useCrypto;
