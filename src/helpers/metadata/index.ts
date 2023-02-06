export default async function constructMetadata(_imageUrl:string, _weather:string) {
    const date = new Date();
    const metadata = JSON.stringify({
        "name": "NFT Weather",
        "description": _weather,
        "image": process.env.REACT_APP_IPFS_GATEWAY + _imageUrl,
        "collection": _weather + " " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
    });
    return metadata;
}