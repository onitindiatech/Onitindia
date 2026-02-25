const express = require("express");
const cors = require("cors");

const app = express();

/* ----------------------------------------
    GLOBAL MIDDLEWARE
---------------------------------------- */
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* ----------------------------------------
    SUBMIT TASK TO GOOGLE SHEET
---------------------------------------- */
app.post("/api/submit-task", async (req, res) => {
  try {
    const { taskDetails, mobileNumber } = req.body;
    // Use environment variable or fallback to hardcoded URL
    const googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbznoZ8KMA1aqEq4ULdY91N7oKWFN9_i4FJRe0DhvNhabUpXpzBEBkpRf0YE7wFPQc0P9w/exec";
    
    console.log("Submitting to Google Apps Script:", googleAppsScriptUrl);
    console.log("Task Details:", taskDetails);
    console.log("Mobile Number:", mobileNumber);
    
    const response = await fetch(googleAppsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ taskDetails: taskDetails || "", mobileNumber: mobileNumber || "" }),
    });
    
    const result = await response.text();
    console.log("Google Apps Script response:", result);
    
    // Return success
    res.json({ message: "Task submitted successfully! Our team will connect with you within 2 min." });
  } catch (err) {
    console.error("Submit task error:", err);
    res.status(500).json({ error: "Failed to submit task: " + err.message });
  }
});

// For Netlify Functions, we need to export the handler
module.exports = app;
