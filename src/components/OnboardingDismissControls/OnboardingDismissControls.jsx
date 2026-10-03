import { useId, useState } from "react";
import { HiCheck } from "react-icons/hi2";

import { rememberPortfolioOnboardingDismissal } from "../../utils/portfolioOnboardingPreference";

const OnboardingDismissControls = ({ disabled, onDismiss }) => {
    const preferenceId = useId();
    const [shouldRememberDismissal, setShouldRememberDismissal] =
        useState(false);

    const handleDismiss = () => {
        if (shouldRememberDismissal) {
            rememberPortfolioOnboardingDismissal();
        }

        onDismiss();
    };

    return (
        <div className="onboarding-dismiss-controls">
            <label
                className="onboarding-dismiss-controls__preference"
                htmlFor={preferenceId}
            >
                <input
                    id={preferenceId}
                    type="checkbox"
                    checked={shouldRememberDismissal}
                    disabled={disabled}
                    onChange={(event) =>
                        setShouldRememberDismissal(event.target.checked)
                    }
                />
                <span
                    className="onboarding-dismiss-controls__checkbox"
                    aria-hidden="true"
                >
                    <HiCheck />
                </span>
                <span>Don’t show this again</span>
            </label>

            <button
                className="onboarding-dismiss-controls__button"
                type="button"
                disabled={disabled}
                onClick={handleDismiss}
            >
                Got it
            </button>
        </div>
    );
};

export default OnboardingDismissControls;
