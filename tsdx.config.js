const replace = require('@rollup/plugin-replace');

module.exports = {
  rollup(rollupConfig, options) {
    /* fix https://github.com/formium/tsdx/issues/981 */
    rollupConfig.plugins = rollupConfig.plugins.map(plugin =>
      plugin.name === 'replace'
        ? replace({
            'process.env.NODE_ENV': JSON.stringify(options.env),
            preventAssignment: true,
          })
        : plugin
    );

    return rollupConfig;
  },
};
