import './index.css'


export default function ConnectWalletButton({setIsConnected, setProvider, window, ethers}:any) {
    
    const ConnectWallet = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        setProvider(provider);
        setIsConnected(true);
    }

    return (
        <div>
            <button onClick={ConnectWallet}>Conectar Wallet</button>
        </div>
    );
}