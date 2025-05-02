
import { Event } from '../types/event';

const mockEvents: Event[] = [
  {
    id: '1',
    name: 'AI Innovation Hackathon',
    description: 'Join us for a 48-hour hackathon focused on developing innovative AI solutions. Prizes include cash awards and internship opportunities.',
    date: '2025-06-15T09:00:00Z',
    endDate: '2025-06-17T18:00:00Z',
    type: 'hackathon',
    location: 'New York, NY',
    college: 'MIT',
    link: 'https://example.com/ai-hackathon',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070'
  },
  {
    id: '2',
    name: 'Web3 Tech Talk',
    description: 'Learn about the future of web3 technologies from industry experts and researchers.',
    date: '2025-06-10T18:30:00Z',
    type: 'tech-talk',
    location: 'Boston, MA',
    college: 'Harvard',
    link: 'https://example.com/web3-talk',
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=2070'
  },
  {
    id: '3',
    name: 'Cybersecurity Workshop',
    description: 'Hands-on workshop covering the latest techniques in cybersecurity and ethical hacking.',
    date: '2025-06-25T10:00:00Z',
    type: 'workshop',
    location: 'San Francisco, CA',
    college: 'Stanford',
    link: 'https://example.com/cyber-workshop',
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2070'
  },
  {
    id: '4',
    name: 'Data Science Symposium',
    description: 'An academic symposium discussing advancements in data science and their applications.',
    date: '2025-07-05T13:00:00Z',
    type: 'tech-talk',
    location: 'Chicago, IL',
    college: 'University of Chicago',
    link: 'https://example.com/data-symposium',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070'
  },
  {
    id: '5',
    name: 'Mobile App Development Workshop',
    description: 'Learn to develop cross-platform mobile applications using React Native.',
    date: '2025-07-12T09:30:00Z',
    endDate: '2025-07-12T16:30:00Z',
    type: 'workshop',
    location: 'Seattle, WA',
    college: 'University of Washington',
    link: 'https://example.com/mobile-workshop',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=2036'
  },
  {
    id: '6',
    name: 'Blockchain Innovation Challenge',
    description: 'A week-long challenge to develop innovative blockchain solutions for real-world problems.',
    date: '2025-08-01T09:00:00Z',
    endDate: '2025-08-07T18:00:00Z',
    type: 'hackathon',
    location: 'Austin, TX',
    college: 'University of Texas',
    link: 'https://example.com/blockchain-challenge',
    image: 'https://images.unsplash.com/photo-1561451213-d5c9f0951fcc?q=80&w=2070'
  },
  {
    id: '7',
    name: 'Future of AI Panel Discussion',
    description: 'Leading researchers discuss the future implications of artificial intelligence.',
    date: '2025-07-20T19:00:00Z',
    type: 'tech-talk',
    location: 'Los Angeles, CA',
    college: 'UCLA',
    link: 'https://example.com/ai-panel',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070'
  },
  {
    id: '8',
    name: 'Cloud Computing Essentials',
    description: 'Workshop covering essential knowledge and skills for cloud computing platforms.',
    date: '2025-06-30T10:00:00Z',
    type: 'workshop',
    location: 'San Diego, CA',
    college: 'UCSD',
    link: 'https://example.com/cloud-workshop',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069'
  },
  {
    id: '9',
    name: 'Women in Tech Hackathon',
    description: 'A hackathon promoting diversity in tech, focusing on solutions for social good.',
    date: '2025-09-10T08:00:00Z',
    endDate: '2025-09-12T20:00:00Z',
    type: 'hackathon',
    location: 'New York, NY',
    college: 'Columbia University',
    link: 'https://example.com/women-hackathon',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070'
  },
  {
    id: '10',
    name: 'IoT Innovation Workshop',
    description: 'Hands-on workshop exploring Internet of Things technologies and applications.',
    date: '2025-08-15T09:00:00Z',
    type: 'workshop',
    location: 'Atlanta, GA',
    college: 'Georgia Tech',
    link: 'https://example.com/iot-workshop',
    image: 'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?q=80&w=2069'
  }
];

export default mockEvents;
