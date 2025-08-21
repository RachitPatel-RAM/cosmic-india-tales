import { useState } from 'react';
import { X, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { State } from './IndiaMap';

interface StateModalProps {
  state: State | null;
  isOpen: boolean;
  onClose: () => void;
}

const StateModal = ({ state, isOpen, onClose }: StateModalProps) => {
  const [activePlace, setActivePlace] = useState(0);

  if (!state || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/90 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal Panel */}
      <div className="relative w-full max-w-2xl h-full bg-gradient-to-br from-card/95 to-cosmic-surface/90 backdrop-blur-xl border-r border-primary/30 overflow-hidden animate-fade-slide-in">
        
        {/* Header */}
        <div className="p-6 border-b border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-glow mb-2">{state.name}</h2>
              <p className="text-muted-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Discover the gems of {state.name}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-primary hover:bg-primary/20 hover:text-primary neon-glow rounded-full"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Places Carousel */}
        <div className="flex-1 p-6 space-y-6">
          <div className="space-y-4">
            {state.places.map((place, index) => (
              <div
                key={index}
                className={cn(
                  "cosmic-card rounded-2xl p-6 cursor-pointer transition-all duration-500",
                  activePlace === index && "ring-2 ring-primary/50 neon-glow scale-105"
                )}
                onClick={() => setActivePlace(index)}
              >
                <div className="flex gap-4">
                  {/* Place Image */}
                  <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex-shrink-0 overflow-hidden">
                    <img 
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  
                  {/* Place Info */}
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {place.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {place.description}
                    </p>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button 
                        size="sm" 
                        className="bg-primary/80 hover:bg-primary text-primary-foreground rounded-full px-4"
                      >
                        Explore
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-primary/30 text-primary hover:bg-primary/10 rounded-full"
                      >
                        Plan Visit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 pt-4">
            {state.places.map((_, index) => (
              <button
                key={index}
                onClick={() => setActivePlace(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  activePlace === index 
                    ? "bg-primary shadow-lg shadow-primary/50" 
                    : "bg-muted hover:bg-primary/50"
                )}
              />
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-8 w-32 h-32 nebula-gradient rounded-full opacity-30 animate-float" />
        <div className="absolute bottom-20 left-8 w-24 h-24 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-full opacity-40 animate-float" style={{ animationDelay: '-2s' }} />
      </div>
    </div>
  );
};

export default StateModal;