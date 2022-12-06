import React, { useState, useEffect } from 'react';

const Test = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widgets.skyscanner.net/widget-server/js/loader.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  })
}

export default Test;