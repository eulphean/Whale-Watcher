import axios from 'axios';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import CoverPage from '@/components/CoverPage';
import WhaleCanvas from '@/components/WhaleCanvas';
import useGlobalStore from '@/components/stores/useGlobalStore';

const inter = Inter({ subsets: ['latin'] });


export default function Home() {
  // NOTE: We are skipping the initial page for now. 
  useEffect(() => {
    const randomNumber = (0.5 + Math.random()) * 100;
    useGlobalStore.setState({ numRandomAgents: 150 });
  }, []);
  
  // NOTE: We set showExperience to true (for some time)
  const [showExperience, setShowExperience] = useState(true);

  return <>
    {showExperience ? 
      <WhaleCanvas /> : 
      <CoverPage onShowExperience = {() => setShowExperience(true)} />
    }
  </>
}