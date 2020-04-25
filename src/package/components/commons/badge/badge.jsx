import React from 'react';

import { createUseStyles } from 'react-jss';

import { FormattedMessage } from 'react-intl';

import { styles } from './badge_styles';

const useStyles = createUseStyles(styles);

const BadgeComponent = ({ id, defaultMessage }) => {
  const classes = useStyles();

  return (
    <>
      <span className={classes.badge}>
          <FormattedMessage id={id} defaultMessage={defaultMessage} />
      </span>
      <span>{' '}</span>
    </>
  );
};

export const Badge = BadgeComponent;
