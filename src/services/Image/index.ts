export async function getImage( _weather:string ) {

    let response:string = "";

    const endpoint:any = process.env.REACT_APP_IMAGE_ENDPOINT;
    const apiKey:any = process.env.REACT_APP_IMAGE_APIKEY;
    const weather:string = _weather;
    const date = new Date();

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + apiKey);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "prompt": weather + " " + date,
        "n": 1,
        "size": "1024x1024"
    });

    const responseFetch:any = await fetch(endpoint, {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    });

    const responseJson:any = await responseFetch.json();

    response = responseJson.data[0].url;

    return response;
}
