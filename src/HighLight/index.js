import React, {createElement, useEffect, useState, createContext, useContext} from "react";
import {Text} from "@tarojs/components";
import classnames from "classnames";
import style from './style.module.scss';
import {isNil} from "lodash";

const context = createContext({});
const {
  Provider,
} = context;

const useHighLightContext = () => {
  return useContext(context);
};

const escapeSpecialCharacter = (str) => {
  const pattern =
    /[`+~!@#_$%^*()=|{}':;,\\[\].<>/?！￥…&（）—【】‘；：”“。，、？\s]/g;
  return str.replace(pattern, (match) => "\\" + match);
};

const splitText = (text, keywords, caseSensitive) => {
  let result = [];
  const allWordsRe = keywords
    .map(function (word) {
      return "(" + escapeSpecialCharacter(word) + ")";
    })
    .join("|");

  console.log('>>>>allWordsRe', allWordsRe);
  const regExp = new RegExp(allWordsRe, caseSensitive ? "gm" : "gim");

  result = text.split(regExp);

  return result;
};

export const HighLightProvider = ({keyword, caseSensitive, highlightClassName, children}) => {
  const _keyword = !isNil(keyword) ? Array.isArray(keyword) ? keyword.map(item => item.toString()) : [keyword.toString()] : [];
  return <Provider value={{keyword: _keyword, caseSensitive, highlightClassName}}>
    {children}
  </Provider>
}

HighLightProvider.defaultProps = {
  caseSensitive: false,  // 区分大小写
}

const HighLight = ({text: _text, className, tagName}) => {
  const {keyword, caseSensitive, highlightClassName} = useHighLightContext();
  const text = !isNil(_text) ? _text.toString() : _text;
  const [textArray, setTextArray] = useState([]);

  const splitTextByKeyword = (text, keyword, caseSensitive) => {
    if (keyword?.length > 0 && text) {
      return splitText(text, keyword, caseSensitive);
    } else {
      return [text];
    }
  }

  useEffect(() => {
    let textArray = splitTextByKeyword(text, keyword, caseSensitive);
    setTextArray(textArray);
  }, [text, keyword, caseSensitive]);

  return createElement(tagName, {
    className,
    children: text ? textArray.map((item, index) => {
      const isHighlight = (keyword || []).some(x => !caseSensitive ? (x || '').toLocaleString() === (item || '').toLowerCase() : x === item)
      return isHighlight ?
        <Text key={index}
              className={classnames(style['text'], style['high-light'], highlightClassName)}>{item}</Text> : item
    }) : text
  });
}

HighLight.defaultProps = {
  tagName: Text
}

export default HighLight;
