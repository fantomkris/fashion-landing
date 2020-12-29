var Menu = require('./controls/menu');

function Frontend() {
    this.init = function() {
        window.addEventListener('DOMContentLoaded', () => {
            new Menu();
        });
    }
}

module.exports = new Frontend();
