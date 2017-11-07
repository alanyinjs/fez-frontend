import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {propTypes} from 'redux-form/immutable';
import {Field} from 'redux-form/immutable';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import {SelectField, StandardCard, Alert, FileUploadField} from 'uqlibrary-react-toolbox';
import {locale, publicationTypes, validation} from 'config';
import {NavigationDialogBox} from 'modules/SharedComponents/NavigationPrompt';

import * as recordForms from './Forms';

export default class PublicationForm extends Component {
    static propTypes = {
        ...propTypes, // all redux-form props
        onFormSubmitSuccess: PropTypes.func.isRequired,
        onFormCancel: PropTypes.func.isRequired
    };

    static contextTypes = {
        selectFieldMobileOverrides: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.publicationTypes = publicationTypes({...recordForms});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.submitSucceeded !== this.props.submitSucceeded) {
            this.props.onFormSubmitSuccess();
        }
    }

    _getPublicationTypeForm = (publicationTypeId) => {
        const filteredPublicationType = publicationTypeId ?
            this.publicationTypes.filter((item) => { return item.id === publicationTypeId; }) : null;
        return filteredPublicationType && filteredPublicationType.length > 0 && filteredPublicationType[0].formComponent ?
            React.createElement(
                filteredPublicationType[0].formComponent,
                {
                    subtypeVocabId: filteredPublicationType[0].subtypeVocabId,
                    submitting: this.props.submitting
                })
            :
            null;
    };

    getAlert = ({submitFailed = false, dirty = false, invalid = false, submitting = false, error,
        submitSucceeded = false, alertLocale = {}}) => {
        let alertProps = null;
        if (submitFailed && error) {
            alertProps = {...alertLocale.errorAlert, message: alertLocale.errorAlert.message ? alertLocale.errorAlert.message(error) : error};
        } else if (!submitFailed && dirty && invalid) {
            alertProps = {...alertLocale.validationAlert};
        } else if (submitting) {
            alertProps = {...alertLocale.progressAlert};
        } else if (submitSucceeded) {
            alertProps = {...alertLocale.successAlert};
        }
        return alertProps ? (<Alert {...alertProps} />) : null;
    };


    render() {
        console.log('formValues.forField: ');
        console.log(this.props.formValues ? this.props.formValues.get('forField') : 'n/a');
        console.log('formValues.OrgUnitsField: ');
        console.log(this.props.formValues ? this.props.formValues.get('OrgUnitsField') : 'n/a');
        console.log('formValues.singleForField: ');
        console.log(this.props.formValues ? this.props.formValues.get('singleForField') : 'n/a');
        // populate publication types select box
        const publicationTypeItems = [
            ...(this.publicationTypes.filter((item) => {
                return item.isFavourite;
            }).map((item, index) => {
                return <MenuItem value={item.id} primaryText={item.name} key={'fav_' + index} disabled={!item.formComponent}/>;
            })),
            ...[<Divider key="div_0"/>],
            ...this.publicationTypes.filter((item) => {
                return item.hasFormComponent;
            }).map((item, index) => {
                return <MenuItem value={item.id} primaryText={item.name} key={index} disabled={!item.formComponent}/>;
            })
        ];
        const txt = locale.components.publicationForm;
        return (
            <form>
                <NavigationDialogBox when={this.props.dirty && !this.props.submitSucceeded} txt={txt.cancelWorkflowConfirmation} />

                <StandardCard title={txt.publicationType.title}  help={txt.publicationType.help}>
                    <Field
                        component={SelectField}
                        disabled={this.props.submitting}
                        name="rek_display_type"
                        {...this.context.selectFieldMobileOverrides}
                        floatingLabelText={txt.publicationType.inputLabelText}
                        floatingLabelFixed
                        className="requiredField"
                        hintText={txt.publicationType.inputLabelText}>
                        {publicationTypeItems}
                    </Field>
                </StandardCard>
                {
                    this._getPublicationTypeForm(this.props.formValues.get('rek_display_type'))
                }
                {
                    this.props.formValues.get('rek_display_type') > 0 &&
                    <StandardCard title={txt.fileUpload.title} help={txt.fileUpload.help}>
                        <Field
                            name="files"
                            component={ FileUploadField }
                            disabled={this.props.submitting}
                            requireFileAccess
                            validate={[validation.validFileUpload]} />
                    </StandardCard>
                }
                {
                    this.getAlert({...this.props, alertLocale: txt})
                }
                <div className="columns action-buttons">
                    <div className="column is-hidden-mobile"/>
                    <div className="column is-narrow-desktop">
                        <RaisedButton
                            fullWidth
                            label={txt.cancel}
                            disabled={this.props.submitting}
                            onTouchTap={this.props.onFormCancel} />
                    </div>
                    {this.props.formValues.get('rek_display_type') > 0 &&
                    <div className="column is-narrow-desktop">
                        <RaisedButton
                            secondary
                            fullWidth
                            label={txt.submit}
                            onTouchTap={this.props.handleSubmit}
                            disabled={this.props.submitting || this.props.invalid}
                        />
                    </div>
                    }
                </div>
            </form>
        );
    }
}
