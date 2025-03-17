# harmony 应用开发

## 应用的多模块设计机制

1. 支持模块化开发
2. 支持多设备适配

## Module 类型

Module 按照使用场景可以分为两种类型：

1. Ability 类型的 Module： 用于实现应用的功能和特性。每一个 Ability 类型的 Module 编译后，会生成一个以.hap 为后缀的文件，我们称其为 <span style="color: red">**HAP（Harmony Ability Package）**</span>包。HAP 包可以独立安装和运行，<span style="color: red">**是应用安装的基本单位**</span>，一个应用中可以包含一个或多个 HAP 包，具体包含如下两种类型。

   1.1 entry 类型的 Module：应用的主模块，包含应用的入口界面、入口图标和主功能特性，编译后生成 entry 类型的 HAP。每一个应用分发到同一类型的设备上的应用程序包，只能包含唯一一个 entry 类型的 HAP。

   1.2 feature 类型的 Module：应用的动态特性模块，编译后生成 feature 类型的 HAP。一个应用中可以包含一个或多个 feature 类型的 HAP，也可以不包含。

2. Library 类型的 Module： 用于实现代码和资源的共享。同一个 Library 类型的 Module 可以被其他的 Module 多次引用，合理地使用该类型的 Module，能够降低开发和维护成本。Library 类型的 Module 分为 Static 和 Shared 两种类型，编译后会生成共享包。

   2.1 Static Library：静态共享库。编译后会生成一个以.har 为后缀的文件，即**静态共享包 HAR（Harmony Archive）**。
   2.2 Shared Library：动态共享库。编译后会生成一个以.hsp 为后缀的文件，即**动态共享包 HSP（Harmony Shared Package）**。

> <p>说明</p>
> <p>实际上，Shared Library 编译后除了会生成一个.hsp 文件，还会生成一个.har 文件。这个.har 文件中包含了 HSP 对外导出的接口，应用中的其他模块需要通过.har 文件来引用 HSP 的功能。为了表述方便，我们通常认为 Shared Library 编译后生成 HSP。<p>

HAR 与 HSP 两种共享包的主要区别体现在：

| 共享包类型      | 编译和运行方式 | 发布和引用方式 |
| ----------- | ----------- | ----------- |
| HAR      | HAR中的代码和资源跟随使用方编译，如果有多个使用方，它们的编译产物中会存在多份相同拷贝。注意：编译HAR时，建议开启混淆能力，保护代码资产。       | HAR除了支持应用内引用，还可以独立打包发布，供其他应用引用。 |
| HSP   | HSP中的代码和资源可以独立编译，运行时在一个进程中代码也只会存在一份。        | HSP一般随应用进行打包，当前支持应用内和集成态HSP。应用内HSP只支持应用内引用，集成态HSP支持发布到ohpm私仓和跨应用引用。 |

共享包类型

编译和运行方式

发布和引用方式

HAR

HAR 中的代码和资源跟随使用方编译，如果有多个使用方，它们的编译产物中会存在多份相同拷贝。

注意：编译 HAR 时，建议开启混淆能力，保护代码资产。

HAR 除了支持应用内引用，还可以独立打包发布，供其他应用引用。

HSP

HSP 中的代码和资源可以独立编译，运行时在一个进程中代码也只会存在一份。

HSP 一般随应用进行打包，当前支持应用内和集成态 HSP。应用内 HSP 只支持应用内引用，集成态 HSP 支持发布到 ohpm 私仓和跨应用引用。

图 1 HAR 和 HSP 在 APP 包中的形态示意图
![HAR 和 HSP 在 APP 包中的形态示意图](./images/HAR和HSP在APP包中的形态示意图.png)
