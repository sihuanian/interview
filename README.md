## 大文件上传
确定需求
1. 切片上传
2. 断点续传
3. 断开重连重传

实现思路
- 前端切片
- 上传切片，name: hash index: 上传的顺序
- 后端组合切片

困难点
1. 切片造成主进程卡顿，考虑使用web work
2. 将切片存储到indexDB里面，可实现断点重传

## 性能衡量指标
1. LCP LargestContentPaint 最大内容渲染时间
2. FID FirstInputDelay 首次输入延迟
3. INP Interaction to next paint 用户交互到浏览器响应的延迟
4. CLS cumulative layout shift 累计布局偏移，衡量页面布局视觉稳定性
5. FCP first content paint 首次内容渲染时间
6. DCL DOM Content Loaded DOM解析完成时间
7. L Loaded页面完全加载时间
8. TTI Time to interactive 页面可交互时间
9. FPS Frame per second 每秒刷新帧数

## 大规模请求并发
   滑动窗口
   请求队列
   防抖节流
   分页加载

## 网站性能优化
首先定位出性能问题的原因，针对原因采用合适的解决方案
1. DNS预解析，资源预加载
2. 资源压缩，js css 图片，CDN加速
3. 组件懒加载，图片懒加载
4. 采用合适的缓存策略
5. GPU 加速
6. 防抖节流
7. web work处理密集型任务
8. 使用服务端渲染

1. 资源小一点
   tree shaking
   按需加载，懒加载
   代码压缩，gzip br
   图片体积优化
2. 请求少一点
   缓存 精灵图
3. 请求快一点
  CDN加速
4. 服务端渲染  


## 前端性能监控
1. 数据收集
2. 数据上报
3. 数据存储

上报方式
1. 1px * 1px 的gif图片
2. http
3. Navigator.sendBeacon 异步非阻塞 页面卸载的时候，依然可以发送数据  低优先级 post

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

## 项目部署

## AI相关