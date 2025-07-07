function switchNightMode() {
    document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"><div id="sun"></div><div id="moon"></div></div></div>');
    setTimeout(function () {
        // 动画淡出
        setTimeout(function () {
            document.getElementsByClassName('Cuteen_DarkSky')[0].style.transition = 'opacity 3s';
            document.getElementsByClassName('Cuteen_DarkSky')[0].style.opacity = '0';
            setTimeout(function () {
                document.getElementsByClassName('Cuteen_DarkSky')[0].remove();
            }, 1000);
        }, 2000);
    });

    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

    // 太阳月亮透明度动画
    if (nowMode === 'light') {
        document.getElementById("sun").style.opacity = "1";
        document.getElementById("moon").style.opacity = "0";
        setTimeout(function () {
            document.getElementById("sun").style.opacity = "0";
            document.getElementById("moon").style.opacity = "1";
        }, 1000);

        // 优先调用主题切换方法
        if (typeof activateDarkMode === 'function') {
            activateDarkMode();
        } else if (typeof window.switchDarkMode === 'function') {
            window.switchDarkMode();
        } else {
            // 兜底：直接切换data-theme
            document.documentElement.setAttribute('data-theme', 'dark');
            document.body.classList.add('DarkMode');
            localStorage.setItem('isDark', '1');
        }
        // 主题本地存储
        if (typeof saveToLocal !== 'undefined' && saveToLocal.set) {
            saveToLocal.set('theme', 'dark', 2);
        } else {
            localStorage.setItem('theme', 'dark');
        }
        document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun');
        setTimeout(() => {
            if (typeof Vue !== 'undefined' && Vue.prototype && Vue.prototype.$notify) {
                Vue.prototype.$notify({
                    title: "关灯啦🌙",
                    message: "当前已成功切换至夜间模式！",
                    position: 'top-left',
                    offset: 50,
                    showClose: true,
                    type: "success",
                    duration: 5000
                });
            }
        }, 2000);
    } else {
        document.getElementById("sun").style.opacity = "0";
        document.getElementById("moon").style.opacity = "1";
        setTimeout(function () {
            document.getElementById("sun").style.opacity = "1";
            document.getElementById("moon").style.opacity = "0";
        }, 1000);

        if (typeof activateLightMode === 'function') {
            activateLightMode();
        } else if (typeof window.switchDarkMode === 'function') {
            window.switchDarkMode();
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            document.body.classList.remove('DarkMode');
            localStorage.setItem('isDark', '0');
        }
        if (typeof saveToLocal !== 'undefined' && saveToLocal.set) {
            saveToLocal.set('theme', 'light', 2);
        } else {
            localStorage.setItem('theme', 'light');
        }
        document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon');
        setTimeout(() => {
            if (typeof Vue !== 'undefined' && Vue.prototype && Vue.prototype.$notify) {
                Vue.prototype.$notify({
                    title: "开灯啦🌞",
                    message: "当前已成功切换至白天模式！",
                    position: 'top-left',
                    offset: 50,
                    showClose: true,
                    type: "success",
                    duration: 5000
                });
            }
        }, 2000);
    }

    // 评论等兼容
    typeof utterancesTheme === 'function' && utterancesTheme();
    typeof FB === 'object' && window.loadFBComment && window.loadFBComment();
    window.DISQUS && document.getElementById('disqus_thread') && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200);
}