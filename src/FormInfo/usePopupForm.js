import React from 'react';
import FixedView from '../FixedView';
import Form from './Form';
import {usePopupView} from '../PopupView';
import {SubmitButton} from '@kne/react-form-antd-taro';
import {Button} from '@kne/antd-taro';
import style from './style.module.scss';

const usePopupForm = (props) => {
    const popupView = usePopupView(props);
    return (options) => {
        const {footer, children, formProps, ...others} = Object.assign({
            footer: [<Button block onClick={() => {
                apis.close();
            }}>取消</Button>, <SubmitButton block>保存</SubmitButton>]
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
                {footer && <FixedView className={style['form-footer']}>{footer}</FixedView>}
            </Form>
        }));
    };
};

export default usePopupForm;
