import React from 'react';
import { useState } from 'react';
import './index.css'

export default function ConnectWalletButton({setIsConnected, setProvider, window, ethers}:any) {

    const [isConecting, setIsConecting] = useState(false);
    const [buttonStatus, setButtonStatus] = useState({});

    const ConnectWallet = async () => {
        setIsConecting(true);
        setButtonStatus({disabled:true, cursor:'not-allowed', backgroundColor:'gray', color:'white'});
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        setProvider(provider);
        setButtonStatus({disabled:false, cursor:'pointer'});
        setIsConnected(true);
    }

    return (
        <div>
            <button onClick={ConnectWallet} style={buttonStatus}>{isConecting?'Conectando Billetera':'Conectar Wallet'}</button>
        </div>
    );
}