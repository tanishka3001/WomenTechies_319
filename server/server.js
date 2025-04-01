const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const yaml = require("js-yaml"); // To handle YAML files

const app = express();
app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer storage setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); 
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Function to parse Swagger JSON/YAML and extract endpoints
function parseSwaggerFile(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, "utf8");

        let apiSpec;
        if (filePath.endsWith(".yaml") || filePath.endsWith(".yml")) {
            apiSpec = yaml.load(fileContent); // Parse YAML
        } else {
            apiSpec = JSON.parse(fileContent); // Parse JSON
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

// Upload and parse API spec
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
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`File Upload Server running on ${PORT}`);
});