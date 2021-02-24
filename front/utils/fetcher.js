import axios from 'axios';

const fetcher = (url) => axios.get(url, {
  withCredentials: true,
}).then((response) => response.data);
// 데이터를 온전하게 전달받기 위해서는 withCredentials를 설정해줘야한다.

export default fetcher;