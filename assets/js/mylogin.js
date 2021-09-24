$(function () {
    $('#goReg_btn').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })
    $('#goLogin_btn').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 从layui中获取form对象
    var form = layui.form
    var layer =layui.layer
    // form.verify 自定义表单验证规则
    form.verify({
        // 自定义一个对 password 的验证规则
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('#newPwd').val()
            if(value !== pwd) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单事件
    $('#form_reg').on('submit', function(e) {
       // 阻止默认事件
        e.preventDefault()
        // 发送post请求
        var username = $('#reg-username').val()
        var password = $('#newPwd').val()
        $.post('/api/reguser' ,
            {username, password},
            function(res) {
            if( res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功,请登录');
            $('#goLogin_btn').click()
        })
    })

    // 监听登录表单事件
    $('#form_login').submit(function (e) {
        // 阻止默认事件
        e.preventDefault()

        $.ajax({
            url: '/api/login',
            method:'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if(res.status !==0 ) {
                    return layer.msg('登录失败')
                }

                // 将登录成功得到的 token 字符串， 保存到localStorage中
                localStorage.setItem('token', res.token)
                // 登录成功自动跳转到 index
                location.href = '/index.html'
            }

        })
    })
})

