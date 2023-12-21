/**
 * @file Describe the file
 */
// import api from '../request/api.js';
import Axios from 'axios';
export default class myUtils {

    /**
     * @param {String} 两个日期相差天数(sDate1, sDate2),时间格式【2020-05-10】
     * @returns {Number}    返回相差天数数值
     */
    static dateDiff(sDate1, sDate2) {
        let aDate = sDate1.split('-');
        let oDate1 = new Date(aDate[0], aDate[1], aDate[2]); // 转换为12-18-2006格式
        aDate = sDate2.split('-');
        let oDate2 = new Date(aDate[0], aDate[1], aDate[2]);
        let iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); // 把相差的毫秒数转换为天数
        return iDays;
    }

    /**
     * @param {Number} timeStamp 传入的时间戳
     * @returns {string} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
     */
    static getTimeStampToTime(timeStamp) {
        let date = new Date(Number(timeStamp)); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-';
        let M =
            (date.getMonth() + 1 < 10 ?
                '0' + (date.getMonth() + 1) :
                date.getMonth() + 1) + '-';
        let D = date.getDate() + 'T';
        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();
        if (h < 10) {
            h = '0' + h;
        }
        if (m < 10) {
            m = '0' + m;
        }
        return Y + M + D + h + ':' + m + ':' + s;
    }

    /**
     * @param   数组去重
     * @returns {Obj}
     * 传参：数组
     */
    static unique(arr) {
        return Array.from(new Set(arr));
    }

    /**
     * 获取当前时间---年月日时分秒
     * @param
     * @returns {number}
     */
    static getCurrentDate(format, type) {
        let now = new Date();
        let year = now.getFullYear(); // 得到年份
        let month = now.getMonth(); // 得到月份
        let date = now.getDate(); // 得到日期

        // let day = now.getDay();// 得到周几
        let hour = now.getHours(); // 得到小时
        let minu = now.getMinutes(); // 得到分钟
        let sec = now.getSeconds(); // 得到秒
        month = month + 1;
        if (month < 10) {
            month = '0' + month;
        }
        if (date < 10) {
            date = '0' + date;
        }
        if (hour < 10) {
            hour = '0' + hour;
        }
        if (minu < 10) {
            minu = '0' + minu;
        }
        if (sec < 10) {
            sec = '0' + sec;
        }
        let time = '';

        // 精确到天
        if (format === 1) {
            time = year + type + month + type + date;
        } else {

            // 精确到分
            time =
                year +
                type +
                month +
                type +
                date +
                ' ' +
                hour +
                ':' +
                minu +
                ':' +
                sec;
        }
        return time;
    }

    /**
     * @param
     * @returns {obj}
     * 文件导出功能
     * 文件格式：.xlsx
     * data：【必传】文件下载接口返回的数据流
     * name：导出的文件命名，不传默认为时间命名，（字符串，一般为中文+年月日时分秒，配合getCurrentDate方法）
     * 例：平台设备统计明细2020-10-30 15_30_56.xlsx
     */
    static downloadFile(data, name) {
        let fileName = "";
        if (String(name) !== "undefined") {
            fileName = String(name);
        } else {
            fileName = this.getCurrentDate();
        }
        let blob = new Blob([data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });
        let url = window.URL.createObjectURL(blob);
        const link = document.createElement("a"); // 创建a标签
        link.href = url;
        link.download = fileName; // 重命名文件
        link.click();
        URL.revokeObjectURL(url); // 释放内存
    }

    /**
     * 应用于图表插件---获取日的时间数据
     * @param
     * @returns {obj}
     */
    static getChartDay() {
        let dataTimes = [
            "00:00",
            "01:00",
            "02:00",
            "03:00",
            "04:00",
            "05:00",
            "06:00",
            "07:00",
            "08:00",
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
            "22:00",
            "23:00"
        ];
        return dataTimes;
    }

    /**
     * 应用于图表插件---获取随机图表数据
     * @param
     * @returns {obj}
     */
    static getChartDayObjList() {
        let dataList = [];
        for (let i = 1; i < this.getCurrentMonthDays() + 1; i++) {
            // for (var i = 1; i < 4+1; i++) {
            dataList.push(+this.getRandomNumber(2));
        }
        return dataList;
    }

    /**
     * 应用于图表插件---获取周的时间数据
     * @param
     * @returns {obj}
     */
    static getChartWeek() {
        let dataTimes = this.$t("myUtils.msg.dataTimes");
        return dataTimes;
    }

    /**
     * 应用于图表插件---获取当前月天数数组
     * @param
     * @returns {obj}
     */
    static getChartMonth() {
        let dataTimes = [];
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let d = new Date(year, month, 0);
        let n = +d.getDate();

        for (let i = 1; i < n + 1; i++) {
            dataTimes.push(i + " 号");
        }

        return dataTimes; //返回天数数组
    }

    /**
     * 获取当前月有多少天
     * @param
     * @returns {number}
     */
    static getCurrentMonthDays() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let d = new Date(year, month, 0);
        return +d.getDate();
    }

    /**
     * 获取随机数
     * @param n
     * @returns {number}
     */
    static getRandomNumber(n) {
        let rnd = "";
        for (let i = 0; i < n; i++) rnd += Math.floor(Math.random() * 10);
        return rnd;
    }

    /**
     * 判断字符串是否为空
     * @param str
     * @returns {boolean}
     */
    static isNull(str) {
        return str === null || str.length == 0 || str === "";
    }

    /**
     *
     * @desc  判断是否为身份证号
     * @param  {String|Number} str
     * @return {Boolean}
     */
    static isIdCard(str) {
        return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(
            str
        );
    }

    /**
     *
     * @desc   判断邮箱
     * @param  {String} str
     * @return {Boolean}
     */
    static emails(str) {
        return /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(
            str
        );
    }

    /**
     *
     * @desc   判断是否为座机号
     * @param  {String|Number} str
     * @return {Boolean}
     */
    static landlineNumber(str) {
        return /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(str);
    }

    /**
     *
     * @desc   判断是否为手机号
     * @param  {String|Number} str
     * @return {Boolean}
     */
    static isPhoneNum(str) {
        return /^(0|86|17951)?(1[3-9][0-9])[0-9]{8}$/.test(str);
    }

    /**
     * @description 日期格式化
     * @param {Date} date 日期
     * @param {String} fmt 日期格式 eg: yyyy-MM-dd hh:mm:ss
     */
    static dateFormat(date, fmt) {
        let o = {
            "M+": date.getMonth() + 1, // 月份
            "d+": date.getDate(), // 日
            "h+": date.getHours(), // 小时
            "m+": date.getMinutes(), // 分
            "s+": date.getSeconds(), // 秒
            "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
            S: date.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                (date.getFullYear() + "").substr(4 - RegExp.$1.length)
            );
        }
        for (let k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1,
                    RegExp.$1.length === 1 ?
                    o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length)
                );
            }
        }
        return fmt;
    }

    /**
     * @description 文件下载
     * @param {Object} data  数据
     * @param {String} fileName 下载文件名
     */
    static download(data, fileName) {
        // 创建一个blob对象,file的一种
        let blob = new Blob([data], {
            type: "application/x-xls"
        });
        if ("download" in document.createElement("a")) {
            // 非IE下载
            let link = document.createElement("a");
            if (window.URL) {
                link.href = window.URL.createObjectURL(blob);
            } else {
                link.href = window.webkitURL.createObjectURL(blob);
            }
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            link.remove();
        } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
        }
    }

    /**
     * @description 校验导入execl格式
     * @param {file} file 导入文件对象
     */
    static validateExecl(file) {
        const isXLS = file.type === "application/vnd.ms-excel";
        const isXLSX =
            file.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        if (!isXLS && !isXLSX) {
            this.$message.error(this.$t("myUtils.msg.validateExecl"));
            return false;
        }
    }

    /**
     * @description 校验上传图片格式和大小
     * @param {file} file 导入文件对象
     */
    static validateImage(file) {
        const isPNG = file.type.toLowerCase() === "image/png";
        const isJPG = file.type.toLowerCase() === "image/jpeg";
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG && !isPNG) {
            this.$message.error(this.$t("myUtils.msg.validateImage[0]"));
            return false;
        }
        if (!isLt2M) {
            this.$message.error(this.$t("myUtils.msg.validateImage[1]"));
            return false;
        }
    }

    static debounce(func, wait) {
        let timeout;
        return function (event) {
            let _this = this;
            let args = arguments;
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => {
                timeout = null;
                func.call(_this, args);
            }, wait);
        };
    }

    static rollImg(e, element, zoomNum) {
        try {
            zoomNum += event.wheelDelta / 12;
        } catch (e) {
            console.log(e)
        }

        if (zoomNum >= 60 && zoomNum < 2000) {
            element.style.zoom = zoomNum + "%";
        }
        return false;
    }
    static move(e, element) {
        let odiv = element; // 获取目标元素
        // 算出鼠标相对元素的位置
        let disX = e.clientX - odiv.offsetLeft;
        let disY = e.clientY - odiv.offsetTop;
        document.onmousemove = e => {
            // 鼠标按下并移动的事件
            // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            let left = e.clientX - disX;
            let top = e.clientY - disY;

            // 绑定元素位置到positionX和positionY上面
            // this.positionX = top;
            // this.positionY = left;

            // 移动当前元素
            odiv.style.left = left + "px";
            odiv.style.top = top + "px";
        };
        document.onmouseup = e => {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    }
    static downloadTXTFile(data, name) {
        let fileName = "";
        if (String(name) !== "undefined") {
            fileName = String(name);
        } else {
            fileName = this.getCurrentDate();
        }
        let blob = new Blob([data], {
            type: "application/octet-stream"
        });
        let url = window.URL.createObjectURL(blob);
        if (window.navigator.msSaveBlob) {
            //ie浏览器
            try {
                window.navigator.msSaveBlob(blob, fileName);
            } catch (e) {
                console.log(e);
            }
        } else {
            const link = document.createElement("a"); // 创建a标签
            link.href = url;
            link.download = fileName; // 重命名文件
            link.click();
            URL.revokeObjectURL(url); // 释放内存
        }
    }

    static connectServer(equipNo, messageType) {
        if (!this.signalr_connection) {
            // 如果有连接就断开连接
            return false;
        }
        this.signalr_connection.stop();

        // 开始连接this.signalr_connection
        this.signalr_connection
            .start()
            .then(() => {
                this.signalr_connection.invoke(
                    "OnConnect",
                    localStorage.SRToken,
                    equipNo
                );
            })
            .catch(function (ex) {
                console.log(
                    "connectServer" +
                    this.$t("myUtils.msg.connectionFailed") +
                    ex
                );
            });
    }

    static signalRaddeventlistener(arry) {
        console.log(arry)
    }

    /**
     * @description 生成唯一Id
     * @param {}  不用传参
     *  @return {string}
     */
    static generateUUID() {
        let d = new Date().getTime();
        if (
            window.performance &&
            typeof window.performance.now === "function"
        ) {
            d += performance.now(); // use high-precision timer if available
        }
        let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (c) {
                let r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
            }
        );
        return uuid;
    }
    static fontSize(num, echartId) {
        let clientWidth = document.getElementById(echartId).clientWidth;
        if (!clientWidth) {
            return;
        }
        let fontSize = clientWidth / 400;
        return num * fontSize;
    }

    // 补零 num：要改变的值，len补零后数字的长度
    static addZero(num, len) {
        return String(num).length > len ?
            num :
            (Array(len).join(0) + num).slice(-len);
    }

    /**
     * @param
     * @returns {Obj}
     * 水质、水质、水情设备状态判断
     * 传参：状态
     */
    static equipStateJudge(state) {
        let obj = {
            stateClass: "",
            stateValue: ""
        };
        switch (state) {
            case "CommunicationOK":
                obj.stateValue = "在线";
                obj.stateClass = "CommunicationOK";
                break;
            case "HaveAlarm":
                obj.stateValue = "通讯报警";
                obj.stateClass = "HaveAlarm";
                break;
            case "HaveSetParm":
                obj.stateValue = "正在设置中";
                obj.stateClass = "HaveSetParm";
                break;
            case "Initial":
                obj.stateValue = "正在初始化";
                obj.stateClass = "Initial";
                break;
            case "CheFang":
                obj.stateValue = "撤防";
                obj.stateClass = "CheFang";
                break;
            case "NoCommunication":
                obj.stateValue = "离线";
                obj.stateClass = "NoCommunication";
                break;
            case 1:
                obj.stateValue = "在线";
                obj.stateClass = "CommunicationOK";
                break;
            case 2:
                obj.stateValue = "通讯报警";
                obj.stateClass = "HaveAlarm";
                break;
            case 3:
                obj.stateValue = "正在设置中";
                obj.stateClass = "HaveSetParm";
                break;
            case 4:
                obj.stateValue = "正在初始化";
                obj.stateClass = "Initial";
                break;
            case 5:
                obj.stateValue = "撤防";
                obj.stateClass = "CheFang";
                break;
            case 0:
                obj.stateValue = "离线";
                obj.stateClass = "NoCommunication";
                break;
        }
        return obj;
    }

    /**
     * @arry  去重
     *
     */
    static arrayRemoveRepeat(arry) {
        let obj = [];
        if (arry.length > 0) {
            obj.push(arry[0]);
            arry.forEach((item, index) => {
                if (
                    !obj.some((itemChild, indexChild) => {
                        return itemChild.equipno == item.equipno;
                    })
                ) {
                    obj.push(item);
                }
            });
        }
        return obj;
    }

    // 请求主题文件
    static async getStyle() {
        let stylee;
        await Axios.get(
            "/APP/static/themes/" + localStorage.getItem("theme") + ".css"
        ).then(ret => {
            stylee = document.createElement("style");
            stylee.setAttribute("id", "themeStyle");
            stylee.type = "text/css";
            stylee.innerHTML = ret.data;
        });
        return stylee;
    }

    // 请求主题文件
    static async setStyle(ele) {
        let stylee = await this.getStyle();
        ele.appendChild(stylee);
    }

    // 切换主题文件
    static async changeStyle(ele) {
        let stylee = await this.getStyle();
        let head = document.getElementsByTagName("head")[0];
        head.removeChild(document.querySelector("#themeStyle"));
        head.appendChild(stylee);
    }
}