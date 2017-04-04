var dataStation = window.localStorage ;     // 数据库
var userList = dataStation.userList = [];   // 用户列表
var login = $('#loginButton');              // 登录按钮
var register = $('#regButton');             // 注册按钮

// 注册信息
var rname = $('#rName').val();
var remail = $('#rEmail').val();
var rpassword = $('#rPassword').val();

// 登录信息
var lemail = $('#lEmail').val();
var lpassword = $('#lPassword').val();

register.click(function () {
    userList.push({
        name: rname,
        email: remail,
        password: rpassword
    });
    alert('注册成功请登录！')
});

login.click(function(){
   for(var n=0 ;n< userList.length;n++) {
       if(lemail == userList[n].email && lpassword == userList[n].password){
           window.location.href = '/chartroom'
       }else {
           alert('帐号或密码错误！')
       }
   }
});



