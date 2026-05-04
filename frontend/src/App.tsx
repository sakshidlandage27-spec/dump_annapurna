/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Utensils,
  Clock,
  ShoppingCart,
  Tv,
  Sparkles,
  CreditCard,
  Home,
  ChefHat,
  LayoutDashboard,
  ClipboardList,
  Package,
  Search,
  Bell,
  Settings,
  Plus,
  Minus,
  ChevronRight,
  QrCode,
  Banknote,
  Store,
  CheckCircle2,
  ArrowLeft,
  X,
  TrendingUp,
  Users,
  DollarSign,
  Gamepad2,
  Music
} from 'lucide-react';
import { Page, MenuItem, CartItem } from './types';
import { image } from 'motion/react-client';

// --- Mock Data ---
const MENU_ITEMS: MenuItem[] = [
  // --- Currys ---
  {
    id: '1',
    name: 'Paneer Butter Masala',
    price: 450,
    description: 'Tender cottage cheese cubes simmered in a rich tomato and cashew gravy.',
    image: '/images/paneer_butter_masala.png',
    rating: 4.8,
    reviews: 120,
    category: 'Currys'
  },
  {
    id: '2',
    name: 'Malai Kofta',
    price: 480,
    description: 'Velvety dumplings made of paneer and potato in a delicate saffron sauce.',
    image: '/images/malai_kofta.png',
    rating: 4.9,
    reviews: 85,
    category: 'Currys'
  },
  {
    id: '3',
    name: 'Botanical Dal Tadka',
    price: 390,
    description: 'Yellow lentils tempered with organic spices and fresh herbs.',
    image: '/images/dal_tadka.jpg',
    rating: 4.7,
    reviews: 210,
    category: 'Currys'
  },
  {
    id: '4',
    name: 'Baingan Bharta',
    price: 420,
    description: 'Flame-roasted eggplant mashed and cooked with peas and tomatoes.',
    image: '/images/baingan_bharta.jpg',
    rating: 4.6,
    reviews: 95,
    category: 'Currys'
  },
  {
    id: '5',
    name: 'Paneer Lababdar',
    price: 520,
    description: 'Soft paneer cubes cooked in a rich, creamy tomato-based gravy with aromatic spices and a hint of butter.',
    image: '/images/paneet_labab.png',
    rating: 4.9,
    reviews: 450,
    category: 'Currys'
  },
  {
    id: '6',
    name: 'Mutton Rogan Josh',
    price: 580,
    description: 'Aromatic Kashmiri lamb curry cooked with traditional spices.',
    image: '/images/mutton_curry.jpg',
    rating: 4.8,
    reviews: 180,
    category: 'Currys'
  },
  {
    id: '7',
    name: 'Palak Paneer',
    price: 430,
    description: 'Fresh spinach puree with soft paneer cubes and a hint of garlic.',
    image: 'https://loremflickr.com/800/600/palak,paneer',
    rating: 4.7,
    reviews: 320,
    category: 'Currys'
  },

  // --- Breads ---
  {
    id: 'b1',
    name: 'Tandoori Roti',
    price: 45,
    description: 'Whole wheat bread baked in a traditional clay oven.',
    image: '/images/roti.jpg',
    rating: 4.5,
    reviews: 500,
    category: 'Breads'
  },
  {
    id: 'b2',
    name: 'Butter Naan',
    price: 65,
    description: 'Soft, leavened white bread topped with melting butter.',
    image: '/images/butter_roti.jpg',
    rating: 4.8,
    reviews: 800,
    category: 'Breads'
  },
  {
    id: 'b3',
    name: 'Garlic Naan',
    price: 85,
    description: 'Traditional naan infused with fresh garlic and coriander.',
    image: '/images/garlic_naan.jpg',
    rating: 4.9,
    reviews: 650,
    category: 'Breads'
  },
  {
    id: 'b4',
    name: 'Laccha Paratha',
    price: 75,
    description: 'Multi-layered flaky whole wheat bread.',
    image: 'https://loremflickr.com/800/600/paratha,indian',
    rating: 4.7,
    reviews: 210,
    category: 'Breads'
  },
  {
    id: 'b5',
    name: 'Missi Roti',
    price: 60,
    description: 'Spiced gram flour bread with herbs.',
    image: 'https://loremflickr.com/800/600/missi,roti,indian',
    rating: 4.6,
    reviews: 120,
    category: 'Breads'
  },

  // --- Rice ---
  {
    id: 'rc1',
    name: 'Basmati Steamed Rice',
    price: 150,
    description: 'Fluffy, long-grain aromatic steamed rice.',
    image: 'https://loremflickr.com/800/600/steamed,rice',
    rating: 4.4,
    reviews: 300,
    category: 'Rice'
  },
  {
    id: 'rc2',
    name: 'Jeera Rice',
    price: 190,
    description: 'Basmati rice tempered with cumin seeds and ghee.',
    image: '/images/jeera_rice.jpg',
    rating: 4.7,
    reviews: 420,
    category: 'Rice'
  },
  {
    id: 'rc3',
    name: 'Vegetable Dum Biryani',
    price: 420,
    description: 'Slow-cooked aromatic rice with seasonal vegetables and saffron.',
    image: 'https://loremflickr.com/800/600/vegetable,biryani',
    rating: 4.8,
    reviews: 550,
    category: 'Rice'
  },
  {
    id: 'rc4',
    name: 'Chicken Dum Biryani',
    price: 520,
    description: 'The classic Hyderabadi biryani with succulent chicken pieces.',
    image: 'https://loremflickr.com/800/600/chicken,biryani',
    rating: 4.9,
    reviews: 980,
    category: 'Rice'
  },

  // --- Starters ---
  {
    id: 's1',
    name: 'Paneer Tikka',
    price: 380,
    description: 'Marinated cottage cheese chunks grilled to perfection.',
    image: '/images/paneer_tikka.jpg',
    rating: 4.8,
    reviews: 340,
    category: 'Starters'
  },
  {
    id: 's2',
    name: 'Hara Bhara Kabab',
    price: 290,
    description: 'Nutritious green patties made with spinach, peas and potatoes.',
    image: 'https://loremflickr.com/800/600/hara,bhara,kabab',
    rating: 4.6,
    reviews: 210,
    category: 'Starters'
  },
  {
    id: 's3',
    name: 'Gobi Manchurian',
    price: 320,
    description: 'Crispy cauliflower florets tossed in a spicy-sweet Indo-Chinese sauce.',
    image: 'https://loremflickr.com/800/600/manchurian,gobi',
    rating: 4.5,
    reviews: 450,
    category: 'Starters'
  },
  {
    id: 's4',
    name: 'Crispy Corn',
    price: 280,
    description: 'Golden fried corn kernels seasoned with secret spices.',
    image: 'https://loremflickr.com/800/600/crispy,corn',
    rating: 4.7,
    reviews: 180,
    category: 'Starters'
  },

  // --- Sweets ---
  {
    id: 'sw1',
    name: 'Gulab Jamun',
    price: 150,
    description: 'Golden berry-sized balls made of milk solids in sugar syrup.',
    image: '/images/gulab_jamun.jpg',
    rating: 4.9,
    reviews: 600,
    category: 'Sweets'
  },
  {
    id: 'sw2',
    name: 'Ras Malai',
    price: 180,
    description: 'Flattened paneer dumplings in sweetened, thickened saffron milk.',
    image: 'https://loremflickr.com/800/600/rasmalai',
    rating: 4.9,
    reviews: 420,
    category: 'Sweets'
  },
  {
    id: 'sw3',
    name: 'Gajar Ka Halwa',
    price: 210,
    description: 'Traditional carrot dessert slow-cooked with milk and nuts.',
    image: 'https://loremflickr.com/800/600/carrot,halwa',
    rating: 4.8,
    reviews: 350,
    category: 'Sweets'
  },
  {
    id: 'sw4',
    name: 'Kaju Katli Box',
    price: 350,
    description: 'Premium cashew nut fudge with edible silver foil.',
    image: 'https://loremflickr.com/800/600/kaju,katli',
    rating: 4.7,
    reviews: 280,
    category: 'Sweets'
  }
];

const RECOMMENDATIONS: MenuItem[] = [
  {
    id: 'r1',
    name: 'Garlic Naan',
    price: 180,
    description: 'Butter-brushed with fresh herbs',
    image: 'https://loremflickr.com/800/600/garlic,naan,indian',
    category: 'Breads',
    tag: "Chef's Choice"
  },
  {
    id: 'r2',
    name: 'Jeera Rice',
    price: 220,
    description: 'Aromatic Cumin Basmati',
    image: '/images/jeera_rice.jpg',
    category: 'Rice'
  },
  {
    id: 'r3',
    name: 'Butter Roti',
    price: 120,
    description: 'Classic whole wheat flatbread',
    image: '/images/butter_roti.jpg',
    category: 'Breads'
  },
  {
    id: 'r4',
    name: 'Saffron Pilau',
    price: 320,
    description: 'Infused with real saffron & nuts',
    image: 'https://loremflickr.com/800/600/saffron,rice,pilau',
    category: 'Rice',
    tag: 'Premium'
  }
];

// --- Components ---

const WaiterAvatar = ({ isCalling, className }: { isCalling: boolean, className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Background Aura */}
        <motion.circle
          animate={isCalling ? { scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
          cx="100" cy="100" r="90" fill="#84E184" opacity="0.1"
        />
        {/* Body */}
        <path d="M40,190 Q100,140 160,190" fill="#006B2B" opacity="0.1" />
        <path d="M60,190 Q100,160 140,190" fill="#006B2B" opacity="0.2" />
        {/* Head */}
        <circle cx="100" cy="90" r="45" fill="#F0F9F1" stroke="#006B2B" strokeWidth="1" />
        {/* Hat */}
        <path d="M70,60 Q100,20 130,60" fill="#006B2B" opacity="0.8" />
        <rect x="75" y="55" width="50" height="10" rx="2" fill="#006B2B" />
        {/* Face Details */}
        <circle cx="85" cy="95" r="3" fill="#006B2B" opacity="0.4" />
        <circle cx="115" cy="95" r="3" fill="#006B2B" opacity="0.4" />
        <motion.path
          animate={isCalling ? { d: "M85,115 Q100,130 115,115" } : { d: "M90,115 Q100,120 110,115" }}
          d="M90,115 Q100,120 110,115"
          fill="none" stroke="#006B2B" strokeWidth="2" strokeLinecap="round"
        />
        {/* Bowtie */}
        <path d="M90,140 L100,145 L110,140 L100,135 Z" fill="#84E184" />
      </svg>
      {isCalling && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-4 -right-4 bg-brand-accent text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-lg"
        >
          !
        </motion.div>
      )}
    </div>
  );
};

const FoodIllustration = ({ category, className }: { category: string, className?: string }) => {
  const getIllustration = () => {
    switch (category) {
      case 'Currys':
        return (
          <g>
            <circle cx="200" cy="220" r="100" fill="#F0F9F1" />
            <path d="M120,220 Q200,320 280,220" fill="#006B2B" opacity="0.1" />
            <circle cx="200" cy="200" r="80" fill="#84E184" opacity="0.3" />
            <path d="M150,180 Q200,140 250,185 T310,220 Q250,280 140,240 T150,180" fill="#006B2B" opacity="0.2" filter="blur(8px)" />
            <motion.path
              animate={{ opacity: [0.2, 0.5, 0.2], y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              d="M180,140 Q200,100 220,140" fill="none" stroke="#006B2B" strokeWidth="2" strokeLinecap="round" opacity="0.3"
            />
          </g>
        );
      case 'Breads':
        return (
          <g>
            <motion.ellipse
              whileHover={{ rotate: 5 }}
              cx="200" cy="220" rx="90" ry="40" fill="#84E184" opacity="0.2"
            />
            <ellipse cx="200" cy="200" rx="100" ry="45" fill="#F0F9F1" stroke="#006B2B" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="180" cy="190" r="3" fill="#006B2B" opacity="0.2" />
            <circle cx="220" cy="205" r="4" fill="#006B2B" opacity="0.2" />
          </g>
        );
      case 'Rice':
        return (
          <g>
            <path d="M100,250 Q200,150 300,250" fill="#F0F9F1" stroke="#22C55E" strokeWidth="1" />
            {[...Array(12)].map((_, i) => (
              <rect key={i} x={150 + (i % 4) * 25} y={180 + Math.floor(i / 4) * 20} width="4" height="10" rx="2" fill="#006B2B" opacity="0.2" transform={`rotate(${i * 30})`} />
            ))}
          </g>
        );
      case 'Sweets':
        return (
          <g>
            <circle cx="200" cy="200" r="60" fill="#F0F9F1" stroke="#84E184" strokeWidth="2" />
            <motion.circle
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 4 }}
              cx="200" cy="200" r="40" fill="#006B2B" opacity="0.2"
            />
            <path d="M180,180 Q200,160 220,180" stroke="#006B2B" strokeWidth="2" fill="none" opacity="0.4" />
          </g>
        );
      default:
        return <Utensils className="text-brand-primary/20" size={80} />;
    }
  };

  return (
    <svg viewBox="0 0 400 400" className={`w-full h-full bg-slate-50/50 ${className}`}>
      {getIllustration()}
    </svg>
  );
};

const SafeImage = ({ src, alt, category, className, innerClassName }: { src: string, alt: string, category?: string, className?: string, innerClassName?: string }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-slate-100 animate-pulse flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
        </div>
      )}
      {(error || !src || src.includes('loremflickr')) ? (
        <FoodIllustration category={category || 'Currys'} className={innerClassName} />
      ) : (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${innerClassName}`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          loading="lazy"
        />
      )}
    </div>
  );
};

const Sidebar = ({ currentPage, onNavigate, isStaff = false }: { currentPage: Page, onNavigate: (p: Page) => void, isStaff?: boolean }) => {
  const customerItems = [
    { id: 'welcome', label: 'Welcome', icon: Home },
    { id: 'menu', label: 'Menu', icon: Utensils },
    { id: 'recommendations', label: 'Recommendations', icon: Sparkles },
    { id: 'entertainment', label: 'Entertainment', icon: Tv },
    { id: 'cart', label: 'Cart', icon: ShoppingCart },
    { id: 'payment', label: 'Payment', icon: CreditCard },
  ];

  const staffItems = [
    { id: 'staff-kitchen', label: 'Kitchen', icon: ChefHat },
    { id: 'staff-floor', label: 'Floor', icon: Store },
    { id: 'staff-billing', label: 'Billing', icon: ClipboardList },
    { id: 'staff-analytics', label: 'Analytics', icon: LayoutDashboard },
    { id: 'staff-inventory', label: 'Inventory', icon: Package },
  ];

  const items = isStaff ? staffItems : customerItems;

  return (
    <div className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-12 h-12 overflow-hidden rounded-xl border border-slate-100 shadow-sm transition-all duration-500">
          <SafeImage
            src={currentPage === 'payment' ? '/images/waiter_portrait.png' : '/images/logo.svg'}
            alt="Logo"
            className="w-full h-full"
            innerClassName={currentPage === 'payment' ? 'object-cover object-top' : ''}
          />
        </div>
        <div>
          <h1 className="font-display font-bold text-brand-primary text-xl leading-tight">Annadatabot</h1>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Smart Dining</p>
        </div>
      </div>

      <div className="flex-1 mt-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as Page)}
            className={`w-full flex items-center gap-4 px-8 py-4 transition-all ${currentPage === item.id
              ? 'bg-brand-secondary/20 text-brand-primary border-r-4 border-brand-primary font-semibold'
              : 'text-slate-500 hover:bg-slate-50'
              }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="p-6">
        <div className="bg-brand-light p-4 rounded-2xl">
          <p className="text-[10px] font-bold text-brand-primary uppercase mb-1">Botanical Insight</p>
          <p className="text-xs italic text-slate-600">"The Paneer Tikka is particularly fresh today, chef recommends."</p>
        </div>
      </div>
    </div>
  );
};

// --- Screens ---

const WelcomeScreen = ({ onNext }: { onNext: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onNext, 3000);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light to-white flex flex-col items-center justify-center text-center p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative mb-12"
      >
        <div className="w-64 h-64 rounded-full border-4 border-brand-secondary/30 flex items-center justify-center relative bg-white shadow-2xl">
          <div className="w-56 h-56 rounded-full overflow-hidden flex items-center justify-center">
            <SafeImage src="/images/logo.svg" alt="Annadatabot Logo" className="w-full h-full" />
          </div>
          <div className="absolute inset-0 rounded-full border-4 border-brand-primary opacity-10 animate-ping" />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -bottom-4 bg-white px-6 py-2 rounded-full shadow-lg border border-slate-100 flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Assistant Active</span>
          </motion.div>
        </div>
      </motion.div>

      <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs mb-4">Hello! Good Afternoon</p>
      <h1 className="text-5xl font-display font-bold text-slate-800 mb-6">
        Welcome to <span className="text-brand-primary">Annadatabot</span>
      </h1>
      <p className="text-slate-500 mb-12">Please wait, we are detecting your presence...</p>

      <div className="flex gap-2 mb-16">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
            className="w-2 h-2 rounded-full bg-brand-primary"
          />
        ))}
      </div>

      <div className="flex flex-col items-center gap-2">
        <ChefHat className="text-slate-300" size={32} />
        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Your personal dining assistant is preparing to serve you.</p>
      </div>
    </div>
  );
};

const MenuScreen = ({ cart, onAddToCart, onRemoveFromCart, onProceed }: { cart: CartItem[], onAddToCart: (i: MenuItem) => void, onRemoveFromCart: (id: string) => void, onProceed: () => void }) => {
  const [category, setCategory] = useState('Currys');
  const categories = ['Currys', 'Breads', 'Rice', 'Starters', 'Sweets'];

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const taxes = subtotal * 0.12;
  const total = subtotal + taxes;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 pl-64">
      <div className="flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-display font-bold text-slate-800">Main Menu</h2>
            <p className="text-slate-500 mt-1">Discover curated botanical flavors for your journey.</p>
          </div>
          <div className="flex bg-white p-1 rounded-full shadow-sm border border-slate-100">
            <button className="px-6 py-2 rounded-full bg-brand-primary text-white font-semibold text-sm">Dine In</button>
            <button className="px-6 py-2 rounded-full text-slate-500 font-semibold text-sm">Take Away</button>
          </div>
        </header>

        <div className="flex gap-4 mb-10 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-8 py-3 rounded-full font-semibold transition-all whitespace-nowrap ${category === cat ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'bg-white text-slate-500 hover:bg-slate-100'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8">
          {MENU_ITEMS.filter(item => item.category === category).map(item => (
            <motion.div
              key={item.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group"
            >
              <div className="h-56 relative overflow-hidden">
                <SafeImage src={item.image} alt={item.name} category={item.category} className="w-full h-full" innerClassName="group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1">
                  <Sparkles size={14} className="text-brand-accent" />
                  <span className="text-xs font-bold text-slate-700">{item.rating} ({item.reviews}+)</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-800">{item.name}</h3>
                  <motion.span
                    whileHover={{ scale: 1.2, color: '#006B2B' }}
                    className="text-xl font-bold text-brand-primary"
                  >
                    ₹{item.price}
                  </motion.span>
                </div>
                <p className="text-slate-500 text-sm mb-6 line-clamp-2">{item.description}</p>
                <div className="flex justify-end">
                  <button
                    onClick={() => onAddToCart(item)}
                    className="w-12 h-12 bg-brand-secondary/30 text-brand-primary rounded-2xl flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors"
                  >
                    <Plus size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      <div className="w-96 bg-white border-l border-slate-200 p-8 flex flex-col h-screen sticky top-0">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-display font-bold text-slate-800">Your Cart</h3>
          <span className="bg-brand-accent/20 text-brand-accent px-3 py-1 rounded-full text-xs font-bold">{cart.length} Items</span>
        </div>

        <div className="bg-brand-light/50 p-4 rounded-2xl mb-8 flex items-center gap-4">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white">
            <Store size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Table 12 • 2 Guests</p>
            <div className="w-48 h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
              <div className="w-2/3 h-full bg-brand-primary" />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-6">
          {cart.map(item => (
            <div key={item.id} className="flex gap-4">
              <SafeImage src={item.image} alt={item.name} category={item.category} className="w-20 h-20 rounded-2xl" />
              <div className="flex-1">
                <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                <p className="text-brand-primary font-bold text-sm">₹{item.price}</p>
                <div className="flex items-center gap-3 mt-2">
                  <button onClick={() => onRemoveFromCart(item.id)} className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-brand-primary hover:text-brand-primary">
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-bold">{item.quantity}</span>
                  <button onClick={() => onAddToCart(item)} className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-brand-primary hover:text-brand-primary">
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {cart.length === 0 && (
            <div className="text-center py-20 opacity-30">
              <ShoppingCart size={48} className="mx-auto mb-4" />
              <p>Your cart is empty</p>
            </div>
          )}
        </div>

        <div className="pt-8 border-t border-slate-100 space-y-3">
          <div className="flex justify-between text-slate-500 text-sm">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-slate-500 text-sm">
            <span>Taxes & Fees</span>
            <span>₹{taxes.toFixed(0)}</span>
          </div>
          <div className="flex justify-between text-slate-800 font-bold text-xl pt-2">
            <span>Total Amount</span>
            <motion.span
              key={total}
              initial={{ scale: 1.1, color: '#22C55E' }}
              animate={{ scale: 1, color: '#1e293b' }}
              className="font-display"
            >
              {formatCurrency(total)}
            </motion.span>
          </div>
          <button
            disabled={cart.length === 0}
            onClick={onProceed}
            className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 mt-4 hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Explore Recommendations <Sparkles size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const CartScreen = ({ cart, onAddToCart, onRemoveFromCart, onProceed, onBack }: {
  cart: CartItem[],
  onAddToCart: (i: MenuItem) => void,
  onRemoveFromCart: (id: string) => void,
  onProceed: () => void,
  onBack: () => void
}) => {
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const taxes = subtotal * 0.12;
  const total = subtotal + taxes;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  useEffect(() => {
    if (cart.length === 0) {
      onBack();
    }
  }, [cart, onBack]);

  if (cart.length === 0) return null;

  return (
    <div className="flex min-h-screen bg-slate-50 pl-64">
      <div className="flex-1 p-10 max-w-5xl mx-auto">
        <header className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-display font-bold text-slate-800">Review Your Cart</h2>
            <p className="text-slate-500 mt-2">Check your selections before confirming the order.</p>
          </div>
          <button onClick={onBack} className="flex items-center gap-2 text-brand-primary font-bold hover:gap-3 transition-all">
            <ArrowLeft size={18} /> Continue Shopping
          </button>
        </header>

        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-12 bg-slate-50/50 p-6 px-10 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
            <div className="col-span-6">Item Description</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-3 text-right">Total</div>
          </div>

          <div className="divide-y divide-slate-50">
            {cart.map(item => (
              <div key={item.id} className="grid grid-cols-12 items-center p-8 px-10 hover:bg-slate-50/30 transition-colors">
                <div className="col-span-6 flex items-center gap-6">
                  <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-sm">
                    <SafeImage src={item.image} alt={item.name} category={item.category} className="w-full h-full" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800">{item.name}</h4>
                    <p className="text-sm text-slate-400 font-medium">₹{item.price} per unit</p>
                  </div>
                </div>
                <div className="col-span-3 flex justify-center items-center gap-6">
                  <button onClick={() => onRemoveFromCart(item.id)} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-brand-primary hover:text-brand-primary transition-all">
                    <Minus size={18} />
                  </button>
                  <span className="text-2xl font-display font-bold w-8 text-center">{item.quantity}</span>
                  <button onClick={() => onAddToCart(item)} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-brand-primary hover:text-brand-primary transition-all">
                    <Plus size={18} />
                  </button>
                </div>
                <div className="col-span-3 text-right">
                  <span className="text-2xl font-display font-bold text-brand-primary">₹{item.price * item.quantity}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-10 px-16 bg-brand-light/30 border-t border-brand-secondary/10 flex justify-end">
            <div className="w-full max-w-xs space-y-4">
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Cart Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Taxes & Service (12%)</span>
                <span>₹{taxes.toFixed(0)}</span>
              </div>
              <div className="pt-6 border-t border-brand-secondary/20 flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-1">Final Amount</p>
                  <motion.span
                    key={total}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-display font-bold text-slate-800"
                  >
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(total)}
                  </motion.span>
                </div>
              </div>
              <button
                onClick={onProceed}
                className="w-full bg-brand-primary text-white py-5 rounded-3xl font-bold text-xl flex items-center justify-center gap-3 mt-8 hover:bg-brand-primary/90 shadow-xl shadow-brand-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Confirm Order <CheckCircle2 size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecommendationsScreen = ({ cart, onAddToCart, onRemoveFromCart, onBack, onProceed }: {
  cart: CartItem[],
  onAddToCart: (i: MenuItem) => void,
  onRemoveFromCart: (id: string) => void,
  onBack: () => void,
  onProceed: () => void
}) => {
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const taxes = subtotal * 0.12;
  const total = subtotal + taxes;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  return (
    <div className="flex min-h-screen bg-slate-50 pl-64">
      <div className="flex-1 p-10">
        <button onClick={onBack} className="flex items-center gap-2 text-brand-primary font-bold mb-8 hover:gap-3 transition-all">
          <ArrowLeft size={20} /> Back to Curry Selection
        </button>

        <h2 className="text-4xl font-display font-bold text-slate-800 mb-2">Perfect Pairings – Recommended for you</h2>
        <p className="text-slate-500 mb-10">Enhance your Paneer Butter Masala with our chef-curated selections of artisan breads and fragrant rice.</p>

        <div className="grid grid-cols-3 gap-6">
          {RECOMMENDATIONS.map(item => (
            <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 p-4">
              <div className="h-48 relative rounded-2xl overflow-hidden mb-4">
                <SafeImage src={item.image} alt={item.name} category={item.category} className="w-full h-full" />
                {item.tag && (
                  <span className="absolute top-3 left-3 bg-brand-primary/90 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {item.tag}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-slate-800">{item.name}</h3>
              <p className="text-slate-400 text-xs italic mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-brand-primary font-bold">₹{item.price}</span>
                <button
                  onClick={() => onAddToCart(item)}
                  className="w-10 h-10 bg-brand-primary text-white rounded-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-lg shadow-brand-primary/20"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
          ))}
          <div className="bg-brand-light rounded-3xl border-2 border-dashed border-brand-secondary flex flex-col items-center justify-center p-8 text-center">
            <Utensils size={48} className="text-brand-primary mb-4" />
            <h4 className="font-bold text-slate-800 mb-2">Feeling Adventurous?</h4>
            <p className="text-xs text-slate-500 mb-6">Let the Botanical Concierge curate a complete meal sequence based on your preferences.</p>
            <button className="bg-white text-brand-primary px-6 py-2 rounded-full font-bold border border-brand-secondary shadow-sm">Surprise Me</button>
          </div>
        </div>
      </div>

      <div className="w-96 bg-white border-l border-slate-200 p-8 flex flex-col h-screen sticky top-0">
        <h3 className="text-2xl font-display font-bold text-slate-800 mb-8">Your Order</h3>
        <div className="flex-1 space-y-4 overflow-y-auto pr-2 pb-4">
          {cart.map(item => (
            <div key={item.id} className="flex gap-4 p-4 bg-slate-50 rounded-2xl">
              <SafeImage src={item.image} alt={item.name} category={item.category} className="w-16 h-16 rounded-xl" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-bold text-sm">{item.name}</h4>
                  <span className="font-bold text-sm">₹{item.price * item.quantity}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => onRemoveFromCart(item.id)} className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-primary hover:border-brand-primary transition-all"><Minus size={12} /></button>
                  <span className="text-xs font-bold">{item.quantity}</span>
                  <button onClick={() => onAddToCart(item)} className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-primary hover:border-brand-primary transition-all"><Plus size={12} /></button>
                </div>
              </div>
            </div>
          ))}
          {cart.length === 0 && (
            <div className="text-center py-10 opacity-30">
              <ShoppingCart size={32} className="mx-auto mb-2" />
              <p className="text-sm">Empty</p>
            </div>
          )}
        </div>
        <div className="pt-8 border-t border-slate-100 space-y-3">
          <div className="flex justify-between text-slate-500 text-sm">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-slate-500 text-sm">
            <span>Taxes & Fees</span>
            <span>{formatCurrency(taxes)}</span>
          </div>
          <div className="flex justify-between text-brand-primary font-bold text-2xl pt-2">
            <span>Total</span>
            <motion.span
              key={total}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
            >
              {formatCurrency(total)}
            </motion.span>
          </div>
          <button
            onClick={onProceed}
            className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 mt-4 shadow-lg shadow-brand-primary/20"
          >
            Confirm & Continue <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const EntertainmentScreen = ({ onProceed }: { onProceed: () => void }) => {
  const songs = [
    { title: "Misty Mountains", artist: "Botanical Ambience", duration: "4:20" },
    { title: "River Flows In You", artist: "Piano Solo", duration: "3:45" },
    { title: "Silent Woods", artist: "Nature Sounds", duration: "5:12" },
    { title: "Midnight Jasmine", artist: "Lo-fi Garden", duration: "2:55" }
  ];

  const games = [
    { name: "Ludo Classic", players: "2-4 Players", icon: "🎲", popular: true },
    { name: "Chess Masters", players: "2 Players", icon: "♟️", popular: true },
    { name: "Botanical Quiz", players: "Solo/Team", icon: "🌿", popular: false },
    { name: "Family Trivia", players: "2-8 Players", icon: "❓", popular: true }
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 pl-64">
      <div className="flex-1 p-10 pb-40">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-display font-bold text-slate-800">Digital Entertainment</h2>
            <p className="text-slate-500 mt-1">Curated experiences for your botanical dining journey.</p>
          </div>
          <div className="flex gap-4">
            <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100"><Search size={20} /></button>
            <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 font-bold text-brand-primary">AI</button>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8">
          {/* Featured Video Section */}
          <div className="col-span-8 space-y-8">
            <div className="relative h-[400px] rounded-[48px] overflow-hidden shadow-2xl group cursor-pointer">
              <SafeImage src="https://loremflickr.com/1200/800/family,gathering,dinner" alt="Family Vibes" className="w-full h-full" innerClassName="transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-8 left-8">
                <span className="bg-brand-accent text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">Family Vibes</span>
              </div>
              <div className="absolute bottom-12 left-12 right-12">
                <h3 className="text-5xl font-display font-bold text-white mb-4">Family Memories</h3>
                <p className="text-slate-300 max-w-md">Relive cherished family moments or join our global community's botanical celebrations.</p>
                <button className="mt-8 bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-3 rounded-2xl font-bold flex items-center gap-3 hover:bg-white hover:text-slate-900 transition-all">
                  Play Family Video <Music size={20} />
                </button>
              </div>
            </div>

            {/* Games Section */}
            <div className="bg-white p-10 rounded-[48px] shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-display font-bold text-slate-800">Digital Lounge Games</h3>
                <span className="text-brand-primary font-bold text-sm underline cursor-pointer">View All Games</span>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {games.map((game, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-6">
                      <div className="text-4xl bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm">
                        {game.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{game.name}</h4>
                        <p className="text-xs text-slate-400">{game.players}</p>
                      </div>
                    </div>
                    {game.popular && <span className="bg-orange-100 text-orange-600 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase">Popular</span>}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Silent Songs Sidebar */}
          <div className="col-span-4 space-y-8">
            <div className="bg-brand-primary text-white p-10 rounded-[48px] shadow-xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
              <h3 className="text-2xl font-display font-bold mb-2">Silent Melodies</h3>
              <p className="text-brand-light/70 text-sm mb-8">Premium relaxing tunes for your soul.</p>

              <div className="space-y-6">
                {songs.map((song, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white group-hover:text-brand-primary transition-all">
                        <Music size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold truncate w-32">{song.title}</p>
                        <p className="text-[10px] text-white/50">{song.artist}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-white/40">{song.duration}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-10 border-t border-white/10 flex items-center gap-6">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-brand-primary">
                  <Sparkles size={24} />
                </div>
                <div className="flex-1">
                  <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: ['0%', '100%'] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="h-full bg-white"
                    />
                  </div>
                  <p className="text-[10px] font-bold mt-2 text-white/60">Now Playing: Misty Mountains</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
              <h4 className="font-bold text-slate-800 mb-4">Staff Recommendation</h4>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center text-brand-primary">
                  <Tv size={20} />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">Try the **"Botanical Quiz"** with your table – winner gets a free signature dessert!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Bottom Bar */}
      <div className="fixed bottom-10 left-64 right-10 flex justify-center">
        <div className="bg-white/80 backdrop-blur-xl p-4 rounded-[32px] shadow-2xl border border-white/50 flex items-center gap-12 max-w-4xl w-full">
          <div className="flex items-center gap-4 border-r border-slate-200 pr-12">
            <div className="w-12 h-12 bg-brand-light rounded-2xl flex items-center justify-center text-brand-primary">
              <ShoppingCart size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order Progress</p>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">Secured & Active</span>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 text-slate-600 font-bold hover:text-brand-primary transition-colors">
            <Clock size={20} /> Quick Reorder
          </button>
          <div className="flex-1" />
          <button
            onClick={onProceed}
            className="bg-brand-primary text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20"
          >
            Proceed to Final Cart <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const PaymentScreen = ({ onProceed }: { onProceed: () => void }) => {
  const [isWaiterCalled, setIsWaiterCalled] = useState(false);

  const handleCallWaiter = () => {
    setIsWaiterCalled(true);
    setTimeout(() => setIsWaiterCalled(false), 5000);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 pl-64">
      <div className="flex-1 p-10">
        <h2 className="text-4xl font-display font-bold text-slate-800 mb-2">Choose Payment Method</h2>
        <p className="text-slate-500 mb-12">Please select your preferred way to settle the bill. All transactions are secure and encrypted.</p>

        <div className="grid grid-cols-2 gap-10">
          <div className="bg-white p-12 rounded-[48px] shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-brand-light rounded-3xl flex items-center justify-center text-brand-primary mb-8">
              <QrCode size={40} />
            </div>
            <h3 className="text-3xl font-display font-bold text-slate-800 mb-4">Instant Scan</h3>
            <p className="text-slate-500 mb-10 max-w-xs">Scan the dynamic QR code below to pay via UPI or Credit Card.</p>
            <div className="w-56 h-56 bg-slate-50 rounded-[40px] border-2 border-dashed border-brand-secondary/30 flex items-center justify-center mb-10 p-4 relative group cursor-pointer overflow-hidden">
              {/* Stylized QR Code SVG */}
              <svg viewBox="0 0 100 100" className="w-full h-full text-brand-primary opacity-80 group-hover:scale-105 transition-transform">
                <rect x="0" y="0" width="30" height="30" fill="currentColor" rx="4" />
                <rect x="5" y="5" width="20" height="20" fill="white" rx="2" />
                <rect x="10" y="10" width="10" height="10" fill="currentColor" rx="1" />

                <rect x="70" y="0" width="30" height="30" fill="currentColor" rx="4" />
                <rect x="75" y="5" width="20" height="20" fill="white" rx="2" />
                <rect x="80" y="10" width="10" height="10" fill="currentColor" rx="1" />

                <rect x="0" y="70" width="30" height="30" fill="currentColor" rx="4" />
                <rect x="5" y="75" width="20" height="20" fill="white" rx="2" />
                <rect x="10" y="80" width="10" height="10" fill="currentColor" rx="1" />

                {[...Array(40)].map((_, i) => (
                  <rect
                    key={i}
                    x={35 + (i % 6) * 6}
                    y={5 + Math.floor(i / 6) * 6}
                    width="4"
                    height="4"
                    fill="currentColor"
                    opacity={Math.random() > 0.5 ? 1 : 0.2}
                    rx="1"
                  />
                ))}
              </svg>
              <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold text-brand-primary shadow-sm border border-brand-secondary/20">
                  TAP TO ENLARGE
                </div>
              </div>
            </div>
            <button onClick={onProceed} className="flex items-center gap-2 text-brand-primary font-bold hover:gap-3 transition-all">
              Mark Payment Done <ChevronRight size={20} />
            </button>
          </div>

          <div className="bg-white p-12 rounded-[48px] shadow-sm border border-slate-100 flex flex-col items-center text-center relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light/20 rounded-full -mr-16 -mt-16 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-secondary/10 rounded-full -ml-16 -mb-16 blur-2xl" />

            <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden mb-8 relative z-10 bg-slate-100 flex items-center justify-center">
              <img src="/images/waiter_portrait.png" alt="Waiter Mini" className="w-full h-full object-cover object-top" />
            </div>
            <h3 className="text-3xl font-display font-bold text-slate-800 mb-4 relative z-10">Cash Payment</h3>
            <p className="text-slate-500 mb-10 max-w-xs relative z-10">Hand over your cash directly to our dining assistant at your table.</p>

            <div className="relative w-64 h-64 mb-10">
              {/* Decorative Background Rings */}
              <div className="absolute inset-0 bg-brand-primary/5 rounded-full scale-110" />
              <div className="absolute inset-0 bg-brand-primary/5 rounded-full scale-125 animate-pulse" />

              <div className="w-full h-full rounded-full border-8 border-white shadow-2xl overflow-hidden relative z-10 bg-white flex items-center justify-center">
                <img src="/images/waiter_portrait.png" alt="Waiter Portrait" className="w-full h-full object-cover object-top" />

                {/* Signal Overlay */}
                <AnimatePresence>
                  {isWaiterCalled && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-brand-primary/20 backdrop-blur-[2px] flex items-center justify-center"
                    >
                      <div className="text-white text-4xl animate-bounce">🔔</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* External Signal Waves */}
              {isWaiterCalled && (
                <>
                  <motion.div
                    animate={{ scale: [1, 2], opacity: [0.3, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 border-4 border-brand-primary rounded-full z-0"
                  />
                  <motion.div
                    animate={{ scale: [1, 2.5], opacity: [0.2, 0] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                    className="absolute inset-0 border-4 border-brand-primary rounded-full z-0"
                  />
                </>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isWaiterCalled ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              className="mb-8"
            >
              <div className="bg-brand-primary text-white text-[10px] font-bold px-6 py-2 rounded-full shadow-lg shadow-brand-primary/30 uppercase tracking-[0.2em]">
                Notifying Table Assistant...
              </div>
            </motion.div>

            <motion.button
              onClick={handleCallWaiter}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              className={`flex items-center justify-center gap-3 w-full max-w-[280px] py-5 rounded-2xl font-bold transition-all z-10 relative ${isWaiterCalled
                ? 'bg-slate-100 text-slate-400 border border-transparent'
                : 'bg-white text-brand-primary border border-brand-secondary/30 shadow-sm hover:shadow-brand-secondary/20'
                }`}
            >
              <Bell size={24} className={isWaiterCalled ? "" : "animate-bounce text-brand-accent"} />
              {isWaiterCalled ? "Assistant is on the way" : "Call Assistant for Cash"}
            </motion.button>
          </div>
        </div>

        <div className="mt-12 bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 flex justify-between items-center">
          <div>
            <h4 className="text-2xl font-bold text-slate-800">Order Summary</h4>
            <p className="text-slate-400 text-sm mt-1">Table 12 • 3 Items • #ORD-8821</p>
          </div>
          <div className="flex gap-16">
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Subtotal</p>
              <p className="text-2xl font-bold">₹1,020</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tax (9%)</p>
              <p className="text-2xl font-bold">₹124</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="bg-brand-light px-8 py-4 rounded-full flex items-center gap-4">
            <Sparkles className="text-brand-accent" size={20} />
            <p className="text-sm font-semibold text-slate-600">Botanical Insight: QR Scan is 40% faster during peak hours.</p>
          </div>
        </div>
      </div>

      <div className="w-48 bg-slate-100/50 p-8 flex flex-col justify-end">
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Table 12</p>
          <p className="text-4xl font-display font-bold text-brand-primary">₹1,144</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total Due</p>
        </div>
      </div>
    </div>
  );
};

const ConfirmedScreen = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="flex min-h-screen bg-slate-50 pl-64">
      <div className="flex-1 flex flex-col items-center justify-center p-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-16 rounded-[64px] shadow-2xl border border-slate-100 text-center max-w-2xl w-full relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-light/30 rounded-full -mr-32 -mt-32 blur-3xl" />

          <div className="w-24 h-24 bg-brand-accent rounded-full flex items-center justify-center text-white mx-auto mb-10 shadow-lg shadow-brand-accent/20">
            <CheckCircle2 size={48} />
          </div>

          <h2 className="text-5xl font-display font-bold text-slate-800 mb-4">Order Confirmed</h2>
          <p className="text-slate-500 mb-12">Please present this token at the counter for payment.</p>

          <div className="bg-slate-50 p-12 rounded-[40px] border border-slate-100 mb-12">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-4">Token Number</p>
            <h3 className="text-8xl font-display font-bold text-brand-primary">#204</h3>
          </div>

          <div className="flex items-center justify-center gap-3 text-slate-400 text-sm">
            <Clock size={16} />
            <span>Your order is being prepared while you settle.</span>
          </div>

          <button
            onClick={onNext}
            className="mt-12 bg-brand-primary text-white px-12 py-4 rounded-2xl font-bold hover:bg-brand-primary/90 transition-colors"
          >
            Finish & Visit Again
          </button>
        </motion.div>

        <div className="mt-12 bg-white px-8 py-4 rounded-full shadow-sm border border-slate-100 flex items-center gap-3">
          <div className="w-2 h-2 bg-brand-accent rounded-full" />
          <p className="text-sm font-semibold text-slate-600">Our staff has been notified of your cash selection.</p>
        </div>
      </div>
    </div>
  );
};

const ThankYouScreen = ({ onReset }: { onReset: () => void }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light to-white flex flex-col items-center justify-center text-center p-6">
      <div className="relative mb-12">
        <div className="w-48 h-48 rounded-full bg-white shadow-xl flex items-center justify-center">
          <div className="w-32 h-32 bg-brand-primary rounded-3xl flex items-center justify-center text-white rotate-12">
            <ChefHat size={64} />
          </div>
        </div>
        <div className="absolute -top-4 -right-4 bg-brand-accent text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Active</div>
      </div>

      <h1 className="text-7xl font-display font-bold text-slate-800 mb-8">
        Thank You! <span className="text-brand-primary italic">Visit Again</span>
      </h1>

      <p className="text-slate-500 max-w-lg mx-auto mb-16 text-lg leading-relaxed">
        Your botanical dining journey was a pleasure to assist. We hope your experience was as fresh as our ingredients.
      </p>

      <div className="flex gap-6">
        <button className="bg-white text-slate-600 px-10 py-4 rounded-2xl font-bold border border-slate-200 shadow-sm flex items-center gap-3">
          <Sparkles size={20} className="text-brand-accent" /> Rate Experience
        </button>
        <button
          onClick={onReset}
          className="bg-brand-primary text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg shadow-brand-primary/20"
        >
          <Home size={20} /> New Customer Session
        </button>
      </div>

      <div className="mt-24 opacity-20 grayscale">
        <SafeImage src="/images/restaurant_ambience.jpg" alt="Ambience" className="rounded-3xl" />
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('welcome');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isStaffView, setIsStaffView] = useState(false);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const resetSession = () => {
    setCart([]);
    setCurrentPage('welcome');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'welcome': return <WelcomeScreen onNext={() => setCurrentPage('menu')} />;
      case 'menu': return <MenuScreen cart={cart} onAddToCart={addToCart} onRemoveFromCart={removeFromCart} onProceed={() => setCurrentPage('recommendations')} />;
      case 'cart': return <CartScreen cart={cart} onAddToCart={addToCart} onRemoveFromCart={removeFromCart} onProceed={() => setCurrentPage('payment')} onBack={() => setCurrentPage('menu')} />;
      case 'recommendations': return <RecommendationsScreen cart={cart} onAddToCart={addToCart} onRemoveFromCart={removeFromCart} onBack={() => setCurrentPage('menu')} onProceed={() => setCurrentPage('entertainment')} />;
      case 'entertainment': return <EntertainmentScreen onProceed={() => setCurrentPage('cart')} />;
      case 'payment': return <PaymentScreen onProceed={() => setCurrentPage('confirmed')} />;
      case 'confirmed': return <ConfirmedScreen onNext={() => setCurrentPage('thankyou')} />;
      case 'thankyou': return <ThankYouScreen onReset={resetSession} />;
      default: return <WelcomeScreen onNext={() => setCurrentPage('menu')} />;
    }
  };

  return (
    <div className="font-sans text-slate-900 bg-slate-50 min-h-screen">
      {/* View Toggle for Demo */}
      <div className="fixed bottom-4 right-4 z-[100] flex gap-2">
        <button
          onClick={() => setIsStaffView(!isStaffView)}
          className="bg-slate-800 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl flex items-center gap-2"
        >
          {isStaffView ? <Users size={14} /> : <ChefHat size={14} />}
          Switch to {isStaffView ? 'Customer' : 'Staff'} View
        </button>
      </div>

      {currentPage !== 'welcome' && currentPage !== 'thankyou' && (
        <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} isStaff={isStaffView} />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage + (isStaffView ? '-staff' : '-cust')}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
        >
          {isStaffView ? (
            <div className="pl-64 p-10">
              {currentPage === 'staff-kitchen' && (
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-4xl font-display font-bold text-slate-800">Active Station</h2>
                      <p className="text-slate-500 mt-1">8 orders currently in queue</p>
                    </div>
                    <div className="flex bg-white p-1 rounded-full shadow-sm border border-slate-100">
                      <button className="px-6 py-2 rounded-full bg-brand-primary text-white font-semibold text-sm">Pending Orders</button>
                      <button className="px-6 py-2 rounded-full text-slate-500 font-semibold text-sm">Completed Orders</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-8">
                    {[
                      { table: 'Table 5', type: 'QUICK BURN', items: ['2× Avocado Toast', '1× Truffle Pasta', '3× Herbal Iced Tea'], status: 'PENDING' },
                      { table: 'Table 12', type: 'LARGE GROUP', items: ['4× Garden Platter', '4× Mushroom Risotto', '2× Seasonal Fruit Tart', '8× Sparkling Water'], status: 'PENDING' },
                      { table: 'Table 8', type: 'VIP LOUNGE', items: ['1× Signature Bowl', '1× Green Smoothie'], status: 'PENDING' }
                    ].map((order, i) => (
                      <div key={i} className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-1">{order.type}</p>
                            <h3 className="text-3xl font-display font-bold text-slate-800">{order.table}</h3>
                          </div>
                          <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-3 py-1 rounded-full">{order.status}</span>
                        </div>
                        <div className="space-y-4 mb-8">
                          {order.items.map((item, j) => (
                            <div key={j} className="flex justify-between items-center text-sm">
                              <span className="font-bold text-slate-700">{item}</span>
                              <span className="text-slate-400 text-xs">Station {j + 1}</span>
                            </div>
                          ))}
                        </div>
                        <button className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
                          <Bell size={18} /> Notify Waiter
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentPage === 'staff-billing' && (
                <div className="space-y-10">
                  <div className="flex justify-between items-center">
                    <h2 className="text-4xl font-display font-bold text-slate-800">Billing Tracker</h2>
                    <div className="bg-brand-primary text-white px-6 py-3 rounded-full font-bold flex items-center gap-3">
                      <DollarSign size={20} /> Total Pending: ₹14,250
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-brand-light rounded-xl flex items-center justify-center text-brand-primary">
                          <CreditCard size={20} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800">Online Payment</h3>
                        <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full">4 ACTIVE</span>
                      </div>
                      {[
                        { table: 'Table 08', amount: '₹4,450.00', status: 'UPI Pending', color: 'orange' },
                        { table: 'Table 12', amount: '₹1,200.00', status: 'Verified', color: 'green' }
                      ].map((bill, i) => (
                        <div key={i} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex justify-between items-center">
                          <div>
                            <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-1">{bill.table}</p>
                            <h4 className="text-3xl font-display font-bold text-slate-800">{bill.amount}</h4>
                          </div>
                          <div className="text-right">
                            <span className={`bg-${bill.color}-100 text-${bill.color}-600 text-[10px] font-bold px-3 py-1 rounded-full mb-4 inline-block`}>{bill.status}</span>
                            <button className="block bg-brand-primary text-white px-6 py-2 rounded-xl font-bold text-sm">Check All Done</button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                          <Banknote size={20} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800">Cash Payment</h3>
                        <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full">3 ACTIVE</span>
                      </div>
                      {[
                        { table: 'Table 03', amount: '₹5,100.00', status: 'Payment Pending', color: 'orange' },
                        { table: 'Table 21', amount: '₹2,800.00', status: 'Bill Printed', color: 'slate' }
                      ].map((bill, i) => (
                        <div key={i} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex justify-between items-center">
                          <div>
                            <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-1">{bill.table}</p>
                            <h4 className="text-3xl font-display font-bold text-slate-800">{bill.amount}</h4>
                            <p className="text-xs text-slate-400 italic mt-2">Waiting at counter...</p>
                          </div>
                          <div className="text-right">
                            <span className={`bg-${bill.color}-100 text-${bill.color}-600 text-[10px] font-bold px-3 py-1 rounded-full mb-4 inline-block`}>{bill.status}</span>
                            <button className="block bg-brand-primary text-white px-6 py-2 rounded-xl font-bold text-sm">Cash Submitted</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentPage === 'staff-analytics' && (
                <div className="space-y-10">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-4xl font-display font-bold text-slate-800">Owner Analytics Dashboard</h2>
                      <p className="text-slate-500 mt-1">Real-time performance overview for today, Oct 24.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="bg-white px-6 py-3 rounded-full border border-slate-200 flex items-center gap-3 font-bold text-sm">
                        <Clock size={18} /> This Week <ChevronRight size={16} className="rotate-90" />
                      </div>
                      <button className="bg-brand-primary text-white px-8 py-3 rounded-full font-bold flex items-center gap-3">
                        <LayoutDashboard size={20} /> Export Report
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-8">
                    {[
                      { label: 'Total Customers Today', value: '1,284', change: '+12%', icon: Users, color: 'brand' },
                      { label: 'Total Revenue', value: '₹14,290.50', change: '+8.4%', icon: DollarSign, color: 'brand' },
                      { label: 'Active Orders', value: '42', change: 'Busy', icon: ShoppingCart, color: 'orange' },
                      { label: 'Completed Orders', value: '856', change: 'Target Met', icon: CheckCircle2, color: 'slate' }
                    ].map((stat, i) => (
                      <div key={i} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 relative">
                        <div className={`w-12 h-12 bg-${stat.color}-100 rounded-2xl flex items-center justify-center text-${stat.color}-600 mb-6`}>
                          <stat.icon size={24} />
                        </div>
                        <span className={`absolute top-8 right-8 bg-${stat.color}-100 text-${stat.color}-600 text-[10px] font-bold px-2 py-1 rounded-full`}>{stat.change}</span>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <h4 className="text-3xl font-display font-bold text-slate-800">{stat.value}</h4>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-8 bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
                      <div className="flex justify-between items-center mb-10">
                        <h3 className="text-2xl font-bold text-slate-800">Weekly Revenue</h3>
                        <div className="flex gap-6 text-xs font-bold text-slate-400">
                          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-brand-primary" /> Revenue</div>
                          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-200" /> Last Week</div>
                        </div>
                      </div>
                      <div className="h-64 flex items-end justify-between gap-4">
                        {[40, 60, 45, 80, 55, 90, 70].map((h, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-4">
                            <div className="w-full bg-slate-50 rounded-t-xl relative h-full flex items-end">
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                className="w-full bg-brand-primary/20 rounded-t-xl absolute bottom-0"
                              />
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${h - 10}%` }}
                                className="w-full bg-brand-primary rounded-t-xl relative z-10"
                              />
                            </div>
                            <span className="text-xs font-bold text-slate-400">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-4 bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
                      <h3 className="text-2xl font-bold text-slate-800 mb-8">Top Sellers</h3>
                      <div className="relative w-48 h-48 mx-auto mb-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#F1F5F9" strokeWidth="15" />
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#006B2B" strokeWidth="15" strokeDasharray="180 251" strokeLinecap="round" />
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#84E184" strokeWidth="15" strokeDasharray="80 251" strokeDashoffset="-180" strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-display font-bold">1.2k</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Sold Today</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {[
                          { label: 'Artisan Pizza', value: '40%', color: 'bg-brand-primary' },
                          { label: 'Signature Burger', value: '25%', color: 'bg-brand-secondary' },
                          { label: 'Truffle Pasta', value: '20%', color: 'bg-slate-600' },
                          { label: 'Others', value: '15%', color: 'bg-slate-200' }
                        ].map((item, i) => (
                          <div key={i} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full ${item.color}`} />
                              <span className="font-semibold text-slate-600">{item.label}</span>
                            </div>
                            <span className="font-bold">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentPage === 'staff-floor' && (
                <div className="space-y-10">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-4xl font-display font-bold text-slate-800">Floor Overview</h2>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2 bg-brand-light px-3 py-1 rounded-full text-xs font-bold text-brand-primary">
                          <div className="w-2 h-2 bg-brand-accent rounded-full" /> 18 Tables Active
                        </div>
                        <p className="text-slate-500 text-sm">Today is busy. 4 orders pending in kitchen.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button className="bg-slate-100 text-slate-600 px-8 py-3 rounded-2xl font-bold">Grid View</button>
                      <button className="bg-brand-primary text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-3">
                        <Plus size={20} /> New Table
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-3 space-y-6">
                      <h3 className="text-xl font-bold text-slate-800 mb-4">Live Feed</h3>
                      {[
                        { table: 'Table 3', msg: 'READY TO SERVE', time: '2m ago', color: 'brand' },
                        { table: 'Table 12', msg: 'Help Needed', time: '5m ago', color: 'orange' },
                        { table: 'Table 5', msg: 'Check Requested', time: '8m ago', color: 'slate' }
                      ].map((alert, i) => (
                        <div key={i} className={`bg-${alert.color === 'brand' ? 'brand-light' : 'white'} p-6 rounded-[32px] border border-${alert.color === 'brand' ? 'brand-secondary/30' : 'slate-100'} shadow-sm`}>
                          <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-2">
                            <span className={alert.color === 'brand' ? 'text-brand-primary' : ''}>{alert.msg}</span>
                            <span>{alert.time}</span>
                          </div>
                          <h4 className="text-2xl font-display font-bold text-slate-800">{alert.table}</h4>
                          <p className="text-xs text-slate-500 mt-1">Main Course: Herb-Crusted Sea Bass</p>
                          {alert.color === 'brand' && (
                            <button className="mt-4 w-full bg-brand-primary text-white py-2 rounded-xl text-xs font-bold uppercase tracking-widest">Acknowledge</button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="col-span-6 space-y-8">
                      <div className="grid grid-cols-2 gap-6">
                        {[
                          { id: 'T3', name: 'Table Three', status: 'IN PROGRESS', guests: 2, total: '$64.50', color: 'brand' },
                          { id: 'T5', name: 'Table Five', status: 'URGENT', guests: 4, total: '$48.00', color: 'orange' }
                        ].map((table, i) => (
                          <div key={i} className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
                            <div className="flex justify-between items-start mb-6">
                              <div className={`w-12 h-12 bg-${table.color}-100 rounded-2xl flex items-center justify-center text-${table.color}-600 font-bold`}>{table.id}</div>
                              <span className={`bg-${table.color}-100 text-${table.color}-600 text-[10px] font-bold px-3 py-1 rounded-full`}>{table.status}</span>
                            </div>
                            <h4 className="text-xl font-bold text-slate-800">{table.name}</h4>
                            <p className="text-xs text-slate-400 mb-6">Seated: 12:45 PM • {table.guests} Guests</p>
                            <div className="space-y-2 mb-8">
                              <div className="flex justify-between text-xs font-semibold">
                                <span>Truffle Risotto (x1)</span>
                                <span className="text-brand-primary italic">Kitchen</span>
                              </div>
                              <div className="flex justify-between text-xs font-semibold">
                                <span>Grilled Asparagus (x2)</span>
                                <span className="text-brand-primary italic">Kitchen</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-end pt-4 border-t border-slate-50">
                              <span className="text-xs font-bold text-slate-400 uppercase">Total so far</span>
                              <span className="text-2xl font-display font-bold text-slate-800">{table.total}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="bg-brand-light/50 p-10 rounded-[40px] border border-brand-secondary/20 flex justify-between items-center">
                        <div>
                          <h4 className="text-2xl font-bold text-brand-primary">Kitchen Performance</h4>
                          <p className="text-sm text-slate-500 mt-2 max-w-xs">Current average prep time is 14 minutes. This is 3 minutes faster than the lunchtime average.</p>
                        </div>
                        <div className="text-center">
                          <span className="text-6xl font-display font-bold text-brand-primary">14m</span>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Avg Prep Time</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-3 space-y-8">
                      <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
                        <h3 className="text-xl font-bold text-slate-800 mb-6">Menu Actions</h3>
                        <div className="space-y-4">
                          <button className="w-full flex items-center gap-4 p-4 bg-slate-50 rounded-2xl text-slate-600 font-bold hover:bg-brand-light hover:text-brand-primary transition-all">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm"><Plus size={18} /></div>
                            Add Item
                          </button>
                          <button className="w-full flex items-center gap-4 p-4 bg-slate-50 rounded-2xl text-slate-600 font-bold">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm"><Settings size={18} /></div>
                            Update Item
                          </button>
                          <button className="w-full flex items-center gap-4 p-4 bg-slate-50 rounded-2xl text-red-600 font-bold">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm"><X size={18} /></div>
                            Delete Item
                          </button>
                        </div>
                      </div>
                      <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Quick Access Inventory</h3>
                        <div className="space-y-6">
                          {[
                            { name: 'Harvest Bowl', stock: '12 in stock', color: 'green' },
                            { name: 'Angus Prime', stock: '2 in stock', color: 'orange' },
                            { name: 'Silk Tagliatelle', stock: 'Out of stock', color: 'slate' }
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden">
                                <img src={`https://picsum.photos/seed/${item.name}/100/100`} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1">
                                <h5 className="text-sm font-bold">{item.name}</h5>
                                <p className="text-[10px] text-slate-400">{item.stock}</p>
                              </div>
                              <div className={`w-2 h-2 rounded-full bg-${item.color}-500`} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentPage === 'staff-inventory' && (
                <div className="grid grid-cols-12 gap-12">
                  <div className="col-span-4 space-y-8">
                    <div className="bg-brand-light p-12 rounded-[48px] border border-brand-secondary/20 relative overflow-hidden">
                      <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center text-white mb-8">
                        <Utensils size={32} />
                      </div>
                      <h2 className="text-4xl font-display font-bold text-slate-800 mb-4 leading-tight">Refine Your Botanical Menu</h2>
                      <p className="text-slate-500 leading-relaxed">Add new seasonal flavors or update existing delicacies. Your botanical concierge ensures every detail is captured for the guests.</p>
                    </div>
                    <div className="relative h-64 rounded-[48px] overflow-hidden group">
                      <img src="https://picsum.photos/seed/kitchen/600/400" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute bottom-8 left-8 right-8">
                        <p className="text-white font-display font-bold italic text-xl">"Quality begins with the entry."</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-8 bg-white p-16 rounded-[64px] shadow-sm border border-slate-100">
                    <div className="flex justify-between items-start mb-12">
                      <div>
                        <h3 className="text-3xl font-display font-bold text-slate-800">Item Details</h3>
                        <p className="text-slate-400 mt-1">Fill in the botanical specifications</p>
                      </div>
                      <span className="bg-brand-accent/20 text-brand-accent text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">New Entry</span>
                    </div>

                    <div className="space-y-10">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-4">Item Name</label>
                        <input type="text" placeholder="e.g. Saffron Infused Malai Kofta" className="w-full bg-slate-50 border-none rounded-3xl p-6 text-lg font-semibold focus:ring-2 focus:ring-brand-primary transition-all" />
                      </div>

                      <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-4">Category</label>
                          <select className="w-full bg-slate-50 border-none rounded-3xl p-6 text-lg font-semibold focus:ring-2 focus:ring-brand-primary transition-all appearance-none">
                            <option>Currys</option>
                            <option>Breads</option>
                            <option>Rice</option>
                          </select>
                        </div>
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-4">Price</label>
                          <div className="relative">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 text-xl font-bold">₹</span>
                            <input type="number" placeholder="0.00" className="w-full bg-slate-50 border-none rounded-3xl p-6 pl-12 text-lg font-semibold focus:ring-2 focus:ring-brand-primary transition-all" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-4">Upload Image</label>
                        <div className="w-full h-64 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-4 group hover:bg-brand-light/30 transition-all cursor-pointer">
                          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                            <Plus size={32} />
                          </div>
                          <div className="text-center">
                            <p className="font-bold text-slate-600">Click to upload or drag and drop</p>
                            <p className="text-xs text-slate-400 mt-1">PNG, JPG or WEBP (Recommended 800×600px)</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-6 pt-6">
                        <button className="flex-1 bg-brand-primary text-white py-6 rounded-3xl font-bold text-xl flex items-center justify-center gap-3 shadow-lg shadow-brand-primary/20">
                          <ClipboardList size={24} /> Save Item
                        </button>
                        <button className="px-12 py-6 rounded-3xl font-bold text-xl text-slate-500 hover:bg-slate-50 transition-all">Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : renderPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
