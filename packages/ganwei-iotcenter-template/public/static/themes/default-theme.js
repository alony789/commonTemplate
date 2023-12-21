
((_this) => {
    const stylee = document.createElement('link');
    stylee.rel = 'stylesheet';
    stylee.setAttribute('id', 'themeStyle')

    const stylee_6_1 = document.createElement('link');
    stylee_6_1.rel = 'stylesheet';
    stylee_6_1.setAttribute('id', 'themeStyle-6-1')

    function setTheme (theme) {
        stylee_6_1.href = `/static/themes/${theme}-6-1.css`;
        document.head.appendChild(stylee_6_1);
        localStorage.setItem('theme', theme)
    }

    if (localStorage.theme) {
        setTheme(localStorage.theme)
    } else {
        if (_this.top && _this.top.getConfigInfoData) {
            _this.top.getConfigInfoData().then(res => {
                setTheme(res && res.theme && res.theme.default || 'dark')
            }).catch(err => {
                setTheme('dark')
            })
        }
    }
})(window)
