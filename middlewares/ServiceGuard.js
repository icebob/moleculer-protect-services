const { MoleculerClientError } = require("moleculer").Errors;

module.exports = {

	// Wrap local action handlers (legacy middleware handler)
	localAction(next, action) {
		// If this feature enabled
		if (action.restricted) {

			// Create new handler
			return async function ServiceGuardMiddleware(ctx) {
				// Check the service auth token in Context meta
				const token = ctx.meta.$authToken;
				if (!token)
					throw new MoleculerClientError("Service token is missing", 401, "TOKEN_MISSING");
				
				// Verify token & restricted services
				await ctx.call("guard.check", { token, services: action.restricted })

				// Call the original handler
				return await next(ctx);

			}.bind(this);
		}

		// Return original handler, because feature is disabled
		return next;
	},

	// Wrap broker.call method
	call(next) {
		// Create new handler
		return async function(actionName, params, opts = {}) {
			// Put the service auth token in the meta
			if (opts.parentCtx) {
				const service = opts.parentCtx.service;
				const token = service.schema.authToken;

				if (!opts.meta)
					opts.meta = {};

				opts.meta.$authToken = token;
			}

			// Call the original handler
			return await next(actionName, params, opts);

		}.bind(this);
	},

};