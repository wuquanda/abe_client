const remote = require('electron').remote;
const dialog = require('electron').remote.dialog;

function keyGen() {
    var form=document.getElementById("form");
    var elements=new Array();
    var tagElements=form.getElementsByTagName("input");
    var s='';
    for(var j=0;j<tagElements.length;j++){
        elements.push(tagElements[j]);
        s+=tagElements[j].value;
    }
    dialog.showMessageBox({
        type:'info',
        title:'success',
        message:"成功"+s
        }

    )

}
