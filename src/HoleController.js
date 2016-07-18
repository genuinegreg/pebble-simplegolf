var UI = require('ui');
var Settings = require('settings');


function HoleController(parent, number) {
  var _this = this;

  this.parent = parent;
  this.hole = number;
  

  this.card = new UI.Card({
    title: '#' + this.hole
  });

  this.card.on('show', function(e) {
    _this.loadData();
  })

  this.card.on('hide', function(e) {
    _this.card.hide();
  })

  this.card.on('click', 'up', function(e) {
    _this.incThrows();
  });

  this.card.on('click', 'down', function(e) {
    _this.decThrows();
  });

  this.card.on('longClick', 'up', function(e) {
    _this.incPar();
  });

  this.card.on('longClick', 'down', function(e) {
    _this.decPar();
  });

  this.card.on('click', 'select', function(e) {
    var nextHole = new HoleController(_this.parent, _this.hole+1);
    nextHole.show();
  });
  
   this.card.on('longClick', 'select', function(e) {
    var prevHole = new HoleController(_this.parent, _this.hole-1);
   prevHole.show();
  });
}

HoleController.prototype.loadData = function() {
  this.round = Settings.data('round');
  this.data = this.round[this.hole - 1];

  console.log('loading data');
  console.log(JSON.stringify(this.data))

  if (!this.data) {
    this.data = {
      throws: Settings.option('defaultThrows'),
      par: Settings.option('defaultPar')
    };
    
    this.saveData();
  }

  this.throwsDisplay(this.data.throws);
  this.parDisplay(this.data.par);
};



HoleController.prototype.saveData = function() {

  console.log('saving data');
  console.log(JSON.stringify(this.data));

  this.round[this.hole - 1] = this.data;
  Settings.data('round', this.round);
};

HoleController.prototype.show = function() {
  this.card.show();
};

HoleController.prototype.incThrows = function() {
  this.throwsDisplay(++this.data.throws);
  this.saveData();
};

HoleController.prototype.decThrows = function() {
  this.throwsDisplay(--this.data.throws);
  this.saveData();
};

HoleController.prototype.throwsDisplay = function(throws) {
  this.card.subtitle('Throws : ' + throws);
};

HoleController.prototype.incPar = function() {
  this.parDisplay(++this.data.par);
  this.saveData();
};

HoleController.prototype.decPar = function() {
  this.parDisplay(--this.data.par);
  this.saveData();
};

HoleController.prototype.parDisplay = function(par) {
  this.card.body('Par : ' + par);
};



module.exports = HoleController;