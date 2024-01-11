/*
 * @Description:
 * @Version: v1
 * @Author: zkx
 * @LastEditTime: 2024-01-05 14:43:04
 * Copyright (c) 2024 by 敢为软件, All Rights Reserved.
 */
// 模板
const template = {

    // 班次管理
    template (data) {
        return this.get('/xxxxx', data)
    },
        // 获取系统运行信息
        getSystemInfo () {
            return this.get('/IoT/api/v3/Auth/GetSystemRuntimeInfo');
        }
}

export default template
