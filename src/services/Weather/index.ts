export default async function getWeather(_latitud:number, _longitud:number) {

    const endpointBase = process.env.REACT_APP_WEATHER_ENDPOINT;
    const latitud = _latitud;
    const longitud = _longitud;
    const apiKeys = process.env.REACT_APP_WEATHER_APIKEY;
    const endpoint = `${endpointBase}?lat=${latitud}&lon=${longitud}&appid=${apiKeys}`;
    
    const response = await fetch(endpoint);
    const responseJson = await response.json();
    
    return responseJson;
}
