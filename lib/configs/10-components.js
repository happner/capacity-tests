const path = require('path');
const basePath = path.resolve(__dirname, '..', '..', 'lib', 'components');

module.exports = (config, test, state) => {

  return {

    modules: {
      'edgeComponent0': {
        path: basePath + path.sep + 'edge-component-v1'
      },
      'edgeComponent1': {
        path: basePath + path.sep + 'edge-component-v1'
      },
      'edgeComponent2': {
        path: basePath + path.sep + 'edge-component-v1'
      },
      'edgeComponent3': {
        path: basePath + path.sep + 'edge-component-v1'
      },
      'edgeComponent4': {
        path: basePath + path.sep + 'edge-component-v1'
      },
      'edgeComponent5': {
        path: basePath + path.sep + 'edge-component-v1'
      },
      'edgeComponent6': {
        path: basePath + path.sep + 'edge-component-v1'
      },
      'edgeComponent7': {
        path: basePath + path.sep + 'edge-component-v1'
      },
      'edgeComponent8': {
        path: basePath + path.sep + 'edge-component-v1'
      },
      'edgeComponent9': {
        path: basePath + path.sep + 'edge-component-v1'
      }
    },

    components: {
      'edgeComponent0': {
        startMethod: 'start',
        stopMethod: 'stop',
        // metricsAddress: state.groups.metrics[0].address
      },
      'edgeComponent1': {
        startMethod: 'start',
        stopMethod: 'stop',
        // metricsAddress: state.groups.metrics[0].address
      },
      'edgeComponent2': {
        startMethod: 'start',
        stopMethod: 'stop',
        // metricsAddress: state.groups.metrics[0].address
      },
      'edgeComponent3': {
        startMethod: 'start',
        stopMethod: 'stop',
        // metricsAddress: state.groups.metrics[0].address
      },
      'edgeComponent4': {
        startMethod: 'start',
        stopMethod: 'stop',
        // metricsAddress: state.groups.metrics[0].address
      },
      'edgeComponent5': {
        startMethod: 'start',
        stopMethod: 'stop',
        // metricsAddress: state.groups.metrics[0].address
      },
      'edgeComponent6': {
        startMethod: 'start',
        stopMethod: 'stop',
        // metricsAddress: state.groups.metrics[0].address
      },
      'edgeComponent7': {
        startMethod: 'start',
        stopMethod: 'stop',
        // metricsAddress: state.groups.metrics[0].address
      },
      'edgeComponent8': {
        startMethod: 'start',
        stopMethod: 'stop',
        // metricsAddress: state.groups.metrics[0].address
      },
      'edgeComponent9': {
        startMethod: 'start',
        stopMethod: 'stop',
        // metricsAddress: state.groups.metrics[0].address
      }
    }

  }

}
