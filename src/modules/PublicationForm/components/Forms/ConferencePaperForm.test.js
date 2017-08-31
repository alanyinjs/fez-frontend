jest.dontMock('./ConferencePaperForm');

import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import ConferencePaperForm from './ConferencePaperForm';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PropTypes from 'prop-types';
import injectTapEventPlugin from 'react-tap-event-plugin';

function setup({submitting, vocabId, isShallow = true}){

    const props = {
        submitting: submitting || false, // : PropTypes.bool,
        vocabId: vocabId || 0, // : PropTypes.number
    };

    if(isShallow) {
        return shallow(<ConferencePaperForm {...props} />);
    }

    return mount(<ConferencePaperForm {...props} />, {
        context: {
            muiTheme: getMuiTheme()
        },
        childContextTypes: {
            muiTheme: PropTypes.object.isRequired
        }
    });

}

beforeAll(() => {
    injectTapEventPlugin();
});

describe('ConferencePaperForm renders ', () => {
    it('component', () => {
        const wrapper = setup({});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('component with 16 input fields', () => {
        const wrapper = setup({});
        expect(wrapper.find('Field').length).toEqual(16);
    });

    it('component with 7 required input fields', () => {
        const wrapper = setup({});
        expect(wrapper.find('Field .requiredField').length).toEqual(7);
    });

    it('component with all fields disabled', () => {
        const wrapper = setup({submitting: true});
        wrapper.find('Field').forEach(field => {
            expect(field.props().disabled).toEqual(true);
        })
    });
});