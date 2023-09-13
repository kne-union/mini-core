import React, {useMemo} from "react";
import classnames from "classnames";
import {View} from "@tarojs/components";
import {stateColors as tagTypeEnum} from '../Common';

import style from "./style.module.scss";

const StateTag = ({
                      showBorder, text, children, type, showBackground, className, onClick
                  }) => {
    const tagColor = useMemo(() => ({
        color: tagTypeEnum?.[type]?.color || tagTypeEnum[type],
        borderColor: tagTypeEnum?.[type]?.borderColor || tagTypeEnum[type],
    }), [type]);

    return (<View
        style={{
            background: showBackground ? tagColor.color + "0F" : "none",
            color: tagColor.color,
            border: showBorder ? `2px solid ${tagColor.borderColor}` : "none",
        }}
        className={classnames(style["state-tag"], className,)}
        onClick={onClick}
    >
        {text || children}
    </View>);
};

StateTag.defaultProps = {
    type: "default", showBorder: false, showBackground: true, text: "", className: "",
};

export default StateTag;
