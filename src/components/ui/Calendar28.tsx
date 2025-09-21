import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

function formatDate(date: Date | undefined) {
  if (!date) {
    return '';
  }

  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

export function Calendar28({
  initialValue,
  onDateChange,
}: {
  initialValue?: string;
  onDateChange?: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date>();

  // Обновляем значение при изменении initialValue
  React.useEffect(() => {
    if (initialValue) {
      const newDate = new Date(initialValue);
      if (isValidDate(newDate)) {
        setDate(newDate);
      }
    }
  }, [initialValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" id="date" className="w-48 justify-between font-normal">
          {date ? date.toLocaleDateString() : 'Select date'}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          onSelect={(date) => {
            setDate(date);
            setOpen(false);
            if (onDateChange && date) {
              onDateChange(formatDate(date));
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
