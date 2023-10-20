export const customMapStyle = [
    {
        elementType: 'geometry',
        stylers: [
            {
                color: '#f5f5f5', // White color for roads
            },
        ],
    },
    {
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off', // Hide icons like restaurants, landmarks, etc.
            },
        ],
    },
    {
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#616161', // Dark gray color for text
            },
        ],
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [
            {
                color: '#f5f5f5', // White color for text stroke
            },
        ],
    },
    {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#bdbdbd', // Light gray color for parcel labels
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
            {
                color: '#eeeeee', // Light gray color for POI icons
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#757575', // Medium gray color for POI labels
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
            {
                color: '#e5e5e5', // Light gray color for park geometry
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#9e9e9e', // Medium gray color for park labels
            },
        ],
    },
    // More style rules...
];
