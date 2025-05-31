const nodemailer = require('nodemailer');

// Create a transporter object
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like 'outlook', 'yahoo', etc.
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS  // Your email password or app-specific password
    }
});

/**
 * Send an invitation email to a user
 * @param {string} recipientEmail - The email address of the recipient
 * @param {Object} project - The project object
 * @param {string} inviterEmail - The email of the person who invited (optional)
 * @returns {Promise} - A promise that resolves when the email is sent
 */
const sendProjectInvitation = async (recipientEmail, project, inviterEmail = 'The team') => {
    try {
        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: recipientEmail,
            subject: `Invitation to join project: ${project.name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                    <h2 style="color: #333;">You've been invited to join a project</h2>
                    <p style="font-size: 16px; color: #555;">Hello,</p>
                    <p style="font-size: 16px; color: #555;">${inviterEmail} has invited you to collaborate on the project "${project.name}".</p>
                    
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #333;">Project Details</h3>
                        <p style="margin: 5px 0;"><strong>Name:</strong> ${project.name}</p>
                        <p style="margin: 5px 0;"><strong>Description:</strong> ${project.description || 'No description provided'}</p>
                        <p style="margin: 5px 0;"><strong>Project Key:</strong> ${project.project_key || 'N/A'}</p>
                    </div>
                    
                    <p style="font-size: 16px; color: #555;">To access this project, please log in to your account.</p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/projectt/${project._id}" 
                           style="background-color: #4a90e2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
                            View Project
                        </a>
                    </div>
                    
                    <p style="font-size: 14px; color: #777; margin-top: 30px;">If you don't have an account yet, you'll need to sign up first.</p>
                    <p style="font-size: 14px; color: #777;">If you didn't expect this invitation, you can ignore this email.</p>
                </div>
            `
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = {
    sendProjectInvitation
};
