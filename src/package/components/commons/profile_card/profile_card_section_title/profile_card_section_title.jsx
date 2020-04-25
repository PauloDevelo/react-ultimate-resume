import React from 'react';

import { createUseStyles } from 'react-jss';

import { Typography } from '@welovedevs/ui';
import { Badge } from '../../badge/badge';

import { styles } from './profile_card_section_title_styles';

const useStyles = createUseStyles(styles);

const ProfileCardSectionTitleComponent = ({ children, isRemote }) => {
    const classes = useStyles();
    return (
        <Typography variant="h2" component="h3" customClasses={{ container: classes.container }}>
            {isRemote && <Badge id={'Experiences.backCard.remote.badge'} defaultMessage={'Remote'}/>}
            {children}
        </Typography>
    );
};

export const ProfileCardSectionTitle = ProfileCardSectionTitleComponent;
