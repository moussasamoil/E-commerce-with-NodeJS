export const buildVerifyEmailTemplate = (otp, name = "User") => {
  return `
  <div style="font-family: Arial, sans-serif; background-color:#f4f4f4; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; padding:30px; border-radius:10px; text-align:center;">
      
      <h2 style="color:#333;">Welcome, ${name} 👋</h2>
      
      <p style="color:#555; font-size:16px;">
        Thanks for signing up. Please verify your email address by clicking the button below.
      </p>

      <p>
         ${otp}
      </p>

      <p style="margin-top:30px; font-size:12px; color:#999;">
        If you didn’t create this account, you can safely ignore this email.
      </p>

    </div>
  </div>
  `;
};