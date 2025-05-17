export const config: WebdriverIO.Config = {
    automationProtocol: 'webdriver',
    runner: 'local',
    hostname: 'localhost',
    port: 4444,
    path: '/wd/hub',
    tsConfigPath: './tsconfig.json',
    specs: [
        ['./specs/{scenarios,api,ui}/**/*.test.ts']
    ],
    exclude: [],
    maxInstances: 5,
    capabilities: [{
        browserName: 'chrome',
        'selenoid:options': {
            enableVNC: true,
            enableVideo: false
        }
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://203.161.47.9:3100',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
