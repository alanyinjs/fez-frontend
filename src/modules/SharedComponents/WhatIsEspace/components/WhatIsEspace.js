import React, {PureComponent} from 'react';

import {StandardCard} from 'modules/SharedComponents/Toolbox/StandardCard';
import {ExternalLink} from 'modules/SharedComponents/ExternalLink';
import {Link} from 'react-router-dom';

import {locale} from 'locale';

export default class WhatIsEspace extends PureComponent {
    render() {
        const txt = locale.components.whatIsEspace;
        return (
            <StandardCard title={txt.title} className="whatIsEspace primaryHeader">
                {txt.text}
                {
                    txt.readMoreLink.indexOf('http') === -1 &&
                    <Link to={txt.readMoreLink}>{txt.readMoreLabel}</Link>
                }
                {
                    txt.readMoreLink.indexOf('http') >= 0 &&
                    <ExternalLink href={txt.readMoreLink} title={txt.readMoreTitle} aria-label={txt.readMoreTitle}>
                        {txt.readMoreLabel}
                    </ExternalLink>
                }
            </StandardCard>
        );
    }
}
