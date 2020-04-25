import { getHexFromPaletteColor } from '../../../utils/styles/styles_utils';

export const styles = (theme) => ({
      badge: {
        'padding-right': '.6em',
        'padding-left': '.6em',
        'border-radius': '10rem',
        display: 'inline-block',
        padding: '.25em .4em',
        'font-size': '75%',
        'font-weight': '700',
        'line-height': '1',
        'text-align': 'center',
        'white-space': 'nowrap',
        'vertical-align': 'initial',
        transition: 'color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out',
        color: getHexFromPaletteColor(theme, 'light'),
        'background-color': getHexFromPaletteColor(theme, 'primary')
      }
  });
