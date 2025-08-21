import { useState, useEffect } from 'react';
import Starfield from '@/components/Starfield';
import IndiaMap from '@/components/IndiaMap';
import ContactForm from '@/components/ContactForm';
import InfoModal from '@/components/InfoModal';
import type { State } from '@/components/IndiaMap';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [activePlace, setActivePlace] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoModalContent, setInfoModalContent] = useState({ title: '', content: '' });
  const [isMobileFullView, setIsMobileFullView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleStateClick = (state: State, event?: React.MouseEvent) => {
    setSelectedState(state);
    setActivePlace(0);
    if (isMobile) {
      // Set zoom origin to center for cinematic movie-like effect
      setZoomOrigin({ x: 50, y: 50 });
      
      // Start cinematic animation sequence - zoom to center with state name
      setIsZooming(true);
      
      // After 3 seconds for dramatic movie-like zoom, show carousel
      setTimeout(() => {
        setShowCarousel(true);
        setIsMobileFullView(true);
      }, 3000);
    }
  };

  const showInfoContent = (title: string, content: string) => {
    setInfoModalContent({ title, content });
    setShowInfoModal(true);
  };

  const handleBackToMap = () => {
    // Start reverse animation sequence with movie-like timing
    setShowCarousel(false);
    
    // After 800ms, show zoom overlay again for dramatic effect
    setTimeout(() => {
      setIsMobileFullView(false);
      
      // After 3 seconds, complete the zoom out with cinematic transition
      setTimeout(() => {
        setIsZooming(false);
        setSelectedState(null);
        setZoomOrigin({ x: 50, y: 50 }); // Reset zoom origin
      }, 3000);
    }, 800);
  };

  const nextPlace = () => {
    if (selectedState && activePlace < selectedState.places.length - 1) {
      setActivePlace(activePlace + 1);
    }
  };

  const prevPlace = () => {
    if (activePlace > 0) {
      setActivePlace(activePlace - 1);
    }
  };

  // Mobile Full-Page Carousel View
  if (isMobileFullView && selectedState) {
    return (
      <div className={`h-screen relative overflow-hidden bg-black transition-opacity duration-1000 ${
        showCarousel ? 'opacity-100' : 'opacity-0'
      }`}>
        <Starfield />
        
        {/* Back Button */}
        <div className="absolute top-4 left-4 z-50">
          <Button
            onClick={handleBackToMap}
            variant="ghost"
            size="icon"
            className="bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>

        {/* Full-Page Carousel */}
        <div className="h-full flex flex-col justify-center items-center p-4">
          <div className="w-full max-w-sm space-y-4">
            {/* State Title */}
            <div className="text-center mb-6">
              <h2 
                className="text-2xl font-bold mb-2" 
                style={{
                  fontFamily: 'Julius Sans One, serif',
                  color: selectedState.borderColor || 'hsl(320, 100%, 75%)',
                  textShadow: `0 0 10px ${selectedState.borderColor?.replace('hsl(', 'hsla(').replace(')', ', 0.5)')}` || '0 0 10px hsla(320, 100%, 75%, 0.5)'
                }}
              >
                {selectedState.name}
              </h2>
              <div 
                className="w-16 h-0.5 mx-auto rounded-full" 
                style={{backgroundColor: selectedState.borderColor || 'hsl(320, 100%, 75%)'}}
              />
            </div>

            {/* Large Image */}
            <div className="relative">
              <div className="w-80 h-80 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 mx-auto">
                <img
                  src={selectedState.places[activePlace].image}
                  alt={selectedState.places[activePlace].name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Navigation Arrows */}
              {selectedState.places.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevPlace}
                    disabled={activePlace === 0}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextPlace}
                    disabled={activePlace === selectedState.places.length - 1}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>

            {/* Place Details */}
            <div className="text-center space-y-3">
              <h3 className="text-xl font-bold text-primary" style={{fontFamily: 'Limelight, cursive'}}>
                {selectedState.places[activePlace].name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed px-4">
                {selectedState.places[activePlace].description}
              </p>
            </div>

            {/* Navigation Dots */}
            {selectedState.places.length > 1 && (
              <div className="flex justify-center space-x-2 pt-4">
                {selectedState.places.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActivePlace(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activePlace
                        ? 'bg-primary scale-125'
                        : 'bg-primary/30 hover:bg-primary/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen relative overflow-hidden flex flex-col md:flex-row">
      {/* Starfield Background */}
      <Starfield />
      
      {/* Left Sidebar Navigation */}
      <nav className="w-12 md:w-16 bg-card/20 backdrop-blur-sm border-r border-primary/20 z-40 flex flex-col items-center space-y-4 md:space-y-6 flex-shrink-0 py-4">
        {/* Logo */}
        <div className="mb-2">
          <img 
            src="/src/assets/FAVICON.png" 
            alt="Cosmic India Tales Logo" 
            className="w-8 h-8 md:w-10 md:h-10 rounded-lg shadow-lg"
          />
        </div>
        
        {/* Navigation Icons */}
        <button 
          onClick={() => setShowContactForm(true)}
          className="text-primary/70 hover:text-primary transition-colors p-1.5 md:p-2 rounded-lg hover:bg-primary/10"
          title="Contact Us"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </button>
        
        <button 
          onClick={() => showInfoContent('Travel Tips', 'Plan your journey with insider tips: Best time to visit is October to March for pleasant weather. Book accommodations in advance during festival seasons. Try local street food but stay hydrated. Respect local customs and dress modestly at religious sites.')}
          className="text-primary/70 hover:text-primary transition-colors p-1.5 md:p-2 rounded-lg hover:bg-primary/10"
          title="Travel Tips"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        </button>
        
        <button 
          onClick={() => showInfoContent('Amazing Facts', 'Did you know? India has 22 official languages and over 1,600 spoken languages! The country is home to the world\'s largest postal network with over 150,000 post offices. India invented the number zero and the decimal system that the world uses today!')}
          className="text-primary/70 hover:text-primary transition-colors p-1.5 md:p-2 rounded-lg hover:bg-primary/10"
          title="Amazing Facts"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.132 0 3.758-2.24 3.758-5.478 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.748.097.119.112.224.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.001 12.017 24.001c6.624-.001 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
          </svg>
        </button>
        
        <button 
          onClick={() => showInfoContent('Cultural Insights', 'Experience India\'s rich heritage: Namaste is a respectful greeting with palms together. Remove shoes before entering homes and temples. The concept of "Atithi Devo Bhava" means guests are treated as gods. Festivals like Diwali, Holi, and Eid are celebrated with great enthusiasm across communities.')}
          className="text-primary/70 hover:text-primary transition-colors p-1.5 md:p-2 rounded-lg hover:bg-primary/10"
          title="Cultural Insights"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full">
        {/* Hero Section */}
        <div className="text-center py-1 md:py-4 lg:py-6 relative z-10">
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-neon-pink via-neon-blue to-neon-purple bg-clip-text text-transparent mb-1 md:mb-2 font-julius">
            Explore India
          </h1>
        </div>

        {/* Main Content Area */}
        <div 
          className={`flex-1 flex flex-col lg:flex-row gap-2 md:gap-4 p-2 md:p-4 min-h-0 relative transition-all ${
            isZooming ? 'duration-3000' : 'duration-2000'
          } ${
            isZooming ? 'scale-[4] opacity-10 blur-md' : 'scale-100 opacity-100 blur-0'
          }`}
          style={{
            transformOrigin: '50% 50%'
          }}
        >
          {/* Interactive India Map */}
          <div className="flex-1 min-w-0 min-h-0">
            <IndiaMap 
              onStateClick={handleStateClick}
              selectedStateId={selectedState?.id}
            />
          </div>

          {/* State Details Carousel - Small Box (Desktop/Tablet Only) */}
          {selectedState && !isMobile && (
            <div 
              className="w-full lg:w-64 xl:w-72 bg-card/95 backdrop-blur-sm rounded-xl p-2 animate-fade-slide-in z-20 flex-shrink-0 overflow-hidden"
              style={{
                border: `2px solid ${selectedState.borderColor || 'hsl(320, 100%, 75%)'}`,
                boxShadow: `0 0 20px ${selectedState.borderColor?.replace('hsl(', 'hsla(').replace(')', ', 0.3)')}` || '0 0 20px hsla(320, 100%, 75%, 0.3)'
              }}
            >
              <div className="space-y-3">
                <div className="text-center">
                  <h2 
                    className="text-base md:text-lg font-bold mb-1" 
                    style={{
                      fontFamily: 'Julius Sans One, serif',
                      color: selectedState.borderColor || 'hsl(320, 100%, 75%)',
                      textShadow: `0 0 10px ${selectedState.borderColor?.replace('hsl(', 'hsla(').replace(')', ', 0.5)')}` || '0 0 10px hsla(320, 100%, 75%, 0.5)'
                    }}
                  >
                    {selectedState.name}
                  </h2>
                  <div 
                    className="w-12 h-0.5 mx-auto rounded-full" 
                    style={{backgroundColor: selectedState.borderColor || 'hsl(320, 100%, 75%)'}}
                  />
                </div>

                {/* Image Carousel */}
                <div className="relative">
                  <div className="w-64 h-64 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 mx-auto">
                    <img
                      src={selectedState.places[activePlace].image}
                      alt={selectedState.places[activePlace].name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Navigation Arrows */}
                  {selectedState.places.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={prevPlace}
                        disabled={activePlace === 0}
                        className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-5 h-5 md:w-6 md:h-6"
                      >
                        <ChevronLeft className="w-2.5 h-2.5 md:w-3 md:h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={nextPlace}
                        disabled={activePlace === selectedState.places.length - 1}
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-5 h-5 md:w-6 md:h-6"
                      >
                        <ChevronRight className="w-2.5 h-2.5 md:w-3 md:h-3" />
                      </Button>
                    </>
                  )}
                </div>

                {/* Place Details */}
                <div className="text-center space-y-2">
                  <h3 className="text-base md:text-lg font-bold text-primary" style={{fontFamily: 'Limelight, cursive'}}>
                    {selectedState.places[activePlace].name}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {selectedState.places[activePlace].description}
                  </p>
                </div>

                {/* Navigation Dots */}
                {selectedState.places.length > 1 && (
                  <div className="flex justify-center space-x-1">
                    {selectedState.places.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActivePlace(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === activePlace
                            ? 'bg-primary scale-125'
                            : 'bg-primary/30 hover:bg-primary/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Cinematic Movie-Style Zoom Overlay */}
        {isZooming && (
          <div className="fixed inset-0 bg-gradient-to-br from-black/98 via-black/95 to-black/98 z-50 transition-all duration-3000 flex items-center justify-center">
            {/* Movie-Style Zoom Focus Ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="w-screen h-screen rounded-full border-4 animate-ping" 
                style={{
                  borderColor: selectedState?.borderColor || 'hsl(320, 100%, 75%)',
                  animationDuration: '3s',
                  transform: 'scale(0.1)'
                }}
              />
            </div>
            
            {/* Cinematic State Name Display */}
            <div className="text-center relative z-10 transform transition-all duration-3000">
              <div 
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-12 tracking-wider" 
                style={{
                  fontFamily: 'Julius Sans One, serif',
                  color: selectedState?.borderColor || 'hsl(320, 100%, 75%)',
                  textShadow: `0 0 60px ${selectedState?.borderColor?.replace('hsl(', 'hsla(').replace(')', ', 1)')}` || '0 0 60px hsla(320, 100%, 75%, 1)',
                  animation: 'enhanced-pulse 3s ease-in-out infinite',
                  letterSpacing: '0.1em'
                }}
              >
                {selectedState?.name}
              </div>
              
              {/* Movie-Style Progress Indicator */}
              <div className="w-64 h-2 mx-auto rounded-full bg-black/80 overflow-hidden mb-6">
                <div 
                  className="h-full rounded-full" 
                  style={{
                    background: `linear-gradient(90deg, ${selectedState?.borderColor || 'hsl(320, 100%, 75%)'}, transparent, ${selectedState?.borderColor || 'hsl(320, 100%, 75%)'})`,
                    animation: 'loading 3s ease-in-out infinite'
                  }}
                />
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Ambient nebula clouds */}
      <div className="fixed top-10 right-10 w-96 h-96 nebula-gradient rounded-full opacity-20 animate-float pointer-events-none" />
      <div className="fixed bottom-10 left-10 w-64 h-64 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-full opacity-30 animate-float pointer-events-none" style={{ animationDelay: '-3s' }} />
      
      {/* Contact Form Modal */}
      <ContactForm 
        isOpen={showContactForm} 
        onClose={() => setShowContactForm(false)} 
      />
      
      {/* Info Modal */}
      <InfoModal 
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        title={infoModalContent.title}
        content={infoModalContent.content}
      />
    </div>
  );
};

export default Index;