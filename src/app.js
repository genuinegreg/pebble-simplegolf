
var Settings = require('settings');

var HoleController = require('./HoleController');
var RoundController = require('./RoundController');


if (Settings.option('defaultPar') === undefined) {
  Settings.option('defaultPar', 3);
}
if (Settings.option('defaultThrows') === undefined) {
  Settings.option('defaultThrows', 0);
}

var roundCtrl = new RoundController();
roundCtrl.show();