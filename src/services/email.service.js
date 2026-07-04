// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         type: 'OAuth2',
//         user: process.env.EMAIL_USER,
//         clientId: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//         refreshToken: process.env.REFRESH_TOKEN,
//     },
// });

// // Verify the connection configuration
// transporter.verify((error, success) => {
//     if (error) {
//         console.error('Error connecting to email server:', error);
//     } else {
//         console.log('Email server is ready to send messages');
//     }
// });


// // Function to send email
// const sendEmail = async (to, subject, text, html) => {
//     try {
//         const info = await transporter.sendMail({
//             from: `"Backend Ledger" <${process.env.EMAIL_USER}>`, // sender address
//             to, // list of receivers
//             subject, // Subject line
//             text, // plain text body
//             html, // html body
//         });

//         console.log('Message sent: %s', info.messageId);
//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//     } catch (error) {
//         console.error('Error sending email:', error);
//     }
// };


// async function sendRegistrationEmail(userEmail, name) {
//     const subject = 'Welcome to Backend Ledger!';
//     const text = `Hello ${name},\n\nThank you for registering at Backend Ledger. We're excited to have you on board!\n\nBest regards,\nThe Backend Ledger Team`;
//     const html = `<p>Hello ${name},</p><p>Thank you for registering at Backend Ledger. We're excited to have you on board!</p><p>Best regards,<br>The Backend Ledger Team</p>`;

//     await sendEmail(userEmail, subject, text, html);
// }

// async function sendTransactionEmail(userEmail, name, amount, toAccount) {
//     const subject = 'Transaction Successful!';
//     const text = `Hello ${name},\n\nYour transaction of $${amount} to account ${toAccount} was successful.\n\nBest regards,\nThe Backend Ledger Team`;
//     const html = `<p>Hello ${name},</p><p>Your transaction of $${amount} to account ${toAccount} was successful.</p><p>Best regards,<br>The Backend Ledger Team</p>`;

//     await sendEmail(userEmail, subject, text, html);
// }

// async function sendTransactionFailureEmail(userEmail, name, amount, toAccount) {
//     const subject = 'Transaction Failed';
//     const text = `Hello ${name},\n\nWe regret to inform you that your transaction of $${amount} to account ${toAccount} has failed. Please try again later.\n\nBest regards,\nThe Backend Ledger Team`;
//     const html = `<p>Hello ${name},</p><p>We regret to inform you that your transaction of $${amount} to account ${toAccount} has failed. Please try again later.</p><p>Best regards,<br>The Backend Ledger Team</p>`;

//     await sendEmail(userEmail, subject, text, html);
// }

// module.exports = {
//     sendRegistrationEmail,
//     sendTransactionEmail,
//     sendTransactionFailureEmail
// };

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
    },
});

// Verify the connection configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('Error connecting to email server:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"Backend Ledger" <${process.env.EMAIL_USER}>`, // sender address
            to, // list of receivers
            subject, // Subject line
            text, // plain text body
            html, // html body
        });

        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

// ---- Brand / style constants ------------------------------------------------

const BRAND_NAME = 'Backend Ledger';
const BRAND_COLOR = '#1f2937';   // slate-800
const ACCENT_COLOR = '#4f46e5';  // indigo-600
const SUCCESS_COLOR = '#16a34a'; // green-600
const DANGER_COLOR = '#dc2626';  // red-600

/**
 * Wraps inner HTML content in a full, inline-styled email shell.
 * Inline styles are used throughout because most email clients strip
 * <style> blocks or external CSS.
 */
function renderEmailShell({ headline, accentColor, bodyHtml, footerNote }) {
    return `
  <div style="margin:0; padding:0; background-color:#f3f4f6; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6; padding:32px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.08);">
            <!-- Header -->
            <tr>
              <td style="background-color:${BRAND_COLOR}; padding:24px 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="vertical-align:middle; width:32px; height:32px; border-radius:8px; background-color:rgba(255,255,255,0.12); text-align:center; font-size:16px;">
                      🔒
                    </td>
                    <td style="vertical-align:middle; padding-left:10px; color:#ffffff; font-size:20px; font-weight:700; letter-spacing:0.3px;">
                      ${BRAND_NAME}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Accent stripe -->
            <tr>
              <td style="height:4px; background-color:${accentColor};"></td>
            </tr>

            <!-- Headline -->
            <tr>
              <td style="padding:32px 32px 8px 32px;">
                <h1 style="margin:0; font-size:22px; line-height:1.3; color:${BRAND_COLOR};">
                  ${headline}
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:8px 32px 32px 32px; font-size:15px; line-height:1.6; color:#374151;">
                ${bodyHtml}
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td style="padding:0 32px;">
                <div style="border-top:1px solid #e5e7eb;"></div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:20px 32px 28px 32px; font-size:13px; line-height:1.5; color:#9ca3af;">
                ${footerNote || `You're receiving this email because you have an account with ${BRAND_NAME}.`}
                <br>
                &copy; ${new Date().getFullYear()} ${BRAND_NAME}. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>`;
}

/** Renders a pill-style status badge (Success / Failed / etc.) */
function renderBadge(label, color) {
    return `
    <span style="display:inline-block; padding:4px 12px; border-radius:999px; background-color:${color}1a; color:${color}; font-size:12px; font-weight:600; letter-spacing:0.4px; text-transform:uppercase;">
      ${label}
    </span>`;
}

/** Renders a simple two-column key/value summary card. */
function renderSummaryCard(rows) {
    const rowsHtml = rows
        .map(
            ([label, value]) => `
        <tr>
          <td style="padding:10px 0; font-size:14px; color:#6b7280;">${label}</td>
          <td style="padding:10px 0; font-size:14px; color:${BRAND_COLOR}; font-weight:600; text-align:right;">${value}</td>
        </tr>`
        )
        .join('');

    return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb; border-radius:8px; padding:16px 20px; margin-top:16px;">
      ${rowsHtml}
    </table>`;
}

/** Renders a call-to-action button. */
function renderButton(label, url, color) {
    return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:24px;">
      <tr>
        <td style="border-radius:8px; background-color:${color};">
          <a href="${url}" style="display:inline-block; padding:12px 24px; font-size:14px; font-weight:600; color:#ffffff; text-decoration:none;">
            ${label}
          </a>
        </td>
      </tr>
    </table>`;
}

// ---- Public email functions -------------------------------------------------

async function sendRegistrationEmail(userEmail, name) {
    const subject = "Welcome to Backend Ledger";

    const text = `Hello ${name},

Thank you for creating your Backend Ledger account.

Your account has been successfully created and is ready to use.

If you did not create this account, please contact our support team immediately.

Regards,
Backend Ledger Team`;

    const html = renderEmailShell({
        headline: "Welcome to Backend Ledger",
        accentColor: ACCENT_COLOR,
        bodyHtml: `
            <p>Hi <strong>${name}</strong>,</p>

            <p>
                Thank you for registering with <strong>${BRAND_NAME}</strong>.
                Your account has been created successfully and is now ready to use.
            </p>

            <p>
                We are committed to providing a secure and reliable platform for managing your transactions.
            </p>

            <div style="
                margin-top:24px;
                padding:16px;
                background:#f9fafb;
                border-left:4px solid ${ACCENT_COLOR};
                border-radius:6px;
            ">
                <strong>Account Status:</strong><br>
                Successfully Registered
            </div>

            <p style="margin-top:24px;">
                If you did not create this account, please contact our support team immediately.
            </p>
        `,
    });

    await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionEmail(userEmail, name, amount, toAccount) {
    const subject = 'Transaction Successful!';
    const text = `Hello ${name},\n\nYour transaction of $${amount} to account ${toAccount} was successful.\n\nBest regards,\nThe Backend Ledger Team`;

    const html = renderEmailShell({
        headline: `Hi ${name}, your transaction went through ✅`,
        accentColor: SUCCESS_COLOR,
        bodyHtml: `
      ${renderBadge('Success', SUCCESS_COLOR)}
      <p style="margin-top:16px;">Your transaction has been completed successfully.</p>
      ${renderSummaryCard([
            ['Amount', `$${amount}`],
            ['To Account', toAccount],
            ['Date', new Date().toLocaleString()],
        ])}
      ${renderButton('View Transaction', '#', SUCCESS_COLOR)}
    `,
    });

    await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionFailureEmail(userEmail, name, amount, toAccount) {
    const subject = 'Transaction Failed';
    const text = `Hello ${name},\n\nWe regret to inform you that your transaction of $${amount} to account ${toAccount} has failed. Please try again later.\n\nBest regards,\nThe Backend Ledger Team`;

    const html = renderEmailShell({
        headline: `Hi ${name}, your transaction couldn't be completed ⚠️`,
        accentColor: DANGER_COLOR,
        bodyHtml: `
      ${renderBadge('Failed', DANGER_COLOR)}
      <p style="margin-top:16px;">We regret to inform you that your transaction could not be processed. Please try again later.</p>
      ${renderSummaryCard([
            ['Amount', `$${amount}`],
            ['To Account', toAccount],
            ['Date', new Date().toLocaleString()],
        ])}
      ${renderButton('Retry Transaction', '#', DANGER_COLOR)}
    `,
    });

    await sendEmail(userEmail, subject, text, html);
}

module.exports = {
    sendRegistrationEmail,
    sendTransactionEmail,
    sendTransactionFailureEmail
};