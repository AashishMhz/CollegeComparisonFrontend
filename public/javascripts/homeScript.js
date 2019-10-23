$(function() {
    let tblBody = $("#colleges");
    let base_url = "http://localhost:3000/";
    let imageFile = "";

    function rowTemplate(college) {
        let oneRow =
        '<div class="col-6 col-md-6 col-lg-3">'
        +'<a href="#" class="item"><img width="500" height = "500" src="'
        + base_url +'uploads/'+ college.college_image+'" alt="Image" class="img-fluid">'
        +'<div class="item-info">'
        +'<h3>'+ college.college_name +'</h3>'
        +'<strong class="price">Rs.'+ college.college_price +'</strong>'
        +'</div></a>'
        +'<a class="btn btn-primary view" data-toggle="modal" data-target="#ViewModel" role="button" data-id = ' 
      + college._id + '>'
      +'View details »</a></div>';
        return oneRow;
      }

       $.ajax({
      type: "GET",
      url: base_url + "college",
      success: function(colleges) {
        console.log(colleges);
        let myRows = [];
        $.each(colleges, function(index, college) {
          myRows.push(rowTemplate(college));
        });
        tblBody.append(myRows);
      },
      error: function() {
        alert("Something went wrong!");
      }
    });


    tblBody.on("click", ".view", function() {
      var id = $(this).attr("data-id");
      $.ajax({
        type: "GET",
        url: base_url + "college/" + id,
        success: function(college) {
          var collegeDetail =  '<div class="col-md-6">'
          +'<div class="woocommerce-single-college" data-aos="fade-right"><img width="400" height = "500" src="' +
          base_url +
          "uploads/" +
          college.college_image + '" /></div></div>'
          +'<div class="col-sm-6">'
          +'<div class="item-info">'
          +'<h3>'+ college.college_name +'</h3>'
          +'<p>' + college.college_description +'</p>'
          +'<strong class="price">Rs.'+ college.college_price +'</strong>'
          +'<a class="btn btn-primary view" id = "addCart" data-toggle="modal" data-target="#ViewModel" role="button" data-id = ' 
          + college._id + '>'
          +'Add to cart »</a></div></div>';
          $("#viewTemplate").html(collegeDetail);
          $("#addCart").on('click', function() {
            //  ret = DetailsView.GetProject($(this).attr("#data-id"), OnComplete, OnTimeOut, OnError);
            console.log('addCart');
            var id = $(this).data("id");
            var cartItems;
            if(localStorage.getItem("cartItems") === null){
              cartItems = [];
            } else{
              cartItems = JSON.parse(localStorage.getItem("cartItems"));
            }
            cartItems.push(id);
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            alert("add cart");
            //alert($(this).data("id"));
          });
        },
        error: function() {
          alert("couldn't load the college");
        }
      });
    });

    $("#logout").on("click", function(){
      if (confirm("Do you really want to logout?")) {
      localStorage.setItem("user","");
      window.location = 'home.html';
      }
    });

    
    $("#login").on("click", function() {
      if($("#username").val() ===""){
        alert("Please enter your username");
      }else if($("#password").val() ===""){
        alert("Please enter your password");
      }else{
        let user = {
          username :$("#username").val(),
          password :$("#password").val()
        };
        $.ajax({
          type: "POST",
          url: base_url + "users/login",
          data: user,
          success: function(user) {
            console.log(user);
            alert("You are logged in " + user.firstname);
          
           if(user.admin == true){
             localStorage.setItem("admin", user._id);
             window.location = 'admin.html';
           }
           else{
            localStorage.setItem("user", user._id);
            window.location = 'dashboard.html';
            
           }
          },
          error: function() {
            alert("Invalid username or password");
          }
        });
      }
    });

    $("#register").on("click", function(e) {
      let user = {
        firstname: $("#fname").val(),
        lastname: $("#lname").val(),
        email: $("#email").val(),
        username: $("#uname").val(),
        password: $("#pass").val()
      };
      console.log(user);
      $.ajax({
        type: "POST",
        url: base_url + "users/signup",
        data: user,
        success: function(user) {
          alert("successfully registered");
          console.log(user);
        },
        error: function() {
          alert("couldn't register");
        }
      });
      // alert("Successfully registered");
    });

    $("#comparison").on("click", function() {
      if (confirm("You need to login first.")) {
      window.location = 'login.html';
      }
    });
});