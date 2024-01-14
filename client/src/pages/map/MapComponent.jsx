import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, distance } from 'framer-motion';
import pin from '../../assets/pin.png'
import filter_marker from '../../assets/filter_marker.png'
import './MapComponent.css';
import { useNavigate } from 'react-router-dom';
const map_api_key = import.meta.env.VITE_MAP_API_KEY;

const MapComponent = () => {

  const [userMarker, setUserMarker] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [selectedspotLocation, setSelectedspotLocation] = useState(null);

  const [userLocation, setUserLocation] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate()

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const circleRadius = 10000;


  const initializeMap = async ({ data }) => {

    if (window.google && window.google.maps) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 13,
      });

      if ("geolocation" in navigator) {

        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        console.log(position)
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };


        const userMarker = new window.google.maps.Marker({
          position: userLocation,
          map,
          title: "Your Location",
          icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          }
        });


        const createCircle = () => {
          if (
            latitude !== null &&
            longitude !== null &&
            circleRadius !== null
          ) {
            const cityCircle = new window.google.maps.Circle({
              strokeColor: "#54f092",
              strokeOpacity: 0.5,
              strokeWeight: 2,
              fillColor: "#87edb0",
              fillOpacity: 0.5,
              map,
              center: { lat: latitude, lng: longitude },
              radius: circleRadius,
            })
          }


        };
        setUserMarker(userMarker)
        setLatitude(userLocation.lat)
        setLongitude(userLocation.lng)
        createCircle()


        map.setCenter(userLocation);
        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer =
          new window.google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);
        setDirectionsService(directionsService);
        setDirectionsRenderer(directionsRenderer);

        const calculateAndDisplayRoute = (origin, destination) => {
          if (directionsService) {
            const distance =
              window.google.maps.geometry.spherical.computeDistanceBetween(
                origin,
                destination
              );

            const travelMode = distance <= 1000 ? "WALKING" : "DRIVING";

            const directionsRequest = {
              origin: origin,
              destination: destination,
              travelMode: travelMode,
            };

            directionsService.route(directionsRequest, (result, status) => {
              if (status === "OK") {
                directionsRenderer.setDirections(result);
              } else {
                console.error(
                  "Directions request failed with status:",
                  status
                );
              }
            });
            return distance;
          } else {
            console.error("DirectionsService is not yet initialized.");
          }

        };
        if (data !== "") {
          const service = new window.google.maps.places.PlacesService(map);

          const request = {
            location: userLocation,
            radius: 10000,
            type: [data],
          };


          service.nearbySearch(request, (results, status) => {

            if (status === window.google.maps.places.PlacesServiceStatus.OK) {

              let spots = [];
              let nearestspot = null;
              let minDistance = Number.MAX_VALUE;
              results.forEach((result) => {
                const spotLocation = result.geometry.location;

                const distance =
                  window.google.maps.geometry.spherical.computeDistanceBetween(
                    userLocation,
                    spotLocation
                  );

                if (distance < circleRadius) {
                  const photoUrl = result.photos && result.photos[0] ? result.photos[0].getUrl() : null;


                  const spotMarker = new window.google.maps.Marker({
                    position: spotLocation,
                    map: map,
                    title: result.name,
                    icon: photoUrl ? { url: photoUrl, scaledSize: new window.google.maps.Size(50, 50) } : null,
                  });

                  spotMarker.addListener("click", () => {
                    setSelectedspotLocation(spotLocation);
                    calculateAndDisplayRoute(userLocation, spotLocation);

                  });

                  spots.push({
                    name: result.name,
                    distance: distance,
                    location: spotLocation,
                  });


                  if (distance < minDistance) {
                    minDistance = distance;
                    nearestspot = {
                      name: result.name,
                      location: spotLocation,
                    };
                  }

                }
              });


              if (nearestspot) {
                const nearestspotMarker = new window.google.maps.Marker({
                  position: nearestspot.location,
                  map: map,
                  title: "Nearest Location",
                  icon: {
                    url: pin,
                    scaledSize: new window.google.maps.Size(50, 50),
                  }
                })
                nearestspotMarker.addListener("click", () => {
                  setSelectedspotLocation(nearestspot.location);
                  calculateAndDisplayRoute(userLocation, nearestspot.location);

                });
              }
            }
          });
        }
      } else {
        alert("Geolocation is not available in your browser");
      }
    } else {
      console.error("Google Maps API not loaded.");
    }

  }

  const initialData = ""
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${map_api_key}&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;

      script.onload = () => {

        initializeMap({ data: initialData });
      };

      script.onerror = (error) => {
        console.error("Error loading Google Maps API:", error);
      };

      document.head.appendChild(script);
    };

    if (map_api_key) {
      loadGoogleMapsScript();
    } else {
      console.error("Google Maps API key is not available.");
    }
  }, [map_api_key, latitude, longitude])


  const handleItemClick = async (itemname) => {

    initializeMap({ data: itemname })
  }

  const handleBackClick = () => {
    navigate('/')
  }

  return (
    <div className='relative w-full h-[600px]'>
      <div id="map" className='p-[10px]' style={{ height: "100vh" }} ></div>

      <button className="fixed bottom-[200px] right-2 bg-white rounded-full border-2 border-white w-[50px] h-[50px] flex items-center justify-center text-3xl shadow-md cursor-pointer p-2 " onClick={openModal}><img src={filter_marker} alt='filter' /></button>


      <div className='bg-yellow-300 bg-opacity-35 flex flex-col items-center justify-center text-center'>

        <div>
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                className="fixed bottom-0 left-0 w-full h-[400px] bg-white border-y p-[20px] border-box flex justify-center align-middle  "
                initial={{ opacity: 0, y: '100%' }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: '100%' }}
              >
                <motion.div
                  className="w-full bg-white p-[15px] flex flex-col shadow-inner "
                  onClick={(e) => e.stopPropagation()}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h1 className='font-sans text-xl text-orange-400 p-0'>Filters</h1>
                  <div className='flex justify-center p-[10px]'>
                    <ul className='list-none p-0 flex flex-wrap w-[500px] justify-center' onClick={closeModal}>
                      <li className='m-[5px] p-[5px] font-sans rounded-md bg-amber-100 cursor-pointer' onClick={() => handleItemClick('spots')}>Important Spots</li>
                      <li className='m-[5px] p-[5px] font-sans rounded-md bg-amber-100 cursor-pointer' onClick={() => handleItemClick('beauty_salon')}>Beauty Salon</li>
                      <li className='m-[5px] p-[5px] font-sans rounded-md bg-amber-100 cursor-pointer' onClick={() => handleItemClick('clothing_store')}>Clothing store</li>
                      <li className='m-[5px] p-[5px] font-sans rounded-md bg-amber-100 cursor-pointer' onClick={() => handleItemClick('hair_care')} >Haircare</li>
                      <li className='m-[5px] p-[5px] font-sans rounded-md bg-amber-100 cursor-pointer' onClick={() => handleItemClick('jewelry_store')}>Jwellery Store</li>
                      <li className='m-[5px] p-[5px] font-sans rounded-md bg-amber-100 cursor-pointer' onClick={() => handleItemClick('university')}>University</li>
                      <li className='m-[5px] p-[5px] font-sans rounded-md bg-amber-100 cursor-pointer' onClick={() => handleItemClick('spa')}>Spa</li>
                      <li className='m-[5px] p-[5px] font-sans rounded-md bg-amber-100 cursor-pointer' onClick={() => handleItemClick('restaurant')}>Restaurent</li>
                      <li className='m-[5px] p-[5px] font-sans rounded-md bg-amber-100 cursor-pointer' onClick={() => handleItemClick('shopping_mall')}> Shopping Mall</li>
                      <li className='m-[5px] p-[5px] font-sans rounded-md bg-amber-100 cursor-pointer' onClick={() => handleItemClick('police')}>Police</li>
                      <li className='m-[5px] p-[5px] font-sans rounded-md bg-amber-100 cursor-pointer' onClick={() => handleItemClick('pharmacy')}>Pharmacy</li>
                    </ul>
                  </div>
                  <button onClick={closeModal}>Close</button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default MapComponent