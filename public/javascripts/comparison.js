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
     
      return oneRow;
    }
  
    
    // $.ajax({
    //   type: "GET",
    //   url: base_url + "college",
    //   success: function(colleges) {
    //     console.log(colleges);
    //     let myRows = [];
    //     $.each(colleges, function(index, college) {
    //       myRows.push(rowTemplate(college));
    //     });
    //     tblBody.append(myRows);
    //   },
    //   error: function() {
    //     alert("Something went wrong!");
    //   }
    // });
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

    $.ajax({
      type: "GET",
      url: base_url + "college",
      success: function(college) {
        $.each(college, function(index, college) {
          console.log(college);
          var College_data =
            "<option value=" +
            college._id +
            ">" +
            college.college_name +
            "</option>";
          $("#college").append(College_data);
        });
      }
    });
  
    // $("#fileToUpload").on("change", function() {
    //   let formData = new FormData();
    //   let files = $("#fileToUpload").get(0).files;
    //   if (files.length > 0) {
    //     formData.append("imageFile", files[0]);
    //   }
    //   // $("#add-hero").prop("disabled", true);
    //   $.ajax({
    //     type: "POST",
    //     url: base_url + "upload",
    //     contentType: false,
    //     cache: false,
    //     processData: false,
    //     data: formData,
    //     success: function(data) {
    //       imageFile = data.filename;
    //       // $("#add-hero").prop("disabled", false);
    //     },
    //     error: function() {
    //       alert("Image upload failed!");
    //     }
    //   });
    // });
    
    // $("#efileToUpload").on("change", function() {
    //   let formData = new FormData();
    //   let files = $("#fileToUpload").get(0).files;
    //   if (files.length > 0) {
    //     formData.append("imageFile", files[0]);
    //   }
    //   // $("#add-hero").prop("disabled", true);
    //   $.ajax({
    //     type: "POST",
    //     url: base_url + "upload",
    //     contentType: false,
    //     cache: false,
    //     processData: false,
    //     data: formData,
    //     success: function(data) {
    //       imageFile = data.filename;
    //       // $("#add-hero").prop("disabled", false);
    //     },
    //     error: function() {
    //       alert("Image upload failed!");
    //     }
    //   });
    // });
  
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
        Scholarship_criterias: $("#Scholarship_criterias").val()
      };
      $.ajax({  
        type: "POST",
        url: base_url + "college",
        data: product,
        success: function(college) {
          tblBody.append(rowTemplate(college));
          // imageFile = "";
          $("#product-form").trigger("reset");
        },
        error: function() {
          alert("Fill all the form fields!");
        }
      });
    });

    $("#college").change(function(){
        var college_id = $(this).val();
        $.ajax({
            type: "GET",
            url: base_url + "college/" + college_id,
            success: function(colleges) {
              console.log(colleges);
              let myRows = [];
                myRows.push(rowTemplate(colleges));
              tblBody.append(myRows);
            },
            error: function() {
              alert("Something went wrong!");
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
        url: base_url + "product/" + id,
        success: function(product) {
          console.log(product);
          $("#eid").val(product._id);
          $("#ename").val(product.product_name);
          $("#eprice").val(product.product_price);
          $("#edesc").val(product.product_description);
          $("#equantity").val(product.quantity);
          $("#eproductType").val(product.product_type);
          $("#efileToUpload").val(product.product_image);
        },
        error: function() {
          alert("couldn't load the product");
        }
      });
    });
  
    $("#edit-product").on("click", function() {
      var id = $("#eid").val();
      if(imageFile ===""){
        var image ="";
        $.ajax({
          type: "GET",
          url: base_url + "product/" + id,
          success: function(product) {
            alert(" image " + product.product_image);
            image = product.product_image;
          },
          error: function() {
            alert("couldn't load the product");
          }
        });
        let product = {
          _id: $("#eid").val(),
          product_name: $("#ename").val(),
          product_description: $("#edesc").val(),
          product_price: $("#eprice").val(),
          product_image: image,
          product_type: $("#eproductType").val(),
          quantity: $("#equantity").val()
        };
        
        $.ajax({
          type: "PUT",
          url: base_url + "product/" + id ,
          data: product,
          success: function(product) {
            imageFile = "";
            location.reload();
            alert("successfully edited");
          },
          error: function() {
            alert("Fill all the form fields!");
          }
        });
      }else{
        let product = {
          _id: $("#eid").val(),
          product_name: $("#ename").val(),
          product_description: $("#edesc").val(),
          product_price: $("#eprice").val(),
          product_image: imageFile,
          product_type: $("#eproductType").val(),
          quantity: $("#equantity").val()
        };
        var id = $("#eid").val();
        $.ajax({
          type: "PUT",
          url: base_url + "product/" + id ,
          data: product,
          success: function(product) {
            imageFile = "";
            location.reload();
            alert("successfully edited");
          },
          error: function() {
            alert("Fill all the form fields!");
          }
        });
      }
      
      
    });

    

  });
  