## yzf 海外版本启动

1. `git submodule init`
2. `yarn` 
3. `yarn environment`
4. `yarn serve os-test2 -m 'oversea_app,setup_app,company_manager_app'`

## 打包
1. 分包打包 `yarn cf:os-test2 -m 'setup_app,inner_sys_app,oversea_app,company_manager_app'`  `yarn zip os-test2 -m 'setup_app,inner_sys_app,oversea_app,company_manager_app'` 
2. `yarn build:os-test2`

## 发布
1. yarn cf:release-outside -m 'oversea_app,work_system_app,setup_app'
2. yarn zip release-outside -m 'oversea_app,work_system_app,setup_app' -a
3. yarn build:release-outside

## styled-components

- 通过传参控制:hover
```tsx
const TuoGuanButton = styled.div<{hover?: boolean}>`
  padding: 8px;
  color: #666;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  gap: 6px;
  cursor: pointer;

  ${props => props.hover && css`
    &:hover {
      color: #265CF0;
    }
  `}
`
```