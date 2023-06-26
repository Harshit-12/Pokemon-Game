const axios = require("axios");
const adoptedPokemons = require("./models/adoptedPokemons");
const feedStatus = async () => {
    try {
        const AdoptedPokemons = await adoptedPokemons.find();
        // console.log(AdoptedPokemons);
        AdoptedPokemons.map((item) => {
            console.log("try it");
            console.log(item);
            const data = {
                ID: item._id,
            }
            if (item.isFeeded === true) {
                console.log("abcd");
                const fun = async() => {
                await adoptedPokemons.updateOne({
                    _id: item._id,
                },
                {
                    $set: {
                        isFeeded: false,
                    }
                })
                }
                fun();
            }
            else if (item.isFeeded===false) {
                const currHealth = item.healthStatus - 10;
                console.log(typeof currHealth);
                console.log("efgh");
                const fun2 = async () => {
                    await adoptedPokemons.updateOne({
                    _id: item._id,
                },
                {
                    $set: {
                        healthStatus: item.healthStatus-10,
                    }
                })
                   
                } 
                 fun2();
            }
        }
        )
    } catch (error) {
        console.log(error);
    };
}

module.exports = feedStatus;
