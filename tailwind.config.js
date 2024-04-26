/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '320px',
        sm: '330px',
        sms: '386px',
        smm: '410px',
        sml: '500px',
        md: '667px',
        mdl: '768px',
        lg: '960px',
        lgl: '1024px',
        lgx: '1134px',
        xl: '1300px',
        xll: '1380px',
        xlx: '1400px',
        xxl: '1600px',
      },
      fontFamily: {
        barlow: ['Barlow Semi Condensed', 'sans-serif'],
        'poppins-bold': ['Poppins', 'sans-serif', '700'],
      },
      colors: {
        overlay: 'rgba(0, 0, 0, 0.4);',
        lightOpac: 'rgba(255, 255, 255, 0.8);',
        blueCol: 'rgb(29, 161, 242);',
        dOverlay: 'rgba(0, 0, 0, 0.2);',
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        10: '10',
        50: '50',
        100: '100',
      },
    },
  },
  plugins: [],
};
