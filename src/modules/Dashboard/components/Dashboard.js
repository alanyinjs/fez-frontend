import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardText, CardHeader} from 'material-ui/Card';
import {publicationYearsBig as publicationYearsMockData} from '../../../mock/data/academic/publicationYears';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import CircularProgress from 'material-ui/CircularProgress';
import AuthorsPublicationsCount from '../../DonutChart/components/AuthorsPublicationsCount';
import {AuthorsPublicationsPerYearChart} from 'uqlibrary-react-toolbox';
import {loadAuthorDetails} from 'actions';
import DashboardAuthorDetails from './DashboardAuthorDetails';
import DashboardArticleCount from './DashboardArticleCount';

class Dashboard extends React.Component {

    static propTypes = {
        account: PropTypes.object.isRequired,
        authorDetails: PropTypes.object.isRequired,
        authorDetailsLoading: PropTypes.bool.isRequired,
        history: PropTypes.object,
        claimPublicationResults: PropTypes.object,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            showAppbar: true
        };
    }

    componentDidMount() {
        // fetch data to display here
        // this.props.loadUsersPublications(123);
        this.props.dispatch(loadAuthorDetails(this.props.account.get('id')));
    }

    hideAppBar = () => {
        this.setState({showAppbar: false});
    };

    claimYourPublications = () => {
        this.props.history.push('/claim-publications');
    };

    render() {
        const {
            authorDetails,
            authorDetailsLoading
        } = this.props;

        return (
            <div className="layout-fill">
                <div className="layout-card">
                    <div className="columns is-multiline is-gapless">
                        {authorDetails && (
                        <div className="column is-12 is-hidden-mobile">
                            {authorDetailsLoading ? (
                                <div className="isLoading is-centered">
                                    <CircularProgress size={30} thickness={3} primary />
                                </div>
                            ) : (
                                <div className="image-cover">
                                    <div className="columns is-gapless">
                                        <div className="column">
                                            <DashboardAuthorDetails authorDetails={authorDetails}/>
                                        </div>
                                        <div className="articleCountColumn column is-narrow is-hidden-tablet-only">
                                            <DashboardArticleCount articleFirstYear={authorDetails.espace.first_year}
                                                                   articleLastYear={authorDetails.espace.last_year}
                                                                   articleCount={authorDetails.espace.doc_count}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        )}

                        <div className="notification-wrap column is-12">
                            {this.props.claimPublicationResults.size > 0 && this.state.showAppbar && (
                                <div className="warning alertWrapper">
                                    <div className="columns">
                                        <div className="column is-narrow alertIcon">
                                            <FontIcon className="material-icons">warning</FontIcon>
                                        </div>
                                        <div className="column alertText">
                                            {`We have found ${this.props.claimPublicationResults.size} article(s) that could possibly be your work.`}
                                        </div>
                                        <div className="column is-narrow claim-button">
                                            <FlatButton label="Claim your publications now"
                                                        onTouchTap={this.claimYourPublications}
                                                        className="claim-publications"/>
                                        </div>
                                        <div className="column is-narrow is-hidden-mobile">
                                            <IconButton onTouchTap={this.hideAppBar}><NavigationClose
                                                className="hide-appbar"/></IconButton>
                                        </div>
                                    </div>
                                </div> )}

                        </div>
                    </div>

                    <div className="columns">
                        <div className="column">
                            <Card style={{backgroundColor: '#36B6D6'}}>
                                <CardHeader className="card-header">
                                    <h2 className="title is-4 color-reverse">eSpace publications by year</h2>
                                </CardHeader>

                                <CardText className="body-1">
                                    <AuthorsPublicationsPerYearChart rawData={publicationYearsMockData}
                                                                     yAxisTitle="Total publications"/>
                                </CardText>
                            </Card>
                        </div>
                    </div>

                    <div className="columns">
                        <div className="column is-4">
                            <Card style={{backgroundColor: '#ed5c8f'}}>
                                <CardHeader className="card-header">
                                    <h2 className="title is-4 color-reverse">Document types overview</h2>
                                </CardHeader>

                                <CardText className="body-1">
                                    <AuthorsPublicationsCount/>
                                </CardText>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
