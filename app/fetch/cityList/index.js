import {get} from '../get.js'

export default function getCityList(){
	var result = get('/api/cityList')
	return result
} 