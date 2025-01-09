"use strict";

const puppeteer = require("puppeteer");
require("dotenv").config();
const webdata = require("../models/webdata");

const criptoweb = async () => {
  console.log("Iniciando el proceso de scrapping");
  try {
    const browser = await puppeteer.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--single-process",
        "--no-zygote",
      ], // Recomendado para entornos de hosting
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
      headless: true,
    });

    const page = await browser.newPage();

    // Emula un navegador normal para evitar bloqueos
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    // Navega a la página y espera hasta que cargue el DOM
    await page.goto("https://www.coingecko.com/es", {
      waitUntil: "domcontentloaded",
    });

    // Espera a que el selector esté presente
    await page.waitForSelector(
      "div[class='tw-text-gray-700 dark:tw-text-moon-100 tw-font-semibold tw-text-sm tw-leading-5']",
      { timeout: 10000 } // 10 segundos de tiempo máximo de espera
    );

    // Extrae los datos

    const quote = await page.evaluate(() => {
      const quotes = document.querySelectorAll(
        "tr[class='hover:tw-bg-gray-50 tw-bg-white dark:tw-bg-moon-900 hover:dark:tw-bg-moon-800 tw-text-sm']"
      );
      const data = [...quotes].map((quote) => {
        let quoteText = quote.innerText;
        // Separar la cadena en partes usando tabulación y nueva línea como delimitadores
        let parts = quoteText
          .split(/\t|\n/)
          .map((part) => part.trim())
          .filter((part) => part)
          .filter((part) => part !== "Comprar");
        return parts;
      });

      return data;
    });

    // Cierra el navegador y devuelve la respuesta

    await webdata.findOneAndUpdate(
      {},
      { $set: { data: quote } },
      { upsert: true, new: true }
    );
    console.log("Datos guardados en la base de datos");
  } catch (error) {
    console.log("Error en el proceso de scrapping:", error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
module.exports = criptoweb;
