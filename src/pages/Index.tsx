
import React from 'react';
import { Link } from 'react-router-dom';
import EventCard from '@/components/EventCard';
import EventFilters from '@/components/EventFilters';
import { useEvents } from '@/contexts/EventContext';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, PlusCircle } from 'lucide-react';

const Index: React.FC = () => {
  const { filteredEvents, filter } = useEvents();
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <section className="bg-gradient-to-b from-tech-primary/10 to-background py-12 mb-12 -mx-4 px-4 rounded-b-3xl">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Calendar className="h-12 w-12 text-tech-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-tech-primary to-tech-primary/70">
            Tech Event Hub
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover the latest tech talks, hackathons, and workshops from colleges across the country.
            Never miss an opportunity to learn, connect, and grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-tech-primary hover:bg-tech-primary/90">
              <Link to="/submit">
                <PlusCircle className="mr-2 h-5 w-5" />
                Submit Event
              </Link>
            </Button>
            {!isAuthenticated && (
              <Button size="lg" variant="outline" asChild>
                <Link to="/signin">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="mb-8">
        <EventFilters />
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-tech-dark">
            {filteredEvents.length === 0
              ? 'No events found'
              : filter.type === 'all'
              ? 'All Events'
              : `${filter.type.charAt(0).toUpperCase() + filter.type.slice(1).replace('-', ' ')}s`}
          </h2>
          <span className="text-gray-500 text-sm">
            {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
          </span>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No events found</h3>
            <p className="text-gray-500">
              Try adjusting your filters or search terms to find more events.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div key={event.id} className="animate-fade-in">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;
