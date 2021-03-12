//Tao socket ket noi toi localhost
const socket = io("http://localhost:3000")

//Lang nghe su kien thong bao dang ki that bai tu server
socket.on('server-send-dki-thatbai', function(){
    alert('Username has already exist')
})

//Lang nghe server gui danh sach users dang online
socket.on('server-send-danhsach-Users', function(data){
    $("#boxContent").html('')
    data.forEach(function(i){
        $("#boxContent").append("<div class='user'>" + i + "</div>")
    })
})

//Lang nghe su kien thong bao dang ki thanh cong tu server
socket.on('server-send-dki-thanhcong', function(data){
    $("#currentUser").html(data)
    $("#loginForm").hide(2000)
    $("#chatForm").show(1000)
})

//Lang nghe server gui noi dung tin nhan moi
socket.on('server-send-message', function(data){
    $("#listMessage").append("<div class=='ms'>" + data.un + ": " +  data.nd + "</div>")
})

//Lang nghe server gui thong bao co nguoi dang nhap tin nhan
socket.on("ai-do-dang-go", function(data){
    $("#thongbao").html(data)
})

//Lang nghe server gui thong bao co nguoi ngung nhap tin nhan
socket.on("ai-do-ngung-go", function (){
    $("#thongbao").html("")
})

$(document).ready(function(){
    $("#loginForm").show();
    $("#chatForm").hide();

    // Bat su kien nhan nut Enter cho button
    $("#txtUsername").keyup(function(event){
        if(event.keyCode == 13){
            $("#btnRegister").click();
        }
    });

    $("#txtMessage").keyup(function(event){
        if(event.keyCode == 13){
            $("#btnSendMessage").click();
        }
    });

    //Thong bao toi server toi dang nhap tin nhan
    $("#txtMessage").focusin(function(){
        socket.emit('toi-dang-go')
    })

    //Thong bao toi server toi ngung nhap tin nhan
    $("#txtMessage").focusout(function(){
        socket.emit('toi-ngung-go')
    })

    //Gui username len server de register
    $("#btnRegister").click(function(){
        socket.emit("client-send-Username", $("#txtUsername").val())
        $("#txtUsername").val('')
    })

    //Gui yeu cau dang xuat
    $("#btnLogout").click(function(){
        socket.emit("logout")
        $("#chatForm").hide(2000)
        $("#loginForm").show(1000)
    })

    //Gui noi dung tin nhan len server
    $("#btnSendMessage").click(function(){
        socket.emit('user-send-message', $("#txtMessage").val())
        $("#txtMessage").val('')
    })
})