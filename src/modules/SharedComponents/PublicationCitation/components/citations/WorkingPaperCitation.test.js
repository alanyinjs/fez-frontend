jest.dontMock('./WorkingPaperCitation');

import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import WorkingPaperCitation from './WorkingPaperCitation';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PropTypes from 'prop-types';

import {workingPaper} from 'mock/data/testing/records';

function setup({publication, isShallow = false}) {
    const props = {
        publication: publication || {}, // : PropTypes.object.isRequired,
    };

    if(isShallow) {
        return shallow(<WorkingPaperCitation {...props} />);
    }

    return mount(<WorkingPaperCitation {...props} />, {
        context: {
            muiTheme: getMuiTheme()
        },
        childContextTypes: {
            muiTheme: PropTypes.object.isRequired
        }
    });
}

beforeAll(() => {
    
});

describe('WorkingPaperCitation renders ', () => {
    it('component with empty publication', () => {
        const wrapper = setup({});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('component with a mock espace record', () => {
        const wrapper = setup({ publication: workingPaper });
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('component with an empty doi view', () => {
        const wrapper = setup({
            publication: {
                ...workingPaper,
                fez_record_search_key_doi: {rek_doi: null}
            }
        });
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
