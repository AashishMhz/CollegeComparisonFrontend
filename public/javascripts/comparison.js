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
        college.Scholarship_criteria
        ;
     
      return oneRow;
    }
  
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
  });
  