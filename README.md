## 大文件上传

确定需求

1. 切片上传
2. 断点续传
3. 断开重连重传

实现思路

- 前端切片 chunk
- 上传切片，name: hash, index: 上传的顺序
- 后端组合切片
  加料
- 前端切片：主进程卡顿，web-worker 多进程切片，处理完交给主进程
- 切完后，将 blob 存储到 indexDB，下次用户进来之后，嗅探一下是否存在未上传完成的切片，有就尝试重传

困难点

1. 切片造成主进程卡顿，考虑使用 web work
2. 将切片存储到 indexDB 里面，可实现断点重传

## 前端截图

1. html2canvas
2. 无头浏览器 puppeter 无头浏览器

## 移动端适配

- 根据不同段，开发不同的页面（成本最高）
- 根据不同的端，加载不同的样式（可取）
- 根据响应式，来运行不同的样式规则（**常用**）
- css 预处理器

考虑的问题

1. 设置视窗
   ```html
   <meta
     name="viewport"
     content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
   />
   ```
2. 媒体查询

```css
@media screen and (max-width: 768px) {
  body {
    font-size: 16px;
  }
}
```

3. 弹性布局
4. 图片响应式处理

```html
<picture>
  <source srcset="1.png" media="(min-width: 768px)" />
  />
  <source srcset="2.png" media="(min-width: 480px)" />
  />
  <img src="1.png" alt="1" />
</picture>
```

5. rem 根据 html 标签的字体大小来决定
6. em 根据自身的字体大小来决定

## 性能衡量指标

1. LCP LargestContentPaint 最大内容渲染时间
2. FID FirstInputDelay 首次输入延迟
3. INP Interaction to next paint 用户交互到浏览器响应的延迟
4. CLS cumulative layout shift 累计布局偏移，衡量页面布局视觉稳定性
5. FCP first content paint 首次内容渲染时间
6. DCL DOM Content Loaded DOM 解析完成时间
7. L Loaded 页面完全加载时间
8. TTI Time to interactive 页面可交互时间
9. FPS Frame per second 每秒刷新帧数

## 大规模请求并发

滑动窗口
请求队列
防抖节流
分页加载

## 网站性能优化

首先定位出性能问题的原因，针对原因采用合适的解决方案

1. DNS 预解析，资源预加载
2. 资源压缩，js css 图片，CDN 加速
3. 组件懒加载，图片懒加载
4. 采用合适的缓存策略
5. GPU 加速
6. 防抖节流
7. web work 处理密集型任务
8. 使用服务端渲染

9. 资源小一点
   tree shaking
   按需加载，懒加载
   代码压缩，gzip br
   图片体积优化
10. 请求少一点
    缓存 精灵图
11. 请求快一点
    CDN 加速
12. 服务端渲染

## 前端性能监控

1. 数据收集
2. 数据上报
3. 数据存储

上报方式

1. 1px \* 1px 的 gif 图片
2. http
3. Navigator.sendBeacon 异步非阻塞 页面卸载的时候，依然可以发送数据 低优先级 post

上报时机

1. setTimeout
2. beforeUnload unload
3. 缓存一定的数据，集中上报

页面白屏监测

1. Document.elementsFromPoint()

## 从哪几个维度去思考导入第三方包库的

1. 体积大小
2. 开源协议
3. 安全性 npm audit
4. 活跃度 下载量
5. 类型支持 es module ts
6. 兼容性

## 如何修改第三方包

1. fork package 自己来维护，自己打包发布到私服
2. patch-package
3. 修改 node_modules 里面的文件，并保留

## 使用同一个链接，pc 打开时 web 应用，手机打开时 H5 应用

背景，一个链接访问页面，需要同时适配移动端和 PC 端
区分 PC 端和移动端

- 显示别端
- 端内容渲染器

### 识别端

1. js 识别， user-agent

```js
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
```

2. 响应式

## 当 QPS 达到峰值时，如何优化接口性能

### 请求限流

```js
cosnt rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'xxx'
})
```

### 请求合并

短时间内的请求合并，以此降低服务器压力

- debounce
- throttle

### 请求缓存

请求参数，请求方法，依赖逻辑没有发生变化，直接命中缓存

### 任务队列

## 水印

### 明水印

#### 背景图

#### 动态内容生成 svg

#### canvas 绘制

### 暗水印

将信息写入文件二进制代码里面

## 静态资源加载失败做降级处理

1. 图片
   - 占位图 alt
   - 重试
   - 上报
2. css
   - 内联样式
   - 备用样式
   - 上报
   - 重试
3. js
   - 内联脚本
   - 备用脚本
   - 上报
4. cdn
   - 本地备份，cdn 出错，使用本地文件
   - cdn 切换
5. 字体文件
   - 降级字体， font-family
   - webfont 处理字体问题
6. 服务端渲染失败
   - 降级的 html 用作渲染
   - 切换为客户端渲染 csr

## 怎么设计一个全站请求耗时的统计工具

### 监控请耗时： http 中间件 axios

### 前端监控： 监控整个请求，记录耗时数据

### 后端监控：后端记录

### 数据汇总： 数据清洗加工，数据可视化

## 函数式编程

### 函数式编程特点

1. 函数是一等公民
2. 纯函数
3. 不可变数据
4. 惰性计算
5. 高阶函数
6. 函数组合
7. 递归

### 纯函数

相同的输入，相同的输出，不产生副作用

### 不可变数据

数据不可变，数据不可修改

### 优点

1. 可测试性
2. 可维护性
3. 并发
4. 简洁

## DNS 协议的理解
