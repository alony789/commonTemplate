import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const __FILENAME = fileURLToPath(import.meta.url)
const __DIRNAME = path.dirname(__FILENAME)
let npmPath = path.join(__DIRNAME, '../node_modules/'),destPath = path.join(__DIRNAME, '../packages/')
let applicationList = [],npmList = []

/**
 * @description: 读取packages文件夹
 * @return {destPath 目录}
 */
fs.readdir(destPath, function (err, appFiles) {
    if (appFiles.length > 0) {
        applicationList = appFiles
        fs.readdir(npmPath, function (err, npmFiles) {
            if (npmFiles.length > 0) {
                npmList = npmFiles.filter((item,index)=>item.indexOf('gw-base-') != -1)
                startCopy()
            }
        })
    }
})


/**
 * @description: 复制文件夹
 * @return {
 * }
 */
function startCopy() {
    if(npmList.length == 0) return
    for(let i=0;i<applicationList.length;i++){
        let destPathFile = path.join(__DIRNAME, '../packages/' + applicationList[i], '/node_modules/')
        let sourceFile = path.join(__DIRNAME, '../node_modules/')
        copyFile(sourceFile,destPathFile).then((res)=>{
            console.log("success:"+res)
        }).catch(err=>{
            // console.log(err)
        })
    }
}


/**
 * 异步复制文件或文件夹
 * @param {*} fromPath 源始路径，参数可以是文件或文件夹
 * @param {*} toPath 目标路径，参数可以是文件或文件夹
 */
function copyFile(fromPath, toPath) {
    return new Promise((resolve, reject) => {
        fs.access(fromPath, err => {
            if (err) reject(err)
            fs.stat(fromPath, (err, stats) => {

                //如果是文件
                if (stats.isFile()) {
                    fs.copyFile(fromPath, toPath, (err) => {
                        err ? reject(err) : resolve();
                    });
                } else {
                    fs.access(toPath, err => {

                        // 如果不存在则创建
                        new Promise((resv, rejt) => {
                            err ? fs.mkdir(toPath, err => (err ? rejt(err) : resv())) : resv();
                        }).then(() => {
                            fs.readdir(fromPath, (err, filenames) => {
                                if (err) reject(err)
                                Promise.all(filenames.map(filename => {
                                    return new Promise((res, rej) => {
                                        let newFromPath = path.join(fromPath, filename)
                                        let newToPath = path.join(toPath, filename)
                                        fs.stat(newFromPath, (err, stats) => {
                                            if (err) rej(err)
                                                //如果是文件
                                            if(newFromPath.indexOf('gw-base-') != -1){
                                                if (stats.isFile()) {
                                                    fs.copyFile(newFromPath, newToPath, (err) => {
                                                        err ? rej(err) : res();
                                                    });
                                                } else {
                                                    //如果是目录递归调用
                                                    res(copyFile(newFromPath, newToPath))
                                                }
                                            }
                                        })
                                    });
                                })).then(() => {
                                    resolve()
                                }).catch(reject);
                            });
                        }).catch(reject);
                    });
                }
            });
        })
    })
}

