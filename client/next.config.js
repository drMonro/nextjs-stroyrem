module.exports = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: { and: [/\.(js|ts)x?$/] },
            use: ["@svgr/webpack"]
        });

        return config;
    }
}
