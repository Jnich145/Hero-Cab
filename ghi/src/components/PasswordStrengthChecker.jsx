import React from "react";
import {useState, useEffect} from "react";

const hasDigits = /\d/;
const hasUpperCase = /[A-Z]/;
const hasLowerCase = /[a-z]/;
const hasSpecialChar = /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/;


const PasswordStrengthChecker = ({ password }) => {
    const [strength, setStrength] = useState(0);
    const [progressBarStyle, setProgressBarStyle] = useState({});

    const calculateStrength = (password) => {
        let totalStrength = 0
        if (password.length >= 3) {
            let strengthByLength = Math.min(6, Math.floor(password.length / 3))
            let strengthByChar = 0
            if (hasDigits.test(password)) {
                strengthByChar = strengthByChar + 1
            }
            if (hasUpperCase.test(password)) {
                strengthByChar = strengthByChar + 1
            }
            if (hasLowerCase.test(password)) {
                strengthByChar = strengthByChar + 1
            }
            if (hasSpecialChar.test(password)) {
                strengthByChar = strengthByChar + 1
            }
            totalStrength = strengthByLength + strengthByChar
        }
        return totalStrength
    }

    const getBarColor = (strengthValue) => {
        if (strengthValue > 8) {
            return "green";
        } else if (strengthValue > 6) {
            return "orange";
        } else {
            return "red";
        }
    };

    useEffect(() => {
        const newStrength = calculateStrength(password);
        setStrength(newStrength);
        setProgressBarStyle({ backgroundColor: getBarColor(newStrength), width: `${newStrength * 10}%` })
    }, [password]);

    return (
        <main>
            <div>
                <div className="progress-container">
                    <div
                        className="progress-bar"
                        style={progressBarStyle}
                    ></div>
                </div>
                <div className="text-strength">
                    <p>The Strength of your password is {strength} out of 10.</p>
                </div>
            </div>
        </main>
    )
}

export default PasswordStrengthChecker;
