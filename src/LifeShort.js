export default function define() {
    'use strict';

    var color = {
        brown: "color:#560000;font-size:11px;",
        red: "color:#d83128;font-size:11px;",
        yellow: "color:#ea991b;font-size:11px;",
        green: "color:#93ba2f;font-size:11px;",
        blue: "color:#4da4e0;font-size:11px;"
    };

    if (typeof console === "object" && console.log && typeof console.log === "function") {
        if (isUA('chrome') && !isUA('edge')) {
            console.log(
                "%c  _________     _______    _____ _       _           _ \n" +
                "%c |__   __\\ \\   / / ____|  / ____| |     | |         | |\n" +
                "%c    | |   \\ \\_/ / |      | |  __| | ___ | |__   __ _| |\n" +
                "%c    | |    \\   /| |      | | |_ | |/ _ \\| '_ \\ / _` | |\n" +
                "%c    | |     | | | |____  | |__| | | (_) | |_) | (_| | |\n" +
                "%c    |_|     |_|  \\_____|  \\_____|_|\\___/|_.__/ \\__,_|_|\n" +
                "\n             Thousand Years Company&Companion                ",
                color.brown,
                color.red,
                color.yellow,
                color.green,
                color.blue,
                color.yellow,
            );
        } else {
            console.log(
                "%c  _________     _______    _____ _       _           _ \n" +
                "%c |__   __\\ \\   / / ____|  / ____| |     | |         | |\n" +
                "%c    | |   \\ \\_/ / |      | |  __| | ___ | |__   __ _| |\n" +
                "%c    | |    \\   /| |      | | |_ | |/ _ \\| '_ \\ / _` | |\n" +
                "%c    | |     | | | |____  | |__| | | (_) | |_) | (_| | |\n" +
                "%c    |_|     |_|  \\_____|  \\_____|_|\\___/|_.__/ \\__,_|_|\n" +
                "\n             Thousand Years Company&Companion       ",
            );
        }
        console.log("\x3e \x3e \x3e https://tyc.market/\n")
    }

    function isUA(userAgent) {
        return navigator.userAgent.toLowerCase().indexOf(userAgent) > -1;
    }
};