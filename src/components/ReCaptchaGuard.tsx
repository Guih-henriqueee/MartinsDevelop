import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface ReCaptchaGuardProps {
  siteKey: string;
  onVerify: (token: string | null) => void;
}

const ReCaptchaGuard: React.FC<ReCaptchaGuardProps> = ({ siteKey, onVerify }) => {
  return (
    <div className="mt-4">
      <ReCAPTCHA sitekey={siteKey} onChange={onVerify} />
    </div>
  );
};

export default ReCaptchaGuard;
