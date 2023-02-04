import './App.css';
import MintButton from './components/MintButton';
import ConnectWalletButton from './components/ConnectWalletButton';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState<any>();

  const WindowObj:any = window;

  useEffect(() => {
    if (WindowObj.ethereum) {
      WindowObj.ethereum.on('accountsChanged', (accounts:any) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          setIsConnected(true);
        } else {
          setAddress("");
          setIsConnected(false);
        }
      });
    }
  },[WindowObj.ethereum])

  return (
    <div className="App">
      {isConnected?
        <MintButton address={address} Window={WindowObj} provider={provider} />
        :
        <ConnectWalletButton setIsConnected={setIsConnected} setProvider={setProvider} ethers={ethers} window={WindowObj} />
      }
      
    </div>
  );
}

export default App;
