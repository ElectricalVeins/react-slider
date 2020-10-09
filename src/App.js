import React from 'react';
import Carousel from './components/Carousel';
import slides from './components/Carousel/slides.json';

console.log(slides);

function App() {
  return (
    <Carousel slides={slides} />
  );
}

export default App;
