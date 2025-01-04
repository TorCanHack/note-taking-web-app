/** @type {import('tailwindcss').Config} */
export default { 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      

      height: {
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
        375: '375px',
        522: '522px',
        540: '540px',
        768: '768px',
        
      }
    },
  },
  plugins: [],
}

