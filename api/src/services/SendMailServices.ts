import nodemailer, { Transporter } from 'nodemailer'
import handlebars from 'handlebars';
import fs from 'fs';
class SendMailServices{
    private client:Transporter
    constructor() {
        nodemailer.createTestAccount().then(account =>{
            let transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure, // true for 465, false for other ports
                auth: {
                  user: account.user, // generated ethereal user
                  pass: account.pass, // generated ethereal password
                },
                tls: {
                    rejectUnauthorized: false
                  }
              },
              
              );
              this.client=transporter;
        });

    }

    async exculte(to:string,subject:string,variables:object,path:string){
    
    const templateFileContent = fs.readFileSync(path).toString("utf8");
    const mailTemplateParse =handlebars.compile(templateFileContent);

    const html =mailTemplateParse(variables)

    const messages= await this.client.sendMail({
            to,
            subject,
            html: html,
            from: "NPS <noreplay@nps.com.br>"
        })
        console.log('Message sent: %s', messages.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(messages));
    }
}

export default new SendMailServices();