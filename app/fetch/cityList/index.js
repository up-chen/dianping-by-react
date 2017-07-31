import {get} from '../get.js'

export default function getCityList(){
	var result = get('/api/citylist')
	return result
} 