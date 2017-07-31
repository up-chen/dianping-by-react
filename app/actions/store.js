export const STORE_UPDATE = 'STORE_UPDATE'
export const STORE_ADD = 'STORE_ADD'
export const STORE_RM = 'STORE_RM'

export function update(data) {
	return {
		type: STORE_UPDATE,
		data
	}
}

export function add(data) {
	return {
		type: STORE_ADD,
		data
	}
}

export function rm(data) {
	return {
		type: STORE_RM,
		data
	}
}