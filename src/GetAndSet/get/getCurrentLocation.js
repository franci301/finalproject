export default async function getCurrentLocation(){
    return new Promise((resolve, reject)=>{
        // fetch user's current location
        navigator.geolocation.getCurrentPosition(function(position){
                resolve({
                    status:true,
                    payload:{
                        latitude:position.coords.latitude,
                        longitude:position.coords.longitude,
                    },
                });
            },
            function(error) {
                reject({
                    status: false,
                    error: error
                });
            });
    })
}
