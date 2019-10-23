$(function() {
    let tblBody = $("#tblbody");
    let base_url = "http://localhost:3000/";
    let imageFile = "";
  
    function rowTemplate(college) {
      let oneRow =
        "<tr><td>" +
        college.college_name +
        "</td><td>" +
        college.location +
        "</td><td>" +
        college.total_student +
        "</td><td>" +
        college.affiliation +
        "</td><td>" +
        college.desc +
        "</td><td>"+
        college.courses +
        "</td><td>" + 
        college.credit_hours +
        "</td><td>" + 
        college.Fees +
        "</td><td>" + 
        college.Scholarship_criteria +
        "</td><td>" 
        ;
      oneRow +=
        '<td><button type="button" class="btn btn-danger delete" data-id=' +
        college._id +
        '><i class = "fas fa-trash-alt"></i>Delete</button></td>' +
        '<td> <button type = "button" class ="btn btn-success edit" data-toggle="modal" data-target="#EditModal" data-id = ' +
        college._id +
        '><i class = "fas fa-edit"></i>Edit</td></tr>';
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
    //  $.ajax({
    //   type: "GET",
    //   url: base_url + "product_type",
    //   success: function(productTypes) {
    //     $.each(productTypes, function(index, productType) {
    //       var productType_data =
    //         "<option value=" +
    //         productType._id +
    //         ">" +
    //         productType.name +
    //         "</option>";
    //       $("#productType").append(productType_data);
    //     });
    //   }
    // });

    // $.ajax({
    //   type: "GET",
    //   url: base_url + "product_type",
    //   success: function(productTypes) {
    //     $.each(productTypes, function(index, productType) {
    //       console.log(productTypes);
    //       var productType_data =
    //         "<option value=" +
    //         productType._id +
    //         ">" +
    //         productType.name +
    //         "</option>";
    //       $("#eproductType").append(productType_data);
    //     });
    //   }
    // });
  
    $("#fileToUpload").on("change", function() {
      let formData = new FormData();
      let files = $("#fileToUpload").get(0).files;
      if (files.length > 0) {
        formData.append("imageFile", files[0]);
      }
      // $("#add-hero").prop("disabled", true);
      $.ajax({
        type: "POST",
        url: base_url + "upload",
        contentType: false,
        cache: false,
        processData: false,
        data: formData,
        success: function(data) {
          imageFile = data.filename;
          // $("#add-hero").prop("disabled", false);
        },
        error: function() {
          alert("Image upload failed!");
        }
      });
    });
    
    $("#efileToUpload").on("change", function() {
      let formData = new FormData();
      let files = $("#fileToUpload").get(0).files;
      if (files.length > 0) {
        formData.append("imageFile", files[0]);
      }
      // $("#add-hero").prop("disabled", true);
      $.ajax({
        type: "POST",
        url: base_url + "upload",
        contentType: false,
        cache: false,
        processData: false,
        data: formData,
        success: function(data) {
          imageFile = data.filename;
          // $("#add-hero").prop("disabled", false);
        },
        error: function() {
          alert("Image upload failed!");
        }
      });
    });
  
    $("#add-college").on("click", function() {
      let college = {
        college_name: $("#college_name").val(),
        location: $("#location").val(),
        total_student: $("#total_student").val(),
        affiliation: $("#affiliation").val(),
        desc: $("#desc").val(),
        courses: $("#courses").val(),
        credit_hours: $("#credit_hours").val(),
        Fees: $("#Fees").val(),
        Scholarship_criteria: $("#Scholarship_criterias").val(),
        College_image:imageFile
      };
      $.ajax({  
        type: "POST",
        url: base_url + "college",
        data: college,
        success: function(college) {
          tblBody.append(rowTemplate(college));
          imageFile = "";
          $("#college-form").trigger("reset");
          alert("Successfully added");
          
        },
        error: function() {
          alert("Fill all the form fields!");
        }
      }); 
    });
  
    $("#remove-heroes").on("click", function() {
      if (confirm("Do you want to delete all products?")) {
        $.ajax({
          type: "DELETE",
          url: base_url + "college",
          success: function() {
            location.reload();
          },
          error: function() {
            alert("Couldn't delete all products");
          }
        });
      }
    });
  
    $("#logout").on("click", function() {
      if (confirm("Do you really want to logout?")) {
        localStorage.setItem("user","");
      window.location = 'home.html';
      }
    });

    tblBody.on("click", ".delete", function() {
      var id = $(this).attr("data-id");
      console.log(id);
      $.ajax({
        type: "DELETE",
        url: base_url + "college/" + id,
        success: function() {
          location.reload();
        },
        error: function() {
          alert("Couldn't delete");
        }
      });
    });
  
    tblBody.on("click", ".edit", function() {
      var id = $(this).attr("data-id");
      console.log(id);
      $.ajax({
        type: "GET",
        url: base_url + "college/" + id,
        success: function(college) {
          console.log(college);
          $("#eid").val(college._id);
          // $("#ename").val(product.product_name);
          // $("#eprice").val(product.product_price);
          // $("#edesc").val(product.product_description);
          // $("#equantity").val(product.quantity);
          // $("#eproductType").val(product.product_type);
          // $("#efileToUpload").val(product.product_image);
           $("#ecollege_name").val(college.college_name),
           $("#elocation").val(college.location),
           $("#etotal_student").val(college.total_student),
           $("#eaffiliation").val(college.affiliation),
           $("#edesc").val(college.desc),
           $("#ecourses").val(college.courses),
           $("#ecredit_hours").val(college.credit_hours),
           $("#eFees").val(college.Fees),
           $("#eScholarship_criterias").val(college.Scholarship_criteria)
        },
        error: function() {
          alert("couldn't load the product");
        }
      });
    });
  
    $("#edit-product").on("click", function() {
      // var id = $("#eid").val();
      // if(imageFile ===""){
      //   var image ="";
      //   $.ajax({
      //     type: "GET",
      //     url: base_url + "product/" + id,
      //     success: function(product) {
      //       alert(" image " + product.product_image);
      //       image = product.product_image;
      //     },
      //     error: function() {
      //       alert("couldn't load the product");
      //     }
      //   });
      //   let product = {
      //     _id: $("#eid").val(),
      //     college_name: $("#ecollege_name").val(),
      //   location: $("#elocation").val(),
      //   total_student: $("#etotal_student").val(),
      //   affiliation: $("#eaffiliation").val(),
      //   desc: $("#edesc").val(),
      //   courses: $("#ecourses").val(),
      //   credit_hours: $("#ecredit_hours").val(),
      //   Fees: $("#eFees").val(),
      //   Scholarship_criteria: $("#eScholarship_criterias").val()
      //   };
        
      //   $.ajax({
      //     type: "PUT",
      //     url: base_url + "product/" + id ,
      //     data: product,
      //     success: function(product) {
      //       imageFile = "";
      //       location.reload();
      //       alert("successfully edited");
      //     },
      //     error: function() {
      //       alert("Fill all the form fields!");
      //     }
      //   });
      // }else{
        let college = {
          _id: $("#eid").val(),
          college_name: $("#ecollege_name").val(),
        location: $("#elocation").val(),
        total_student: $("#etotal_student").val(),
        affiliation: $("#eaffiliation").val(),
        desc: $("#edesc").val(),
        courses: $("#ecourses").val(),
        credit_hours: $("#ecredit_hours").val(),
        Fees: $("#eFees").val(),
        Scholarship_criteria: $("#eScholarship_criterias").val()
        };
        var id = $("#eid").val();
        $.ajax({
          type: "PUT",
          url: base_url + "college/" + id ,
          data: college,
          success: function(college) {
            // imageFile = "";
            location.reload();
            alert("successfully edited");
          },
          error: function() {
            alert("Fill all the form fields!");
          }
        });
      // }      
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
  });
  