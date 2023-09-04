import React, {useState} from "react";
import {Input, View} from '@tarojs/components';
import {withFetch} from "@kne/react-fetch";
import {hooks, withItem} from "@kne/react-form-antd-taro";
import {usePreset} from "../../../Global";
import style from './style.module.scss';
import {ListSelect as CommonListSelect, withPopup} from "../../../Common";
import classnames from 'classnames';

const {useDecorator} = hooks;

const ListSelectInner = (props) => {
  return <CommonListSelect {...props} valueType="all" defaultValue={props.value}/>
}


const CountryCode=withPopup(ListSelectInner)


const getCountryCode=({code,data})=>{
  if(!code) return "+86";

  const _code=`+${data.find(item=>item.ab===code)?.country_code}`
  return _code?_code:"+86"
}

const PhoneNumberFieldInner=withFetch(({data,value={},onChange,req,...props})=>{
  const [visible,setVisible]=useState();

  value = Object.assign(
    {
      code:"CN",
      value:null
    },
    value
  );

  return <View className={classnames(style['flex'],{
    [style['error-flex']]:!!req && !value.value
  })}>
    <View className={style['code']} onClick={()=>setVisible(true)}>{getCountryCode({code:value.code,data})}</View>
    <Input className={style['number']} label={""} value={value.value}
           onInput={(e)=>{

             onChange(Object.assign({}, value, { value:e.detail.value }));
           }}
           placeholder={props.placeholder||"请输入"}/>
    <CountryCode
      title={"请选择区号"}
      className={style['pop-number']}
      open={visible}
      multiple={false}
      onChange={(v)=>{
        onChange(Object.assign({}, value, { code:v[0].value }));
        setVisible(false)
      }}
      onClose={()=>setVisible(false)}
      options={data.map((item) => ({
        render:()=>`+${item.country_code} (${item.country_name_cn})`,
        label:`+${item.country_code}`,
        value: item.ab
      }))}
    />
  </View>
})

const PhoneNumberFieldWithData=(props)=>{
  const {apis: apisBase} = usePreset();
  const apis = Object.assign({}, apisBase, props.apis);

  return <PhoneNumberFieldInner {...props} {...apis.staticData.countryData}/>
}

const PhoneNumber = (props) => {
  const render = useDecorator(Object.assign({
    placeholder: `请输入${props.label}`, req: props?.rule?.indexOf('REQ') > -1,
    rule: (rule => {
      const rules = (rule || '').split(' ');
      const reqIndex = rules.indexOf('REQ');
      if (reqIndex > -1) {
        rules.splice(reqIndex + 1, 0, 'PHONE_NUMBER');
      } else {
        rules.unshift('PHONE_NUMBER');
      }
      return rules.join(' ');
    })(props.rule)}, props));
  return render(PhoneNumberFieldWithData);
};

PhoneNumber.format = ({ code, value, data }) => {
  const phoneCode = getCountryCode({data,code});

  if (!phoneCode || !value) {
    return '';
  }
  return `+${phoneCode} ${value}`;
};


PhoneNumber.Item = withItem(PhoneNumber);


export default PhoneNumber;
