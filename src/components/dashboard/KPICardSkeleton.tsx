import { Skeleton } from '@/components/ui/skeleton';

export default function KPICardSkeleton() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6">
      <Skeleton className="w-12 h-12 rounded-xl mb-4" />
      <Skeleton className="w-24 h-4 mb-3" />
      <Skeleton className="w-20 h-10 mb-2" />
      <Skeleton className="w-full h-2 rounded-full mb-3" />
      <Skeleton className="w-28 h-4" />
    </div>
  );
}
