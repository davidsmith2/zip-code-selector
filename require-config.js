({
    appDir: 'app/',
    baseUrl: 'js',
    dir: 'build/',
    fileExclusionRegExp: /^(r|build)\.js$/,
    mainConfigFile: './app/js/main.js',
    modules: [{ name: 'main' }],
    optimizeCss: 'standard',
    removeCombined: true
})