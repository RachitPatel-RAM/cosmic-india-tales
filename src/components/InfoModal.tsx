import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 bg-gradient-to-br from-card/95 to-cosmic-surface/90 backdrop-blur-xl border border-primary/30 rounded-2xl overflow-hidden animate-fade-slide-in">
        
        {/* Header */}
        <div className="p-6 border-b border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-glow" style={{fontFamily: 'Julius Sans One, serif'}}>{title}</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-primary hover:bg-primary/20 hover:text-primary neon-glow rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-foreground leading-relaxed text-base">
            {content}
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-8 w-24 h-24 nebula-gradient rounded-full opacity-20 animate-float" />
        <div className="absolute bottom-20 left-8 w-16 h-16 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-full opacity-30 animate-float" style={{ animationDelay: '-2s' }} />
      </div>
    </div>
  );
};

export default InfoModal;