/**
 * test
 */

const test = {

    getZiChanListByPage (data) {
        return this.post('/IoT/api/v3/ZiChanService/GetZiChanListByPage', data);
    }
}

export default test;