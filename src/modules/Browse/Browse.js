import React from 'react';
import {PropTypes} from 'prop-types';
import {Card, CardText, CardHeader} from 'material-ui/Card';
import {HelpIcon} from 'uqlibrary-react-toolbox';

export default function Browse({title, text, help}) {
    return (
        <div className="layout-fill">
            <h1 className="title is-3">{title ? title : 'Browse'}</h1>
            <Card className="layout-card">
                <CardHeader className="card-header">
                    <div className="columns is-gapless is-mobile">
                        <div className="column">
                            <h2 className="title is-4">{title ? title : 'Browse'}</h2>
                        </div>
                        <div className="column is-narrow is-helpicon">
                            {help && <HelpIcon {...help} />}
                        </div>
                    </div>
                </CardHeader>

                <CardText className="body-1">
                    <div>
                        {text ? text : 'Browse this repository'}
                    </div>
                </CardText>

            </Card>
        </div>
    );
}

Browse.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    help: PropTypes.shape({
        title: PropTypes.string,
        text: PropTypes.string,
        buttonLabel: PropTypes.string
    })
};

