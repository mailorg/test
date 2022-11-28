import object from '@mailobj-browser/front/js/utils/object.js'

const screenSizes = object(null, {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200,
})

export const device = object(null, {
    isScreenXs: () => {
        const width = window.innerWidth
        return width <= screenSizes.xs
    },
    isScreenSm: () => {
        const width = window.innerWidth
        return !!(width >= screenSizes.sm && width < screenSizes.md)
    },
    isScreenMd: () => {
        const width = window.innerWidth;
        return !!(width >= screenSizes.md && width < screenSizes.lg);
    },
    isScreenLg: () => {
        const width = window.innerWidth;
        return width >= screenSizes.lg;
    },
})