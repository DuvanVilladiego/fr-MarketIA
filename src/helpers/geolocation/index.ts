export const getGeolocation = async (_setLatitud:any, _setLongitud:any) => {

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(({coords}) =>{
            _setLatitud(coords.latitude);
            _setLongitud(coords.longitude);
        },() => {
            console.log( "No se pudo obtener la ubicacion del usuario" );
        });

    }

}