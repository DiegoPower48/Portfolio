require("dotenv").config();
const brevo = require("@getbrevo/brevo");

async function sendMail(nombre, correo, comentario) {
  try {
    const apiInstance = new brevo.TransactionalEmailsApi();

    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.CORREO_URI
    );

    const enviarCorreo = new brevo.SendSmtpEmail();
    enviarCorreo.subject = "COMENTARIO DE PORTFOLIO";
    enviarCorreo.to = [
      { email: "diego_torres_11@hotmail.com", name: "Portfolio dice" },
    ];

    enviarCorreo.htmlContent = `<h1>${nombre}</h1><br><p>${comentario}</p><br><p>Correo enviado desde: ${correo}</p>`;

    enviarCorreo.sender = {
      name: "Diego Torres",
      email: "diego_torres_11@hotmail.com",
    };

    await apiInstance.sendTransacEmail(enviarCorreo);
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendMail;
