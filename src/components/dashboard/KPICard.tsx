import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';

interface KPICardProps {
  title: string;
  value: number;
  suffix?: string;
  subtitle: string;
  icon: LucideIcon;
  iconColor: 'cyan' | 'green' | 'purple' | 'orange';
  delay?: number;
  progress?: {
    value: number;
    max: number;
  };
  badge?: {
    text: string;
    variant: 'success' | 'warning' | 'default';
  };
  pulse?: boolean;
}

const iconColors = {
  cyan: 'from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.7)]',
  green: 'from-[hsl(var(--accent-success))] to-[hsl(var(--accent-success)/0.7)]',
  purple: 'from-[hsl(var(--accent-purple))] to-[hsl(var(--accent-purple)/0.7)]',
  orange: 'from-[hsl(var(--accent-warning))] to-[hsl(var(--accent-warning)/0.7)]',
};

const textGradients = {
  cyan: 'from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.8)]',
  green: 'from-[hsl(var(--accent-success))] to-[hsl(var(--accent-success)/0.8)]',
  purple: 'from-[hsl(var(--accent-purple))] to-[hsl(var(--accent-purple)/0.8)]',
  orange: 'from-[hsl(var(--accent-warning))] to-[hsl(var(--accent-warning)/0.8)]',
};

const badgeVariants = {
  success: 'bg-[hsl(var(--accent-success)/0.1)] text-[hsl(var(--accent-success))]',
  warning: 'bg-[hsl(var(--accent-warning)/0.1)] text-[hsl(var(--accent-warning))]',
  default: 'bg-muted text-muted-foreground',
};

export default function KPICard({
  title,
  value,
  suffix,
  subtitle,
  icon: Icon,
  iconColor,
  delay = 0,
  progress,
  badge,
  pulse,
}: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
      className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 shadow-sm transition-all duration-300"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20 pointer-events-none" />
      
      <div className="relative z-10">
        {/* Icon */}
        <div className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br',
          iconColors[iconColor]
        )}>
          <Icon className="h-6 w-6 text-white" />
        </div>

        {/* Label */}
        <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>

        {/* Value */}
        <motion.div
          animate={pulse ? { scale: [1, 1.02, 1] } : {}}
          transition={pulse ? { duration: 2, repeat: Infinity, repeatDelay: 3 } : {}}
          className="flex items-baseline gap-1 mb-2"
        >
          <span className={cn(
            'text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent',
            textGradients[iconColor]
          )}>
            <AnimatedCounter end={value} duration={1.2} />
          </span>
          {suffix && (
            <span className="text-xl font-medium text-muted-foreground">{suffix}</span>
          )}
        </motion.div>

        {/* Progress Bar */}
        {progress && (
          <div className="mt-3 mb-2">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(progress.value / progress.max) * 100}%` }}
                transition={{ duration: 0.8, delay: delay + 0.3, ease: 'easeOut' }}
                className={cn('h-full rounded-full bg-gradient-to-r', iconColors[iconColor])}
              />
            </div>
          </div>
        )}

        {/* Subtitle with optional badge */}
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">{subtitle}</p>
          {badge && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.5, duration: 0.3 }}
              className={cn(
                'px-2 py-0.5 rounded-full text-xs font-medium',
                badgeVariants[badge.variant]
              )}
            >
              {badge.text}
            </motion.span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
