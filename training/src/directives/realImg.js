import Vue from 'vue'
/**
 * 检测图片是否存在
 * @param url 图片地址
 * @returns {Promise<unknown>}
 */
const imageIsExist = (url) => {
    return new Promise((resolve => {
        let imgEle = new Image();
        imgEle.onload = () => {
            if (imgEle.complete) {
                resolve(true);
                imgEle = null;
            }
        };
        imgEle.onerror = () => {
            resolve(false);
            imgEle = null;
        };
        imgEle.src = url;
    }))
}

//全局注册自定义指令，用于判断当前图片是否能够加载成功，可以加载成功则赋值为img的src属性，否则使用默认图片
Vue.directive('real-img', async function (el, binding) {//指令名称为：real-img
    let imgURL = binding.value;//获取图片地址
    if (imgURL) {
        let exist = await imageIsExist(imgURL);
        if (exist) {
            el.setAttribute('src', imgURL);
        }
    }
});

// DEMO
// <!--v-real-img 就是刚刚定义的指令，绑定的为真实要显示的图片地址。src为默认图片地址-->
// <img src="images/logoError.png" v-real-img="images/logo.png">
