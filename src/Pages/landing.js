import "./landing.css";
import { useState } from "react";

export default function Landing() {
  let [email, setEmail] = useState("");
  let [username, setUsername] = useState("");
  let [total, setTotal] = useState("");
  let [phone, setPhone] = useState("");
  let [numberA, setNumberA] = useState("");
  let [numberB, setNumberB] = useState("");
  let [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("https://pesaapi-production.up.railway.app/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        total,
        phone,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((err) => {
          setErrors(err.errors);
          console.log("success", err);
          setEmail("");
          setUsername("");
          setTotal("");
          setPhone("");
        });
      } else {
        r.json().then((err) => {
          console.log(err);
        });
        console.log(errors);
      }
    });
  }

  function handleAdd(e) {
    e.preventDefault();
    fetch("http://127.0.0.1:3000/numbers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        numberA,
        numberB,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((err) => {
          setErrors(err.errors);
          console.log("success", err);
          setNumberA("");
          setNumberB("");
        });
      } else {
        r.json().then((err) => {
          console.log(err);
        });
        console.log(errors);
      }
    });
  }

  function handlePay() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Returns a zero-based month (0-11)
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    function secss(x) {
      if (x < 10) {
        return `0${x}`;
      } else {
        return `${x}`;
      }
    }
    let timestamped = `${year}${month}${day}${hour}${minutes}${secss(seconds)}`;

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer GNAeMfYCpa3hZ0XLOC6RFEJHzaWf");

    fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
      method: "POST",
      headers,
      body: JSON.stringify({
        BusinessShortCode: 174379,
        Password:
          "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjIxMjI1MjAzODA3",
        Timestamp: timestamped,
        TransactionType: "CustomerPayBillOnline",
        Amount: 1,
        PartyA: 254717594017,
        PartyB: 174379,
        PhoneNumber: 254717594017,
        CallBackURL: "https://mpesa-jcyc.vercel.app",
        AccountReference: "New Life",
        TransactionDesc: "Pharmacy goods",
      }),
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  }

  function getJob(e) {
    e.preventDefault();

    fetch(
      "https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=d0291057&app_key=e45310af6518f33ea0f2617638ff1d7f"
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  return (
    <main id="landing">
      <form id="user" onSubmit={handleSubmit}>
        <span>Create User</span>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="number"
          placeholder="Total Amount"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
        />

        <input
          type="number"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>

      <form onSubmit={(getJob, handleAdd)}>
        <span>Create Addition</span>
        <input
          type="number"
          placeholder="Number 1"
          value={numberA}
          onChange={(e) => setNumberA(e.target.value)}
        />
        <input
          type="number"
          placeholder="Number 2"
          value={numberB}
          onChange={(e) => setNumberB(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <button onClick={handlePay}>Click Me</button>
    </main>
  );
}
