import { motion } from 'framer-motion';
import { useMemo } from 'react';
import AISuggestionsPanel from '../../components/tasks/AISuggestionsPanel';
import AchievementBadges from '../../components/tasks/AchievementBadges';
import DailyProgressRing from '../../components/tasks/DailyProgressRing';
import FloatingQuickAdd from '../../components/tasks/FloatingQuickAdd';
import FocusTaskCard from '../../components/tasks/FocusTaskCard';
import ProductivityHeatmap from '../../components/tasks/ProductivityHeatmap';
import TaskAnalyticsCards from '../../components/tasks/TaskAnalyticsCards';
import TaskListPreview from '../../components/tasks/TaskListPreview';
import TaskSmartSearch from '../../components/tasks/TaskSmartSearch';
import TimelineView from '../../components/tasks/TimelineView';
import EmptyState from '../../components/ui/EmptyState';
import { HEATMAP_DATA, TIMELINE_BLOCKS } from '../../data/tasksSeed';
import { useTasks } from '../../context/TasksContext';
import { useTaskFilters } from '../../hooks/useTaskFilters';
import { buildAISuggestions, getFocusTask } from '../../utils/taskHelpers';

export default function TasksWorkspace() {
  const { tasks, achievements, analytics, addTask, setFocusTask, updateProgress } = useTasks();
  const { filters, filtered, allTags, updateFilter, resetFilters, hasActive } = useTaskFilters(tasks);

  const focusTask = useMemo(() => getFocusTask(filtered), [filtered]);
  const suggestions = useMemo(() => buildAISuggestions(tasks), [tasks]);

  const handleContinue = () => {
    if (focusTask) {
      updateProgress(focusTask.id, Math.min(100, focusTask.progress + 10));
    }
  };

  return (
    <div className="relative mx-auto max-w-[1600px] space-y-6 pb-24">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-sm font-medium uppercase tracking-widest text-violet-600 dark:text-violet-400">
          Smart Workspace
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Productivity Hub
        </h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Focus deeply. Ship faster. Feel in control.
        </p>
      </motion.div>

      <TaskSmartSearch
        filters={filters}
        allTags={allTags}
        onChange={updateFilter}
        onReset={resetFilters}
        hasActive={hasActive}
      />

      <TaskAnalyticsCards
        completedThisWeek={analytics.completedThisWeek}
        avgCompletionHours={analytics.avgCompletionHours}
        productivityTrend={analytics.productivityTrend}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          {focusTask ? (
            <FocusTaskCard task={focusTask} onContinue={handleContinue} />
          ) : (
            <EmptyState
              title="No focus task"
              description="Select a task below or create one to start your focus session."
            />
          )}
          <TimelineView blocks={TIMELINE_BLOCKS} />
          <ProductivityHeatmap data={HEATMAP_DATA} />
        </div>

        <div className="space-y-6">
          <DailyProgressRing percent={analytics.todayProgress} />
          <AISuggestionsPanel suggestions={suggestions} />
          <AchievementBadges achievements={achievements} />
        </div>
      </div>

      <TaskListPreview tasks={filtered} onSelectFocus={setFocusTask} />

      <FloatingQuickAdd onAdd={addTask} />
    </div>
  );
}
