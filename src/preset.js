import {presetStateColors} from './Common';

const preset = (options) => {
    options = Object.assign({}, options);
    presetStateColors(options.stateColors);
};

export default preset;
