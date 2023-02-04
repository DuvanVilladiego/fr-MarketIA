import { useEffect, useState } from 'react';
import { getGeolocation } from '../../helpers/geolocation';
import ipfsUpload from '../../helpers/ipfs';
import useMarketPlace from '../../hooks/marketplace';
import { getImage } from '../../services/Image';
import getWeather from '../../services/Weather';
import './index.css'

export default function MintButton({address, provider}:any) {

    const [latitud, setLatitud] = useState(0);
    const [longitud, setLongitud] = useState(0);

    const signer:any = provider.getSigner();
    const MarketPlace:any = useMarketPlace(signer);

    useEffect(() => {
        getGeolocation(setLatitud, setLongitud);
    },[])

    const getWeatherData = async () =>{

        let response:string = "";

        await getGeolocation(setLatitud, setLongitud);

        let weatherData:any = {};
        weatherData = await getWeather(latitud, longitud)
    
        response = weatherData.current.weather[0].main;
    
        return(response);
    };

    const generateImg = async (_weather:string) => {

        let response:string = "";

        let imageUrl:string = "";

        imageUrl = await getImage(_weather);

        response = imageUrl;

        return(response);

    }

    const ipfsCharge = async (_imageUrl:string) => {
    
        const cid = await ipfsUpload(_imageUrl);

        return(cid);

    }

    const mint = async (_signer:any, _imageUrl:string) => {

        const Minted = MarketPlace.safeMint(_signer, _imageUrl);

        Minted.wait().then((receipt:any) => {
            console.log(receipt);
        });

    }

    const mintButton = async () => {
        const Weather:string = await getWeatherData();
        const imageUrl:string = await generateImg(Weather);
        const ipfsCid:any = await ipfsCharge(imageUrl);
        const minted:any = await mint("signer", ipfsCid);
    }

    return (
        <div>
            <button onClick={() => mintButton()} >Mint</button>
        </div>
    );
}