export const primary = '#6448D2';
export const primaryStrong = '#6E49FF';

export const white = "#fff"
export const lightGray = "#E3E3E3";
export const darkGray = "#474747";
export const blackBlue = "#151932";
export const softBlack = "#3E3E3E"
export const black = "#171717";

export const scale = {
    0: {
        solid: '#22C21E',
        linear: '#22C21E'
    },
    1: {
        solid: '#6BD643',
        linear: 'linear-gradient(270deg, #51CF23 0%, rgba(81, 207, 35, 0.63) 100%)'
    },
    2: {
        solid: '#9CE040',
        linear: ' linear-gradient(270deg, #8CDB22 0%, rgba(140, 219, 34, 0.54) 100%);'
    },
    3: {
        solid: '#C9EE39',
        linear: 'linear-gradient(270deg, #C9EE39 0%, rgba(201, 238, 57, 0.54) 100%);'
    },
    4: {
        solid: '#EBEB23',
        linear: 'linear-gradient(270deg, #EAEA00 0%, rgba(231, 231, 93, 0.67) 100%);'
    },
    5: {
        solid: '#F0D12D',
        linear: 'linear-gradient(270deg, #EFCF22 0%, rgba(239, 207, 34, 0.54) 100%);'
    },
    6: {
        solid: '#FFB60C',
        linear: 'linear-gradient(270deg, #FFB50B 0%, rgba(255, 181, 11, 0.54) 100%);'
    },
    7: {
        solid: '#FF9819',
        linear: 'linear-gradient(270deg, #FF9613 0%, rgba(255, 150, 19, 0.54) 100%);'
    },
    8: {
        solid: '#FF771F',
        linear: 'linear-gradient(270deg, #FF7115 0%, rgba(255, 113, 21, 0.54) 100%);'
    },
    9: {
        solid: '#FF571E',
        linear: 'linear-gradient(270deg, #FF541A 0%, rgba(255, 84, 26, 0.7) 100%);'
    },
    10: {
        solid: '#EC100D',
        linear: 'linear-gradient(270deg, #EB0808 0%, rgba(255, 84, 26, 0.7) 100%);'
    },
}

export const colorScale = (percent: number) => {
    if (percent / 10 === Math.floor(percent / 10)) return scale[percent / 10].solid;
    const colorA = scale[Math.floor(percent / 10)].solid;
    const colorB = scale[Math.ceil(percent / 10)].solid;
    const weight = (percent % 10) / 10;
    return blend(colorA, colorB, weight)

}

const blend = (colorInHexA: string, colorInHexB: string, weight: number) => {
    const [redA, greenA, blueA] = extractRGBValues(colorInHexA);
    const [redB, greenB, blueB] = extractRGBValues(colorInHexB);
    const red = mixValues(redA, redB, weight)
    const green = mixValues(greenA, greenB, weight)
    const blue = mixValues(blueA, blueB, weight)
    return `#${red}${green}${blue}`
}

const extractRGBValues = (colorInHex: string) => {
    const red = parseInt(`${colorInHex[1]}${colorInHex[2]}`, 16);
    const green = parseInt(`${colorInHex[3]}${colorInHex[4]}`, 16);
    const blue = parseInt(`${colorInHex[5]}${colorInHex[6]}`, 16);
    return [red, green, blue]
}

const mixValues = (valA: number, valB: number, weight: number) => {
    const int = Math.floor(valA + (weight * (valB - valA)))
    let hex = int.toString(16)
    if (hex.length === 1) hex = `0${hex}`
    return hex
}