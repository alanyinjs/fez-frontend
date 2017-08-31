import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {locale} from 'config';

export default class PublicationStats extends Component {
    static propTypes = {
        publicationsStats: PropTypes.object
    }
    render() {
        const txt = locale.components.publicationStats;
        if (!this.props.publicationsStats) return (<div className="publicationsStatsEmpty"/>);
        return (
            <Table selectable={false} className="publicationsStatsTable">
                <TableHeader displaySelectAll={false} adjustForCheckbox={false} className="publicationsStatsHeader">
                    <TableRow>
                        <TableHeaderColumn
                            className="publicationsStatsHeaderTitle">{txt.publicationStatsTitle1}</TableHeaderColumn>
                        <TableHeaderColumn className="publicationsStatsHeaderTitle">
                            <div className="is-hidden-mobile">{txt.publicationStatsTitle2}</div>
                            <div className="is-hidden-tablet">{txt.publicationStatsTitle2mobile}</div>
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            className="publicationsStatsHeaderTitle">{txt.publicationStatsTitle3}</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    <TableRow>
                        <TableRowColumn
                            className="publicationsStatsRowTitle">{txt.publicationStatsRowTitle4}</TableRowColumn>
                        <TableRowColumn>{this.props.publicationsStats.thomson_citation_count_i.count}</TableRowColumn>
                        <TableRowColumn>{this.props.publicationsStats.scopus_citation_count_i.count}</TableRowColumn>
                    </TableRow>

                    <TableRow>
                        <TableRowColumn
                            className="publicationsStatsRowTitle">{txt.publicationStatsRowTitle5}</TableRowColumn>
                        <TableRowColumn>{this.props.publicationsStats.thomson_citation_count_i.years}</TableRowColumn>
                        <TableRowColumn>{this.props.publicationsStats.scopus_citation_count_i.years}</TableRowColumn>
                    </TableRow>

                    <TableRow>
                        <TableRowColumn
                            className="publicationsStatsRowTitle">{txt.publicationStatsRowTitle1}</TableRowColumn>
                        <TableRowColumn>{this.props.publicationsStats.thomson_citation_count_i.hindex}</TableRowColumn>
                        <TableRowColumn>{this.props.publicationsStats.scopus_citation_count_i.hindex}</TableRowColumn>
                    </TableRow>

                    <TableRow>
                        <TableRowColumn
                            className="publicationsStatsRowTitle">{txt.publicationStatsRowTitle2}</TableRowColumn>
                        <TableRowColumn>{this.props.publicationsStats.thomson_citation_count_i.avg.toFixed(1)}</TableRowColumn>
                        <TableRowColumn>{this.props.publicationsStats.scopus_citation_count_i.avg.toFixed(1)}</TableRowColumn>
                    </TableRow>

                    <TableRow>
                        <TableRowColumn
                            className="publicationsStatsRowTitle">{txt.publicationStatsRowTitle3}</TableRowColumn>
                        <TableRowColumn>{this.props.publicationsStats.thomson_citation_count_i.sum}</TableRowColumn>
                        <TableRowColumn>{this.props.publicationsStats.scopus_citation_count_i.sum}</TableRowColumn>
                    </TableRow>

                </TableBody>
            </Table>
        );
    }
}