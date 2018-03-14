import {journalArticle} from 'mock/data/testing/records';
import GrantInformation from "./GrantInformation";

function setup(testProps, isShallow = true){
    const props = {
        ...testProps,
        publication: testProps.publication || journalArticle,
        history: testProps.history || {push: jest.fn()},
        actions: testProps.actions
    };
    return getElement(GrantInformation, props, isShallow);
}

describe('Grant Information Component ', () => {
    it('should render component', () => {
        const wrapper = setup({});
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('Table.grantInformation').length).toEqual(3);

        // first grant table would have 4 rows, agency, agency id, grant id and text
        expect(wrapper.find('Table.grantInformation').at(0).find('TableRow').length).toEqual(4);
        // second grant table would have 3 rows, agency, agency id and grant id
        expect(wrapper.find('Table.grantInformation').at(1).find('TableRow').length).toEqual(3);
    });

    it('should render component with empty publication', () => {
        const wrapper = setup({publication: {}});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render with publication without grant id data', () => {
        delete journalArticle['fez_record_search_key_grant_id'];
        const wrapper = setup({publication: journalArticle});
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
