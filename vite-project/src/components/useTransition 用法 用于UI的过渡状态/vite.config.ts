import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import type { Plugin } from "vite";
import Mock from "mockjs";
import url from "url";
// 自定义一个vite插件：用于模拟请求访问mockjs出来的数据
const viteMockServer = (): Plugin => {
  return {
    name: 'vite-mock-server',
    configureServer: (server) => {
      server.middlewares.use('/api/mock/list', (req, res) => {
        const paseUrl = url.parse(req.originalUrl!, true).query;
        console.log('paseUrl', paseUrl.keys);
        res.setHeader('Content-Type', 'application/json')
        const data = Mock.mock({
          // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
          'list|2000': [
            {
              id: '@id',
              // name: '@cname',
              name: paseUrl.keys,
              age: '@integer(18, 60)',
              address: '@county(true)',
            }
          ]
        })
        res.end(JSON.stringify(data))
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteMockServer()],
})
