
import React, { useState } from 'react';
import { Search, Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEvents } from '@/contexts/EventContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';

const EventFilters: React.FC = () => {
  const { filter, setFilter, colleges, eventTypes } = useEvents();
  const [searchTerm, setSearchTerm] = useState(filter.searchTerm || '');
  const [startDate, setStartDate] = useState<Date | undefined>(filter.dateRange?.start || undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(filter.dateRange?.end || undefined);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilter({
      ...filter,
      searchTerm,
    });
  };

  const handleSelectType = (value: string) => {
    setFilter({
      ...filter,
      type: value as any,
    });
  };

  const handleSelectCollege = (value: string) => {
    setFilter({
      ...filter,
      college: value,
    });
  };

  const handleDateChange = (type: 'start' | 'end') => (date: Date | undefined) => {
    if (type === 'start') {
      setStartDate(date);
    } else {
      setEndDate(date);
    }

    setFilter({
      ...filter,
      dateRange: {
        start: type === 'start' ? date || null : filter.dateRange?.start || null,
        end: type === 'end' ? date || null : filter.dateRange?.end || null,
      },
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStartDate(undefined);
    setEndDate(undefined);
    setFilter({
      type: 'all',
      college: 'all',
      dateRange: { start: null, end: null },
      location: 'all',
      searchTerm: '',
    });
  };

  return (
    <div className="w-full bg-white shadow-sm border rounded-lg p-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search events, colleges, locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
        </div>
        <Button type="submit" variant="default">Search</Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setIsFiltersVisible(!isFiltersVisible)}
          className="flex items-center gap-2"
        >
          <Filter size={16} />
          Filters
        </Button>
      </form>

      {isFiltersVisible && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
            <Select
              value={filter.type?.toString() || 'all'}
              onValueChange={handleSelectType}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">College</label>
            <Select
              value={filter.college?.toString() || 'all'}
              onValueChange={handleSelectCollege}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Colleges" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Colleges</SelectItem>
                {colleges.filter(college => college !== 'all').map((college) => (
                  <SelectItem key={college} value={college}>
                    {college}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <Calendar className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, 'PPP') : 'Select'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto">
                  <CalendarComponent
                    mode="single"
                    selected={startDate}
                    onSelect={handleDateChange('start')}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <Calendar className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, 'PPP') : 'Select'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto">
                  <CalendarComponent
                    mode="single"
                    selected={endDate}
                    onSelect={handleDateChange('end')}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="md:col-span-3 flex justify-end">
            <Button variant="ghost" onClick={clearFilters}>Clear Filters</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventFilters;
