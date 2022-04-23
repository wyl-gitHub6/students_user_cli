/*
 * @Description: 解决跨域问题
 * @Author: wyl
 * @Date: 2021-10-19 18:01:27
 * @LastEditors: Wangyl
 * @LastEditTime: 2022-04-16 16:50:40
 */
// 跨域配置
module.exports = {
  devServer: {    //设置本地默认端口  选填
    port: 1235,   //更改自己前端项目端口
    proxy: {      //设置代理，必须填
      '/api': {  //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
        //target: 'http://localhost:8080',             //代理的目标地址
        //target: 'http://192.168.153.133:9000',       //代理的目标地址 docker部署地址
        target: "http://score.system.com",             //nginx反向代理地址
        changeOrigin: true,              //是否设置同源，输入是的
        pathRewrite: {                   //路径重写
          '/api': ''                     //选择忽略拦截器里面的单词
        }
      }
    }
  },

}
