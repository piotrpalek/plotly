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
  showLegend: true,

  displayModeBar: true,
  displayLogo: false,
  showLink: false,
  staticPlot: false,
  scrollZoom: true,

  plotlyLayout: computed('title', 'margin', 'showLegend', function() {
    const title = this.get('title');
    const margin = this.get('margin');
    const showLegend = this.get('showLegend');

    return { title, margin, showLegend };
  }),

  plotlyConfig: computed('displayModeBar', 'displayLogo', 'showLink',
  'staticPlot', 'scrollZoom',
  function() {
    const displayModeBar = this.get('displayModeBar');
    const displayLogo = this.get('displayLogo');
    const showLink = this.get('showLink');
    const staticPlot = this.get('staticPlot')
    const scrollZoom = this.get('scrollZoom');

    return { displayModeBar, displayLogo, showLink, staticPlot, scrollZoom };
  }),

  init() {
    this._super(...arguments);
    this.set('data', []);
    this.set('margin', {
      t: 0
    });

    // get computed properties for observers to trigger correctly
    this.get('plotlyLayout');
    this.get('plotlyConfig');
  },

  didInsertElement() {
    this._super(...arguments);
    Plotly.plot(
      this.element,
      this.get('data'),
      this.get('plotlyLayout'),
      this.get('plotlyConfig')
    );
  },

  dataObserver: observer('data.[]', 'plotlyLayout', 'plotlyConfig', function() {
    run.scheduleOnce('render', this, this.handleDataChange);
  }),

  handleDataChange() {
    Plotly.newPlot(
      this.element,
      this.get('data'),
      this.get('plotlyLayout'),
      this.get('plotlyConfig')
    );
  }
});

Utils.registerComponent('vcl-plotly', PlotlyComponent);
export default PlotlyComponent;
