/**
 * @param {string} folderName - folder
 * @param {number} imageName - image
 */
export default async function GetImagesFromFolder(folderName,imageName){
    let imagesArr = [];
    try{
        for(let path of imageName){
            const response = await fetch(`http://localhost:3333/images/${folderName}/${path.stringValue}`,{
                method:'GET',
            })
            imagesArr.push(response.url);
        }
        return {
            status:true,
            images:imagesArr
        };
    }catch(error){
        console.error(error);
        return {
            status:false,
        }
    }
}