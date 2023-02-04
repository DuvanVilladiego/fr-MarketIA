import { useMemo } from "react";
import { ethers } from "ethers";
import { MarketPlace } from "../../config/artifacts/marketPlace";

const { address, abi } = MarketPlace;

const useMarketPlace = (signer:any) => {

    const MarketPlace = useMemo(() => {
        if (signer) return new ethers.Contract(address[5], abi, signer).connect(signer);

    }, [signer]);

    return MarketPlace;
}

export default useMarketPlace;
