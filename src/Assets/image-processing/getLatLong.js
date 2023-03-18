import exifr from "exifr";

export default function getLatLong(image) {
    return new Promise((resolve, reject) => {
        exifr.gps(image)
            .then(({ latitude, longitude }) => {
                resolve( {latitude, longitude })
            })
            .catch(any => {
                reject(new Error("No location data available \n Please use a different image or type the postcode below "));
            });
    });
}