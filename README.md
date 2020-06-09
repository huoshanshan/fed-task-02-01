# 简答题

1、谈谈你对工程化的初步认识，结合你之前遇到过的问题说出三个以上工程化能解决问题或者带来的价值。

前端工程化就是为了问题而生的，Web业务日益复杂化和多元化，工程复杂了就会产生许多问题，比如：如何进行高效的多人协作？如何保证项目的可维护性？如何提高项目的开发质量？
前端工程化有四个特点：模块化、组件化、自动化、规范化。
模块化：依赖关系单一化。所有CSS和图片等资源的依赖关系统一走JS路线，无需额外处理CSS预处理器的依赖关系，也不需处理代码迁移时的图片合并、字体图片等路径问题；
组件化：在设计层面上，对于UI的拆分，从UI上拆分下来的每一个包模板（html）+样式（CSS）+逻辑（JS）功能完备的结构单元，称之为组件。
自动化：“简单重复的工作交给机器来做”，自动化也就是有很多自动化工具代替我们来完成，例如持续集成、自动化构建、自动化部署、自动化测试等等。
规范化：在项目规划初期制定的好坏对于后期的开发有一定影响。
包括的规范有：编码规范、组件管理、目录结构的制定、组件管理等等

解决问题：
  1、传统语言或语法的弊端
  2、无法使用模块化/组件化
  3、重复的机械式工作
  4、代码风格统一质量保证
  5、依赖后端服务接口支持
  6、整体一代后端项目

2、你认为脚手架除了为我们创建项目结构，还有什么更深的意义？

脚手架就可以帮我们减少重复性工作，脚手架一个命令，目录结构、gulp脚本、babel配置、空的测试文件都帮你搞好了. 直接写核心业务代码，不做重复性工作，这就是脚手架的作用.
脚手架在前端工作流中负责项目起始阶段创建初始文件。与其他功能模块不同的是，脚手架是一个完全“启下”的模块，它没有任何前置依赖。创建完成项目初始文件之后，脚手架就再无用武之地了
脚手架的作用：
  1、减少时间，不必从零开始搭建初始项目，提高开发效率。
  2、便于多人协作。
  3、项目更新同步方便，只需要更新代码库中项目模板，即可下载最新的项目。
  4、减少重复性工作而做的重复性工作
