const remote = require('electron').remote;
const dialog = require('electron').remote.dialog;
var path=require('path')
var request=require("request")
var fs=require('fs')

const projectPath = path.resolve('./');
const keysPath=path.join(projectPath,"app","keys","user.keys");

function keyGen() {
    var form=document.getElementById("form");
    var tagElements=form.getElementsByTagName("input");
    var attributes=new Array();
    for(var j=0;j<tagElements.length;j++){
        attributes.push(tagElements[j].value);

    }
    var b64UserDataByte=fs.readFileSync(keysPath);
    var b64UserDataStr=b64UserDataByte.toString("utf-8")
    var UserDataByte=Buffer.from(b64UserDataStr,"base64")
    var UserDataStr=UserDataByte.toString("utf8");
    var UserDataObj=JSON.parse(UserDataStr);
    var requestData={
        'userData':UserDataObj,
        'attributes':attributes
    }

    request({
        url:'http://localhost:8090/AA//keyGen',
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: requestData
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            b64Data=Buffer.from(JSON.stringify(body)).toString("base64")
            fs.writeFileSync(keysPath,b64Data,"utf8")
            dialog.showMessageBox({
                type:"info",
                title:"结果",
                message:"生成私钥成功"
            })
        }else {
            dialog.showErrorBox(
                "错误",
                "生成私钥失败"
            )
        }
    });
}

