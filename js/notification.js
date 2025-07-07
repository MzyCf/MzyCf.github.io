// 检测F12开发者工具和复制操作
let devtools = {
    open: false,
    orientation: null
};

// 检测F12开发者工具
function detectDevTools() {
    const threshold = 160;
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    
    if (widthThreshold || heightThreshold) {
        if (!devtools.open) {
            devtools.open = true;
            devtools.orientation = widthThreshold ? 'vertical' : 'horizontal';
            showF12Notification('你已被发现😜', '小伙子，扒源记住要遵循GPL协议！');
        }
    } else {
        devtools.open = false;
        devtools.orientation = null;
    }
}

// 检测复制操作
function detectCopy() {
    showCopyNotification('复制成功🙌', '发现一个cv大师😀');
}

// 显示通知弹窗
function showF12Notification(title, description) {
    if (typeof Vue !== 'undefined' && typeof ELEMENT !== 'undefined' && Vue.prototype.$notify) {
        Vue.prototype.$notify({
            title: title,
            message: description,
            position: 'top-left',
            offset: 50,
            showClose: true,
            type: "warning",
            duration: 5000
        });
    } else {
        setTimeout(function() {
            showF12Notification(title, description);
        }, 1000);
    }
}

function showCopyNotification(title, description) {
    if (typeof Vue !== 'undefined' && typeof ELEMENT !== 'undefined' && Vue.prototype.$notify) {
        Vue.prototype.$notify({
            title: title,
            message: description,
            position: 'top-left',
            offset: 50,
            showClose: true,
            type: "success",
            duration: 5000
        });
    } else {
        setTimeout(function() {
            showCopyNotification(title, description);
        }, 1000);
    }
}

// 等待页面加载完成后初始化检测
document.addEventListener('DOMContentLoaded', function() {
    console.log('页面加载完成，开始初始化检测'); // 调试日志
    
    // 监听窗口大小变化（检测F12）
    window.addEventListener('resize', detectDevTools);
    
    // 监听复制事件
    document.addEventListener('copy', detectCopy);
    
    // 监听键盘事件（检测F12快捷键）
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.shiftKey && e.key === 'J') || (e.ctrlKey && e.key === 'U')) {
            console.log('检测到开发者工具快捷键'); // 调试日志
            setTimeout(function() {
                detectDevTools();
            }, 100);
        }
    });
    
    // 定期检测开发者工具
    setInterval(detectDevTools, 1000);
    
    // 初始检测
    detectDevTools();
    
    // 测试弹窗功能（5秒后自动触发一次测试）
    setTimeout(function() {
        console.log('测试弹窗功能'); // 调试日志
        showNotification('测试弹窗', '如果您看到这个弹窗，说明Vue和Element UI已正常工作！');
    }, 5000);
}); 