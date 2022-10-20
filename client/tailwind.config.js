module.exports = {
  mode: 'jit',
  content: ['./src/**/*.js', '../public/*.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /*/Dark mode/*/
        backdropColor: '#000000',

        navColorMobile: '#000000',
        navColor: '#1C1C1D',
        navHeadTextColor: '#FFFFFF',
        navHeadTextColorMobile: '#3A82F7',
        navLinkColor: '#9CA3AF',
        navLinkColorActive: '#3A82F7',
        navLogoutColorMobile: '#FFFFFF',
        navLogoutColor: '#9CA3AF',

        containerColor: '#1C1C1D',

        headingColor: '#FFFFFF',
        itemColor: '#CCCCCC',

        buttonColor: '#313135',
        buttonTextColor: '#FFFFFF',
        buttonHoverColor: '#9CA3AF',
        iconColor: '#9CA3AF',
        hoverIconColor: '#FFFFFF',

        formInputColor: '#1C1C1D',
        formPlaceholderColor: '#9CA3AF',
        formSelectedColor: '#FFFFFF',
        formSelectColor: '#FFFFFF',

        editOffcanvasColor: '#1C1C1D',

        errorColor: '#DC2626',

        /*/Light mode/*/
        backdropColorLight: '#F4F7FC',

        navColorMobileLight: '#FCFDFF',
        navColorLight: '#FCFDFF',
        navHeadTextColorLight: '#000000',
        navHeadTextColorMobileLight: '#000000',
        navLinkColorLight: '#202020',
        navLinkColorActiveLight: '#000000',
        navLinkColorBgActiveLight: '#EDEFF6',
        navLogoutColorMobileLight: '#000000',
        navLogoutColorLight: '#000000',

        containerColorLight: '#FFFFFF',

        headingColorLight: '#000000',
        itemColorLight: '#000000',

        buttonColorLight: '#EDEFF6',
        buttonTextColorLight: '#000000',
        buttonHoverColorLight: '#CBD5E1',
        iconColorLight: '#000000',
        hoverIconColorLight: '#6B7280',

        formInputLight: '#FFFFFF',
        formEmptyColorLight: '#9CA3AF',
        formPlaceholderColorLight: '#9CA3AF',
        formSelectedColorLight: '#000000',

        editOffcanvasColorLight: '#FCFDFF',

        errorColorLight: '#DC2626',
      },
      fontFamily: {
        Inter: ['Inter'],
      },
      fontSize: {
        headMobile: '26px',
        head: '26px',
        toggleMobile: '23px',
        toggle: '23px',
        cardListMobile: '19px',
        cardList: '19px',
        nav: '17px',
        navHeadMobile: '25px',
        navHead: '21px',
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
