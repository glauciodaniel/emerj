import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';

@Injectable()
export class UtilsService {
  async sendMail(
    emailTo: string,
    emailSubject: string,
    emailBody: string,
    options = { body: '', bCC: '', attached: '' },
  ) {
    // configuração esse trecho deve ser pelo menos um método a parte.
    //Parte 1 da configuração
    const clientId = process.env.CLIENT_ID;
    const secretKey = process.env.SECRET_KEY;
    const refresh_token = process.env.REFRESH_TOKEN;
    const redirectURI = 'https://developers.google.com/oauthplayground';
    const OAuth2 = google.auth.OAuth2;

    const oauth2Client = new OAuth2(clientId, secretKey, redirectURI);

    oauth2Client.setCredentials({
      refresh_token,
    });

    const accessToken = oauth2Client.getAccessToken();

    //Parte 2 da configuração.
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      logger: false,
      debug: false,
      auth: {
        type: 'OAuth2',
        user: 'emerjestudohcode@gmail.com',
        clientId: clientId,
        clientSecret: secretKey,
        refreshToken: refresh_token,
        accessToken,
      },
    });

    //template do e-mail, também um método a parte.
    const BEMVINDO = `
    
    Seja muito bem vindo à EMERJ, seu cadastro foi confirmado.<br/><br/>

    Uma grande empresa não é classificada apenas pelo numero de colaboradores mais sim pelo esforço e determinação de cada um. Para alcançar este resultado, precisamos criar novos processos e analisar outros que de certa forma estão impactando negativamente nas políticas igualitárias adotas pela empresa.  O que fazer para ser um profissional cobiçado? Primeiro: ser profissional. Segundo: fazer diferente! Os bons colaboradores nas empresas não estão ameaçados pelas pessoas más, e sim por aquelas que permitem a maldade no ambiente. As expectativas de Sucesso são estímulos para continuar, muito embora saibamos que elas sem trabalho duro de nada adiantam. 
<br/><br/>
    
    `;

    const mailOptions = {
      from: 'emerjestudohcode@gmail.com',
      to: emailTo,
      bcc: 'glauciodaniel@gmail.com',
      subject: emailSubject,
      html: `
      <h1 style='font-size:2.5em; text-align:center;font-family:arial'>${emailSubject}</h1>
      <p style='width:40%; margin: 0 auto;'>
        ${options.body ? options.body : BEMVINDO}

        Se você não solicitou esse e-mail, por favor exclua imediatamente e informe o suporte@emerj.jus.br.
<br/><br/>
    Atenciosamente,<br/>
    EMERJ
      </p>
      `,
    };

    //enviar email

    try {
      const result = transporter.sendMail(mailOptions);
      if (!result.reject) {
        return { message: 'E-mail enviado com sucesso!' };
      } else {
        return { message: result.reject };
      }
    } catch (error) {
      return { message: error.message };
    }
  }
}
