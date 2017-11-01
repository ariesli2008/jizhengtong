/**
 * Created by Administrator on 2017/8/31 0031.
 */
window.onload=function () {
    var oOthers=document.getElementsByClassName('others')[0];
    var oHide=document.getElementsByClassName('hide_input')[0];
    var oSel=document.getElementsByTagName('select')[0];
     oHide.style.display='none';
     oOthers.onclick=function () {
        // oSel.style.display='none';
        // oHide.style.display='block';
        this.style.background='red';
    }
};