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

export function post(url, paramsObj) {
    var result = fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
		    'Content-Type': 'application/json'
		},
        body: JSON.stringify(paramsObj)
    })
    .then(checkStatus)
	.then(parseJson)

    return result;
}
