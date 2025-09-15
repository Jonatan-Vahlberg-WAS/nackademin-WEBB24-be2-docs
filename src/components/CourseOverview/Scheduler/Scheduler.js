import { SchedulerProvider } from "../../../contexts/scheduler";
import AbstractScheduler from "./AbstractScheduler";


export default function Scheduler({ title = "", schedulerId, dates = [], children }) {
  return (
    <SchedulerProvider schedulerId={schedulerId} dates={dates}>
      <AbstractScheduler 
        title={title}
      >
        {children}
      </AbstractScheduler>
    </SchedulerProvider>
  );
}