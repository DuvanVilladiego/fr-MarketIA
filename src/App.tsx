import './App.css';
import MintButton from './components/MintButton';
import ConnectWalletButton from './components/ConnectWalletButton';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import MarketGallery from './components/marketGallery';
import LocationAdvise from './components/locationAdvise';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState<any>();
  const [minted, setMinted] = useState(0);

  const WindowObj:any = window;

  useEffect(() => {
    if (WindowObj.ethereum) {
      WindowObj.ethereum.on('accountsChanged', (accounts:any) => {
        if (accounts.length > 0) {
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      });
    }
  },[WindowObj.ethereum])

  return (
    <div className="App">
      {isConnected?
        <>
          <MintButton Window={WindowObj} provider={provider} setMinted={setMinted} />
          <MarketGallery provider={provider} minted={minted} />
        </>
        :
        <>
          <ConnectWalletButton setIsConnected={setIsConnected} setProvider={setProvider} ethers={ethers} window={WindowObj} />
          <LocationAdvise />
        </>
        
      }
      
    </div>
  );
}

export default App;
