import FileUploadEmbargoDate from './FileUploadEmbargoDate';

function setup(testProps, isShallow = true) {
    const props = {
        minDate: new Date('2016'),
        value: new Date('2016'),
        ...testProps
    };

    return getElement(FileUploadEmbargoDate, props, isShallow);
}

describe('Component FileUploadEmbargoDate', () => {
    beforeEach(() => {
        // Set a mock date for account API
        Date.now = jest.genMockFunction().mockReturnValue('2016-01-01T00:00:00.000Z');
    });

    it('should render with default setup', () => {
        const wrapper = setup({});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render disabled', () => {
        const wrapper = setup({disabled: true});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render datepicker on key pressed', () => {
        const openDialogTestFn = jest.fn();

        const wrapper = setup({}, false);

        expect(toJson(wrapper)).toMatchSnapshot();

        wrapper.find('FileUploadEmbargoDate').instance().datePickerRef.openDialog = openDialogTestFn;
        wrapper.find('FileUploadEmbargoDate').instance()._onKeyPress();
        expect(openDialogTestFn).toHaveBeenCalled();
    });

    it('should set correct date on date changed', () => {
        const onDateChangedTestFn = jest.fn();
        const props = {
            locale: {
                datePickerLocale: 'en-AU'
            },
            defaultConfig: {
                fileMetaKey: 'date',
                dateTimeFormat: global.Intl.DateTimeFormat,
                fieldName: 'accessDate'
            },
            onChange: onDateChangedTestFn
        };

        const wrapper = setup(props);
        expect(toJson(wrapper)).toMatchSnapshot();

        wrapper.instance()._onChange({}, 'Sat Feb 10 2018 00:00:00 GMT+1000 (AEST)');
        wrapper.update();
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(onDateChangedTestFn).toHaveBeenCalled();
    });
});