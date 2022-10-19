module.exports = {
  mode: 'jit',
  content: ['./src/**/*.js', '../public/*.html'],
  theme: {
    extend: {
      colors: {
        backdrop: '#F4F7FC',
        sidebar: '#FCFDFF',
        sidebarActive: '#EDEFF6',
        buttonColor: '#EDEFF6',
        hoverButton: '#CBD5E1',
        navTextColor: '#202020',
        container: '#FFFFFF',
        hoverIconColor: '#6B7280',
        error: '#DC2626',
      },
      fontFamily: {
        Mulish: ['Mulish'],
      },
      fontSize: {
        head: '26px',
        headMobile: '26px',
        toggle: '23px',
        toggleMobile: '23px',
        cardList: '19px',
        cardListMobile: '19px',
        nav: '17px',
        navHead: '21px',
        navHeadMobile: '25px',
        button: '20px',
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
