import BottomNav from "./BottomNav";

const AppLayout = ({ children, header }) => {
  return (
    <div className="h-screen w-screen fixed inset-0 bg-[#0B0B0F] text-white flex flex-col overflow-hidden">
      {/* Pinned Sticky Header */}
      {header && (
        <div className="bg-[#17171C]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 shrink-0 z-20">
          {header}
        </div>
      )}

      {/* Independent Scrollable Content Container */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-28 overscroll-contain">
        {children}
      </div>

      {/* Persistent Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default AppLayout;