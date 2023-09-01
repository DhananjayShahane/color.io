function randomcolor() {
  document.querySelectorAll(".bg_change_color").forEach((element) => {
    var bgColor =
      "#" + (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6);
    element.style.backgroundColor = bgColor;
    element.childNodes[1].childNodes[1].innerText = bgColor;
  });
}

window.onload = () => {
  randomcolor();
  localStorage.setItem("fav_colors_code", JSON.stringify(fav_colors_code));
};

window.onkeydown = (e) => {
  if (e.keyCode == 32) {
    randomcolor();
  }
};

var copy_code_btn = document.querySelectorAll(".copy_code");
var color_code_text = document.querySelectorAll(".color_code");

copy_code_btn.forEach((element, index) => {
  element.addEventListener("click", function (event) {
    var hexacode = color_code_text[index].innerText;
    if (!navigator.clipboard) {
      // use old commandExec() way
    } else {
      navigator.clipboard
        .writeText(hexacode)
        .then(function () {
          // alert(hexacode);
          showToast('Copy to clipboard ' + hexacode)
        })
        .catch(function () {
          alert("error");
        });
    }
  });
});



var fav_colors_code = [];
var stored_colors = [];
var fav_colors = document.querySelectorAll(".fav_coolor_code");

fav_colors.forEach((element, index) => {
  element.addEventListener("click", function (event) {
      var fav_colors_arrays = color_code_text[index].innerText;
      if (fav_colors_code.includes(fav_colors_arrays)) {
        showToast("you are allready to add this color")
      } else {

        if(localStorage.getItem("fav_colors_code") == null){
          fav_colors_code = JSON.parse(localStorage.getItem("fav_colors_code"))
        }else{
          fav_colors_code.push(fav_colors_arrays);
          showToast("color added successfully " + fav_colors_arrays)
          localStorage.setItem("fav_colors_code", JSON.stringify(fav_colors_code));
        }
    }
  });
});

// Toater functionality
function createToast() {
  var toast = document.createElement('div');
  toast.setAttribute('id', 'toast');
  document.body.appendChild(toast);
  return toast;
}


function showToast(message) {
  const windowToast = document.getElementById('toast');
  if(windowToast){
    windowToast.remove();
  }
  const toast = createToast();
  toast.innerText = message;
  toast.classList.add('show-toast');
  setTimeout(() => {
    hideToast(toast);
  },2000);
}

function hideToast(toast) {
  toast.classList.add('hide-toast');
  setTimeout(() => {
    removeToast(toast);
  }, 300);
}

function removeToast(toast) {
  toast.remove();
}

function getColors(){
  window.location = "../my_colors/my_colors.html";
  JSON.parse(localStorage.getItem("fav_colors_code"));
}

