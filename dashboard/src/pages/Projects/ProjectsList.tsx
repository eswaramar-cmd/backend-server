import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import ProjectCard from '../../components/cards/ProjectCard';
import CreateProjectModal from '../../components/modals/CreateProjectModal';
import ProjectFiltersBar from '../../components/filters/ProjectFiltersBar';
import EmptyState from '../../components/ui/EmptyState';
import { ProjectCardSkeleton } from '../../components/ui/Skeleton';
import { useProjects } from '../../context/ProjectsContext';
import { useProjectFilters } from '../../hooks/useProjectFilters';
import Button from '../../components/ui/Button';

export default function ProjectsList() {
  const { projects, addProject } = useProjects();
  const { filters, filtered, updateFilter, resetFilters, hasActiveFilters } =
    useProjectFilters(projects);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">All Projects</h1>
          <p className="text-slate-500 dark:text-slate-400">
            {filtered.length} of {projects.length} projects
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <HiOutlinePlus className="h-4 w-4" />
          Create Project
        </Button>
      </motion.div>

      <ProjectFiltersBar
        filters={filters}
        onChange={updateFilter}
        onReset={resetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No projects found"
          description={
            hasActiveFilters
              ? 'Try adjusting your filters or search query.'
              : 'Create your first project to get started.'
          }
          actionLabel="Create Project"
          onAction={() => setModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      )}

      <CreateProjectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(data) => addProject(data)}
      />
    </div>
  );
}
