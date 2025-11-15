import type { Sermon, Event, Ministry, Donation } from './definitions';

export const SERMONS: Sermon[] = [
  {
    id: '1',
    title: 'The Power of Forgiveness',
    speaker: 'Pastor John Doe',
    date: '2024-07-21',
    category: 'Faith',
    audioUrl: '/audio/sermon1.mp3',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    summary: 'An inspiring message on how forgiveness can transform your life and relationships. Discover the freedom that comes from letting go of past hurts.',
    coverImage: 'sermon-1',
  },
  {
    id: '2',
    title: 'Living a Life of Purpose',
    speaker: 'Pastor Jane Smith',
    date: '2024-07-14',
    category: 'Life',
    audioUrl: '/audio/sermon2.mp3',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    summary: 'Explore what it means to live a purpose-driven life. This sermon provides practical steps to identify and pursue your God-given calling.',
    coverImage: 'sermon-2',
  },
  {
    id: '3',
    title: 'Finding Peace in Chaos',
    speaker: 'Guest Speaker Alex Chen',
    date: '2024-07-07',
    category: 'Hope',
    audioUrl: '/audio/sermon3.mp3',
    summary: 'In a world full of turmoil, find out how to anchor your soul in unshakable peace. A message of hope for troubled times.',
    coverImage: 'sermon-3',
  },
    {
    id: '4',
    title: 'The Heart of a Servant',
    speaker: 'Pastor John Doe',
    date: '2024-06-30',
    category: 'Service',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    summary: 'Discover the joy and impact of serving others with a humble heart. This message challenges us to look beyond ourselves.',
    coverImage: 'sermon-4',
  },
];

export const LATEST_SERMON = SERMONS[0];

export const EVENTS: Event[] = [
  {
    id: '1',
    title: 'Annual Community Picnic',
    date: '2024-08-15',
    time: '12:00 PM - 4:00 PM',
    location: 'Central Park',
    description: 'Join us for a day of fun, food, and fellowship! There will be games for all ages, a BBQ, and live music.',
    image: 'event-1',
  },
  {
    id: '2',
    title: 'Volunteer Day: City Cleanup',
    date: '2024-09-07',
    time: '9:00 AM - 1:00 PM',
    location: 'Meet at the Church',
    description: 'Let\'s show our love for the city by helping to clean up our local neighborhoods. All supplies will be provided.',
    image: 'event-2',
  },
  {
    id: '3',
    title: 'Worship & Praise Night',
    date: '2024-09-28',
    time: '7:00 PM',
    location: 'Church Sanctuary',
    description: 'An evening dedicated to worship, prayer, and praise. Come and experience a powerful move of the Spirit.',
    image: 'event-3',
  },
];

export const RECENT_EVENTS = EVENTS.slice(0, 3);

export const MINISTRIES: Ministry[] = [
    {
        id: '1',
        name: 'KidsConnect',
        description: 'Engaging and fun programs for children from nursery to 5th grade, where they can learn about God in a safe environment.',
        image: 'ministry-1'
    },
    {
        id: '2',
        name: 'Youth Ablaze',
        description: 'A dynamic ministry for middle and high school students to grow in their faith, build friendships, and serve the community.',
        image: 'ministry-2'
    },
    {
        id: '3',
        name: 'Life Groups',
        description: 'Small groups that meet weekly in homes to study the Bible, pray, and support one another in their walk with Christ.',
        image: 'ministry-3'
    },
    {
        id: '4',
        name: 'Worship & Arts',
        description: 'Using music, drama, and visual arts to create a compelling worship experience that glorifies God.',
        image: 'ministry-4'
    }
];

export const DONATIONS: Donation[] = [
    { id: '1', name: 'John Appleseed', amount: 100, date: '2024-07-20', campaign: 'General Fund'},
    { id: '2', name: 'Jane Smith', amount: 50, date: '2024-07-19', campaign: 'Missions'},
    { id: '3', name: 'Peter Jones', amount: 250, date: '2024-07-19', campaign: 'Building Fund'},
    { id: '4', name: 'Mary Garcia', amount: 75, date: '2024-07-18', campaign: 'General Fund'},
    { id: '5', name: 'David Lee', amount: 20, date: '2024-07-17', campaign: 'Youth Ministry'},
]
