/** @type {import('tailwindcss').Config} */
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
        72: '72px',
        511: '511px',
        950:  '950px'
      }, 
      minHeight: {
        620: '620px'
      },
      inset: {
        81: '370px',
        82: '390px',
        96.5: '400px',
        97: '440px'
      },
      width: {
        132: '132px',
        375: '375px',
        522: '522px',
        540: '540px',
        768: '768px',
        
      }
    },
  },
  plugins: [],
}

