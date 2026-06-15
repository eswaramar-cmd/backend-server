import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlinePlus, HiOutlineX } from 'react-icons/hi';
import { TEAM_MEMBERS } from '../../data/teamMembers';
import type { CreateTaskInput, TaskPriority } from '../../types/task';

interface FloatingQuickAddProps {
  onAdd: (input: CreateTaskInput) => void;
}

interface QuickForm {
  title: string;
  priority: TaskPriority;
  dueDate: string;
  tags: string;
  assigneeId: string;
}

export default function FloatingQuickAdd({ onAdd }: FloatingQuickAddProps) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<QuickForm>({
    defaultValues: {
      title: '',
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0],
      tags: '',
      assigneeId: '1',
    },
  });

  const submit = (data: QuickForm) => {
    if (!data.title.trim()) return;
    onAdd({
      title: data.title.trim(),
      priority: data.priority,
      dueDate: data.dueDate,
      tags: data.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      assigneeId: data.assigneeId,
    });
    reset();
    setOpen(false);
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-blue-600 text-2xl font-light text-white shadow-2xl shadow-violet-500/40"
        aria-label="Quick add task"
      >
        <HiOutlinePlus className="h-7 w-7" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-24 right-6 z-50 w-[calc(100%-3rem)] max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-bold text-slate-900 dark:text-white">Quick Add Task</h3>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <HiOutlineX className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit(submit)} className="space-y-3">
                <input
                  {...register('title', { required: true })}
                  placeholder="What needs to be done?"
                  autoFocus
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                />
                <div className="grid grid-cols-2 gap-2">
                  <select
                    {...register('priority')}
                    className="rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                  <input
                    type="date"
                    {...register('dueDate')}
                    className="rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-2.5 text-sm font-semibold text-white"
                >
                  Add Task
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
