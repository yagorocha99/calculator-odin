/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        'calculator': ['Calculator']
      },
      colors:{
        'operator' : '#8693AB',
        'op-hover' : '#434D60',
        'number' : '#AAB9CF',
        'nb-hover' : '#496083',
        'background' : '#212227',
        'display' : '#BDD4E7',
        'calculator' : '#637074',
      }
    },
  },
  plugins: [],
}

