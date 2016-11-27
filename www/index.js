window.test_DES = window.test_DES || {};

$(function() {
    // Uncomment the line below to disable platform-specific look and feel and to use the Generic theme for all devices
    // DevExpress.devices.current({ platform: "generic" });
    // To customize the Generic theme, use the DevExtreme Theme Builder (http://js.devexpress.com/ThemeBuilder)
    // For details on how to use themes and the Theme Builder, refer to the http://js.devexpress.com/Documentation/Guide/#themes article

    $(document).on("deviceready", function () {
        navigator.splashscreen.hide();
        if(window.devextremeaddon) {
            window.devextremeaddon.setup();
        }
        $(document).on("backbutton", function () {
            DevExpress.processHardwareBackButton();
        });
    });

    function onNavigatingBack(e) {
        if (e.isHardwareButton && !test_DES.app.canBack()) {
            e.cancel = true;
            exitApp();
        }
    }

    function exitApp() {
        switch (DevExpress.devices.real().platform) {
            case "android":
                navigator.app.exitApp();
                break;
            case "win":
                window.external.Notify("DevExpress.ExitApp");
                break;
        }
    }


    test_DES.app = new DevExpress.framework.html.HtmlApplication({
        namespace: test_DES,
        layoutSet: DevExpress.framework.html.layoutSets[test_DES.config.layoutSet],
        navigation: test_DES.config.navigation,
        commandMapping: test_DES.config.commandMapping
    });
    test_DES.app.router.register(":view/:id", { view: "home", id: undefined });
    test_DES.app.on("navigatingBack", onNavigatingBack);
    test_DES.app.navigate("directory");
});
