import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// POST route to send email
app.post("/send-email", async (req, res) => {
  const { userId, packageName, diamonds, amount, uid } = req.body;

  if (!userId || !packageName || !amount || !uid) {
    return res.status(400).json({ success: false, message: "Missing data fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // তোমার Gmail
        pass: process.env.EMAIL_PASS  // App Password
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL, // তোমার Gmail
      subject: "💎 New Top-up Request",
      text: `New Top-up Request Received:

- User ID: ${userId}
- Package: ${packageName}
- Diamonds: ${diamonds || "N/A"}
- Amount: ${amount} BDT
- UID: ${uid}

Time: ${new Date().toLocaleString()}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Email backend running on port ${PORT}`));
