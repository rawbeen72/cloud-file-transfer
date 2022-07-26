const express = require("express");
const connectToDB = require("./config/db");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const files = require("./routes/files");
const fileDownload = require("./routes/fileDownload");
app.use(express.json());
app.use(cors());
connectToDB();
app.use("/api/files", files);
app.use("/file/download", fileDownload);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
