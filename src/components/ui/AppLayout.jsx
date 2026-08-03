import BottomNav from "./BottomNav";

const AppLayout = ({ children, header, noBottomNav = false, unreadMessagesCount = 0 }) => {
  return (
    <div className="h-screen w-screen fixed inset-0 bg-[#0B0B0F] text-white flex flex-col overflow-hidden">
      {/* Pinned Sticky Header */}
      {header && (
        <div className="bg-[#17171C]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 shrink-0 z-20">
          {header}
        </div>
      )}

      {/* Independent Scrollable Content Container */}
      <div className={`flex-1 overflow-y-auto px-6 py-6 overscroll-contain ${noBottomNav ? "pb-6" : "pb-28"}`}>
        {children}
      </div>

      {/* Persistent Bottom Navigation */}
      {!noBottomNav && <BottomNav unreadMessagesCount={unreadMessagesCount} />}
    </div>
  );
};

export default AppLayout;