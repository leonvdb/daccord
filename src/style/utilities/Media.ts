const customMediaQuery = (minOrMax: string, breakpoint: number) =>
    `@media (${minOrMax}-width: ${breakpoint}px)`;

const sizes = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
}

export const above = {
    custom: customMediaQuery,
    xs: customMediaQuery('min', sizes.xs),
    sm: customMediaQuery('min', sizes.sm),
    md: customMediaQuery('min', sizes.md),
    lg: customMediaQuery('min', sizes.lg),
    xl: customMediaQuery('min', sizes.xl),
};

export const below = {
    custom: customMediaQuery,
    xs: customMediaQuery('max', sizes.xs),
    sm: customMediaQuery('max', sizes.sm),
    md: customMediaQuery('max', sizes.md),
    lg: customMediaQuery('max', sizes.lg),
    xl: customMediaQuery('max', sizes.xl),
};


