export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function isOverdue(dueDate: string, status: string): boolean {
  if (status === 'completed') return false;
  return new Date(dueDate) < new Date();
}
