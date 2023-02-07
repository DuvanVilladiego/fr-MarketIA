import { create } from 'ipfs-core';
import { Buffer } from "buffer";

export default async function ipfsUpload(_imageUrl:string) {

    const bufferEndpoint:any = process.env.REACT_APP_IMAGE_AWS_BUFFER_ENDPOINT;

    const node = await create({repo: 'ok' + Math.random()});

    const raw = JSON.stringify({
        "imageUrl": _imageUrl
    });

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    console.log("bufferEndpoint: ", bufferEndpoint);

    const response:any = await fetch(`http://ec2-44-202-186-2.compute-1.amazonaws.com/marketia/api/v1/bufferImg`,{
        method: 'POST',
        headers: myHeaders,
        body: raw,
        mode: 'cors',
        credentials: 'include',
        redirect: 'follow'
    });
 
    const responseJso:any = await response.json();

    const bufferData = new Buffer(responseJso.bufferData, 'binary');

    const added = await node.add(bufferData);

    const cid = added.cid.toString();
    return cid;

} 