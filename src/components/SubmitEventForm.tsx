
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEvents } from '@/contexts/EventContext';
import { EventType } from '@/types/event';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const formSchema = z.object({
  name: z.string().min(3, { message: 'Event name is required' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  date: z.string().min(1, { message: 'Event date is required' }),
  endDate: z.string().optional(),
  type: z.enum(['hackathon', 'tech-talk', 'workshop', 'other'] as const),
  location: z.string().min(1, { message: 'Location is required' }),
  college: z.string().min(1, { message: 'College name is required' }),
  link: z.string().url({ message: 'Invalid URL format' }),
  image: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const SubmitEventForm: React.FC = () => {
  const { addEvent } = useEvents();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // Redirect to sign in if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      date: '',
      endDate: '',
      type: 'tech-talk',
      location: '',
      college: '',
      link: '',
      image: '',
    },
  });

  function onSubmit(data: FormValues) {
    // Convert form data to Event type (without id)
    const eventData = {
      name: data.name,
      description: data.description,
      date: data.date,
      endDate: data.endDate,
      type: data.type,
      location: data.location,
      college: data.college,
      link: data.link,
      image: data.image || undefined,
    };
    
    addEvent(eventData);
    navigate('/');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Tech Conference 2023" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date (Optional)</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="hackathon">Hackathon</SelectItem>
                    <SelectItem value="tech-talk">Tech Talk</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="college"
            render={({ field }) => (
              <FormItem>
                <FormLabel>College/University</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., MIT" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Building A, Room 101 or Virtual (Online)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Registration/Info Link</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the event in detail..." 
                  className="min-h-32"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end">
          <Button type="submit">Submit Event</Button>
        </div>
      </form>
    </Form>
  );
};

export default SubmitEventForm;
