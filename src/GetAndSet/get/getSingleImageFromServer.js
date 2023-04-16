/**
 * @param {string} folderName - folder
 * @param {number} imageName - image
 */
export default async function GetSingleImageFromServer(folderName, imageName){
    try{
        const response = await fetch(`http://localhost:3333/images/${folderName}/${imageName}`,{
            method:'GET',
            referrerPolicy: "unsafe-url",
        })
        return {
            status:true,
            image:response.url,
        };
    }catch(error){
        console.error(error);
        return {
            status:false,
        }
    }
}