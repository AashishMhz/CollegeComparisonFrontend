$(function() {
    let tblBody = $("#tblbody");
    let base_url = "http://localhost:3000/";
    let imageFile = "";
  
    function rowTemplate(product) {
      let oneRow =
        "<tr><td>" +
        product.product_name +
        "</td><td>" +
        product.product_description +
        "</td><td>" +
        product.product_price +
        "</td><td>" +
        product.quantity +
        "</td><td>" +
        product.product_type.name +
        "</td>";
      if (product.product_image !== "") {
        oneRow +=
          "<td><img src= " +
          base_url +    
          "uploads/" +
          product.product_image +
          " width='60' height='60'/></td>";
      } else {
        oneRow += "<td> No Image </td>";
      }
      oneRow +=
        '<td><button type="button" class="btn btn-danger delete" data-id=' +
        product._id +
        '><i class = "fas fa-trash-alt"></i>Delete</button></td>' +
        '<td> <button type = "button" class ="btn btn-success edit" data-toggle="modal" data-target="#EditModal" data-id = ' +
        product._id +
        '><i class = "fas fa-edit"></i>Edit</td></tr>';
      return oneRow;
    }
  
    $.ajax({
      type: "GET",
      url: base_url + "product",
      success: function(products) {
        console.log(products);
        let myRows = [];
        $.each(products, function(index, product) {
          myRows.push(rowTemplate(product));
          console.log(product.product_type);
        });
        tblBody.append(myRows);
      },
      error: function() {
        alert("Something went wrong!");
      }
    });
     $.ajax({
      type: "GET",
      url: base_url + "product_type",
      success: function(productTypes) {
        $.each(productTypes, function(index, productType) {
          var productType_data =
            "<option value=" +
            productType._id +
            ">" +
            productType.name +
            "</option>";
          $("#productType").append(productType_data);
        });
      }
    });

    $.ajax({
      type: "GET",
      url: base_url + "product_type",
      success: function(productTypes) {
        $.each(productTypes, function(index, productType) {
          console.log(productTypes);
          var productType_data =
            "<option value=" +
            productType._id +
            ">" +
            productType.name +
            "</option>";
          $("#eproductType").append(productType_data);
        });
      }
    });
  
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
  
    $("#add-product").on("click", function() {
    
      let product = {
        product_name: $("#name").val(),
        product_description: $("#desc").val(),
        product_price: $("#price").val(),
        product_image: imageFile,
        product_type: $("#productType").val(),
        quantity: $("#quantity").val()
      };
      $.ajax({
        type: "POST",
        url: base_url + "product",
        data: product,
        success: function(product) {
          tblBody.append(rowTemplate(product));
          imageFile = "";
          $("#product-form").trigger("reset");
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
          url: base_url + "product",
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
        url: base_url + "product/" + id,
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
  