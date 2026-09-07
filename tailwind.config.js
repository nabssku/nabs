/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pop: {
          yellow: '#FDE047',
          orange: '#FB923C',
          blue: '#93C5FD',
          green: '#86EFAC',
          pink: '#F472B6',
          purple: '#C084FC',
          cream: '#FFFDF7',
          dark: '#18181B',
        },
      },
      boxShadow: {
        'pop-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
        'pop': '4px 4px 0px 0px rgba(0,0,0,1)',
        'pop-lg': '6px 6px 0px 0px rgba(0,0,0,1)',
        'pop-xl': '8px 8px 0px 0px rgba(0,0,0,1)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Space Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
