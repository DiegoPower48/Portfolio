"use strict";

const puppeteer = require("puppeteer");
require("dotenv").config();
const webdata = require("../models/webdata");

const criptoweb = async () => {
  console.log("Iniciando el proceso de scrapping");
  let browser;
  try {
    browser = await puppeteer.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--single-process",
        "--no-zygote",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
      headless: true,
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    await page.goto("https://www.coingecko.com/es", {
      waitUntil: "domcontentloaded",
    });

    await page.waitForSelector(
      "div[class='tw-text-gray-700 dark:tw-text-moon-100 tw-font-semibold tw-text-sm tw-leading-5']",
      { timeout: 10000 }
    );

    const quote = await page.evaluate(() => {
      const quotes = document.querySelectorAll(
        "tr[class='hover:tw-bg-gray-50 tw-bg-white dark:tw-bg-moon-900 hover:dark:tw-bg-moon-800 tw-text-sm']"
      );
      return [...quotes].map((quote) => {
        let quoteText = quote.innerText;
        return quoteText
          .split(/\t|\n/)
          .map((part) => part.trim())
          .filter((part) => part)
          .filter((part) => part !== "Comprar");
      });
    });

    if (!quote || quote.length === 0) {
      console.log("No se extrajeron datos del sitio web.");
      return;
    }

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
