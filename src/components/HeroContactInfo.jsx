import { contactItems, socialItems } from "../data/portfolio/profileLinks";

const HeroContactInfo = () => {
    return (
        <>
            <address className="hero-contact" aria-label="Ali contact details">
                {contactItems.map(({ icon: Icon, label, href }) => (
                    <a href={href} key={label} target="_blank">
                        <Icon aria-hidden="true" size={20} />
                        <span>{label}</span>
                    </a>
                ))}
            </address>

            <div className="hero-socials" aria-label="Ali social links">
                {socialItems.map(({ icon: Icon, label, href }) => (
                    <a
                        href={href}
                        key={label}
                        aria-label={label}
                        target="_blank"
                    >
                        <Icon aria-hidden="true" size={21} />
                    </a>
                ))}
            </div>
        </>
    );
};

export default HeroContactInfo;
