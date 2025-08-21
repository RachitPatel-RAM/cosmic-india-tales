import { useState } from 'react';
import { cn } from '@/lib/utils';

// Import cosmic images
import jaipurCosmic from '@/assets/jaipur-cosmic.jpg';
import udaipurCosmic from '@/assets/udaipur-cosmic.jpg';
import jaisalmerCosmic from '@/assets/jaisalmer-cosmic.jpg';
import mumbaiCosmic from '@/assets/mumbai-cosmic.jpg';
import keralaCosmic from '@/assets/kerala-cosmic.jpg';
import rishikeshCosmic from '@/assets/rishikesh-cosmic.jpg';
import goaCosmic from '@/assets/goa-cosmic.jpg';

interface State {
  id: string;
  name: string;
  path: string;
  places: Array<{
    name: string;
    description: string;
    image: string;
  }>;
}

interface IndiaMapProps {
  onStateClick: (state: State) => void;
  activeState?: string;
}

const INDIAN_STATES: State[] = [
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    path: 'M180,220 L220,200 L260,180 L280,200 L290,240 L270,280 L230,300 L180,280 Z',
    places: [
      {
        name: 'Jaipur - The Pink City',
        description: 'Royal palaces, magnificent forts, and vibrant bazaars in the heart of Rajasthan.',
        image: jaipurCosmic
      },
      {
        name: 'Udaipur - City of Lakes',
        description: 'Romantic lake city with stunning palaces floating on serene waters.',
        image: udaipurCosmic
      },
      {
        name: 'Jaisalmer - Golden City',
        description: 'Desert fortress city with golden sandstone architecture and camel safaris.',
        image: jaisalmerCosmic
      }
    ]
  },
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    path: 'M320,280 L380,260 L420,280 L430,320 L400,360 L350,380 L320,340 Z',
    places: [
      {
        name: 'Mumbai - City of Dreams',
        description: 'Bollywood capital, bustling markets, and colonial architecture by the Arabian Sea.',
        image: mumbaiCosmic
      },
      {
        name: 'Ajanta & Ellora Caves',
        description: 'Ancient Buddhist and Hindu rock-cut temples showcasing incredible artistry.',
        image: mumbaiCosmic
      },
      {
        name: 'Lonavala Hill Station',
        description: 'Misty mountains, cascading waterfalls, and scenic valleys near Mumbai.',
        image: mumbaiCosmic
      }
    ]
  },
  {
    id: 'kerala',
    name: 'Kerala',
    path: 'M280,400 L300,380 L320,400 L330,440 L310,480 L280,460 L270,420 Z',
    places: [
      {
        name: 'Alleppey Backwaters',
        description: 'Serene houseboat cruises through palm-fringed canals and lagoons.',
        image: keralaCosmic
      },
      {
        name: 'Munnar Tea Gardens',
        description: 'Rolling hills covered in emerald tea plantations and misty valleys.',
        image: keralaCosmic
      },
      {
        name: 'Kochi - Queen of Arabian Sea',
        description: 'Historic port city with Chinese fishing nets and colonial charm.',
        image: keralaCosmic
      }
    ]
  },
  {
    id: 'goa',
    name: 'Goa',
    path: 'M280,320 L300,310 L320,320 L325,340 L305,350 L285,345 Z',
    places: [
      {
        name: 'Baga Beach',
        description: 'Golden sands, vibrant nightlife, and Portuguese colonial architecture.',
        image: goaCosmic
      },
      {
        name: 'Old Goa Churches',
        description: 'UNESCO World Heritage sites with stunning baroque architecture.',
        image: goaCosmic
      },
      {
        name: 'Dudhsagar Falls',
        description: 'Spectacular four-tiered waterfall cascading through lush forests.',
        image: goaCosmic
      }
    ]
  },
  {
    id: 'uttarakhand',
    name: 'Uttarakhand',
    path: 'M350,140 L380,130 L410,140 L420,170 L390,180 L360,170 Z',
    places: [
      {
        name: 'Rishikesh - Yoga Capital',
        description: 'Spiritual haven on the Ganges with ancient temples and adventure sports.',
        image: rishikeshCosmic
      },
      {
        name: 'Valley of Flowers',
        description: 'UNESCO World Heritage alpine valley with rare Himalayan flowers.',
        image: rishikeshCosmic
      },
      {
        name: 'Nainital Lake District',
        description: 'Scenic hill station with pristine lakes surrounded by mountains.',
        image: rishikeshCosmic
      }
    ]
  }
];

const IndiaMap = ({ onStateClick, activeState }: IndiaMapProps) => {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  return (
    <div className="relative flex items-center justify-center">
      <svg
        viewBox="0 0 600 500"
        className="w-full h-full max-w-2xl max-h-2xl"
        style={{ filter: 'drop-shadow(0 0 20px rgba(147, 51, 234, 0.5))' }}
      >
        <defs>
          <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(280, 100%, 70%)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(200, 100%, 70%)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(320, 100%, 75%)" stopOpacity="0.3" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* India outline */}
        <path
          d="M200,80 L400,70 L480,100 L520,140 L540,200 L530,260 L500,320 L450,380 L400,420 L350,450 L300,460 L250,440 L200,400 L150,350 L130,300 L140,250 L160,200 L180,140 Z"
          fill="url(#mapGradient)"
          stroke="hsl(280, 100%, 70%)"
          strokeWidth="2"
          className="animate-pulse-glow"
        />

        {/* Individual states */}
        {INDIAN_STATES.map((state) => (
          <path
            key={state.id}
            d={state.path}
            fill={activeState === state.id ? 'hsl(320, 100%, 75%)' : 'transparent'}
            stroke={hoveredState === state.id ? 'hsl(200, 100%, 70%)' : 'hsl(280, 100%, 70%)'}
            strokeWidth={hoveredState === state.id ? "3" : "2"}
            className={cn(
              "map-state cursor-pointer transition-all duration-300",
              activeState === state.id && "active",
              hoveredState === state.id && "brightness-125"
            )}
            filter="url(#glow)"
            onMouseEnter={() => setHoveredState(state.id)}
            onMouseLeave={() => setHoveredState(null)}
            onClick={() => onStateClick(state)}
          />
        ))}

        {/* Decorative cosmic elements */}
        <circle cx="100" cy="120" r="2" fill="hsl(200, 100%, 70%)" className="animate-twinkle" />
        <circle cx="500" cy="150" r="1.5" fill="hsl(320, 100%, 75%)" className="animate-twinkle" />
        <circle cx="150" cy="300" r="2.5" fill="hsl(280, 100%, 70%)" className="animate-twinkle" />
        <circle cx="480" cy="280" r="1" fill="hsl(200, 100%, 70%)" className="animate-twinkle" />
        <circle cx="120" cy="200" r="1.8" fill="hsl(320, 100%, 75%)" className="animate-twinkle" />
      </svg>
      
      {/* Tooltip */}
      {hoveredState && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/30 text-sm font-medium animate-fade-slide-in">
          <span className="text-glow">
            {INDIAN_STATES.find(s => s.id === hoveredState)?.name}
          </span>
        </div>
      )}
    </div>
  );
};

export default IndiaMap;
export { INDIAN_STATES };
export type { State };