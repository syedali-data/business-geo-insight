import { motion } from 'framer-motion';
import { Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onCreateProject: () => void;
}

export default function EmptyState({ onCreateProject }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16"
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-muted flex items-center justify-center"
      >
        <Search className="h-8 w-8 text-muted-foreground" />
      </motion.div>
      <h3 className="text-xl font-semibold mb-2">No research runs yet</h3>
      <p className="text-muted-foreground mb-6">
        Start your first project to see results here
      </p>
      <Button onClick={onCreateProject} size="lg">
        <Plus className="h-4 w-4 mr-2" />
        Create First Project
      </Button>
    </motion.div>
  );
}
