(function (module) {
"use strict";

class ActionProcessor {
    constructor (manager) {
        this.manager = manager;
    }

    update(dt) {
        let state = this.manager.getComponentsData('Board')[0];
        let game = this.manager.getComponentsData('Game')[0];
    }
}

module.exports = {
    ActionProcessor
};

})(module);
