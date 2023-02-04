export default async function ImageSave(_imageUrl:string) {
    const response = "";

    const FileSaver = require('file-saver');

    FileSaver.saveAs(_imageUrl, './temp/image.jpg');
    console.log(response);
    return response;
}