import React, {createContext, createElement, useContext, useEffect, useId, useRef, useState} from "react";
import {Text} from "@tarojs/components";
import classnames from "classnames";
import style from './style.module.scss';
import {isNil, range} from "lodash";

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

const cutArray = (array, size) => {
  let index = 0;
  let newArr = [];
  while (index < array.length) {
    newArr.push(array.slice(index, index += size));
  }
  return newArr;
}

const HighLight = ({text: _text, className, tagName}) => {
  const containerId = useId().replace(/:/g, '_');
  const {keyword, caseSensitive, highlightClassName} = useHighLightContext();
  const text = !isNil(_text) ? _text.toString() : _text;
  const splitArrayRef = useRef([]);
  const [totalPage, setTotalPage] = useState(0);
  const [time, setTime] = useState(null);

  const splitTextByKeyword = (text, keyword, caseSensitive) => {
    if (keyword?.length > 0 && text) {
      return splitText(text, keyword, caseSensitive);
    } else {
      return [text];
    }
  };

  useEffect(() => {
    if (text && (keyword || []).length > 0) {
      let textArray = splitTextByKeyword(text, keyword, caseSensitive);
      const newArray = textArray.slice(0).filter(x => !!x);
      const pageSize = 100;
      let totalPage = textArray.length ? Math.ceil(textArray.length / pageSize) : 0 // 计算总页数
      setTotalPage(totalPage);
      const cutArrayList = cutArray(newArray, pageSize);
      splitArrayRef.current = cutArrayList;
      setTime(new Date().getTime())
    }
  }, [text, keyword, caseSensitive]);

  return createElement(tagName, {
    id: `high-light-${containerId}`,
    className,
    key: time,
    children: text && (keyword || []).length > 0 && totalPage > 0 ? range(0, totalPage).map(row => {
      return (splitArrayRef.current[row] || []).map((item, index) => {
        const isHighlight = (keyword || []).some(x => !caseSensitive ? (x || '').toLocaleString() === (item || '').toLowerCase() : x === item)
        return isHighlight ?
          <Text
            key={index}
            className={classnames(style['text'], style['high-light'], highlightClassName)}>
            {item}
          </Text> : item
      })
    }) : text
  });
}

HighLight.defaultProps = {
  tagName: Text
}

export default HighLight;
