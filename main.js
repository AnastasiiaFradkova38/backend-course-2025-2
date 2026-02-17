const readline = require('node:readline/promises');

async function sendRequest(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error ${response.status}!`);
    }
    return response.json();
}

async function main(){
    const rl = readline.createInterface({input: process.stdin, output: process.stdout});
    let running = true;

    while (running) {
        const currency = await rl.question("Enter the currency code: ");
        const date = await rl.question("Enter the date (yyyymmdd): ");
    
        const url = new URL("https://bank.gov.ua/");
        url.pathname = "NBUStatService/v1/statdirectory/exchange";
        url.searchParams.append("valcode", currency.toUpperCase());
        url.searchParams.append("date", date);
        url.searchParams.append("json", "");

        console.log(url.toString());
        try {
            const data = await sendRequest(url);
            console.log(data);
        } catch (error) {
            console.log(error);
        }

        running = await rl.question("Would you like to continue (y/n)? ") !== "n";
    }
    
    rl.close();
}

main();