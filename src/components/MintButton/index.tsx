import React from 'react';
import { useEffect, useState } from 'react';
import { getGeolocation } from '../../helpers/geolocation';
import ipfsUpload from '../../helpers/ipfs';
import constructMetadata from '../../helpers/metadata';
import useMarketPlace from '../../hooks/marketplace';
import { getImage } from '../../services/Image';
import getWeather from '../../services/Weather';
import './index.css'

export default function MintButton({provider, setMinted}:any) {

    const [latitud, setLatitud] = useState(0);
    const [longitud, setLongitud] = useState(0);
    const [buttonStatus, setButtonStatus] = useState({});
    const [statusText, setStatusText] = useState('Generar NFT');

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

    const mint = async ( _imageUrl:string, _weather:string) => {

        const metadata = constructMetadata(_imageUrl, _weather);

        const Minted = await MarketPlace.safeMint(metadata);

        Minted.wait().then((receipt:any) => {
            setStatusText('NFT generado!');
            setMinted(Math.random());
        }).catch((err:any) => {
            setStatusText('No fue posible mintear el Nft!');
            
        });

    }

    const mintButton = async () => {
        
        setButtonStatus({disabled:true, cursor:'not-allowed', backgroundColor:'gray', color:'white'});
        setStatusText('Obteniendo datos de clima...');
        const Weather:string = await getWeatherData();
        setStatusText('Generando imagen...');
        const imageUrl:string = await generateImg(Weather);
        setStatusText('Subiendo imagen a IPFS...');
        const ipfsCid:any = await ipfsCharge(imageUrl);
        setStatusText('Generando NFT...');
        await mint(ipfsCid, Weather);
        setTimeout(() => {
            setStatusText('Generar NFT');
            setButtonStatus({disabled:false, cursor:'pointer'});
        }, 6000);

    }

    return (
        <div>
            <button onClick={() => mintButton()} style={buttonStatus}>{statusText}</button>
        </div>
    );
}