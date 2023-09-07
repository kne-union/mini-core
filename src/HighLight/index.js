import React, {createElement, useEffect, useState, createContext, useContext} from "react";
import {Text} from "@tarojs/components";
import classnames from "classnames";
import style from './style.module.scss';

const context = createContext({});
const {
  Provider,
} = context;

const useHighLightContext = () => {
  return useContext(context);
};

const splitText = (text, keyword) => {
  const result = [];
  const len = keyword.length;
  const dfs = (str) => {
    if (!str) return;
    const index = str.indexOf(keyword);
    if (index !== -1) {
      const pre = str.substr(0, index);
      const last = str.substr(index + len);
      if (pre) {
        result.push(pre);
      }
      result.push(keyword);
      dfs(last);
    } else {
      result.push(str);
    }
  };
  dfs(text);
  return result;
};

export const HighLightProvider = ({keyword, children}) => {
  return <Provider value={{keyword}}>
    {children}
  </Provider>
}

const HighLight = ({text, className, tagName}) => {
  const {keyword} = useHighLightContext();
  const [textArray, setTextArray] = useState([]);

  const splitTextByKeyword = (text, keyword) => {
    if (keyword && text) {
      return splitText(text, keyword);
    } else {
      return [text];
    }
  }

  useEffect(() => {
    let textArray = text ? splitTextByKeyword(text, keyword) : [];
    setTextArray(textArray);
  }, [text, keyword]);

  return createElement(tagName, {
    className,
    children: text ? textArray.map((item, index) => {
      return item === keyword ? <Text key={index} className={classnames(style['text'], {
        [style['high-light']]: item === keyword
      })}>{item}</Text> : item
    }) : text
  });
}

HighLight.defaultProps = {
  tagName: Text
}

export default HighLight;
