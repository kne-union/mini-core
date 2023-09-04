import React, {useMemo} from "react";
import classnames from "classnames";
import {View} from "@tarojs/components";

import style from "./style.module.scss";

const tagTypeEnum = {
    default: "#666666",
    result: "#666666",
    success: "#027A48",
    progress: "#F09700",
    danger: "#D14343",
    info: "#155ACF",
    other: "#6740C3",
    primary: "#5CB8B2"
};

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
