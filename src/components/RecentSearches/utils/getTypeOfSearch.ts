import { RecentSearch } from "../Types/types";

export const getTypeOfSearch = (result: any) => {
    let recentSearch: RecentSearch;
    const data = result.features[0];
    const lngLat = data.geometry.coordinates;

    const type = data.properties.feature_type;
            // DETERMINE TYPE OF RECENT SEARCH BASED ON THE SEARCH TYPE
    if (type === 'place') {
        recentSearch = {
        lngLat: lngLat,
        type: data.properties.feature_type,
        city: data.properties.context.place.name,
        country: data.properties.context.country.name,
        displayTitle: data.properties.context.place.name,
        };
    } else if (type === 'street') {
        recentSearch = {
            lngLat: lngLat,
            type: data.properties.feature_type,
            title: data.properties.context.street.name,
            city: data.properties.context.place.name,
            postcode: data.properties.context.postcode.name,
            displayTitle: data.properties.context.street.name,
        };
    } else if (type === 'poi') {
        recentSearch = {
            lngLat: lngLat,
            type: data.properties.feature_type,
            name: data.properties.name,
            address: data.properties.full_address,
            displayTitle: data.properties.name,
        };
    } else if (type === 'country') {
        recentSearch = {
            lngLat: lngLat,
            type: data.properties.feature_type,
            country: data.properties.name,
            displayTitle: data.properties.name,
        };
    } else if (type === 'address') {
        recentSearch = {
            lngLat: lngLat,
            type: data.properties.feature_type,
            address: data.properties.full_address,
            displayTitle: data.properties.context.place.name,
        };
    } else {
        console.log('unknown type', result);
        return recentSearch = {
            lngLat: lngLat,
            type: "unknown",
            displayTitle: "unknown"
        };
    }

    return recentSearch;
}