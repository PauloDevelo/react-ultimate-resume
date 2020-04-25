import React, { Fragment, memo, useMemo } from 'react';

import { useIntl, FormattedMessage } from 'react-intl';
import { createUseStyles, useTheme } from 'react-jss';

import { Typography } from '@welovedevs/ui';

import { ProfileCardSection } from '../../../../commons/profile_card/profile_card_section/profile_card_section';
import { ProfileCardSectionTitle } from '../../../../commons/profile_card/profile_card_section_title/profile_card_section_title';
import { ProfileCardSectionText } from '../../../../commons/profile_card/profile_card_section_text/profile_card_section_text';
import { ProfileCardAnimatedBack } from '../../../../commons/profile_card/profile_card_animated_back/profile_card_animated_back';
import { ProfileCardSectionSubtitle } from '../../../../commons/profile_card/profile_card_section_subtitle/profile_card_section_subtitle';
import { AnimatedUnderlinedButton } from '../../../../commons/animated_underlined_button/animated_underlined_button';

import { useCardVariant } from '../../../../hooks/profile_card_hooks/use_card_variant';

import { ReactComponent as LinkIcon } from '../../../../../assets/icons/link.svg';

import { getColorsFromCardVariant } from '../../../../../utils/styles/styles_utils';

import { styles } from './experiences_back_styles';
import { translations } from './experiences_translations';
import { useAdditionalNodes } from '../../../../hooks/use_additional_nodes';
import { existsAndNotEmpty } from '../../../utils/exists_and_not_empty';
import { NoWork } from './no_work/no_work';
import { useCustomization } from '../../../../hooks/use_customization';

const useStyles = createUseStyles(styles);

const ExperienceContent = ({ experience, variant, classes }) => {
    const { formatMessage } = useIntl();
    const [buildTitle] = useAdditionalNodes('cards.experiences.back.experience.content.buildTitle', null);
    const [customization] = useCustomization();
    const { id, name, summary, place, position, website, isRemote } = experience;
    const dateString = useMemo(() => {
        const displayFormat = customization?.fields?.work?.customDateFormat || 'MMM YYYY';
        if (!experience.endDate) {
            if (!experience.startDate) {
                return '';
            }
            return formatMessage(translations.since, { year: experience.startDate.format(displayFormat) });
        }
        const startDate = experience.startDate.isValid() ? experience.startDate.format(displayFormat) : '';
        const endDate = experience.endDate.isValid() ? experience.endDate.format(displayFormat) : '';
        return `${startDate} - ${endDate}`;
    }, [experience, customization?.fields?.work?.customDateFormat]);

    const [cardVariant] = useCardVariant();
    const theme = useTheme();
    const color = getColorsFromCardVariant(theme, cardVariant).backColor;

    const title = useMemo(() => {
        if (typeof buildTitle === 'function') {
            return buildTitle({ experience });
        }
        const builder = [];
        if (name) {
            builder.push(name);
        }
        if (place?.name) {
            if (builder.length) {
                builder.push(' - ');
            }
            builder.push(place.name);
        }
        if (builder.length) {
            builder.push(<br />);
        }
        builder.push(dateString);
        return builder.map((value, index) => <Fragment key={`builder_part_${index}`}>{value}</Fragment>);
    }, [buildTitle, experience]);
    return (
        <ProfileCardSection key={id} cardVariant={variant}>
            <ProfileCardSectionTitle isRemote={isRemote}>{position}</ProfileCardSectionTitle>
            <ProfileCardSectionSubtitle customClasses={{ container: classes.subtitle }}>
                {title}
            </ProfileCardSectionSubtitle>
            <ProfileCardSectionText>{summary}</ProfileCardSectionText>
            {website && (
                <div className={classes.detail}>
                <AnimatedUnderlinedButton color={color}>
                    <a className={classes.link} href={website} rel="noopener noreferrer" target="_blank">
                        <LinkIcon className={classes.detailIcon} />
                        <Typography customClasses={{ container: classes.detailTypography }} color="primary">
                            <FormattedMessage id="Project.section.link" defaultMessage="Link" />
                        </Typography>
                    </a>
                </AnimatedUnderlinedButton>
                </div>
            )}
        </ProfileCardSection>
    );
};

const Content = ({ data, handleAddButtonClick, classes }) => {
    const hasWork = useMemo(() => existsAndNotEmpty(data?.work), [data]);
    const experiences = data.work?.filter(({ position, summary }) => Boolean(position && summary));

    if (!hasWork) {
        return <NoWork {...{ handleAddButtonClick }} />;
    }
    return experiences.map((experience) => (
        <ExperienceContent key={`work_experience_${experience.id}`} experience={experience} classes={classes} />
    ));
};

const ExperiencesBackComponent = ({ data, handleAddButtonClick }) => {
    const classes = useStyles();
    return (
        <ProfileCardAnimatedBack title="Experiences">
            <Content {...{ data, handleAddButtonClick, classes }} />
        </ProfileCardAnimatedBack>
    );
};

export const ExperiencesBack = memo(ExperiencesBackComponent);
