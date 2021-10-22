<template>
    <div class="assetManagement">
        <header>
            <div class="title_left">
                <span>模板页面</span>
            </div>
        </header>

        <section id="elTable">
           {{content}}
        </section>

        <div class="equip-paging mobilePagination">
            <el-pagination small background :pager-count="7" :page-sizes="[25, 50, 100]" :page-size="pageSize" layout="sizes, prev, pager, next, jumper" :total="total"></el-pagination>
        </div>

    </div>
</template>
<script>                 
 import test from './js/test.js';
export default test;
</script>
<style lang="scss" src="./css/test.scss"></style>
