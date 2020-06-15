#!/usr/bin/env node

// node cli必须使用这个文件头
// linux或者macOS 系统需要修改cli.js读写权限为755
// 通过chmod 755 cli.js修改


//脚手架的工作过程
// 1. 通过命令行交互询问用户问题
// 2. 根据用户回答的集热管生成文件


const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer') // 命令行询问插件 通过yarn add inquirer 添加
const ejs = require('ejs')

inquirer.prompt([
    {
        type:'input', // 询问的类型 input 用户输入
        name:'name', // 用户输入的答案
        message:'project name' // 显示在命令行的问题
    },{
        type:"input",
        name:"description",
        message:"project description"
    },{
        type:"input",
        name:"keywords",
        message:"project keywords"
    }
])
.then( res => {
    //console.log(res)
    const tmplDir = path.join(__dirname,'tmp')
    const destDir = process.cwd()

    fs.readdir(tmplDir,(err,files)=>{
        if(err) throw err
        files.forEach(file=>{
            //console.log(file)
            ejs.renderFile(path.join(tmplDir,file), res, (err,data)=>{
                if(err) throw err
                //console.log(data)
                fs.writeFileSync(path.join(destDir,file), data)
            })
        })
    })
})
