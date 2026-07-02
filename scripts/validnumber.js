var input = document.querySelector("#phone, #phone1"),
  errorMsg = document.querySelector("#error-msg"),
  validMsg = document.querySelector("#valid-msg");

// here, the index maps to the error code returned from getValidationError - see readme
var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];

// initialise plugin
var iti = window.intlTelInput(input, {
  utilsScript: "scripts/utils.js"
});

var reset = function() {
  input.classList.remove("error");
  errorMsg.innerHTML = "";
  errorMsg.classList.add("hide");
  validMsg.classList.add("hide");
};

// on blur: validate

var validPhone = false;
input.addEventListener('blur', function() {
  reset();
  if (input.value.trim()) {
    if (iti.isValidNumber()) {
      validPhone = true;
      //console.log('valid');
      validMsg.classList.remove("hide");
    } else {
      validPhone = false;
      //console.log('not Valid');
      input.classList.add("error");
      var errorCode = iti.getValidationError();
      errorMsg.innerHTML = errorMap[errorCode];
      errorMsg.classList.remove("hide");
    }
  }
});

// on keyup / change flag: reset
input.addEventListener('change', reset);
input.addEventListener('keyup', reset);
var telInput = $('#phone, #phone1');


var validate = function(input) {


  
  if ($.trim(input.val())) {
    if (iti.isValidNumber()) {
     // console.log('valid');
      validMsg.classList.remove("hide");
    } else {
     //console.log('not Valid');
      return false;
      
    }
  }
};
// $('#home').on('click', function() {
//   //console.log(11111);
//   validate(telInput);
// });

$("#sbtBtn").on("click", function(event) {
  //var phoneId = document.getElementById('phone1');
  //console.log(phoneId.checkValidity(), validPhone)
  // var elements = document.querySelectorAll('input,select,textarea');
  // elements.forEach(function(el, idx) {
  //   console.log($("form").checkValidity())
  // })
  // if($('form#enquiryForm').get(0).checkValidity() & !(validPhone == true)){
  //   $('#phone1').focus();
  // }

  if($('form#enquiryForm').get(0).checkValidity())
		{
      if(validPhone == true ){
        alert('form submitted');
      }else{
        $('#phone1').focus();
        event.preventDefault();
      }
			
		}
  
});


