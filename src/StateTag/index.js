import React from "react";
import classnames from "classnames";
import {View} from "@tarojs/components";

import style from "./style.module.scss";

const StateTag = ({
                      showBorder, text, children, type, showBackground, className, onClick
                  }) => {
    return (<View
        style={{
            background: showBackground ? `var(--state-${type}-06)` : 'none',
            color: `var(--state-${type})`,
            border: showBorder ? `1px solid var(--state-${type})` : "none",
        }}
        className={classnames(style["state-tag"], className)}
        onClick={onClick}
    >
        {text || children}
    </View>);
};

StateTag.defaultProps = {
    type: "default", showBorder: false, showBackground: true, text: "", className: "",
};

export default StateTag;
