// 简单的测试文件，验证Vue和Element UI是否正常工作
console.log('测试文件已加载');

// 等待页面完全加载
window.addEventListener('load', function() {
    console.log('页面完全加载完成');
    
    // 检查Vue和Element UI
    console.log('Vue版本:', typeof Vue !== 'undefined' ? Vue.version : '未加载');
    console.log('Element UI:', typeof ELEMENT !== 'undefined' ? '已加载' : '未加载');
    
    // 如果都加载了，尝试创建弹窗
    if (typeof Vue !== 'undefined' && typeof ELEMENT !== 'undefined') {
        console.log('尝试创建测试弹窗');
        
        // 创建一个简单的Vue实例
        const testApp = new Vue({
            el: document.createElement('div'),
            mounted() {
                console.log('Vue实例已挂载');
                this.$notify({
                    title: '测试成功！',
                    message: 'Vue和Element UI工作正常，网站已完全加载',
                    position: 'top-left',
                    type: 'success',
                    duration: 3000
                });
            }
        });
    } else {
        console.log('Vue或Element UI未加载，无法创建弹窗');
    }
});

// 5秒后再次尝试
setTimeout(function() {
    console.log('5秒后再次检查');
    if (typeof Vue !== 'undefined' && typeof ELEMENT !== 'undefined') {
        console.log('5秒后Vue和Element UI已加载');
        const testApp = new Vue({
            el: document.createElement('div'),
            mounted() {
                this.$notify({
                    title: '延迟测试',
                    message: '5秒后Vue和Element UI正常工作',
                    position: 'top-left',
                    type: 'info',
                    duration: 3000
                });
            }
        });
    }
}, 5000); 