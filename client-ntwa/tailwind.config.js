/** @type {import('tailwindcss').Config} */
import scrollbar from 'tailwind-scrollbar';

export default { 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {

      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Noto Serif', 'serif'],
        mono: ['Source Code Pro', 'monospace'],
      },
      height: {
        52: '52px',
        72: '72px',
        511: '511px',
        900: '900px',
        950:  '950px',
        970: '1020px',
        1000: '1000px',
        1050: '1150px'
      }, 
      minHeight: {
        620: '620px',
        1024: '1024px',
        
      },
      inset: {
        81: '370px',
        82: '390px',
        96.5: '400px',
        97: '440px'
      },

      screens: {
        largePhone: '410px'
      },
      width: {
    
        132: '132px',
        240: '240px',
        247: '247px',
        272: '272px',
        295: '305px',
        300: '300px',
        343: '343px',
        375: '375px',
        410: '410px',
        522: '522px',
        590: '590px',
        540: '540px',
        768: '768px',
        1440: '1440px'
        
        
        
      },
      scrollbar: {
        thin: '1px', // Customize your thin scrollbar thickness here
        extraThin: '1px', // Add a custom thinner scrollbar
      },
    },
  },
  plugins: [
    scrollbar,
  ],
  variants: {
    scrollbar: ['rounded']
  }
}

