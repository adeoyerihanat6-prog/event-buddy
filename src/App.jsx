import Card from "./components/ui/Card";

function App() {
  return (
    <div className="min-h-screen bg-[#111111] p-6">
      <div className="max-w-sm mx-auto">
        <Card
          image="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800"
          title="Burna Boy Live"
          location="Lagos"
          date="20 Aug 2026"
          attendees={256}
        />
      </div>
    </div>
  );
}

export default App;