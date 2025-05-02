
export type EventType = 'hackathon' | 'tech-talk' | 'workshop' | 'other';

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string; // ISO string
  endDate?: string; // ISO string for multi-day events
  type: EventType;
  location: string;
  college: string;
  link: string;
  image?: string;
}

export interface EventFilterOptions {
  type?: EventType | 'all';
  college?: string | 'all';
  dateRange?: {
    start: Date | null;
    end: Date | null;
  };
  location?: string | 'all';
  searchTerm?: string;
}
