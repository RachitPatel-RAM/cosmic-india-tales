import { useState } from 'react';
import { Search, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Starfield from '@/components/Starfield';
import IndiaMap from '@/components/IndiaMap';
import StateModal from '@/components/StateModal';
import type { State } from '@/components/IndiaMap';

const Index = () => {
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleStateClick = (state: State) => {
    setSelectedState(state);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedState(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Starfield Background */}
      <Starfield />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="text-2xl font-bold text-glow">
            🇮🇳 Explore India
          </div>
          
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80 bg-card/50 border-primary/30 backdrop-blur-sm rounded-full"
              />
            </div>
            
            {/* Sound Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="text-primary hover:bg-primary/20 rounded-full"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-screen px-6 pt-20">
        <div className="text-center space-y-8 mb-12 animate-fade-slide-in">
          <h1 className="text-6xl md:text-8xl font-bold text-glow leading-tight">
            Explore India
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your Journey Begins Here
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-card/30 backdrop-blur-sm border border-primary/30 rounded-full text-sm text-primary">
            ✨ Hover & Click on any state to discover its gems
          </div>
        </div>

        {/* Interactive India Map */}
        <div className="w-full max-w-4xl mx-auto animate-float">
          <IndiaMap 
            onStateClick={handleStateClick}
            activeState={selectedState?.id}
          />
        </div>

        {/* Cosmic Particles */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-neon-pink rounded-full animate-twinkle opacity-60" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-neon-blue rounded-full animate-twinkle opacity-70" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-neon-purple rounded-full animate-twinkle opacity-80" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-neon-cyan rounded-full animate-twinkle opacity-50" style={{ animationDelay: '0.5s' }} />
      </main>

      {/* State Modal */}
      <StateModal
        state={selectedState}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 p-6">
        <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">About</a>
          <span className="text-primary">•</span>
          <a href="#" className="hover:text-primary transition-colors">Contact</a>
          <span className="text-primary">•</span>
          <a href="#" className="hover:text-primary transition-colors">Instagram</a>
          <span className="text-primary">•</span>
          <a href="#" className="hover:text-primary transition-colors">Twitter</a>
        </div>
      </footer>

      {/* Ambient nebula clouds */}
      <div className="fixed top-10 right-10 w-96 h-96 nebula-gradient rounded-full opacity-20 animate-float pointer-events-none" />
      <div className="fixed bottom-10 left-10 w-64 h-64 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-full opacity-30 animate-float pointer-events-none" style={{ animationDelay: '-3s' }} />
    </div>
  );
};

export default Index;