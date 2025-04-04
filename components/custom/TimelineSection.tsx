"use client";

import { motion } from "framer-motion";

interface TimelineItemProps {
  time: string;
  event: string;
  date: string;
}

// Add this helper function at the top level
const findNextEventTime = (
  date: string,
  time: string,
  schedule: (ScheduleItem & { date: string })[],
) => {
  const currentEventDate = new Date(date + " " + time);
  const sameDayEvents = schedule.filter((item) => item.date === date);
  const nextEvent = sameDayEvents.find((item) => {
    const itemDate = new Date(item.date + " " + item.time);
    return itemDate > currentEventDate;
  });
  return nextEvent ? new Date(nextEvent.date + " " + nextEvent.time) : null;
};

// Add a helper function to check if it's the current day
const isCurrentDay = (date: string) => {
  const now = process.env.NEXT_PUBLIC_TEST_DATETIME
    ? new Date(process.env.NEXT_PUBLIC_TEST_DATETIME)
    : new Date();
  const checkDate = new Date(date);
  return now.toDateString() === checkDate.toDateString();
};

export function TimelineItem({ time, event, date }: TimelineItemProps) {
  const isHappeningNow = () => {
    const now = process.env.NEXT_PUBLIC_TEST_DATETIME
      ? new Date(process.env.NEXT_PUBLIC_TEST_DATETIME)
      : new Date();
    const eventDate = new Date(date + " " + time);

    const isSameDay = now.toDateString() === eventDate.toDateString();
    if (!isSameDay) return false;

    // Find the next event time
    const nextEventTime = findNextEventTime(date, time, [
      ...PREHACK_SCHEDULE,
      ...DAY1_SCHEDULE,
      ...DAY2_SCHEDULE,
    ]);

    // If there's a next event, use its start time as the end time
    // Otherwise, use 1 hour duration
    const endTime = nextEventTime || new Date(eventDate.getTime() + 60 * 60 * 1000);

    // Check if current time is between event start and end time
    return now >= eventDate && now < endTime;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative z-10 flex flex-col rounded-md border border-neutral-300 bg-white p-4"
    >
      {isHappeningNow() && (
        <div className="absolute bottom-0 right-0 z-10 rounded-sm bg-hackomania-red px-2 py-0.5 text-xs font-bold text-white">
          happening now
        </div>
      )}
      <div className="absolute bottom-0 right-0 h-0 w-0 border-b-[15px] border-r-[15px] border-b-transparent border-r-neutral-300 transition-colors duration-200 group-hover:border-r-red-600"></div>
      <span className="text-lg font-medium text-red-600">{time}</span>
      <span className="text-lg text-neutral-800">{event}</span>
    </motion.div>
  );
}

interface ScheduleItem {
  time: string;
  event: string;
}

// Configure schedules here
const PREHACK_SCHEDULE: (ScheduleItem & { date: string })[] = [
  { time: "09:30 AM", event: "Registration", date: "2025-02-08" },
  { time: "10:00 AM", event: "Welcome and introduction", date: "2025-02-08" },
  { time: "10:15 AM", event: "Ice breaker", date: "2025-02-08" },
  { time: "10:30 AM", event: "Briefing", date: "2025-02-08" },
  { time: "11:15 AM", event: "Q&A", date: "2025-02-08" },
  { time: "11:30 AM", event: "Main Hall Workshop 1", date: "2025-02-08" },
  { time: "12:30 PM", event: "Lunch", date: "2025-02-08" },
  { time: "01:00 PM", event: "Main Hall Workshop 2", date: "2025-02-08" },
  { time: "02:00 PM", event: "Break", date: "2025-02-08" },
  { time: "02:15 PM", event: "Main Hall Workshop 3", date: "2025-02-08" },
  { time: "03:15 PM", event: "Closing", date: "2025-02-08" },
  { time: "03:45 PM", event: "Networking", date: "2025-02-08" },
];

const DAY1_SCHEDULE: (ScheduleItem & { date: string })[] = [
  { time: "10:30 AM", event: "Registration", date: "2025-02-15" },
  { time: "11:15 AM", event: "Introduction", date: "2025-02-15" },
  { time: "11:30 AM", event: "Rakuten intro", date: "2025-02-15" },
  { time: "11:45 AM", event: "Safety briefing", date: "2025-02-15" },
  { time: "12:00 PM", event: "Keynote", date: "2025-02-15" },
  { time: "12:15 PM", event: "Hackathon briefing", date: "2025-02-15" },
  { time: "12:30 PM", event: "Lunch", date: "2025-02-15" },
  { time: "01:00 PM", event: "Hackathon kick off & team registration start", date: "2025-02-15" },
  { time: "03:30 PM", event: "End of Team Registration", date: "2025-02-15" },
  { time: "03:30 PM - 11:59PM", event: "Continue Hacking!", date: "2025-02-15" },
];

const DAY2_SCHEDULE: (ScheduleItem & { date: string })[] = [
  { time: "08:00 AM", event: "Breakfast", date: "2025-02-16" },
  { time: "09:00 AM", event: "Start Team Submission", date: "2025-02-16" },
  { time: "12:30 PM", event: "End of Team Submission", date: "2025-02-16" },
  { time: "01:30 PM", event: "Judging", date: "2025-02-16" },
  { time: "05:30 PM", event: "End of HackOMania 2025", date: "2025-02-16" },
];

export default function Timeline() {
  return (
    <section className="relative flex flex-col gap-10 py-10 md:flex-row" id="timeline">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative z-10 h-[100px] min-h-0 w-full shrink bg-yellow-400 md:h-auto md:w-[180px] lg:w-[280px]"
      >
        <div className="absolute start-[50%] top-1/2 flex origin-center -translate-x-1/2 -translate-y-1/2 rotate-0 items-center gap-2 md:start-[calc(100%-42px)] md:top-[40%] md:-rotate-90 md:gap-4 lg:start-[calc(100%-42px)]">
          <motion.svg
            width="98"
            height="95"
            viewBox="0 0 98 95"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[25px] animate-spin-slow md:w-[60px] lg:w-[98px]"
          >
            <path
              d="M31.9691 57.1844L15.9846 84.8705L33.0154 94.7033L49 67.0172L64.9846 94.7033L82.0154 84.8705L66.0309 57.1844H98V37.5189H66.0309L82.0154 9.83278L64.9846 0L49 27.6861L33.0154 0L15.9845 9.83278L31.9691 37.5189H0V57.1844H31.9691Z"
              fill="#FFFBF5"
            />
          </motion.svg>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="whitespace-nowrap text-3xl font-bold uppercase text-white md:text-6xl lg:text-9xl"
          >
            Schedule
          </motion.h2>
        </div>
      </motion.div>

      <div className="lg:me-20 lg:px-20 lg:pt-40">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Pre-Hack Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            <h3
              className={`text-2xl font-bold md:self-end lg:text-4xl ${isCurrentDay("2025-02-08") ? "underline decoration-2 underline-offset-4" : ""}`}
            >
              PREHACK
            </h3>
            <div className="flex flex-col gap-3">
              {PREHACK_SCHEDULE.map((item, index) => (
                <TimelineItem key={index} time={item.time} event={item.event} date={item.date} />
              ))}
            </div>
          </motion.div>

          {/* Day 1 Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <h3
              className={`text-2xl font-bold md:self-end lg:text-4xl ${isCurrentDay("2025-02-15") ? "underline decoration-2 underline-offset-4" : ""}`}
            >
              DAY 1
            </h3>
            <div className="flex flex-col gap-3">
              {DAY1_SCHEDULE.map((item, index) => (
                <TimelineItem key={index} time={item.time} event={item.event} date={item.date} />
              ))}
            </div>
          </motion.div>

          {/* Day 2 Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col gap-4"
          >
            <h3
              className={`text-2xl font-bold md:self-end lg:text-4xl ${isCurrentDay("2025-02-16") ? "underline decoration-2 underline-offset-4" : ""}`}
            >
              DAY 2
            </h3>
            <div className="flex flex-col gap-3">
              {DAY2_SCHEDULE.map((item, index) => (
                <TimelineItem key={index} time={item.time} event={item.event} date={item.date} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <div className={`grid-bg absolute bottom-0 h-96 w-full md:h-60`}></div>
    </section>
  );
}
