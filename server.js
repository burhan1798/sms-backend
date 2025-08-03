import express from "express";
import cors from "cors";
import twilio from "twilio";

const app = express();
app.use(cors());
app.use(express.json());

// Load env variables
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const adminPhone = process.env.ADMIN_PHONE; // তোমার নিজের নাম্বার

const client = twilio(accountSid, authToken);

// SMS API
app.post("/send-sms", async (req, res) => {
  const { name, amount } = req.body; // Frontend থেকে আসবে

  try {
    await client.messages.create({
  body: `New Payment Request: ${name} sent ${amount} BDT`,
  from: "+12567927233",  // তোমার Twilio নম্বর
  to: adminPhone
});

    res.json({ success: true, message: "SMS sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "SMS failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
