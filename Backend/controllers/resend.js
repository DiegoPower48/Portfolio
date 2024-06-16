require("dotenv").config();

const { Resend } = require("resend");

const resend = new Resend(process.env.CORREO_URI);

async function sendMail(correo, mensaje) {
  const { data, error } = await resend.emails.send({
    from: "DiegoTorresWebDeveloper <onboarding@resend.dev>",
    to: ["diego_torres_11@hotmail.com", correo],
    subject: "Hello World",
    html: `<strong>DEJO ESTE MENSAJE: ${mensaje}</strong>`,
  });

  if (error) {
    return console.error("error en el envío de mensaje");
  }

  console.log({ data });
}

module.exports = sendMail;
