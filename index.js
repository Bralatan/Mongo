const MongoClient = require("mongodb").MongoClient;
const { Builder, By, Key, util } = require('selenium-webdriver');
var listRef = []

async function pars() {
    let driver = await new Builder().forBrowser('chrome').build();

        await driver.get('https://www.facebook.com/pg/DonNU.PhysTech/photos/?tab=album&album_id=1460600064257765');

        driver.sleep(20000).then(async function() {
            for (let i = 1; i < 100; i++) {
                var Reference = await (await driver.findElement(By.selector('#js_51 > div > div:nth-child(1) > div:nth-child(2) > div._2eec'))).getText();
                listRef.push(Reference)
                console.log(Reference);
            }
            driver.quit();
        });
}
pars();
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useNewUrlParser: true });
 
let referenses = listRef;
 
mongoClient.connect(function(err, client){
      
    const db = client.db("bralatan");
    const collection = db.collection("referenses");
     
    collection.insertMany(referenses, function(err, results){
              
        console.log(results);
        client.close();
    });
});