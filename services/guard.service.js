"use strict";

const jwt = require("jsonwebtoken");
const { MoleculerClientError } = require("moleculer").Errors;

const JWT_SECRET = "moleculer";

/**
 * guard service
 */
module.exports = {
	name: "guard",

	/**
	 * Actions
	 */
	actions: {
		/**
		* Check token & services
		*/
		check: {
			params: {
				token: "string",
				services: { type: "array", items: "string" },
			},
			handler(ctx) {
				return this.verifyJWT(ctx.params.token, ctx.params.services);
			}
		},

		/**
		 * Generate a JWT token for services.
		 * @param {Context} ctx 
		 */
		generate: {
			params: {
				service: "string",
			},
			handler(ctx) {
				this.logger.warn("Only for development!");
				return this.generateJWT(ctx.params.service);
			}
		}
	},

	/**
	 * Methods
	 */
	methods: {
		/**
		 * Generate a JWT token for services
		 *
		 * @param {String} service
		 */
		generateJWT(service) {
			return new this.Promise((resolve, reject) => {
				return jwt.sign({ service }, JWT_SECRET, (err, token) => {
					if (err) {
						this.logger.warn("JWT token generation error:", err);
						return reject(new MoleculerClientError("Unable to generate token", 500, "UNABLE_GENERATE_TOKEN"));
					}

					resolve(token);
				});
			});
		},

		/**
		 * Verify a JWT token and check the service name in payload
		 *
		 * @param {String} token
		 * @param {Array<String>?} services
		 */
		verifyJWT(token, services) {
			return new this.Promise((resolve, reject) => {
				jwt.verify(token, JWT_SECRET, (err, decoded) => {
					if (err) {
						this.logger.warn("JWT verifying error:", err);
						return reject(new MoleculerClientError("Invalid token", 401, "INVALID_TOKEN"));
					}

					if (services && services.indexOf(decoded.service) == -1) {
						this.logger.warn("Forbidden service!");
						return reject(new MoleculerClientError("Forbidden", 401, "FORBIDDEN_SERVICE"));
					}

					resolve();
				});
			});
		},
	},

};