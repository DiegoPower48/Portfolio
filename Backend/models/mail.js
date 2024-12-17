require("dotenv").config();
const brevo = require("@getbrevo/brevo");
const fs = require("fs");
const path = require("path");

async function sendMail(nombre, correo, comentario) {
  try {
    const apiInstance = new brevo.TransactionalEmailsApi();

    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.CORREO_URI
    );

    const enviarCorreo = new brevo.SendSmtpEmail();
    enviarCorreo.subject = "COMENTARIO DE PORTFOLIO";
    enviarCorreo.to = [{ email: "marco96392@gmail.com", name: "backend dice" }];

    const templatePath = path.join(__dirname, "..", "models", "template.html");
    let htmlContent = fs.readFileSync(templatePath, "utf8");

    // Reemplazar los marcadores de posición con valores reales
    htmlContent = htmlContent.replace("{{nombre}}", nombre);
    htmlContent = htmlContent.replace("{{comentario}}", comentario);
    htmlContent = htmlContent.replace("{{correo}}", correo);

    enviarCorreo.htmlContent = htmlContent;
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
