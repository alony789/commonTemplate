<template>
    <div class="model wh100">
        <header class="flex-between">
            <div class="search flex-start">
                <el-input suffix-icon="el-icon-search" @keyup.enter.native="getModelDevicesList" v-model="searchNameStr" @input="watchSearch()" placeholder="按设备名搜索" />
            </div>
            <div class="buttons">
                <el-button type="primary" @click="showNewDialog">新增</el-button>
                <el-button type="danger" :disabled="deleteList.length == 0" @click="deleteModels">
                    删除
                </el-button>
            </div>
        </header>

        <el-dialog title="新增物模型设备" :visible.sync="dialogVisible" center top="2vh" :close-on-click-modal="false">
            <el-form label-position="top" :rules="rules" ref="addModelEquip" label-width="80px" :model="addModelEquip">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="产品ID" prop="productId" min-width="130" show-overflow-tooltip>
                            <!-- <el-select v-model="addModelEquip.productId" placeholder="请选择产品ID" :disabled ="seleLoad">
                                <el-option v-for="item in exportTypeOption" :key="item.value" :label="$t(item.label)"
                                    :value="item.value">
                                </el-option>
                            </el-select> -->

                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item min-width="100" show-overflow-tooltip prop="nodeId" label="标识码">
                            <el-input v-model="addModelEquip.nodeId" maxlength="50" minlength="2" placeholder="请输入设备描述"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item min-width="100" show-overflow-tooltip prop="name" label="设备名称">
                            <el-input v-model="addModelEquip.name" maxlength="64" placeholder="请输入设备名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="设备密码" prop="secret" min-width="130" show-overflow-tooltip>
                            <el-input v-model="addModelEquip.secret" maxlength="50" placeholder="请输入设备密码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item min-width="100" show-overflow-tooltip prop="manufacturerId" label="厂商ID">
                            <el-input v-model="addModelEquip.manufacturerId" placeholder="请输入厂商ID"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item min-width="100" show-overflow-tooltip prop="model" label="设备型号">
                            <el-input v-model="addModelEquip.model" placeholder="请输入设备型号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item min-width="100" show-overflow-tooltip prop="gatewayId" label="网关ID">
                            <el-input v-model="addModelEquip.gatewayId" maxlength="50" minlength="2" placeholder="请输入网关ID"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item min-width="100" show-overflow-tooltip prop="deviceType" label="设备类型">
                            <el-input v-model="addModelEquip.deviceType" placeholder="请输入设备类型"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item min-width="100" show-overflow-tooltip prop="nodeType" label="节点类型">
                            <el-input v-model="addModelEquip.nodeType" placeholder="请输入节点类型"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item min-width="100" show-overflow-tooltip prop="status" label="状态">
                            <el-input v-model="addModelEquip.status" placeholder="请输入状态"></el-input>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="8">
                        <el-form-item min-width="100" show-overflow-tooltip prop="latitude" label="纬度">
                            <el-input v-model="addModelEquip.latitude" placeholder="请输入纬度"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item min-width="100" show-overflow-tooltip prop="longitude" label="经度">
                            <el-input v-model="addModelEquip.longitude" placeholder="请输入经度"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item min-width="100" show-overflow-tooltip prop="location" label="地址">
                            <el-input v-model="addModelEquip.location" placeholder="请输入地址"></el-input>
                        </el-form-item>
                    </el-col> -->

                    <el-col :span="12">
                        <el-form-item label="设备描述" prop='description' min-width="130" show-overflow-tooltip>
                            <el-input v-model="addModelEquip.description" maxlength="200" placeholder="请输入设备描述"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- <el-form-item label="名称" prop="name">
                    <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input v-model="formLabelAlign.description"></el-input>
                </el-form-item>
                <el-form-item label="服务" prop="services">
                    <el-tooltip class="item" effect="dark" content='' placement="top">
                        <i class="iconfont icon_tulishuoming icons"></i>
                    </el-tooltip>
                    <el-input type="textarea" v-model="formLabelAlign.services"></el-input>
                </el-form-item> -->

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm" :loading="conLoad">
                    确 定
                </el-button>
            </span>
        </el-dialog>

        <el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
            <template slot="empty">
                <div class="noData wh100 flex-center">暂无数据</div>
            </template>
            <el-table-column label="序号" type="selection" width="55" show-overflow-tooltip></el-table-column>
            <el-table-column label="设备ID" prop="deviceId" min-width="130" show-overflow-tooltip></el-table-column>
            <el-table-column label="网关ID" prop="gatewayId" min-width="130" show-overflow-tooltip></el-table-column>
            <el-table-column label="设备信息" min-width="130" show-overflow-tooltip>
                <el-table-column min-width="100" show-overflow-tooltip prop="deviceInfo.name" label="设备名称"></el-table-column>
                <el-table-column min-width="100" show-overflow-tooltip prop="deviceInfo.deviceType" label="设备类型"></el-table-column>
                <el-table-column min-width="100" show-overflow-tooltip prop="deviceInfo.model" label="设备型号"></el-table-column>
                <el-table-column min-width="100" show-overflow-tooltip prop="deviceInfo.mute" label="冻结状态"></el-table-column>
                <el-table-column min-width="100" show-overflow-tooltip prop="deviceInfo.nodeId" label="节点ID"></el-table-column>
                <el-table-column min-width="100" show-overflow-tooltip prop="deviceInfo.protocolType" label="协议"></el-table-column>
                <el-table-column min-width="100" show-overflow-tooltip prop="deviceInfo.status" label="状态"></el-table-column>
                <el-table-column min-width="100" show-overflow-tooltip prop="deviceInfo.manufacturerId" label="厂商ID"></el-table-column>
                <el-table-column min-width="100" show-overflow-tooltip prop="deviceInfo.manufacturerName" label="厂商名称"></el-table-column>
                <el-table-column min-width="100" show-overflow-tooltip prop="deviceInfo.description" label="设备描述"></el-table-column>
            </el-table-column>
            <el-table-column label="修改时间" prop='createTime' min-width="130" show-overflow-tooltip></el-table-column>
            <el-table-column label="最后修改时间" prop="lastModifiedTime" min-width="130" show-overflow-tooltip></el-table-column>
            <el-table-column label="节点类型" prop="nodeType" min-width="130" show-overflow-tooltip></el-table-column>
            <el-table-column fixed="right" label="服务" width="100">
                <template slot-scope="scope">
                    <span type="text" size="small" @click="editData" style="cursor: pointer; ">
                        <i class="iconfont iconbianji"></i>
                    </span>
                </template>
            </el-table-column>
        </el-table>

        <div class="equip-paging flex-center">
            <el-pagination small background :pager-count="7" :page-sizes="[25, 50, 100]" :page-size="pagination.pageSize" layout="sizes, prev, pager, next, jumper" :total="pagination.total" @current-change="currentChange" @size-change="sizeChange"></el-pagination>
        </div>
    </div>
</template>
<script>
import modelDevice from './js/modelDevice.js'
export default modelDevice
</script>
<style lang="scss" src="./css/modelDevice.scss" scoped></style>
