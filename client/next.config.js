module.exports = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: { and: [/\.(js|ts)x?$/] },
            use: ["@svgr/webpack"]
        });

        return config;
    },
    images: {
        domains: ['xn--24-mlcpqjncfk.xn--p1ai'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 128, 128]
    }
}
