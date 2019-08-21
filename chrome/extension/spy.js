/**
 * 工作居住证网站补丁代码
 */

window.GetObjVal = function GetObjVal(objName, formName) {
  let val = '';
  let ObjID = 0;
  for (ObjID = 0; ObjID < formName.elements.length; ObjID++) {
    if (formName.elements[ObjID].name == objName) {
      break;
    }
  }
  val = formName.elements[ObjID].value;
  return val;
};

window.focusObj = function focusObj(objName, formName) {
  let ObjId;
  ObjId = GetObjID(objName, formName);
  formName.elements[ObjId].focus();
};

window.changeSub = function changeSub(flag) {
  if (flag == 'education') {
    document.getElementById('education').style.display = '';
    document.getElementById('unit').style.display = 'none';
    document.getElementById('achievement').style.display = 'none';
    document.getElementById('follows').style.display = 'none';
  } else if (flag == 'unit') {
    document.getElementById('education').style.display = 'none';
    document.getElementById('unit').style.display = '';
    document.getElementById('achievement').style.display = 'none';
    document.getElementById('follows').style.display = 'none';
  } else if (flag == 'achievement') {
    document.getElementById('education').style.display = 'none';
    document.getElementById('unit').style.display = 'none';
    document.getElementById('achievement').style.display = '';
    document.getElementById('follows').style.display = 'none';
  } else if (flag == 'follows') {
    document.getElementById('education').style.display = 'none';
    document.getElementById('unit').style.display = 'none';
    document.getElementById('achievement').style.display = 'none';
    document.getElementById('follows').style.display = '';
  }
};

window,
  (toMod = function toMod() {
    window.location = '/yjrc/person/ApplyCardAction.do?formAction=cApply';
  });
window.back = function back() {
  window.location = '/yjrc/person/ApplyListAction.do?formAction=in&opType=cApply';
};
window.queryEdu = function queryEdu(id) {
  const goUrl = `/yjrc/person/QueryEduResumAction.do?formAction=in&applyId=${id}`;
  window.open(
    goUrl,
    'querywindow',
    'width=1030,height=420,top=10,left=10,status=yes,menubar=no,resizable=yes,scrollbars=yes'
  );
};

window.queryWork = function queryWork(id) {
  const goUrl = `/yjrc/person/QueryWorkResumAction.do?formAction=in&applyId=${id}`;
  window.open(
    goUrl,
    'querywindow',
    'width=1030,height=420,top=10,left=10,status=yes,menubar=no,resizable=yes,scrollbars=yes'
  );
};

const linktag = document.querySelector(
  'body > table:nth-child(5) > tbody > tr:nth-child(1) > td:nth-child(1) > table:nth-child(4) > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(2) > div'
);
linktag.querySelector('a').style.pointerEvents = 'none';

linktag.addEventListener('click', () => {
  const form = document.createElement('form');
  form.name = 'sso';
  form.method = 'post';
  form.action = '/uamsso/SSOSecService';
  const data = [
    { name: 'sid', value: 'null' },
    { name: 'LinkID', value: '666' },
    { name: 'LinkType', value: 'online' }
  ];
  data.forEach((d, idx) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = d.name;
    input.value = d.value;
    form.appendChild(input);
  });
  document.body.appendChild(form);
  form.submit();
});
