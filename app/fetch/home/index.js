import {get} from '../get.js'

export function getAdData () {
	var result = get('/api/homead')
	return result
}

export function getListData(city, page) {
    const result = get(`/api/homelist?city=${city}&p=${page}`)
    return result
}