((_this) => {
    _this.isGetIconfontList = _this.isGetIconfontList || false
    function setIcon () {
        let iconfontList = _this.iconfontList || []
        iconfontList.forEach(item => {
            try {
                let style = document.createElement('link')
                style.rel = 'stylesheet'
                style.id = `${item}-${item}`
                style.href = `/static/fonts/${item}/iconfont.css`
                document.head.prepend(style)
            } catch (error) {
                console.log(error)
            }

        })
    }

    if (_this.iconfontList) {
        setIcon()
    } else {
        if (!_this.isGetIconfontList) {
            _this.isGetIconfontList = true
            const oReq = new XMLHttpRequest()
            oReq.onreadystatechange = function () {
                if (oReq.readyState == 4 && oReq.status == 200) {
                    let response = JSON.parse(oReq.responseText)
                    if (response.code == 200) {
                        let iconfontList = response.data || []
                        _this.iconfontList = iconfontList
                        setIcon()
                    }
                }
            }
            oReq.open('GET', '/IoT/api/v3/Auth/icon-fonts', true)
            oReq.send()
        } else {
            let times = 0
            let time = _this.setInterval(
                () => {
                    if (_this.iconfontList || times > 300) {
                        _this.clearInterval(time)
                        time = null
                        setIcon()
                    }
                    times = times + 1
                }, 100
            )
        }

    }
})(window)
