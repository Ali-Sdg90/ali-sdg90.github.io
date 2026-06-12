const DynamicBackground = () => {
    return (
        <div className="bg-effect" aria-hidden="true">
            <div className="bg-shimmer" />

            <span className="bg-orb orb-cyan orb-one" />
            <span className="bg-orb orb-yellow orb-two" />
            <span className="bg-orb orb-blue orb-three" />
            <span className="bg-orb orb-gold orb-four" />

            <span className="bg-line line-one" />
            <span className="bg-line line-two" />

            <span className="bg-ground" />
        </div>
    );
};

export default DynamicBackground;
