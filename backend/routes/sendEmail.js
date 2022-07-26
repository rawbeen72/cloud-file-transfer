const nodemailer = require("nodemailer");

// send email function using nodemailer with html template
exports.sendEmail = (req, res) => {
	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: "smtp-relay.sendinblue.com",
		port: 587,
		secure: false, // true for 465, false for other ports

		auth: {
			user: "9841321466rc@gmail.com", // your email here
			pass: "S4fNTLKBDcUMQgzs", // your password here
		},
	});

	// setup email data with unicode symbols
	let mailOptions = {
		to: "cha.rabin2000@gmail.com",
		from: "cha.rabin2000@gmail.com", // your email here
		subject: "Hello ✔",
		text: "Hello world?",
		html: "<b>Hello world?</b>",
	};
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log("Message sent: %s", info.messageId);
		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	});
};
