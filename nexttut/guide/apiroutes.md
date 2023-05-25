
# API Routes

> create an API endpoint inside a next.js app with a request handler inside the pages/api directory

request handler:

	// req = HTTP incoming message, res = HTTP server response

	export default function handler(req, res) {
		//...
	}

# Creating a simple API Endpoint

	pages/api/hello.js

	export default function handler(req, res) {
		res.status(200).json({ text: 'Hello' });
	}

req is an instance of http.Incomingmessage, plus some middlewares
https://nodejs.org/api/http.html#http_class_http_incomingmessage
https://nextjs.org/docs/api-routes/api-middlewares

res is an instance of http.ServerResponse, plus some helper functions
https://nodejs.org/api/http.html#http_class_http_serverresponse
https://nextjs.org/docs/api-routes/response-helpers

# Details

> Do not fetch an API route from getStaticProps or getStaticPaths. Write your server code directly in them.

A good use case is handling form input. The form on your page can send a POST to your API Route. 
You can then write code to save that data to the db, and run it safely server side.

	export default function handler(req, res) {
		const email = req.body.email;
		// Then save email to your database, etc...
	}


## Preview Mode

You would want to render a preview at request time and fetch draft content instead of the published content 
Preview Mode allows you to bypass Static Generation using API Routes
https://nextjs.org/docs/advanced-features/preview-mode

## Dynamic Routes
https://nextjs.org/docs/api-routes/dynamic-api-routes