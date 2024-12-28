"use strict";

const puppeteer = require("puppeteer");

const controller = {
  data: async (req, res) => {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"], // Recomendado para entornos de hosting
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
      await browser.close();
      return res.status(200).send(quote);
    } catch (error) {
      console.error("Error al ejecutar Puppeteer:", error);
      return res.status(500).send("Error interno del servidor");
    }
  },
};

module.exports = controller;
