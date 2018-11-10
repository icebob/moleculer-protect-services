"use strict";

/**
 * users service
 */
module.exports = {
	name: "users",

	// It should come from e.g. `process.env.USERS_AUTH_TOKEN`
	authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2aWNlIjoidXNlcnMiLCJpYXQiOjE1NDE4NTU0ODl9.td1P27_xpFv1P5_j0HLtMwyz-aRF9xQqjLHYIIHcKPE",

	/**
	 * Actions
	 */
	actions: {
		/**
		* Create user
		*/
		create: {
			// It can be called by "api" service
			restricted: [
				"api"
			],
			handler(ctx) {
				this.logger.info("'users.create' has been called.");
				return "OK";
			}
		},

		/**
		* List users
		*/
		list: {
			// It can be called by everyone.
			restricted: null,
			handler(ctx) {
				this.logger.info("'users.list' has been called.");
				return "OK";
			}
		},

		/**
		* List user's post
		*/
		posts: {
			// It can be called by "api" & "posts" service.
			restricted: [
				"api",
				"posts"
			],
			handler(ctx) {
				this.logger.info("'users.posts' has been called.");
				return "OK";
			}
		}
	},

};