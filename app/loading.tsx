export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex items-center gap-3 text-mist">
        <span className="w-4 h-4 border-2 border-brand/20 border-t-brand rounded-full animate-spin360" />
        <span className="text-[0.9rem]">불러오는 중…</span>
      </div>
    </div>
  );
}
