import React from 'react';
import {AutoComplete as CommonAutoComplete, withPopup} from '../../../Common';
import {withDecoratorList} from '@kne/react-form-antd-taro';

const AutoCompleteInner = (props) => {
    return <CommonAutoComplete {...props} hasSafeArea/>
};


const AutoComplete = withDecoratorList(({render, showPopup, value, ...props}) => {
    return render({
        ...props, label: value, value, onClick: showPopup
    });
})(withPopup(AutoCompleteInner));

export default AutoComplete;




