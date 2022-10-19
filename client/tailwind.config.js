module.exports = {
  mode: 'jit',
  content: ['./src/**/*.js', '../public/*.html'],
  theme: {
    extend: {
      colors: {
        backdrop: '#F4F7FC',
        sidebar: '#FCFDFF',
        sidebarActive: '#EDEFF6',
        button: '#EDEFF6',
        hoverButton: '#CBD5E1',
        icon: '#00000',
        container: '#FFFFFF',
      },
      fontFamily: {
        inter: ['Inter'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
