import { motion } from 'framer-motion';
import { TrendingUp, Check } from 'lucide-react';
import { formatRelativeTime } from '@/lib/format';

interface ResearchRunItemProps {
  id: string;
  projectTitle: string;
  status: 'completed' | 'running' | 'failed';
  startedAt: string;
  totalLeads: number;
  validEmails: number;
  index: number;
}

export default function ResearchRunItem({
  projectTitle,
  status,
  startedAt,
  totalLeads,
  validEmails,
  index,
}: ResearchRunItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: 'easeOut' }}
      whileHover={{ 
        x: 4, 
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        borderColor: 'hsl(var(--primary) / 0.3)',
      }}
      className="flex items-center justify-between p-5 bg-card rounded-xl border border-border/50 cursor-pointer transition-colors duration-300"
    >
      {/* Left: Icon + Info */}
      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="w-10 h-10 rounded-lg bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.7)] flex items-center justify-center"
        >
          <TrendingUp className="h-5 w-5 text-white" />
        </motion.div>
        <div>
          <h4 className="font-semibold text-foreground">{projectTitle}</h4>
          <p className="text-sm text-muted-foreground">{formatRelativeTime(startedAt)}</p>
        </div>
      </div>

      {/* Center: Stats */}
      <div className="flex gap-8">
        <div className="text-center">
          <p className="text-xl font-bold text-foreground">{totalLeads}</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">leads</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-foreground">{validEmails}</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">emails</p>
        </div>
      </div>

      {/* Right: Status Badge */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(var(--accent-success)/0.1)] text-[hsl(var(--accent-success))]">
        <Check className="h-4 w-4" />
        <span className="text-sm font-medium capitalize">{status}</span>
      </div>
    </motion.div>
  );
}
