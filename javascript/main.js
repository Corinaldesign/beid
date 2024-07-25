let branch_id = -1;
let rut = -1;
let is_cliente = false;
let confirm_secure = false;

window.onload = function() {
    $("#mid_container").load("html/inicio.html");
};

$(document).on( "click", "button" , function() {
    id=$(this).attr("id");
    var nextpage = $(this).attr('goto');
    nextpage_html="html/"+ nextpage + ".html";
    $("#mid_container").load(nextpage_html);
    if(nextpage!="inicio"){
        $(".menu_icon").attr("src","imgs/volver_icono.svg");
    }else{
        $(".menu_icon").attr("src","imgs/menu_icon.svg");
    }

    switch (id) {
        case 'rut_btn':
            rut=$("#rut").val();
            break;
        case 'acceptSecurity':
            confirm_secure=true;
            break;
        case 'takephoto':
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                video.srcObject = null;
            }
            break;
        case 'gotoinitrecon':
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                video.srcObject = null;
            }
            break;
        case 'gotoinitrecon':
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                video.srcObject = null;
            }
            break;
    }
});

$(document).on( "click", ".menu_icon" , function() {
    var prevpage = $(".titulo_principal").attr("backpage");
    nextpage_html="html/"+ prevpage + ".html";
    $("#mid_container").load(nextpage_html);
    
    if($(".titulo_principal").attr("page")==="reconocimiento"){
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            video.srcObject = null;
        }
    }
    if(prevpage!="inicio"){
        $(".menu_icon").attr("src","imgs/volver_icono.svg");
    }else{
        $(".menu_icon").attr("src","imgs/menu_icon.svg");
    }
});


function formatRut(rut) {
    // Elimina caracteres no numéricos y letras excepto K
    rut = rut.replace(/[^0-9kK]/g, '');
    
    // Separar la parte numérica y el dígito verificador
    let rutNumber = rut.slice(0, -1);
    let checkDigit = rut.slice(-1);
    
    if (rutNumber.length > 0) {
        // Agregar puntos cada 3 dígitos
        rutNumber = rutNumber.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    
    return rutNumber + (checkDigit ? '-' + checkDigit.toUpperCase() : '');
}

function validateRut(rut) {
    let rutClean = rut.replace(/[^0-9kK]/g, ''); // Elimina caracteres no numéricos y letras excepto K
    if (rutClean.length < 8 || rutClean.length > 9) return false;

    let checkDigit = rutClean.slice(-1);
    let rutNumber = rutClean.slice(0, -1);
    let sum = 0;
    let factor = 2;
    if(calculateDV(rutNumber)===checkDigit){
        return true;
    }
    return false;
  
}


function calculateDV(rut) {
    let suma = 0;
    let multiplo = 2;
    for (let i = rut.length - 1; i >= 0; i--) {
      suma += multiplo * rut.charAt(i);
      multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }
    const dv = 11 - (suma % 11);
    return dv === 10 ? 'K' : dv === 11 ? '0' : String(dv);
}

$(document).on('input', '#rut', function() {
    let rut = $(this).val();
    let formattedRut = formatRut(rut);
    $(this).val(formattedRut);

    if (validateRut(formattedRut)) {
        $('#message').text('RUT válido').css('color', 'green');
        $(this).removeClass('invalid').addClass('valid');
        $("#rut_btn").attr("disabled", false)
        $("#rut_btn").removeClass("dis")
    } else {
        $('#message').text('RUT inválido').css('color', 'red');
        $(this).removeClass('valid').addClass('invalid');
        $("#rut_btn").attr("disabled", true)
        $("#rut_btn").addClass("dis")
    }
});
