<template>
    <div id="app">
        <router-view v-cloak />
    </div>
</template>

<script>
export default {
    name: 'App',
    data () {
        return {};
    },
    mounted () {
        let style = window.localStorage.theme
        window.document.documentElement.setAttribute('data-theme', style || 'dark')
    }
};
</script>

<style>
html {
    height: 100%;
}

html body {
    height: 100%;
    font-family: "Microsoft YaHei";
    overflow: hidden;
}
a:focus,
input:focus,
p:focus,
div:focus {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

html body div {
    box-sizing: border-box;
}

#app {
    height: 100%;
    overflow: hidden;
}

.loginSet {
    top: 38px !important;
}
.loginSet .el-button {
    width: 100% !important;
}

.el-popover {
    min-width: 0 !important;
    padding: 0;
    line-height: 28px !important;
    cursor: pointer !important;
    text-align: center;
    border: 0.5px solid rgba(240, 244, 255, 0.16);
}

.el-popover .el-button-group {
    display: flex;
}

.el-popover .el-upload .el-button--success {
    color: #3875ff;
}

.el-popover .el-button {
    width: 64px;
    padding-left: 0;
    padding-right: 0;
    margin: 0;
    text-align: center;
    border: none;
    background-color: rgba(59, 67, 87, 0.64);
}
.editBaseCheckBox {
    width: 370px !important;
    padding: 12px;
}
.editBaseCheckBox .el-checkbox-group {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
}
.editBaseCheckBox .el-autocomplete {
    width: 100%;
    margin-bottom: 12px;
    height: 32px;
}
.editBaseCheckBox .el-autocomplete .el-input,
.editBaseCheckBox .el-autocomplete div {
    height: 32px;
}
.editBaseCheckBox .el-autocomplete input {
    height: 100% !important;
    background-color: black;
}
.el-select .el-tag__close.el-icon-close::before {
    color: white;
}
.initPopper {
    background: #313747;
}

.el-popover .el-button:hover {
    background-color: rgba(59, 67, 87, 1);
}

.el-popover .el-button--text {
    color: #3875ff;
}
.el-popover .el-button--primary {
    color: #3875ff;
}
.el-popover .el-button--danger {
    color: #f56c6c !important;
}
.el-popover .new-button-group {
    flex-direction: column;
}
.el-popover .buttons .el-button {
    color: white !important;
}
.el-popover .new-button-group .el-button {
    width: unset;
    min-width: 60px;
    padding-top: 13px;
    padding-bottom: 13px;
    padding: 13px 6px;
    color: white;
}
.conditionAnalysePopper {
    width: 300px !important;
}
.conditionAnalysePopper .conditionAnalyse {
    /* width: 400px; */
    padding: 7px 12px;
}
.conditionAnalysePopper .conditionAnalyse .el-row {
    border-bottom: 1px dashed;
    border-color: rgba(240, 244, 255, 0.16);
    color: #f0f4ff;
    margin-top: 12px;
    padding-bottom: 4px;
}
.conditionAnalysePopper .conditionAnalyse .el-row .el-col {
    text-align: left;
}
.conditionAnalysePopper .conditionAnalyse .el-row:first-child {
    margin-top: 0px !important;
}
.el-time-panel .el-time-spinner__wrapper {
    overflow-x: hidden !important;
}

.el-input input {
    border: 0.5px solid rgba(240, 244, 255, 0.16);
}

.scenePopper .el-button {
    background: #313747 !important;
}

.scenePopper .el-button:hover {
    background: #3b4357 !important;
}

.el-date-range-picker
    .el-picker-panel__body
    .el-date-range-picker__time-header {
    border-bottom: 1px solid rgba(240, 244, 255, 0.16);
}

.el-input.is-disabled .el-input__inner {
    background-color: #181c29 !important;
    border: 0.5px solid rgba(240, 244, 255, 0.16) !important;
}

.el-date-range-picker .el-picker-panel__sidebar {
    border-right: 1px solid rgba(240, 244, 255, 0.16) !important;
}

.el-dialog .el-button {
    padding-left: 10px;
    padding-right: 10px;
}

/* .el-notification {
    border: none;
    background-color: rgba(49, 55, 71, 0.88);
    padding: 0;
    border-radius: 3px;
}

.el-notification .el-notification__group {
    width: calc(100% - 32px);
    margin-left: 24px;
    margin-right: 24px;
    cursor: pointer;
}

.el-notification .el-notification__title {
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    color: #f0f4ff;
}

.el-notification .el-notification__content {
    width: calc(100% - 16px);
    font-size: 14px;
    line-height: 14px;
    margin-top: 0;
    margin-bottom: 16px;
} */

.el-notification .el-notification__content .msgText {
    color: rgba(240, 244, 255, 0.64);
}

.el-notification.alarm {
    border-left: 8px solid #f22433;
}

.el-notification.warning {
    border-left: 8px solid #f5bb36;
}

.el-notification.info {
    border-left: 8px solid #3875ff;
}

.el-notification.set {
    border-left: 8px solid #d6d6d6;
}

.el-notification.ziChan {
    border-left: 8px solid #63e03f;
}
.el-tooltip__popper {
    max-width: 280px !important;
    background-color: #252833 !important;
    color: #d3d8e2 !important;
    border: 0.5px solid rgba(240, 244, 255, 0.16);
    line-height: 28px !important;
    font-size: 14px !important;
}
.el-input__icon {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
