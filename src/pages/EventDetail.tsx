
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, MapPin, Link as LinkIcon, ArrowLeft, BookOpen, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEvents } from '@/contexts/EventContext';

const EventDetail: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { events } = useEvents();
  const navigate = useNavigate();
  
  const event = events.find(e => e.id === eventId);
  
  if (!event) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
        <p className="mb-6">The event you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Button>
      </div>
    );
  }
  
  const formatEventDate = () => {
    const startDate = new Date(event.date);
    
    if (event.endDate) {
      const endDate = new Date(event.endDate);
      return `${format(startDate, 'MMMM d, yyyy')} - ${format(endDate, 'MMMM d, yyyy')}`;
    }
    
    return format(startDate, 'MMMM d, yyyy');
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
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="h-64 overflow-hidden relative">
          <img 
            src={event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070"} 
            alt={event.name} 
            className="w-full h-full object-cover"
          />
          <Badge className={`absolute top-4 right-4 ${getEventTypeBadgeColor()}`}>
            {event.type.replace('-', ' ')}
          </Badge>
        </div>
        
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-tech-primary" />
                <span>{formatEventDate()}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-tech-primary" />
                <span>{event.location}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-tech-primary" />
                <span>{event.college}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <LinkIcon className="h-5 w-5 text-tech-primary" />
                <a 
                  href={event.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-tech-primary hover:underline flex items-center"
                >
                  Official Event Page
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>
            
            <div>
              <a 
                href={event.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button 
                  className="w-full flex items-center justify-center gap-2"
                >
                  Register for Event
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-3">About This Event</h2>
            <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
