      const fromAmountElement = document.querySelector(".fromAmount");
      const toAmountElement = document.querySelector(".toAmount");
      const fromCurrencyElement = document.querySelector(".fromCurrency");
      const toCurrencyElement = document.querySelector(".toCurrency");
      const resultElement = document.querySelector(".result");
      const swapBtn = document.getElementById("swapBtn");

      const countries = [
        { code: "USD", name: "(United States Dollar)" },
        { code: "EUR", name: "(Euro)" },
        { code: "JPY", name: "(Japanese Yen)" },
        { code: "GBP", name: "(British Pound Sterling)" },
        { code: "AUD", name: "(Australian Dollar)" },
        { code: "CAD", name: "(Canadian Dollar)" },
        { code: "CHF", name: "(Swiss Franc)" },
        { code: "CNY", name: "(Chinese Yuan)" },
        { code: "HKD", name: "(Hong Kong Dollar)" },
        { code: "NZD", name: "(New Zealand Dollar)" },
        { code: "SEK", name: "(Swedish Krona)" },
        { code: "KRW", name: "(South Korean Won)" },
        { code: "SGD", name: "(Singapore Dollar)" },
        { code: "MXN", name: "(Mexican Peso)" },
        { code: "INR", name: "(Indian Rupee)" },
        { code: "BRL", name: "(Brazilian Real)" },
        { code: "ZAR", name: "(South African Rand)" },
      ];

      // Populate dropdowns
      countries.forEach((c) => {
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");
        option1.value = c.code;
        option2.value = c.code;
        option1.textContent = `${c.code} ${c.name}`;
        option2.textContent = `${c.code} ${c.name}`;
        fromCurrencyElement.append(option1);
        toCurrencyElement.append(option2);
      });

      // Defaults
      fromCurrencyElement.value = "USD";
      toCurrencyElement.value = "INR";

      // Fetch rates
      const getExchange = async () => {
        const amount = parseFloat(fromAmountElement.value);
        const fromCurrency = fromCurrencyElement.value;
        const toCurrency = toCurrencyElement.value;

        if (fromCurrency === toCurrency) {
          resultElement.textContent = `${amount} ${fromCurrency} = ${amount} ${toCurrency}`;
          toAmountElement.value = amount;
          return;
        }

        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
          );
          const data = await res.json();
          const rate = data.rates[toCurrency];
          resultElement.textContent = `${amount} ${fromCurrency} = ${rate} ${toCurrency}`;
          toAmountElement.value = rate;
        } catch (err) {
          resultElement.textContent = "Error fetching data.";
          console.error(err);
        }
      };

      // Swap button
      swapBtn.addEventListener("click", () => {
        const temp = fromCurrencyElement.value;
        fromCurrencyElement.value = toCurrencyElement.value;
        toCurrencyElement.value = temp;
        getExchange();
      });

      // Events
      fromAmountElement.addEventListener("input", getExchange);
      fromCurrencyElement.addEventListener("change", getExchange);
      toCurrencyElement.addEventListener("change", getExchange);

      // Initial load
      getExchange();
