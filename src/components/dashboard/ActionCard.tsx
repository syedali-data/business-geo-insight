import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  variant: 'primary' | 'secondary';
  buttonText: string;
  buttonIcon?: LucideIcon;
  onClick?: () => void;
  delay?: number;
}

export default function ActionCard({
  title,
  description,
  icon: Icon,
  variant,
  buttonText,
  buttonIcon: ButtonIcon,
  onClick,
  delay = 0,
}: ActionCardProps) {
  const isPrimary = variant === 'primary';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
      className={cn(
        'relative overflow-hidden rounded-2xl border p-8 transition-all duration-400 cursor-pointer',
        isPrimary 
          ? 'border-primary/20 bg-gradient-to-br from-card via-card to-primary/5' 
          : 'border-border/50 bg-card'
      )}
    >
      {/* Floating background orb */}
      <motion.div
        animate={{
          x: [0, 10, 0],
          y: [0, -10, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={cn(
          'absolute w-[300px] h-[300px] rounded-full pointer-events-none',
          isPrimary 
            ? 'bg-[radial-gradient(circle,hsl(var(--primary)/0.1),transparent)] -top-[150px] -right-[150px]'
            : 'bg-[radial-gradient(circle,hsl(var(--accent)/0.08),transparent)] -top-[150px] -right-[150px]'
        )}
      />

      <div className="relative z-10">
        {/* Icon Container */}
        <motion.div
          whileHover={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 0.5 }}
          className="relative w-16 h-16 mb-6"
        >
          <div className={cn(
            'absolute inset-0 rounded-2xl opacity-15',
            isPrimary 
              ? 'bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.5)]'
              : 'bg-gradient-to-br from-[hsl(var(--accent))] to-[hsl(var(--accent)/0.5)]'
          )} />
          <div className="relative w-full h-full flex items-center justify-center">
            <Icon className={cn(
              'h-8 w-8',
              isPrimary ? 'text-primary' : 'text-accent'
            )} />
          </div>
        </motion.div>

        {/* Content */}
        <h3 className="font-heading text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>

        {/* Button */}
        <Button
          onClick={onClick}
          variant={isPrimary ? 'default' : 'outline'}
          size="lg"
          className={cn(
            'transition-all duration-300',
            isPrimary && 'shadow-md hover:shadow-lg hover:shadow-primary/25'
          )}
        >
          {ButtonIcon && <ButtonIcon className="h-4 w-4 mr-2" />}
          {buttonText}
        </Button>
      </div>
    </motion.div>
  );
}
