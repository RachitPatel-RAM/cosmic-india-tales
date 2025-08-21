import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import indiaStatesSvg from '@/assets/india-states.svg';

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
  borderColor?: string;
  places: Array<{
    name: string;
    description: string;
    image: string;
  }>;
}

interface IndiaMapProps {
  onStateClick: (state: State) => void;
  selectedStateId?: string;
  onDeselect: () => void;
}

const INDIAN_STATES: State[] = [
  {
    id: 'INGJ',
    name: 'Gujarat',
    borderColor: 'hsl(0, 100%, 70%)',
    places: [
      {
        name: 'Statue of Unity',
        description: 'World\'s tallest statue dedicated to Sardar Vallabhbhai Patel, standing at 182 meters.',
        image: jaipurCosmic
      },
      {
        name: 'Rann of Kutch',
        description: 'Vast white salt desert that transforms into a cultural paradise during Rann Utsav.',
        image: udaipurCosmic
      },
      {
        name: 'Somnath Temple',
        description: 'One of the 12 Jyotirlinga shrines, a sacred pilgrimage site by the Arabian Sea.',
        image: jaisalmerCosmic
      },
      {
        name: 'Gir National Park',
        description: 'Last refuge of the Asiatic lions and diverse wildlife sanctuary.',
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop'
      }
    ]
  },
  {
    id: 'INRJ',
    name: 'Rajasthan',
    borderColor: 'hsl(30, 100%, 70%)',
    places: [
      {
        name: 'Hawa Mahal (Jaipur)',
        description: 'Royal palaces, vibrant bazaars, and stunning Rajput architecture in the Pink City.',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
      },
      {
        name: 'Jaisalmer Fort (Golden Fort)',
        description: 'Desert fortress rising from golden sands with magnificent architecture.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'INMH',
    name: 'Maharashtra',
    borderColor: 'hsl(280, 100%, 70%)',
    places: [
      {
        name: 'Gateway of India (Mumbai)',
        description: 'The financial capital of India, known for Bollywood and vibrant street life.',
        image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Ajanta & Ellora Caves',
        description: 'UNESCO World Heritage sites with ancient Buddhist, Hindu, and Jain temples.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'INKL',
    name: 'Kerala',
    borderColor: 'hsl(120, 100%, 70%)',
    places: [
      {
        name: 'Alleppey Backwaters',
        description: 'Serene network of canals, lagoons, and lakes with traditional houseboats.',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
      },
      {
        name: 'Munnar Tea Plantations',
        description: 'Rolling hills covered in emerald tea plantations and misty valleys.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'INGA',
    name: 'Goa',
    borderColor: 'hsl(180, 100%, 70%)',
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
    id: 'INUK',
    name: 'Uttarakhand',
    borderColor: 'hsl(240, 100%, 70%)',
    places: [
      {
        name: 'Rishikesh - Yoga Capital',
        description: 'Spiritual haven on the Ganges with ancient temples and adventure sports.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
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
  },
  {
    id: 'INTG',
    name: 'Telangana',
    borderColor: 'hsl(300, 100%, 70%)',
    places: [
      {
        name: 'Hyderabad - City of Pearls',
        description: 'Historic city famous for Charminar, biryani, and IT industry.',
        image: mumbaiCosmic
      },
      {
        name: 'Ramoji Film City',
        description: 'World\'s largest film studio complex with guided tours and entertainment.',
        image: mumbaiCosmic
      },
      {
        name: 'Golconda Fort',
        description: 'Medieval fortress known for its acoustic architecture and diamond mines.',
        image: mumbaiCosmic
      }
    ]
  },
  {
    id: 'INDL',
    name: 'Delhi',
    borderColor: 'hsl(15, 100%, 70%)',
    places: [
      {
        name: 'Red Fort',
        description: 'Historic fortified palace and UNESCO World Heritage site.',
        image: mumbaiCosmic
      },
      {
        name: 'India Gate',
        description: 'War memorial and iconic landmark of New Delhi.',
        image: mumbaiCosmic
      },
      {
        name: 'Lotus Temple',
        description: 'Baháí House of Worship known for its lotus-shaped architecture.',
        image: mumbaiCosmic
      }
    ]
  },
  {
    id: 'INKA',
    name: 'Karnataka',
    borderColor: 'hsl(45, 100%, 70%)',
    places: [
      {
        name: 'Mysore Palace',
        description: 'Magnificent royal palace known for its Indo-Saracenic architecture.',
        image: mumbaiCosmic
      },
      {
        name: 'Hampi',
        description: 'UNESCO World Heritage site with ancient Vijayanagara Empire ruins.',
        image: mumbaiCosmic
      },
      {
        name: 'Coorg',
        description: 'Hill station known for coffee plantations and scenic beauty.',
        image: mumbaiCosmic
      }
    ]
  },
  {
    id: 'INTN',
    name: 'Tamil Nadu',
    borderColor: 'hsl(75, 100%, 70%)',
    places: [
      {
        name: 'Meenakshi Temple',
        description: 'Ancient temple complex dedicated to Goddess Meenakshi in Madurai.',
        image: mumbaiCosmic
      },
      {
        name: 'Ooty',
        description: 'Popular hill station known as the Queen of Hill Stations.',
        image: mumbaiCosmic
      },
      {
        name: 'Mahabalipuram',
        description: 'UNESCO World Heritage site with ancient rock-cut temples.',
        image: mumbaiCosmic
      }
    ]
  },
  {
    id: 'INWB',
    name: 'West Bengal',
    borderColor: 'hsl(105, 100%, 70%)',
    places: [
      {
        name: 'Victoria Memorial',
        description: 'Iconic marble building and museum in Kolkata.',
        image: mumbaiCosmic
      },
      {
        name: 'Darjeeling',
        description: 'Famous hill station known for tea gardens and toy train.',
        image: mumbaiCosmic
      },
      {
        name: 'Sundarbans',
        description: 'UNESCO World Heritage site and largest mangrove forest.',
        image: mumbaiCosmic
      }
    ]
  },
  {
    id: 'INPB',
    name: 'Punjab',
    borderColor: 'hsl(135, 100%, 70%)',
    places: [
      {
        name: 'Golden Temple',
        description: 'Holiest Sikh shrine and architectural marvel in Amritsar.',
        image: mumbaiCosmic
      },
      {
        name: 'Jallianwala Bagh',
        description: 'Historic public garden and memorial of national importance.',
        image: mumbaiCosmic
      },
      {
        name: 'Wagah Border',
        description: 'Famous border crossing ceremony between India and Pakistan.',
        image: mumbaiCosmic
      }
    ]
  },
  {
    id: 'INHR',
    name: 'Haryana',
    borderColor: 'hsl(165, 100%, 70%)',
    places: [
      {
        name: 'Kurukshetra',
        description: 'Holy city where the epic Mahabharata war was fought.',
        image: mumbaiCosmic
      },
      {
        name: 'Sultanpur Bird Sanctuary',
        description: 'Important bird sanctuary and biodiversity hotspot.',
        image: mumbaiCosmic
      },
      {
        name: 'Panipat',
        description: 'Historic city known for three major battles in Indian history.',
        image: mumbaiCosmic
      }
    ]
  },
  {
    id: 'INHP',
    name: 'Himachal Pradesh',
    borderColor: 'hsl(195, 100%, 70%)',
    places: [
      {
        name: 'Shimla',
        description: 'Former summer capital of British India and popular hill station.',
        image: rishikeshCosmic
      },
      {
        name: 'Manali',
        description: 'Popular hill station and gateway to Rohtang Pass.',
        image: rishikeshCosmic
      },
      {
        name: 'Dharamshala',
        description: 'Home to the Dalai Lama and Tibetan government in exile.',
        image: rishikeshCosmic
      }
    ]
  },
  {
    id: 'INJK',
    name: 'Jammu and Kashmir',
    borderColor: 'hsl(225, 100%, 70%)',
    places: [
      {
        name: 'Dal Lake',
        description: 'Famous lake in Srinagar known for houseboats and shikaras.',
        image: rishikeshCosmic
      },
      {
        name: 'Gulmarg',
        description: 'Popular ski resort and hill station with beautiful meadows.',
        image: rishikeshCosmic
      },
      {
        name: 'Vaishno Devi',
        description: 'Sacred Hindu temple dedicated to Goddess Vaishno Devi.',
        image: rishikeshCosmic
      }
    ]
  },
  {
    id: 'INUP',
    name: 'Uttar Pradesh',
    borderColor: 'hsl(255, 100%, 70%)',
    places: [
      {
        name: 'Taj Mahal (Agra)',
        description: 'Eternal symbol of love and UNESCO World Heritage monument.',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
      },
      {
        name: 'Varanasi Ghats',
        description: 'Ancient city of temples, ghats, and spiritual enlightenment on the Ganges.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'INBR',
    name: 'Bihar',
    borderColor: 'hsl(285, 100%, 70%)',
    places: [
      {
        name: 'Bodh Gaya',
        description: 'Sacred Buddhist site where Buddha attained enlightenment.',
        image: mumbaiCosmic
      },
      {
        name: 'Nalanda',
        description: 'Ancient center of learning and UNESCO World Heritage site.',
        image: mumbaiCosmic
      },
      {
        name: 'Patna',
        description: 'Capital city with rich history and cultural heritage.',
        image: mumbaiCosmic
      }
    ]
  },
  {
    id: 'INJH',
    name: 'Jharkhand',
    borderColor: 'hsl(315, 100%, 70%)',
    places: [
      {
        name: 'Ranchi',
        description: 'Capital city known as the City of Waterfalls.',
        image: mumbaiCosmic
      },
      {
        name: 'Jamshedpur',
        description: 'Industrial city known as the Steel City of India.',
        image: mumbaiCosmic
      },
      {
        name: 'Deoghar',
        description: 'Sacred town with the famous Baidyanath Temple.',
        image: mumbaiCosmic
      }
    ]
  },
  {
    id: 'INOR',
    name: 'Odisha',
    borderColor: 'hsl(345, 100%, 70%)',
    places: [
      {
        name: 'Jagannath Temple',
        description: 'Famous Hindu temple in Puri dedicated to Lord Jagannath.',
        image: mumbaiCosmic
      },
      {
        name: 'Konark Sun Temple',
        description: 'UNESCO World Heritage site shaped like a giant chariot.',
        image: mumbaiCosmic
      },
      {
        name: 'Chilika Lake',
        description: 'Largest coastal lagoon in India and bird sanctuary.',
        image: mumbaiCosmic
      }
    ]
  },
  {
    id: 'INAP',
    name: 'Andhra Pradesh',
    borderColor: 'hsl(90, 100%, 70%)',
    places: [
      {
        name: 'Tirupati',
        description: 'Famous pilgrimage site with the Venkateswara Temple.',
        image: mumbaiCosmic
      },
      {
        name: 'Visakhapatnam',
        description: 'Port city known for its beaches and naval base.',
        image: mumbaiCosmic
      },
      {
        name: 'Amaravati',
        description: 'Capital city with ancient Buddhist heritage.',
        image: mumbaiCosmic
      }
    ]
  },
  {
    id: 'INAS',
    name: 'Assam',
    borderColor: 'hsl(150, 100%, 70%)',
    places: [
      {
        name: 'Kaziranga National Park',
        description: 'UNESCO World Heritage site famous for one-horned rhinoceros.',
        image: keralaCosmic
      },
      {
        name: 'Kamakhya Temple',
        description: 'Ancient Hindu temple dedicated to Goddess Kamakhya.',
        image: keralaCosmic
      },
      {
        name: 'Majuli Island',
        description: 'World\'s largest river island and cultural center.',
        image: keralaCosmic
      }
    ]
  },
  {
    id: 'INMP',
    name: 'Madhya Pradesh',
    borderColor: 'hsl(210, 100%, 70%)',
    places: [
      {
        name: 'Khajuraho Temples',
        description: 'UNESCO World Heritage site famous for erotic sculptures.',
        image: mumbaiCosmic
      },
      {
        name: 'Sanchi Stupa',
        description: 'Ancient Buddhist monument and UNESCO World Heritage site.',
        image: mumbaiCosmic
      },
      {
        name: 'Bandhavgarh National Park',
        description: 'Famous tiger reserve with high density of tigers.',
        image: mumbaiCosmic
      }
    ]
  },
  {
    id: 'INCT',
    name: 'Chhattisgarh',
    borderColor: 'hsl(270, 100%, 70%)',
    places: [
      {
        name: 'Chitrakote Falls',
        description: 'Spectacular waterfall known as the Niagara of India.',
        image: mumbaiCosmic
      },
      {
        name: 'Bastar',
        description: 'Tribal region known for its unique culture and crafts.',
        image: mumbaiCosmic
      },
      {
        name: 'Raipur',
        description: 'Capital city and commercial hub of the state.',
        image: mumbaiCosmic
      }
    ]
  },
  {
    id: 'INAP',
    name: 'Andhra Pradesh',
    borderColor: 'hsl(15, 100%, 70%)',
    places: [
      {
        name: 'Tirupati Balaji Temple (Tirumala)',
        description: 'One of the most visited pilgrimage sites in the world.',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
      },
      {
        name: 'Araku Valley',
        description: 'Beautiful hill station with coffee plantations and tribal culture.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'INAR',
    name: 'Arunachal Pradesh',
    borderColor: 'hsl(45, 100%, 70%)',
    places: [
      {
        name: 'Tawang Monastery',
        description: 'Largest monastery in India and birthplace of the 6th Dalai Lama.',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
      },
      {
        name: 'Ziro Valley',
        description: 'UNESCO World Heritage site known for its scenic beauty and Apatani tribe.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'INAS',
    name: 'Assam',
    borderColor: 'hsl(75, 100%, 70%)',
    places: [
      {
        name: 'Kaziranga National Park (One-horned Rhino)',
        description: 'UNESCO World Heritage site famous for one-horned rhinoceros.',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
      },
      {
        name: 'Kamakhya Temple (Guwahati)',
        description: 'Ancient temple dedicated to Goddess Kamakhya, one of the Shakti Peethas.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'INBR',
    name: 'Bihar',
    borderColor: 'hsl(105, 100%, 70%)',
    places: [
      {
        name: 'Mahabodhi Temple (Bodh Gaya)',
        description: 'UNESCO World Heritage site where Buddha attained enlightenment.',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
      },
      {
        name: 'Nalanda University Ruins',
        description: 'Ancient center of learning and UNESCO World Heritage site.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'INCT',
    name: 'Chhattisgarh',
    borderColor: 'hsl(195, 100%, 70%)',
    places: [
      {
        name: 'Chitrakote Falls (Niagara of India)',
        description: 'Horseshoe-shaped waterfall known as the Niagara of India.',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
      },
      {
        name: 'Bastar Tribal Culture',
        description: 'Rich tribal heritage and traditional handicrafts.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'INGA',
    name: 'Goa',
    borderColor: 'hsl(225, 100%, 70%)',
    places: [
      {
        name: 'Baga & Calangute Beaches',
        description: 'Famous beaches known for water sports and vibrant nightlife.',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
      },
      {
        name: 'Basilica of Bom Jesus (UNESCO)',
        description: 'UNESCO World Heritage site housing the mortal remains of St. Francis Xavier.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ]
  }
];

const IndiaMap = ({ onStateClick, selectedStateId, onDeselect }: IndiaMapProps) => {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number; stateName: string }>({ visible: false, x: 0, y: 0, stateName: '' });
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      // Load SVG content
      fetch(indiaStatesSvg)
        .then(response => response.text())
        .then(data => setSvgContent(data))
    } catch (error) {
      console.error('Error loading SVG:', error)
    }
  }, []);

  // Apply initial styling to all states
  useEffect(() => {
    if (svgRef.current && svgContent) {
      const timer = setTimeout(() => {
        const allStates = svgRef.current?.querySelectorAll('[id]');
        allStates?.forEach((state) => {
          const stateId = state.getAttribute('id');
          if (stateId && INDIAN_STATES.find(s => s.id === stateId)) {
            (state as SVGElement).style.stroke = 'hsl(280, 100%, 70%)';
            (state as SVGElement).style.strokeWidth = '1';
            (state as SVGElement).style.filter = 'drop-shadow(0 0 5px rgba(147, 51, 234, 0.5))';
            (state as SVGElement).style.transition = 'all 0.3s ease';
          }
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [svgContent]);

  const handleStateClick = (stateId: string) => {
    const state = INDIAN_STATES.find(s => s.id === stateId);
    if (state && svgRef.current) {
      // Reset all states first
      const allStates = svgRef.current.querySelectorAll('[id]');
      allStates.forEach((stateEl) => {
        const elStateId = stateEl.getAttribute('id');
        if (elStateId && INDIAN_STATES.find(s => s.id === elStateId)) {
          (stateEl as SVGElement).style.stroke = 'hsl(280, 100%, 70%)';
          (stateEl as SVGElement).style.strokeWidth = '1';
          (stateEl as SVGElement).style.filter = 'drop-shadow(0 0 5px rgba(147, 51, 234, 0.5))';
        }
      });
      
      // Get the state element
      const stateElement = svgRef.current.querySelector(`[id="${stateId}"]`) as SVGElement;
      if (stateElement) {
        // Get bounding box of the state
        const bbox = (stateElement as SVGGraphicsElement).getBBox();
        
        // Calculate center of the state
        const stateCenterX = bbox.x + bbox.width / 2;
        const stateCenterY = bbox.y + bbox.height / 2;
        
        // Calculate zoom and translation to center the state with moderate zoom
        const scale = 1.5;
        const viewBoxWidth = 1000;
        const viewBoxHeight = 1000;
        const translateX = (viewBoxWidth / 2 - stateCenterX) / scale;
        const translateY = (viewBoxHeight / 2 - stateCenterY) / scale;
        
        setTransform({ 
          scale, 
          x: translateX, 
          y: translateY 
        });
        
        // Add glowing boundary to selected state with state's unique color (border only, no fill)
         const borderColor = state.borderColor || 'hsl(320, 100%, 75%)';
         stateElement.style.fill = 'transparent';
         stateElement.style.stroke = borderColor;
         stateElement.style.strokeWidth = '3';
         stateElement.style.filter = `drop-shadow(0 0 15px ${borderColor.replace('hsl(', 'hsla(').replace(')', ', 1)')}) drop-shadow(0 0 30px ${borderColor.replace('hsl(', 'hsla(').replace(')', ', 0.4)')})`;
       }
      onStateClick(state);
    }
  };

  const resetZoom = () => {
    setTransform({ scale: 1, x: 0, y: 0 });
    onDeselect();
    // Reset all state styles
    if (svgRef.current) {
      const allStates = svgRef.current.querySelectorAll('[id]');
      allStates.forEach((state) => {
        const stateId = state.getAttribute('id');
        if (stateId && INDIAN_STATES.find(s => s.id === stateId)) {
          (state as SVGElement).style.stroke = 'hsl(280, 100%, 70%)';
          (state as SVGElement).style.strokeWidth = '1';
          (state as SVGElement).style.filter = 'drop-shadow(0 0 5px rgba(147, 51, 234, 0.5))';
        }
      });
    }
  };

  // Touch event handlers for two-finger zoom
  const getTouchDistance = (touches: TouchList) => {
    if (touches.length < 2) return null;
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) + 
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const distance = getTouchDistance(e.touches as unknown as TouchList);
      setLastTouchDistance(distance);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastTouchDistance) {
      e.preventDefault();
      const currentDistance = getTouchDistance(e.touches as unknown as TouchList);
      if (currentDistance) {
        const scaleChange = currentDistance / lastTouchDistance;
        const newScale = Math.max(0.5, Math.min(3, transform.scale * scaleChange));
        setTransform(prev => ({ ...prev, scale: newScale }));
        setLastTouchDistance(currentDistance);
      }
    }
  };

  const handleTouchEnd = () => {
    setLastTouchDistance(null);
  };

  const handleSvgClick = (event: React.MouseEvent<SVGSVGElement>) => {
    const target = event.target as SVGElement;
    const stateId = target.getAttribute('id');
    
    if (stateId && INDIAN_STATES.find(s => s.id === stateId)) {
      handleStateClick(stateId);
    }
  };

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // If clicking outside the SVG (on the container background), reset zoom
    if (event.target === event.currentTarget) {
      resetZoom();
    }
  };

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (containerRect) {
      setTooltip(prev => ({
        ...prev,
        x: event.clientX - containerRect.left,
        y: event.clientY - containerRect.top,
      }));
    }
  };

  const handleMouseEnter = (event: React.MouseEvent<SVGSVGElement>) => {
    const target = event.target as SVGElement;
    const stateId = target.getAttribute('id');
    
    if (stateId && INDIAN_STATES.find(s => s.id === stateId)) {
      const state = INDIAN_STATES.find(s => s.id === stateId);
      const borderColor = state?.borderColor || 'hsl(320, 100%, 75%)';
      setHoveredState(stateId);
      
      setTooltip({
        visible: true,
        x: event.clientX,
        y: event.clientY,
        stateName: state?.name || ''
      });
      
      // Only show border, no fill
      target.style.fill = 'transparent';
      target.style.stroke = borderColor;
      target.style.strokeWidth = '2';
      target.style.filter = `drop-shadow(0 0 10px ${borderColor.replace('hsl(', 'hsla(').replace(')', ', 0.8)')})`;
    }
  };

  const handleMouseLeave = (event: React.MouseEvent<SVGSVGElement>) => {
    const target = event.target as SVGElement;
    const stateId = target.getAttribute('id');
    
    if (stateId && INDIAN_STATES.find(s => s.id === stateId)) {
      setHoveredState(null);
      setTooltip({ visible: false, x: 0, y: 0, stateName: '' });
      
      // Reset to default state unless it's the active state
      if (selectedStateId === stateId) {
        const state = INDIAN_STATES.find(s => s.id === stateId);
        const borderColor = state?.borderColor || 'hsl(320, 100%, 75%)';
        target.style.fill = 'transparent';
        target.style.stroke = borderColor;
        target.style.strokeWidth = '3';
        target.style.filter = `drop-shadow(0 0 15px ${borderColor.replace('hsl(', 'hsla(').replace(')', ', 1)')}) drop-shadow(0 0 30px ${borderColor.replace('hsl(', 'hsla(').replace(')', ', 0.4)')})`;
      } else {
        target.style.fill = '';
        target.style.stroke = 'hsl(280, 100%, 70%)';
        target.style.strokeWidth = '1';
        target.style.filter = 'drop-shadow(0 0 5px rgba(147, 51, 234, 0.5))';
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center h-full" ref={containerRef}>
      <div className="w-full h-full max-w-4xl mx-auto">
        {svgContent ? (
          <div 
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cosmic-surface/20 to-card/30 border border-primary/20 h-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px]"
            onClick={handleContainerClick}
          >
            <svg
              ref={svgRef}
              viewBox="0 0 1000 1000"
              className="w-full h-full cursor-pointer transition-transform duration-500 ease-in-out"
              style={{
                transform: `scale(${transform.scale}) translate(${transform.x}px, ${transform.y}px)`,
                filter: 'drop-shadow(0 0 20px rgba(147, 51, 234, 0.5))'
              }}
              onClick={handleSvgClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              dangerouslySetInnerHTML={{ __html: svgContent.replace(/<\?xml[^>]*>/, '').replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '') }}
            />
            
            {/* Reset zoom button */}
            {transform.scale > 1 && (
              <button
                onClick={resetZoom}
                className="absolute top-4 right-4 bg-primary/80 hover:bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 backdrop-blur-sm"
              >
                Reset View
              </button>
            )}
            
            {/* State Name Tooltip */}
            {tooltip.visible && (
              <div 
                className="absolute pointer-events-none rounded-lg px-3 py-2 text-sm font-medium text-primary z-50 transition-opacity duration-300 shadow-lg bg-black/50 backdrop-blur-sm border border-primary/30"
                style={{
                  left: tooltip.x,
                  top: tooltip.y,
                  transform: 'translate(10px, -30px)',
                  opacity: tooltip.visible ? 1 : 0,
                }}
              >
                {tooltip.stateName}
              </div>
            )}

          </div>
        ) : (
          <div className="w-full h-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] bg-gradient-to-br from-cosmic-surface/20 to-card/30 border border-primary/20 rounded-2xl flex items-center justify-center">
            <div className="text-primary animate-pulse">Loading India Map...</div>
          </div>
        )}
      </div>
      
      {/* Tooltip */}
      {hoveredState && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-card/90 px-4 py-2 rounded-lg border border-primary/30 text-sm font-medium animate-fade-slide-in z-10">
          <span className="text-glow font-limelight">
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