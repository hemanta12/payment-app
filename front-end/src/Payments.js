// put payment js here
import { React, useState } from "react";
// import { useHistory } from "react-router-dom";
import { Redirect, useHistory } from "react-router-dom";
import "./Login.css"


function Payments() {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [username2, setUsername2] = useState("");
    const [amount, setAmount] = useState(0);
    const [type, setType] = useState("");
    const [notes, setNotes] = useState("");

    const [isPaymentDone, setIsPaymentDone] = useState(false);
    const [error, setError] = useState(null);


    function isValidPayment() {
        if (username === "" || username2 === "" || amount === 0 || type === "" || notes === "") {
            alert("Please fill all the fields");
        }
        else if (username === username2) {
            alert("Cannot send to yourself!");
        }
        else return true;
        return false;
    }

    const handlePayments = () => {

        if (isValidPayment()) {
            const body = {
                username: username,
                username2: username2,
                amount: amount,
                type: type,
                notes: notes,
            };
            const info = {
                method: "POST",
                body: JSON.stringify(body),
            };
            fetch("/Payment", info)
                .then(async (res) => {
                    let response = await res.json();
                    console.log(response);
                    if (response.paymentPossible) {
                        setIsPaymentDone(true);
                        console.log("Payment is made")
                        history.push("/")
                    }
                    else {
                        alert("Payment failed");
                    }
                })
                .catch((e) => console.log(e));
        }
    };

    if (isPaymentDone) {
        console.log("Payment done");
        return <Redirect to="/" />;
    }

    return (
        <div className="payments">
            <h2>Payment Form</h2>
            <div>
                <label>From:</label>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>To:</label>
                <input
                    value={username2}
                    onChange={(e) => setUsername2(e.target.value)} />
            </div>

            <div>
                <label>Amount:</label>
                <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div>
                <label>Type:</label>
                <input
                    value={type}
                    onChange={(e) => setType(e.target.value)} />
            </div>
            <div>
                <label>Notes:</label>
                <input
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)} />
            </div>
            <button onClick={handlePayments}>Submit</button>
        </div>
    )
};

export default Payments;