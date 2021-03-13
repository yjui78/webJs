import Axios from 'axios';
export default Axios.create({
	baseURL: 'http://api.zhinengshe.com/10001-you163/',
	headers: {
		apikey: 'ebf6f58458de4b8fbad3afadd8c8a706',
	},
});
