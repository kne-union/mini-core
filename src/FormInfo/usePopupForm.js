import React from 'react';
import FixedView from '../FixedView';
import Form from './Form';
import {usePopupView} from '../PopupView';
import {SubmitButton} from '@kne/react-form-antd-taro';


const usePopupForm = (props) => {
    const popupView = usePopupView(props);
    return (options) => {
        const {footer, children, formProps, ...others} = Object.assign({
            footer: <SubmitButton>提交</SubmitButton>
        }, options);
        const apis = popupView(Object.assign({}, others, {
            children: <Form {...Object.assign({}, formProps, {
                onSubmit: async (...args) => {
                    const res = await Promise.resolve(formProps?.onSubmit(...args));
                    if (res !== false) {
                        apis.close();
                    }
                }
            })}>
                {children}
                {footer && <FixedView>{footer}</FixedView>}
            </Form>
        }));
    };
};

export default usePopupForm;
