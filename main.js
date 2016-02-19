import Ember from 'ember';
import * as Utils from 'ember-utils';
import Plotly from 'plotlyjs/dist/plotly';

const { observer, run, computed } = Ember;

/**
Plotly.js component

## Demo

@demo example1

*/
const PlotlyComponent = Ember.Component.extend({});

Utils.registerComponent('vcl-plotly', PlotlyComponent);
export default PlotlyComponent;
