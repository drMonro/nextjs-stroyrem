module.exports = {
    // webpack (config) {
    //     const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test('.svg'))
    //     fileLoaderRule.exclude = /\.svg$/
    //     config.module.rules.push({
    //         test: /\.svg$/,
    //         loader: require.resolve('@svgr/webpack')
    //     })
    //     return config
    // }
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: { and: [/\.(js|ts)x?$/] },
            use: ["@svgr/webpack"]
        });

        return config;
    }
    // webpack(config) {
    //     config.module.rules.push({
    //         test: /\.svg$/i,
    //         issuer: {
    //             test: /\.(js|ts)x?$/
    //             // for webpack 5 use
    //             // { and: [/\.(js|ts)x?$/] }
    //         },
    //         // issuer: /\.[js]tsx?$/,
    //         use: ['@svgr/webpack']
    //     })
    //
    //     return config
    // }
}
