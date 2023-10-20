export const EventData = [
    {
        id: '24',
        title: 'Video Game Masterclass',
        description: 'This is the best video game masterclass for beginners',
        date: 1687455483, // Unix timestamp
        maxCapacity: 23,
        currentAttendees: 2,
        interests: [
            { icon: '🏎', title: 'Motor Sports', id: 2 },
            { icon: '🐕', title: 'Dogs', id: 3 },
        ],
        location: {
            address: '123 This Road, Newcastle, NE1 5BY, United Kingdom',
            latitude: 54.969450152452,
            longitude: -1.6194726722736448,
        },
        image: 'https://picsum.photos/200/200', // Event thumbnail
        video: require(`../../assets/video/video.mp4`), // Event promotional video
        organizer: {
            name: 'John Doe',
            email: 'johndoe@example.com',
            avatar: 'https://example.com/johndoe-avatar.jpg',
        },
        price: 15.99, // Price in local currency
        socialMedia: {
            facebook: 'https://www.facebook.com/eventpage',
            twitter: 'https://www.twitter.com/eventpage',
            instagram: 'https://www.instagram.com/eventpage',
        },
        additionalInfo: 'Bring your own laptop for hands-on experience!',
    },
    {
        id: '25',
        title: 'Art Exhibition: Colors of Life',
        description: 'Explore a diverse collection of contemporary artworks.',
        date: 1690245483,
        maxCapacity: 50,
        currentAttendees: 15,
        interests: [
            { icon: '🎨', title: 'Art', id: 1 },
        ],
        location: {
            address: '456 Art Avenue, Cityville, AB1 2CD, United Kingdom',
            latitude: 54.96557949520778,
            longitude: -1.6152824877719354,
        },
        image: 'https://picsum.photos/200/200',
        video: '',
        organizer: {
            name: 'Gallery X',
            email: 'info@galleryx.com',
            avatar: 'https://example.com/galleryx-avatar.jpg',
        },
        price: 0,
        socialMedia: {
            facebook: 'https://www.facebook.com/galleryx',
            twitter: 'https://www.twitter.com/galleryx',
            instagram: 'https://www.instagram.com/galleryx',
        },
        additionalInfo: 'Free entry for students with valid ID.',
    },
    {
        id: '26',
        title: 'Outdoor Yoga Retreat',
        description: 'Reconnect with nature and find inner peace through yoga.',
        date: 1693125483,
        maxCapacity: 30,
        currentAttendees: 8,
        interests: [
            { icon: '🎨', title: 'Art', id: 1 },
            { icon: '🏎', title: 'Motor Sports', id: 2 },
            { icon: '🐕', title: 'Dogs', id: 3 },
        ],
        location: {
            address: '789 Serenity Valley, Mountain Peak, EF3 4GH, United Kingdom',
            latitude: 54.97025978350854,
            longitude: -1.611794107623723,
        },
        image: 'https://picsum.photos/200/200',
        video: '',
        organizer: {
            name: 'YogaLife Retreats',
            email: 'info@yogalife.com',
            avatar: 'https://example.com/yogalife-avatar.jpg',
        },
        price: 0,
        socialMedia: {
            facebook: 'https://www.facebook.com/yogaliferetreats',
            twitter: 'https://www.twitter.com/yogaliferetreats',
            instagram: 'https://www.instagram.com/yogaliferetreats',
        },
        additionalInfo: 'Mats and refreshments provided.',
    },
    {
        id: '27',
        title: 'Live Music Night: Jazz Fusion',
        description: 'Experience an electrifying night of jazz fusion music.',
        date: 1694885483,
        maxCapacity: 100,
        currentAttendees: 75,
        interests: [
            { icon: '🎨', title: 'Art', id: 1 },
            { icon: '🏎', title: 'Motor Sports', id: 2 },
            { icon: '🐕', title: 'Dogs', id: 3 },
        ],
        location: {
            address: '101 Groove Street, Melodytown, CD5 6EF, United Kingdom',
            latitude: 54.972273916943976,
            longitude: -1.615447618837976,
        },
        image: '',
        video: '',
        organizer: {
            name: 'Harmony Events',
            email: 'info@harmonyevents.com',
            avatar: 'https://example.com/harmony-avatar.jpg',
        },
        price: 0,
        socialMedia: {
            facebook: 'https://www.facebook.com/harmonyevents',
            twitter: 'https://www.twitter.com/harmonyevents',
            instagram: 'https://www.instagram.com/harmonyevents',
        },
        additionalInfo: 'Doors open at 7:00 PM. Age 18+ only.',
    },
    {
        id: '28',
        title: 'Cooking Workshop: Gourmet Delights',
        description: 'Learn to create exquisite gourmet dishes from renowned chefs.',
        date: 1696555483,
        maxCapacity: 25,
        currentAttendees: 10,
        interests: [
            { icon: '🎨', title: 'Art', id: 1 },
            { icon: '🏎', title: 'Motor Sports', id: 2 },
            { icon: '🐕', title: 'Dogs', id: 3 },
        ],
        location: {
            address: '246 Culinary Avenue, Flavorsville, FG2 7AB, United Kingdom',
            latitude: 54.999876543,
            longitude: -1.300987654,
        },
        image: '',
        video: '',
        organizer: {
            name: 'TasteMasters Institute',
            email: 'info@tastemasters.com',
            avatar: 'https://example.com/tastemasters-avatar.jpg',
        },
        price: 28.75,
        socialMedia: {
            facebook: 'https://www.facebook.com/tastemasters',
            twitter: 'https://www.twitter.com/tastemasters',
            instagram: 'https://www.instagram.com/tastemasters',
        },
        additionalInfo: 'Ingredients and recipes provided.',
    },
];
