const log = require('express-gateway/lib/logger').createLoggerWithLabel("[EG:plugin:time]");


const logResponseTime = (req, res, next) => {
  const startHrTime = process.hrtime();

  res.on("finish", () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
    log.info("%s : %f ms", req.path, elapsedTimeInMs);
  });

  next();
}

module.exports = {
    version: '1.2.0',

    init: function (pluginContext) {
      pluginContext.registerPolicy({
        name: 'time',
        policy: (actionParams) => logResponseTime,
        schema: {
            $id: 'http://express-gateway.io/plugins/time.json'
           }
      });

    },
    policies:['time'], 
    schema: {
        $id: 'http://express-gateway.io/plugins/time.json'
    }
  };