export const styles = (theme) => {
    const {
        miscellaneous: { spacing }
    } = theme;
    return {
        subtitle: {
            marginBottom: spacing * 2
        },
        detail: {
            display: 'flex',
            alignItems: 'center',
            margin: spacing * 1.5
        },
        link: {
            display: 'flex',
            alignItems: 'center'
        },
        detailIcon: {
            height: 20,
            width: 'auto',
            marginRight: spacing * 1.5,
            '&:not($detailDeleteIcon) > path': {
                fill: 'currentColor'
            }
        },
        detailTypography: {
            color: ['inherit', '!important']
        }
    };
};
