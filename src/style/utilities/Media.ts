const customMediaQuery = (minWidth: number) =>
    `@media (min-width: ${minWidth}px)`;

export const above = {
    custom: customMediaQuery,
    xs: customMediaQuery(0),
    sm: customMediaQuery(576),
    md: customMediaQuery(768),
    lg: customMediaQuery(992),
    xl: customMediaQuery(1200),
};