$(function () {
    $(
        "#contactForm input,#contactForm textarea,#contactForm button"
    ).jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); 
            var name = $("input#inputName").val();
            var email = $("input#inputEmail").val();
            var phone = $("input#inputPhone").val();
            var message = $("textarea#inputMessage").val();
            var firstName = name; 
            if (firstName.indexOf(" ") >= 0) {
                firstName = name.split(" ").slice(0, -1).join(" ");
            }
            $this = $("#sendMessageButton");
            $this.prop("disabled", true);
            
            Email.send({
            SecureToken: "9a3f6d96-8fee-4b9f-b97b-8b6ad9775659",
            To : 'contacto.javier.arevalo@gmail.com',
            From : email,
            Subject :  "Javier Arevalo Website Contact Form: " + name,
            Body : 
            "<html><h2>Información</h2><strong>Nombre: </strong>"+name+"<br></br><strong> Número de contacto: </strong> "+phone+"<br></br><strong> Correo electronico: </strong>"+email+"<br></br><strong>Mensaje: </strong>"+message+"</html>"
            }).then(
                 message => showAlert(message)
            );

       },
        filter: function () {
            return $(this).is(":visible");
        },
    });


    $('a[data-toggle="tab"]').click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$("#name").focus(function () {
    $("#success").html("");
});


function showAlert(message) {
    console.log(message)
    if (message == "OK") {

        $("#success").html("<div class='alert alert-success'>");
        $("#success > .alert-success").html(
                            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                        ).append("</button>");
        $("#success > .alert-success").append(
                        "<strong>Your message has been sent. Thank you, I will contact you in a few days</strong>"
                    );
        $("#success > .alert-success").append("</div>");
        $("#contactForm").trigger("reset");
        $this = $("#sendMessageButton");
        $this.prop("disabled", false); 
            
    }else{
        $("#success").html("<div class='alert alert-danger'>");
        $("#success > .alert-danger").html(
                            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                        ).append("</button>");
                    $("#success > .alert-danger").append(
                        $("<strong>").text(
                            "Sorry me, my server has problems. Please contact me later or from linkdn."
                        )
                    );
                    $("#success > .alert-danger").append("</div>");
 
                    $("#contactForm").trigger("reset");
    }

}