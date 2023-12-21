/*
 * @Description:
 * @Version: v1
 * @Author: zkx
 * @LastEditTime: 2023-08-29 09:26:14
 * Copyright (c) 2023 by 敢为软件, All Rights Reserved.
 */
import CHILDPROCESS from 'child_process';
import fs from 'fs';
import path from 'path';
import {
    fileURLToPath
} from 'url';

const __FILENAME = fileURLToPath(
    import.meta.url);
const __DIRNAME = path.dirname(__FILENAME)
CHILDPROCESS.execSync('rimraf node_modules')
let files = fs.readdirSync(path.join(__DIRNAME, "../packages"))
files.forEach(item => {
    CHILDPROCESS.execSync(`cd ${path.join(__DIRNAME, "../packages")}/${item} && rimraf node_modules`)
})
