
window.onload = () =>{
  fav_colors_code = JSON.parse(localStorage.getItem("fav_colors_code"));
    var html = "";
    var empty_colors_card = ""
    if (fav_colors_code.length == 0 ||fav_colors_code == null) {
      empty_colors_card += `<div class="text-center mt-20">
        <img src="../assets/images/not_found.gif" width="100%" />
        <p>Sorry No Colors Found !!!<p> 
      </div> `;
      document.getElementById("not_found").innerHTML = empty_colors_card;
    } else {
      fav_colors_code.forEach((element, index) => {
        html += `<div class="lg:w-1/4 flex mb-2 mt-2 flex-col justify-end md:w-1/2 add_fav_colors w-full border-2 border-gray rounded-lg my_color_card" style="background-color:${element}">
        <div class="bottom-0 bg-white card_footer w-full p-3 pb-0 flex justify-center">
            <span class="text-black uppercase mb-4 fav_color_code me-4">${element}</span>
            <button class=" uppercase mb-4 copy_code copy_code_btn cursor-pointer me-4">
                <i class="fa-regular fa-copy text-black"></i>
            </button>
            <button
                class=" uppercase mb-4 fav_color_delete cursor-pointer">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    </div>`;
      });
      document.getElementById("fav_add_colors").innerHTML = html;
    //   document.getElementById("total_count").innerText = "Total Colors " + fav_colors_code.length; 
  }
  
  // delete colors functionality
  var fav_color_code_text = document.querySelectorAll(".fav_color_code");
  document.querySelectorAll(".fav_color_delete").forEach((element, index) => {
    element.addEventListener("click", () => {
      fav_colors_code.pop(fav_color_code_text[index].innerText);
      localStorage.setItem("fav_colors_code", JSON.stringify(fav_colors_code));
      showToast("Color Delete succcessfully !!!")
      setTimeout(()=>{
        location.reload();
        JSON.parse(localStorage.getItem("fav_colors_code"));
      },600)
    });
  });


  // copy color code functionality
  var fav_copy_code_btn = document.querySelectorAll(".copy_code_btn");
  var fav_color_code = document.querySelectorAll(".fav_color_code");

  fav_copy_code_btn.forEach((element, index) => {
    element.addEventListener("click", function (event) {
      var hexacode_fav = fav_color_code[index].innerText;
      if (!navigator.clipboard) {
        // use old commandExec() way
      } else {
        navigator.clipboard
          .writeText(hexacode_fav)
          .then(function () {
            showToast('Copy to clipboard ' +hexacode_fav)
          })
          .catch(function () {
            alert("error");
          });
      }
    });
  });
    
}


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
    window.location = "../my_colors/home.html";
    JSON.parse(localStorage.getItem("fav_colors_code"));
  }