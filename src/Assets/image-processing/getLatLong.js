import exifr from "exifr";

export default function getLatLong(image) {
    return new Promise((resolve, reject) => {
        exifr.parse(image)
            .then(({ latitude, longitude }) => {
                console.log(latitude)
                resolve( {latitude, longitude })
            })
            .catch(any => {
                reject(new Error(any));
                // "No location data available \n Please use a different image or type the postcode below "
            });
    });
}