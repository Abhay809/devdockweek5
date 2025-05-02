
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SubmitEventForm from '@/components/SubmitEventForm';

const SubmitEvent: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Submit an Event</h1>
        <p className="text-gray-600">
          Know about an upcoming tech event? Share it with the community!
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
          <CardDescription>
            Fill out the form below with the event information. All fields are required unless marked optional.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SubmitEventForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmitEvent;
