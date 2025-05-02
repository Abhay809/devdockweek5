
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Event, EventFilterOptions, EventType } from '../types/event';
import mockEvents from '../data/mockEvents';
import { toast } from "sonner";

interface EventContextType {
  events: Event[];
  filteredEvents: Event[];
  filter: EventFilterOptions;
  setFilter: React.Dispatch<React.SetStateAction<EventFilterOptions>>;
  addEvent: (event: Omit<Event, 'id'>) => void;
  colleges: string[];
  eventTypes: { value: EventType | 'all', label: string }[];
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [filter, setFilter] = useState<EventFilterOptions>({
    type: 'all',
    college: 'all',
    dateRange: { start: null, end: null },
    location: 'all',
    searchTerm: '',
  });

  // Extract unique colleges from events
  const colleges = ['all', ...new Set(events.map(event => event.college))];
  
  // Event types for filtering
  const eventTypes: { value: EventType | 'all', label: string }[] = [
    { value: 'all', label: 'All Types' },
    { value: 'hackathon', label: 'Hackathon' },
    { value: 'tech-talk', label: 'Tech Talk' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'other', label: 'Other' },
  ];

  // Filter events based on current filter options
  const filteredEvents = events.filter(event => {
    // Filter by event type
    if (filter.type && filter.type !== 'all' && event.type !== filter.type) {
      return false;
    }

    // Filter by college
    if (filter.college && filter.college !== 'all' && event.college !== filter.college) {
      return false;
    }

    // Filter by location
    if (filter.location && filter.location !== 'all' && !event.location.toLowerCase().includes(filter.location.toLowerCase())) {
      return false;
    }

    // Filter by date range
    if (filter.dateRange?.start && new Date(event.date) < filter.dateRange.start) {
      return false;
    }
    if (filter.dateRange?.end && new Date(event.date) > filter.dateRange.end) {
      return false;
    }

    // Filter by search term
    if (filter.searchTerm) {
      const searchLower = filter.searchTerm.toLowerCase();
      return (
        event.name.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.college.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  // Add a new event
  const addEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...eventData,
      id: (events.length + 1).toString(),
    };
    setEvents([...events, newEvent]);
    toast.success("Event added successfully!");
  };

  return (
    <EventContext.Provider value={{ 
      events, 
      filteredEvents, 
      filter, 
      setFilter, 
      addEvent,
      colleges,
      eventTypes
    }}>
      {children}
    </EventContext.Provider>
  );
};
