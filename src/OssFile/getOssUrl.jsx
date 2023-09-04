import merge from "lodash/merge";

const fileCache = {};

const getOSSUrl = ({value, ajax, apis}) => {
  if (fileCache[value] && (new Date()) - fileCache[value].lastTime < 1000 * 60 * 100) {
    return fileCache[value].value;
  }
  fileCache[value] = {
    lastTime: new Date(), value: ajax(merge({}, apis.file.getFileUrl, {params: {id: value}})).then(({data}) => {
      return data.data;
    })
  };
  return fileCache[value].value;
};

export default getOSSUrl;
