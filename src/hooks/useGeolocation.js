import { useState, useEffect } from 'react';

const useGeolocation = () => {
    const [state, setState] = useState({
        lat: null,
        lng: null
    });

    let mounted = true;
    let watchId;

    const onEvent = (event) => {
        if (mounted) {
            setState({
                lat: event.coords.latitude,
                lng: event.coords.longitude
            });
        };
    };

    const onEventError = (error) => {
        mounted && setState({ lat: "39.7392", lng: "-104.9903" });
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(onEvent, onEventError);
        watchId = navigator.geolocation.watchPosition(onEvent, onEventError);

        return () => {
            mounted = false;
            navigator.geolocation.clearWatch(watchId);
        };
    }, []);

    return state;
};

export default useGeolocation;