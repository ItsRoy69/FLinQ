import React from 'react'
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api'

const MapComponent = ({selectedLocation}) => {
    const {isLoaded,loadError} = useLoadScript({
        googleMapsApiKey : 'AIzaSyBfZm_WA3kHXHmPUo04yKUXcxY7AawG-aA'
    });

    const mapRef = React.useRef()
    const onMapLoad = React.useCallback((map)=>{
        mapRef.current = map;

    },[])
    if(loadError) {console.log("error")}
    if(!isLoaded) { console.log("maps")}

    

    
  return (
    <div style= {{marginTop : "50px"}}>
      <GoogleMap
       mapContainerStyle={{
        height : "800px"
       }}
       center={selectedLocation}
       zoom={13}
       onLoad={onMapLoad}
      >
        <MarkerF
          position={selectedLocation}
          icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
        />
      </GoogleMap>  
    
    
    </div>
  )
}

export default MapComponent