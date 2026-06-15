import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { HiOutlineX } from 'react-icons/hi';
import { TEAM_MEMBERS } from '../../data/teamMembers';
import type { CreateProjectInput, ProjectCategory, ProjectPriority } from '../../types/project';
import { COVER_COLORS } from '../../utils/projectHelpers';
import Button from '../ui/Button';

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProjectInput) => void;
}

interface FormValues {
  name: string;
  description: string;
  startDate: string;
  dueDate: string;
  priority: ProjectPriority;
  category: ProjectCategory;
  teamMemberIds: string[];
  tags: string;
  coverColor: string;
}

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white';

export default function CreateProjectModal({ open, onClose, onSubmit }: CreateProjectModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      description: '',
      startDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      priority: 'medium',
      category: 'engineering',
      teamMemberIds: [],
      tags: '',
      coverColor: COVER_COLORS[0],
    },
  });

  const description = watch('description');
  const name = watch('name');

  const submit = (data: FormValues) => {
    const teamIds = data.teamMemberIds;
    const teamMemberIds = Array.isArray(teamIds) ? teamIds : teamIds ? [teamIds] : [];

    onSubmit({
      ...data,
      tags: data.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      teamMemberIds,
    });
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 z-50 m-auto flex max-h-[90vh] max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:inset-auto sm:top-[5vh]"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-700">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Create Project</h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Close"
              >
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(submit)}
              className="flex-1 space-y-4 overflow-y-auto px-6 py-5"
            >
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Project Name *
                </label>
                <input
                  {...register('name', {
                    required: 'Project name is required',
                    maxLength: { value: 80, message: 'Max 80 characters' },
                  })}
                  className={inputClass}
                  placeholder="e.g. Product Redesign"
                />
                <div className="mt-1 flex justify-between text-xs">
                  {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                  <span className="ml-auto text-slate-400">{name?.length ?? 0}/80</span>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Description *
                </label>
                <textarea
                  {...register('description', {
                    required: 'Description is required',
                    maxLength: { value: 500, message: 'Max 500 characters' },
                  })}
                  rows={3}
                  className={inputClass}
                  placeholder="What is this project about?"
                />
                <div className="mt-1 flex justify-between text-xs">
                  {errors.description && (
                    <span className="text-red-500">{errors.description.message}</span>
                  )}
                  <span className="ml-auto text-slate-400">{description?.length ?? 0}/500</span>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Start Date *</label>
                  <input
                    type="date"
                    {...register('startDate', { required: 'Start date is required' })}
                    className={inputClass}
                  />
                  {errors.startDate && (
                    <p className="mt-1 text-xs text-red-500">{errors.startDate.message}</p>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Due Date *</label>
                  <input
                    type="date"
                    {...register('dueDate', { required: 'Due date is required' })}
                    className={inputClass}
                  />
                  {errors.dueDate && (
                    <p className="mt-1 text-xs text-red-500">{errors.dueDate.message}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Priority</label>
                  <select {...register('priority')} className={inputClass}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Category</label>
                  <select {...register('category')} className={inputClass}>
                    <option value="engineering">Engineering</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="operations">Operations</option>
                    <option value="product">Product</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Color Theme</label>
                <div className="flex flex-wrap gap-2">
                  {COVER_COLORS.map((color) => (
                    <label key={color} className="cursor-pointer">
                      <input
                        type="radio"
                        value={color}
                        {...register('coverColor')}
                        className="sr-only peer"
                      />
                      <span
                        className="block h-9 w-9 rounded-xl ring-2 ring-transparent transition peer-checked:ring-violet-500 peer-checked:ring-offset-2"
                        style={{ backgroundColor: color }}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Team Members</label>
                <div className="flex flex-wrap gap-2">
                  {TEAM_MEMBERS.map((m) => (
                    <label
                      key={m.id}
                      className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 has-[:checked]:border-violet-500 has-[:checked]:bg-violet-50 dark:border-slate-600 dark:has-[:checked]:bg-violet-900/30"
                    >
                      <input
                        type="checkbox"
                        value={m.id}
                        {...register('teamMemberIds')}
                        className="rounded border-slate-300 text-violet-600"
                      />
                      <span className="text-sm">{m.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">Tags</label>
                <input
                  {...register('tags')}
                  className={inputClass}
                  placeholder="ui, mobile, api (comma separated)"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 pt-4 dark:border-slate-700">
                <Button type="button" variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">Create Project</Button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
