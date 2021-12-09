import App from "./App";

import "core-js/features/map";
import "core-js/features/set";
import bridge from "@vkontakte/vk-bridge";

import React from "react";
import ReactDOM from "react-dom";
import {
    AdaptivityProvider,
    ConfigProvider,
    useAdaptivity,
    AppRoot,
    SplitLayout,
    SplitCol,
    ViewWidth,
    View,
    Panel,
    PanelHeader,
    Header,
    Group,
    SimpleCell
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

bridge.send("VKWebAppInit");

ReactDOM.render(
    <ConfigProvider>
        <AdaptivityProvider>
            <App/>
        </AdaptivityProvider>
    </ConfigProvider>,
    document.getElementById("root")
);
if (process.env.NODE_ENV === "development") {
    import("./eruda").then(({default: eruda}) => {
    }); //runtime download
}