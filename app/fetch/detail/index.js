import {get} from '../get.js'

export function getInfoData(id) {
	var result = get(`/api/detail/info/${id}`)
	return result
}

export function getCommentData(page, id) {
	var result = get(`/api/detail/comment/${id}`)
	return result
}