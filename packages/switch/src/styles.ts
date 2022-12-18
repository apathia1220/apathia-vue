import { style, css, apply } from '@apathia/apathia.twind'

export const getStyles = ({
    isTrue,
    disabled,
    loading,
    large,
    small,
}: {
    isTrue: boolean
    disabled: boolean
    loading: boolean
    large: boolean
    small: boolean
}) => {
    const outerMinWidth = (large && '3.5rem') || (small && '1.75rem') || '2.75rem'
    const outerHeight = (large && '2rem') || (small && '1rem') || '1.5rem'
    const circleSize = `calc(${outerHeight} - 2px)`
    return {
        wrapper: style`inline-block box-border m-0 p-0 text-2xl focus:outline-none cursor-pointer text-sm ${css`
        line-height: auto;
        `} ${loading ? apply`opacity-40` : ''}`,
        switchWrap: style`inline-block relative select-none transition-all
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${disabled ? 'bg-opacity-40' : 'bg-opacity-0'}
        ${
            isTrue
            ? 'border(solid brand-primary) bg-brand-primary'
            : 'border(solid line-accent) bg-fill-neutral'
        }
        ${css`
            height: ${outerHeight};
            min-width: ${outerMinWidth};
            line-height: ${outerHeight};
            border-radius: ${outerHeight};
        `}
        `,
        outer: style`inline-block transition-all
        ${css`
            &:focus {
            box-shadow: 0 0 0 2px fade(rgb(140, 94, 247), 20%);
            outline: 0;
            }
            &:focus:hover {
            ${apply`shadow-none`}
            }
            &:after {
            ${apply`bg-fill-white absolute top-px cursor-pointer`}
            left: ${isTrue ? `calc(100% - ${outerHeight} + 1px)` : '1px'};
            height: ${circleSize};
            width: ${circleSize};
            content: '';
            border-radius: 50%;
            transition: left 0.2s ease-in-out, width 0.2s ease-in-out;
            }
            &:before {
            ${apply`bg-transparent absolute border(brand-primary r t-0 b-0 l-0) ${
                isTrue ? 'right-1' : 'left-1'
            }`}
            display: ${loading ? 'block' : 'none'};
            height: calc(${outerHeight} - 8px);
            width: calc(${outerHeight} - 8px);
            content: '';
            border-radius: 50%;
            top: 4px;
            z-index: 1;
            animation: switch-loading 1s linear;
            animation-iteration-count: infinite;
            }
            @keyframes switch-loading {
            0% {
                transform: rotate(0);
            }
            100% {
                transform: rotate(360deg);
            }
            }
        `}`,
        inner: style`px-1 text-content-white text-xs transition-all duration-300  ${css`
        margin: ${isTrue ? `0 ${circleSize} 0 0` : `0 0 0 ${circleSize}`};
        i {
            width: ${circleSize};
            height: ${circleSize};
            text-align: center;
        }
        `}`,
        inactiveText: style`${!isTrue ? 'text-brand-primary' : ''}`,
        activeText: style`${isTrue ? 'text-brand-primary' : ''}`,
    }
}
