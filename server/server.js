const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const yaml = require("js-yaml");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
app.use(cors());
app.use(express.json());
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
console.log(process.env.GEMINI_API_KEY );
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); 
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

function parseSwaggerFile(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, "utf8");

        let apiSpec;
        if (filePath.endsWith(".yaml") || filePath.endsWith(".yml")) {
            apiSpec = yaml.load(fileContent); 
        } else {
            apiSpec = JSON.parse(fileContent); 
        }

        const extractedData = {
            title: apiSpec.info?.title || "Untitled API",
            version: apiSpec.info?.version || "Unknown",
            endpoints: [],
        };

        if (apiSpec.paths) {
            for (const [path, methods] of Object.entries(apiSpec.paths)) {
                for (const [method, details] of Object.entries(methods)) {
                    extractedData.endpoints.push({
                        path,
                        method: method.toUpperCase(),
                        summary: details.summary || "No description",
                        parameters: details.parameters || [],
                    });
                }
            }
        }

        return extractedData;
    } catch (error) {
        return { error: "Invalid API specification", details: error.message };
    }
}

app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded!" });
    }

    const filePath = path.join(__dirname, "uploads", req.file.filename);
    const apiData = parseSwaggerFile(filePath);

    if (apiData.error) {
        return res.status(400).json({ message: apiData.error, errorDetails: apiData.details });
    }

    res.json({
        message: "File uploaded and parsed successfully",
        filename: req.file.filename,
        apiData,
    });
});

app.post("/generate-code", async (req, res) => {
    const api = req.body.api;
    if (!api) {
        return res.status(400).json({ error: "No API data provided" });
    }
    const prompt = `
    Generate a React component using Tailwind CSS and Axios for the following API details:
    - Path: ${api.path}
    - Method: ${api.method}
    - Parameters: ${JSON.stringify(api.parameters || [])}
    
    The component should:
    - Have a button to fetch data from the API.
    - Display results in a responsive Tailwind-styled table or list.
    - Handle loading and error states properly.
    - Use functional React hooks (useState, useEffect).
    - Be well-structured and formatted.

    Example Output:
    \`\`\`jsx
    // Generated code should go here
    \`\`\`
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        res.json({ code: text });
        console.log(text);
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "Failed to generate code" });
    }
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`File Upload Server running on ${PORT}`);
});