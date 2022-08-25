export default function myExample () {
    // 返回的是插件对象
    return {
        name: 'my-example', 
        options(opts) {
            console.log('options');
        },
        buildStart() {
            console.log('buildStart');
        },
        // vite特有钩子
        config(config) {
            console.log('config');
            return {}
        },
        configResolved(resolvedCofnig) {
            console.log('configResolved');
        },
        configureServer(server) {
            console.log('configureServer');
            // server.app.use((req, res, next) => {
            //   // custom handle request...
            // })
        },
        transformIndexHtml(html) {
            console.log('transformIndexHtml');
            return html
            // return html.replace(
            //   /<title>(.*?)<\/title>/,
            //   `<title>Title replaced!</title>`
            // )
        },
        // 通用钩子
        // 默认情况相对路径会从当前文件找到引入文件模块的绝对路径
        // 如果是第三方的，或从node_modules里面找
        resolveId(source) {
            console.log('resolvedId')
            if (source === 'virtual-module') {
            // 如果返回值不为null，那么返回值就会作为最终的模块问价路径，不再走正常的默认路径解析逻辑
                console.log('resolvedId');
                return source; 
            }
            return null; 
        },
        // 默认绝对路径，根据id 查找文件内容 fs.readFile()
        load(id) {
            console.log('load');
                
            if (id === 'virtual-module') {
                return 'export default "This is virtual!"';
            }
            return null;
        },
        // 转换代码，es6转es5
        transform(code,id) {
            console.log('transform');
            if (id === 'virtual-module') {
            }
            return code
        },
    };
  }

