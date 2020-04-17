const dialog = require('electron').remote.dialog;
const remote = require('electron').remote
var exec=require('child_process').exec;
var path=require("path")
var projectPath = path.resolve('./');
var keysPath=path.join(projectPath,"app","keys","user.keys");
var pyFile=path.join(projectPath,"app","py","abeFuctions.py");
var fs=require('fs')

function encrypt() {
    let files=remote.getGlobal("shareObject").files
    var input=document.getElementById("policy_str");
    var b64Policy_str=Buffer.from(input.value,"utf8").toString("base64");
    var b64UserDataByte=fs.readFileSync(keysPath);
    var b64UserDataStr=b64UserDataByte.toString();
    var UserDataByte=Buffer.from(b64UserDataStr,"base64")
    var UserDataObj=JSON.parse(UserDataByte.toString('utf8'));
    var b64User=Buffer.from(JSON.stringify(UserDataObj['privateData']),"utf8").toString("base64")
    var b64GPP=Buffer.from(UserDataObj['gpp'],"utf8").toString("base64")
    var authorityId=UserDataObj['authorityId']
    var b64authotities=Buffer.from(JSON.stringify(UserDataObj['authorities']),"utf8").toString("base64");

    for(var i=0;i<files.length;i++){
        var dirName=path.dirname(files[i]);
        var extName=path.extname(files[i]);
        var baseName=path.basename(files[i],extName);
        var fileName=baseName+".ABE";
        var targetFile=path.join(dirName,fileName)
        var sourceFile=files[i]
        var cmd="python3 "+pyFile+" --method=encrypt"+ " "+b64GPP+" "+sourceFile+" "+targetFile+" "+extName +" "+b64Policy_str+" "+b64authotities+" "+authorityId+" "+b64User;
        exec(cmd,function(error,stdout,stderr){
            if(error) {
                dialog.showErrorBox(
                    "错误",
                    "加密失败:"+stderr
                )
            }
            else {
                dialog.showMessageBox({
                    type:"info",
                    message:"文件加密成功"
                })

            }
        });

    }
}
