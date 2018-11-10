"use strict";

/**
 * posts service
 */
module.exports = {
	name: "posts",
	
	// It should come from e.g. `process.env.POSTS_AUTH_TOKEN`
	authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2aWNlIjoicG9zdHMiLCJpYXQiOjE1NDE4NTU1Mzh9.mHO3lzVpktERGrsGB6dvnEU1upLufQrQ-1bW2KZqoIc",

	/**
	 * Actions
	 */
	actions: {
		/**
		* Test action
		*/
		createUser(ctx) {
			this.logger.info("Try to create new user");
			return ctx.call("users.create");
		},

		userPosts(ctx) {
			return ctx.call("users.posts");
		}
	}

};