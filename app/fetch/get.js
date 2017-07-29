import 'whatwg-fetch'

function checkStatus(res) {
	if(res.status >= 200 &&res.status <= 400){
		return res
	}
	else {
		var error = new Error(res.statusText)
		err.response = res
		throw error
	}
}

function parseJson(res) {
	return res.json()
}

export function get(url) {
	var result = fetch(url, {
		credentials: 'include',
		headers: {
          'Accept': 'application/json, text/plain, */*'
      }
	})
	.then(checkStatus)
	.then(parseJson)

	return result
}