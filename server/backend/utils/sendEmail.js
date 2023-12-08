const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars')
const path = require('path')

const dotenv = require('dotenv')
dotenv.config()

module.exports = async (email, text, name) => {
	try {

		const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			service: process.env.SERVICE,
			port: Number(process.env.EMAIL_PORT),
			secure: Boolean(process.env.SECURE),
			auth: {
				user: process.env.EMAIL_ADD,
				pass: process.env.PASS,
			}
		});

		const directoryPath = path.join(__dirname, '..', '..', 'views', '');

		const handlebarOptions = {
			viewEngine: {
				partialsDir: directoryPath,
				defaultLayout: false,
			},
			viewPath: directoryPath
		};

		transporter.use('compile', hbs(handlebarOptions))
		
		await transporter.sendMail({
			template: "email",
			from: process.env.EMAIL_ADD,
			to: email,
			subject: "Activate Your Criador Account: Verify Your Email Address",
			context: {
				name: name,
				emailVerifyLink: text
			  }
		},function(error, info){
			if (error) {
			  console.log(error);
			} else {
			  console.log('Email sent: ' + info.response);
			}
		  });

	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};