import Ember from 'ember';
import * as Utils from 'ember-utils';
import Plotly from 'plotlyjs/dist/plotly';
import layout from './templates/plotly.hbs!';
const { observer, run, computed } = Ember;

/**
Plotly.js component

## Demo

@demo example1

*/
const PlotlyComponent = Ember.Component.extend({
  layout: layout,
  data: null,
  title: '',
  margin: null,

  plotlyLayout: computed('title', 'margin', function() {
    const title = this.get('title');
    const margin = this.get('margin');

    return { title, margin };
  }),

  init() {
    this._super(...arguments);
    this.set('data', []);
    this.set('margin', {
      t: 0
    });
  },

  didInsertElement() {
    this._super(...arguments);
    Plotly.plot(this.element, this.get('data'), this.get('plotlyLayout'));
  },

  dataObserver: observer('data.[]', function() {
    run.scheduleOnce('render', this, this.handleDataChange);
  }),

  handleDataChange() {
    Plotly.newPlot(this.element, this.get('data'), this.get('plotlyLayout'));
  }
});

Utils.registerComponent('vcl-plotly', PlotlyComponent);
export default PlotlyComponent;
