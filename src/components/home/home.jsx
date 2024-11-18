import React from 'react';
import About from './sections/about';
import Features from './sections/features';
import Hero from './sections/hero';


const Home = ({ onSelect }) => (
    <>
        {/* Hero Section */}
        <Hero onSelect={onSelect} />

        {/* About Section */}
        <About />
        
        {/* Features Section */}
        <Features />

    </>
);



export default Home;