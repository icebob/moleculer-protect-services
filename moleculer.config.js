"use strict";

const ServiceGuard = require("./middlewares/ServiceGuard");

// More info about options: https://moleculer.services/docs/0.13/broker.html#Broker-options
module.exports = {
	logger: true,
	logLevel: "info",

	middlewares: [
		ServiceGuard
	]
};