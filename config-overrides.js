const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const moment  = require('moment');
module.exports = function override(config, env) {
    
    config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
    config = rewireLess.withLoaderOptions({
        javascriptEnabled: true,
        modifyVars: { "@primary-color": "#1DA57A" } //themes config
    })(config, env);
    
    return config
};