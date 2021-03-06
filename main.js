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

    if(!this.get('data')) {
      this.set('data', []);
    }

    if(!this.get('margin')) {
      this.set('margin', { t: 0 });
    }

    // get computed properties for observers to trigger correctly
    this.get('plotlyLayout');
    this.get('plotlyConfig');
    this.set('_boundPlotlyClick', run.bind(this, this.get('boundClickHandler')));
  },

  boundClickHandler(eventData) {
    this.sendAction('plotlyClick', eventData);
  },

  didInsertElement() {
    this._super(...arguments);
    this.recreatePlot();
    this.element.on('plotly_click', this.get('_boundPlotlyClick'));
  },

  willDestroyElement() {
    this._super(...arguments);
    this.element.removeListener('plotly_click', this.get('_boundPlotlyClick'));
  },

  dataObserver: observer('data.[]', 'plotlyLayout', 'plotlyConfig', function() {
    run.scheduleOnce('render', this, this.recreatePlot);
  }),

  recreatePlot() {
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
