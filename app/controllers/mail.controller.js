'use strict';

const Mailjet = require('node-mailjet');

exports.sendForgotPasswordMail = (user, host, resetLink) => {
    const mailjet = Mailjet.apiConnect(
        process.env.MJ_APIKEY_PUBLIC,
        process.env.MJ_APIKEY_PRIVATE,
    );

    const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
            Messages: [
                {
                    From: {
                        Email: "luongnguyen170102@gmail.com",
                        Name: "MEO SHOES"
                    },
                    To: [
                        {
                            Email: user.userEmail,
                            Name: user.userName
                        }
                    ],
                    Subject: "[MEW SHOES] reset password",
                    HTMLPart: `
                   <p> Hi ${user.userName},</p>
                    <br />
                    <p>You recently requested to reset the password for your ${host} account. Click the button below to proceed.</p>
                    <br />
                   <a href="${resetLink}">reset password</a>
                    <br/>
                    <p>If you did not request a password reset, please ignore this email or reply to let us know. This password reset link is only valid for the next 30 minutes.</p>
                    <br />
                    <p>Thanks,</p>
                    <p>MEO SHOES</p>`
                }
            ]
        })
    return request

}

exports.sendProductOrder = (userEmail, userName, productLink) => {
    const mailjet = Mailjet.apiConnect(
        process.env.MJ_APIKEY_PUBLIC,
        process.env.MJ_APIKEY_PRIVATE,
    );

    const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
            Messages: [
                {
                    From: {
                        Email: "luongnguyen170102@gmail.com",
                        Name: "MEO SHOES"
                    },
                    To: [
                        {
                            Email: userEmail,
                            Name: userName
                        }
                    ],
                    Subject: "[MEW SHOES] CẢM ƠN BẠN ĐÃ TIN TƯỞNG !",
                    HTMLPart: `
                    <p>Chào ${userName},</p>
                    <br />
                   <p> Chúng tôi xin gửi lời cảm ơn sâu sắc vì đã ủng hộ MEWS SHOES bằng việc mua sản phẩm của chúng tôi.</p>
                    <br/>
                    <p>Dưới đây là các sản phẩm khác của shop:</p>
                   <a href="${productLink}">sản phẩm khác</a>
                   <br /> 
                    <br /> 
                    <p>Nếu bạn cần bất kỳ sự hỗ trợ nào liên quan đến đơn hàng hoặc sản phẩm, xin vui lòng liên hệ với chúng tôi qua email tại Mew@gmail.com hoặc số điện thoại 0585.533.000.<p/>
                    <br/>
                    <p>Chúng tôi rất trân trọng sự ủng hộ của bạn và mong được phục vụ bạn trong tương lai.<p/>
                    <br/>
                   <p> Trân trọng,<p/>
                    <p>[MEW SHOES]<p/>

                    <br/>
                   
                    `
                }
            ]
        })
    return request
}