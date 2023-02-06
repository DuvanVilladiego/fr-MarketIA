import './index.css';
import { useEffect, useState } from 'react';
import useMarketPlace from '../../hooks/marketplace';

export default function MarketGallery({provider, minted}:any) {

    const [nftsIds, setNftsIds] = useState<any>([]);
    const [metadata, setMetadata] = useState<any>([]);

    const signer:any = provider.getSigner();
    const MarketPlace:any = useMarketPlace(signer);

    useEffect(() => {
        getNfts();
    },[provider, minted])

    const getNfts = async () => {
        const address = await provider.send("eth_requestAccounts", []);
        const idList:any = await MarketPlace.getUsersTokens(address[0]);
        let tempIdList:any = [];
        let tempMetadata:any = [];
        for(let i = 0; i < idList.length; i++){
            const nft:any = idList[i];
            tempIdList.push(nft.toNumber());
            const meta:any = await MarketPlace.tokenURI(nft);
            tempMetadata.push(JSON.parse(meta));
        }
        setNftsIds(tempIdList);
        setMetadata(tempMetadata);
    }

    return(
        <div>
            <h1>Market Gallery</h1>
            <div className='gallery_content'>
                {metadata.map((data:any, i:any) => {
                    return(
                        <img src={data.image} key={i} alt={data.description} />
                    )
                })}
            </div>
            
        </div>
    )
}