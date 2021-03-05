import { darken } from 'polished';
import { CSSObject } from 'styled-components';
import { HTMLAttributes } from 'react';

export const marginVertical = (marginTop: string, marginBottom = marginTop): CSSObject => ({
    marginTop,
    marginBottom,
});

export const marginHorizontal = (marginLeft: string, marginRight = marginLeft): CSSObject => ({
    marginLeft,
    marginRight,
});

export const paddingVertical = (paddingTop: string, paddingBottom = paddingTop): CSSObject => ({
    paddingTop,
    paddingBottom,
});

export const paddingHorizontal = (paddingLeft: string, paddingRight = paddingLeft): CSSObject => ({
    paddingLeft,
    paddingRight,
});

export const margin = (
    marginTop: string,
    marginRight = marginTop,
    marginBottom = marginTop,
    marginLeft = marginRight,
): CSSObject => ({
    marginTop,
    marginLeft,
    marginRight,
    marginBottom,
});

export const padding = (
    paddingTop: string,
    paddingRight = paddingTop,
    paddingBottom = paddingTop,
    paddingLeft = paddingRight,
): CSSObject => ({
    paddingTop,
    paddingLeft,
    paddingRight,
    paddingBottom,
});

export const screenSize: CSSObject = {
    width: '100vw',
    height: '100vh',
};

export const absolute: CSSObject = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
};

export const absoluteCenter: CSSObject = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

export const diagonalGradient = (from: string, to: string): CSSObject => ({
    background: `linear-gradient(to bottom right, ${from}, ${to})`,
});

export const topBottomGradient = (from: string, to: string): CSSObject => ({
    background: `linear-gradient(${from}, ${to})`,
});

export const size = (w: number, h = w, important: boolean): CSSObject => ({
    width: `${w}px ${important ? '!important' : ''}`,
    height: `${h}px ${important ? '!important' : ''}`,
});

export const iconSize = (w: number, h = w): CSSObject => size(w, h, true);

export const noSelect: CSSObject = {
    userSelect: 'none',
    cursor: 'default',
};

export const ellipsis: CSSObject = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
};

export const fixedHeight = (height: string): CSSObject => ({
    height,
    maxHeight: height,
    minHeight: height,
});

export const fixedWidth = (width: string): CSSObject => ({
    width,
    maxWidth: width,
    minWidth: width,
});

export const fixedSize = (width: string, height = width): CSSObject => ({
    ...fixedHeight(height),
    ...fixedWidth(width),
});

export const whiteish = (opacity = 1) => `rgba(255,255,255, ${opacity})`;
export const blackish = (opacity = 1) => `rgba(0,0,0, ${opacity})`;

export const hoverAndFocus = (style: string | CSSObject): CSSObject => ({
    '&:hover': style,
    '&:focus': style,
});

export const hoverAndActiveBackgroundColor = (color: string): CSSObject => ({
    backgroundColor: color,
    '&:hover': {
        backgroundColor: darken(0.03, color),
    },
    '&:active': {
        backgroundColor: darken(0.04, color),
    },
});

export const targetChild = <T>(component: HTMLAttributes<T>, styles: CSSObject): CSSObject => ({
    [`& .${component.className}`]: styles,
});

export const hoverChild = <T>(component: HTMLAttributes<T>, styles: CSSObject): CSSObject => ({
    '&:hover': {
        [`& .${component.className}`]: styles,
    },
});

export const autoGrid = (minColumnWidth = 250, gridGap = 0, mode = 'fill', maxColumnWidth = '1fr'): CSSObject => ({
    gridTemplateColumns: `repeat(auto-${mode}, minmax(${minColumnWidth}px, ${maxColumnWidth}))`,
    display: 'grid',
    gridGap,
});

export type gridProps = {
    columnGap?: number;
    cols?: number;
    rowGap?: number;
    gap?: number;
};

export const grid = ({ cols = 1, columnGap = 0, rowGap = columnGap, gap = 0 }: gridProps): CSSObject => {
    return {
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        rowGap: rowGap || gap,
        columnGap: columnGap || gap,
    };
};

export const absoluteCorner = (corner = 1, offset = 0): CSSObject => {
    return {
        position: 'absolute',
        ...(corner === 2 && {
            top: offset,
            right: offset,
        }),
        ...(corner === 1 && {
            left: offset,
            top: offset,
        }),
        ...(corner === 3 && {
            right: offset,
            bottom: offset,
        }),
        ...(corner === 4 && {
            left: offset,
            bottom: offset,
        }),
    };
};

export const unstyleButton: CSSObject = {
    background: 'none',
    outline: 'none',
    border: 'none',
};

export const hoverable = ({ color = 'white', background = false, initial = true }) => ({
    disabled,
}: {
    disabled: boolean;
}) => {
    const styleKey = background ? 'backgroundColor' : 'color';

    return {
        ...(!disabled && {
            cursor: 'pointer',
            ...(initial && { [styleKey]: color }),
            transition: 'all 150ms linear',
            '&:hover': {
                [styleKey]: initial ? darken(0.2, color) : color,
            },
        }),
    };
};

export const exceptLast = (styles: string | CSSObject): CSSObject => ({
    '&:not(:last-of-type)': styles,
});

export const exceptFirst = (styles: string | CSSObject): CSSObject => ({
    '&:not(:last-of-type)': styles,
});

export const spaceAll = (marginDirection: string, size: string, spaceBottom?: boolean): CSSObject => ({
    '& > *': {
        [marginDirection]: size,
        ...(spaceBottom && { marginBottom: size }),
    },
    '& > *:last-child': {
        [marginDirection]: 0,
        ...(spaceBottom && { marginBottom: 0 }),
    },
});

export const whiteishHover = (normal = 0.2, hover = 0.3, active = 0.4) => ({
    backgroundColor: whiteish(normal),
    '&:hover': {
        backgroundColor: whiteish(hover),
    },
    '&:active': {
        backgroundColor: whiteish(active),
    },
});

export const fontSize = (fontSize: number, lineHeight: number = fontSize) => ({
    fontSize,
    lineHeight: `${lineHeight}px`,
});

export const isVisible = ({ visible }: { visible: boolean }) => ({
    opacity: visible ? 1 : 0,
    transition: 'opacity 150ms linear',
});

export const activeOpacity = (normal = 0.7, hover = 0.9, active = 1) => ({
    opacity: normal,
    '&:hover': {
        opacity: hover,
    },
    '&:active': {
        opacity: active,
    },
    cursor: 'pointer',
});

export const centerMixin = (): CSSObject => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
});

export const mediaForMixin = (mediaBreakpoints: string[], directives: string): string =>
    mediaBreakpoints
        .map(
            (mediaBreakpoint) => `
    @media (max-width: ${mediaBreakpoint}) {
        ${directives}
    }
`,
        )
        .join('');
