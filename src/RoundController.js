var UI = require('ui');
var Settings = require('settings');
var HoleController = require('./HoleController');

function RoundController() {
  var _this = this;

  this.menu = new UI.Menu({
    sections: [{
      title: 'Round'
    }]
  });

  this.menu.on('show', function() {
    console.info('show menu');
    _this.menu.items(0, _this.items());
  });

  this.menu.on('select', function(e) {
    var holeController = new HoleController(_this, e.itemIndex + 1);
    holeController.show();
  });

  this.menu.on('longSelect', function(e) {

    console.log('Clear round modal');

    var confirmCard = new UI.Card({
      title: 'Reset round scores ?'
    })

    confirmCard.on('click', 'select', function() {
      Settings.data('round', []);
      _this.menu.items(0, _this.items());
      confirmCard.hide();
      confirmCard.hide();
    })

    confirmCard.show();


  });
}

RoundController.prototype.show = function() {
  this.menu.show();
};

RoundController.prototype.items = function() {

  var round;

  if (Settings.data('round')) {
    round = Settings.data('round');
  }
  else {
    round = [];
  }


  console.info('round');
  console.log(JSON.stringify(round));

  var items = round.map(function(elt, index) {

    console.log('map');
    
     console.log(JSON.stringify(elt));
    if (!elt) {
      elt = {};
    }

    elt.throws = elt.throws || Settings.option('defaultThrows');
    elt.par = elt.par || Settings.option('defaultpar');

    return {
      title: '#' + (index+1) + '.  ' + elt.throws + '/' + elt.par,
    };
  });

  items.push({
    title: 'Add hole'
  });

  console.info('items');
  console.log(JSON.stringify(items));

  return items;

};

module.exports = RoundController;