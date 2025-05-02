
import React from 'react';
import { Calendar, MapPin, BookOpen } from "lucide-react";
import { format } from "date-fns";
import { Event } from '../types/event';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formatEventDate = () => {
    const startDate = new Date(event.date);
    
    if (event.endDate) {
      const endDate = new Date(event.endDate);
      return `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`;
    }
    
    return format(startDate, 'MMM d, yyyy');
  };

  const getEventTypeBadgeColor = () => {
    switch (event.type) {
      case 'hackathon':
        return 'bg-tech-secondary text-white';
      case 'tech-talk':
        return 'bg-tech-primary text-white';
      case 'workshop':
        return 'bg-tech-accent text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Link to={`/events/${event.id}`}>
      <Card className="overflow-hidden h-full event-card hover:border-tech-primary">
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070"} 
            alt={event.name} 
            className="w-full h-full object-cover"
          />
          <Badge className={`absolute top-3 right-3 ${getEventTypeBadgeColor()}`}>
            {event.type.replace('-', ' ')}
          </Badge>
        </div>
        <CardContent className="p-4">
          <div className="flex flex-col space-y-3">
            <h3 className="font-semibold text-lg line-clamp-2">{event.name}</h3>
            
            <div className="flex items-center text-sm text-gray-500">
              <Calendar size={16} className="mr-1 text-tech-primary" />
              <span>{formatEventDate()}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <MapPin size={16} className="mr-1 text-tech-primary" />
              <span>{event.location}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <BookOpen size={16} className="mr-1 text-tech-primary" />
              <span>{event.college}</span>
            </div>
            
            <p className="text-sm text-gray-600 line-clamp-2 mt-2">
              {event.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;
