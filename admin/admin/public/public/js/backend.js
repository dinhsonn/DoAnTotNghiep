const listitem = document.querySelectorAll(".item-sub");
listitem.forEach((hdlitem) => {
    hdlitem.addEventListener("click", function (e) {
        hdlitem.classList.toggle("active");
    });
});
$(document).ready(function(){
    $('.mainmenu .item-sub').click(function(){
        $(this).find('.submenu').toggle();
    });
});
