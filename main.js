import Ember from 'ember';
import * as Utils from 'ember-utils';
import Plotly from 'plotlyjs/dist/plotly';
import layout from './templates/plotly.hbs!';
const { observer, run, computed } = Ember;

/**
Plotly.js component

For all options available in this component check the [plotly docs](https://plot.ly/javascript/reference/)
for more info on how to set them

## Demo

@demo example1

*/
const PlotlyComponent = Ember.Component.extend({
  layout: layout,
  /**
  passes the data attribute to plotly.js
  @public
  */
  data: null,
  /**
  sets the plot's title
  @public
  */
  title: '',
  /**
  sets the plot's margin
  @public
  */
  margin: null,
  /**
  sets the plot's showLegend attribute
  @public
  */
  showLegend: true,
  /**
  sets the plot's displayModeBar attribute
  @public
  */
  displayModeBar: true,
  /**
  sets the plot's displayLogo attribute
  @public
  */
  displayLogo: false,
  /**
  sets the plot's showLink attribute
  @public
  */
  showLink: false,
  /**
  sets the plot's staticPlot attribute
  @public
  */
  staticPlot: false,
  /**
  sets the plot's scrollZoom attribute
  @public
  */
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
