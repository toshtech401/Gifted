/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      screens: {
  
        'sm': {'min': '330px', 'max': '767px'}, 
        'md': {'min': '768px', 'max': '1023px'},
        'lg': {'min': '1024px'},
       },
    },
  },
  plugins: [],
}