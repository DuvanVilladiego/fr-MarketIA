import {create} from 'ipfs-core';
import ImageSave from '../image';

export default async function ipfsUpload(_imageUrl:string) {
    
    const node = await create();
    const added = await node.add(_imageUrl);
    const cid = added.cid.toString();
    return cid;

}