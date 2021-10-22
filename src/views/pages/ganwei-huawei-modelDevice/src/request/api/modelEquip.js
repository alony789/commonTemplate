/**
 * test
 */

const model = {

    // 指令下发
    setModelCommand (data) {
        return this.post('/IoT/north/send-command', data)
    },

    // 注册设备
    addModelEquip (data) {
        return this.post('/IoT/north/device-management/devices', data)
    },

    // 单个设备删除
    deleteModelEquip (data) {
        return this.delete('/IoT/north/device-management/devices', data)
    },

    // 编辑设备
    deleteModels (data) {
        return this.put('/IoT/north/device-management/devices', data)
    },

    // 获取单个设备
    getRadioModelEquip (data) {
        return this.get('/IoT/north/device-management/devices', data)
    },

    // 批量删除设备
    deleteModelsMultipleEquip (data) {
        return this.deleteByData('​/IoT​/north​/device-management​/devices​/batch-del', data)
    },

    // 批量获取设备
    getModelDevicesList (data) {
        return this.get('/IoT/north/device-management/devicesList', data);
    },

    // 获取产品ID
    getProductListId (data) {
        return this.get('/IoT/north/device-management/products', data);
    }
}

export default model;