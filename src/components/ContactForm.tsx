import React, { useState } from 'react';
import { X, Send, User, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-gradient-to-br from-card/95 to-cosmic-surface/90 backdrop-blur-xl border border-primary/30 rounded-2xl overflow-hidden animate-fade-slide-in">
        
        {/* Header */}
        <div className="p-6 border-b border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-glow mb-1" style={{fontFamily: 'Julius Sans One, serif'}}>Contact Us</h2>
              <p className="text-muted-foreground text-sm">Get in touch with our team</p>
            </div>
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

        {/* Form Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                <Send className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Message Sent!</h3>
              <p className="text-muted-foreground">Thank you for contacting us. We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-background/50 border border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 text-foreground placeholder-muted-foreground"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-background/50 border border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 text-foreground placeholder-muted-foreground"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-background/50 border border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 text-foreground placeholder-muted-foreground resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-medium py-3 rounded-lg transition-all duration-200 neon-glow"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </div>
                )}
              </Button>
            </form>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-8 w-24 h-24 nebula-gradient rounded-full opacity-20 animate-float" />
        <div className="absolute bottom-20 left-8 w-16 h-16 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-full opacity-30 animate-float" style={{ animationDelay: '-2s' }} />
      </div>
    </div>
  );
};

export default ContactForm;