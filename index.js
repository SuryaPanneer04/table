import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3001;

const graphDataJSON = [
    {
        id: "0001",
        type: "table",
        name: "Jan",
        Items: {
            products: { Pname: "Apple" },
            Apple_quantity: [
                { q_id1: { date: "1/01/2024", rate: 95, quantity: "1kg", amount: 95, discount: 10, taxableAmount: 85, gst: 5, gstamount: 4.75, finalamount: 90 } },
                { q_id2: { date: "15/01/2024", rate: 190, quantity: "2kg", amount: 190, discount: 20, taxableAmount: 170, gst: 5, gstamount: 9.5, finalamount: 180 } },
                { q_id3: { date: "29/01/2024", rate: 285, quantity: "3kg", amount: 285, discount: 30, taxableAmount: 255, gst: 5, gstamount: 14.5, finalamount: 270 } }
            ]
        }
    },
    {
        id: "0002",
        type: "table",
        name: "Feb",
        Items: {
            products: { Pname: "Orange", price: 100 },
            orange_quantity: [
                { q_id1: { date: "1/01/2024", rate: 95, quantity: "1kg", amount: 95, discount: 10, taxableAmount: 85, gst: 5, gstamount: 4.75, finalamount: 90 } },
                { q_id2: { date: "15/01/2024", rate: 190, quantity: "2kg", amount: 190, discount: 20, taxableAmount: 170, gst: 5, gstamount: 9.5, finalamount: 180 } },
                { q_id3: { date: "29/01/2024", rate: 285, quantity: "3kg", amount: 285, discount: 30, taxableAmount: 255, gst: 5, gstamount: 14.5, finalamount: 270 } }
            ]
        }
    },
    {
        id: "0003",
        type: "table",
        name: "Mar",
        Items: {
            products: { Pname: "Mango", price: 100 },
            P_quantity: [
                { q_id1: { date: "1/01/2024", rate: 95, quantity: "1kg", amount: 95, discount: 10, taxableAmount: 85, gst: 5, gstamount: 4.75, finalamount: 90 } },
                { q_id2: { date: "15/01/2024", rate: 190, quantity: "2kg", amount: 190, discount: 20, taxableAmount: 170, gst: 5, gstamount: 9.5, finalamount: 180 } },
                { q_id3: { date: "29/01/2024", rate: 285, quantity: "3kg", amount: 285, discount: 30, taxableAmount: 255, gst: 5, gstamount: 14.5, finalamount: 270 } }
            ]
        }
    }
];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

let data = [];
let selecteditems = [];
app.get("/", (req, res) => {
    res.render("index", { graphData: data, selecteditems });
});

app.post("/graphData", (req, res) => {
    selecteditems = Array.isArray(req.body.items) ? req.body.items : [req.body.items]; // Handle multiple selections

    data = []; // Reset data

    selecteditems.forEach(item => {
        switch (item) {
            case "Apple":
                data.push(graphDataJSON[0]);
                break;
            case "Orange":
                data.push(graphDataJSON[1]);
                break;
            case "Mango":
                data.push(graphDataJSON[2]);
                break;
            default:
                break;
        }
    });

    // If no valid items are selected, set data to null
    if (data.length === 0) {
        data = null;
    }

    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
