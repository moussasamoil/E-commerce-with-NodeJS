import randomstring from "randomstring";


export const generateOtp = async () => {
    return await randomstring.generate({ length: 6, charset: "alphanumeric" });
}