
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">About Tech Event Hub</h1>
        <p className="text-gray-600">
          Connecting students with technology events across college campuses
        </p>
      </div>
      
      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-4 text-gray-700">
            Tech Event Hub aims to bridge the gap between technology enthusiasts and the wealth of educational events happening across college campuses. Our mission is to create a centralized platform where students, professionals, and educators can discover and engage with tech talks, hackathons, workshops, and more.
          </p>
          <p className="text-gray-700">
            By aggregating events from multiple sources and allowing community submissions, we ensure that valuable learning and networking opportunities don't go unnoticed. We believe in fostering a vibrant tech community where knowledge sharing and collaboration thrive.
          </p>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Features</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Comprehensive event listings from multiple colleges</li>
              <li>• Advanced filtering by date, event type, and location</li>
              <li>• Community event submissions</li>
              <li>• Detailed event information and direct registration links</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Get Involved</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Submit events you know about</li>
              <li>• Share Tech Event Hub with your network</li>
              <li>• Provide feedback to help us improve</li>
              <li>• Attend events and support the tech community</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700">
            Have questions, suggestions, or feedback? We'd love to hear from you! Reach out to us at <a href="mailto:contact@techeventhub.com" className="text-tech-primary hover:underline">contact@techeventhub.com</a>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
