import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    plotClick({ points }) {
      const xys = points.map(point => `x: ${point.x} | y: ${point.y}\n`);
      alert(xys);
    }
  },

  plotData: [{
    name: 'test plot',
    x: [1, 2, 3, 4],
    y: [1.53, 1.78, 2.32, 6]
  }]
});
