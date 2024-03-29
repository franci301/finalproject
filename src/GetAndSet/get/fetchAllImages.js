/**
 * @param {string} data - Path of image(s)
 */
export default async function fetchAllImages(data){
    let imagesArr = [];
    try{
        for(let path of data){
            const response = await fetch(`http://localhost:3333/images/${path.stringValue}`,{
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