import React from 'react';

interface SoilMix {
    soil: number;
    perlite: number;
    vermiculite: number;
    peatMoss: number;
}

interface ResultsProps {
    recommendedSoil: number;
    recommendedPerlite: number;
    recommendedVermiculite: number;
    recommendedPeatMoss: number;
    soilMix: SoilMix;
    cubicFeetToCups: (cubicFeet: number) => number;
}

const Results: React.FC<ResultsProps> = ({
    recommendedSoil,
    recommendedPerlite,
    recommendedVermiculite,
    recommendedPeatMoss,
    soilMix,
    cubicFeetToCups
}) => {
    return (
        <div className="results-grid">
            <div className="grid-header">Component</div>
            <div className="grid-header">Recommended Quantity (cuFt)</div>
            <div className="grid-header">Recommended Cups</div>
            <div className="grid-header">Current Percentage</div>
            <div className="grid-header">Recommended Soil</div>
            <div>Soil</div>
            <div>{recommendedSoil.toFixed(2)}</div>
            <div>{cubicFeetToCups(recommendedSoil).toFixed(2)}</div>
            <div>{soilMix.soil}%</div>
            <div>{recommendedSoil.toFixed(2)} cuFt</div>
            <div>Perlite</div>
            <div>{recommendedPerlite.toFixed(2)}</div>
            <div>{cubicFeetToCups(recommendedPerlite).toFixed(2)}</div>
            <div>{soilMix.perlite}%</div>
            <div>{recommendedPerlite.toFixed(2)} cuFt</div>
            <div>Vermiculite</div>
            <div>{recommendedVermiculite.toFixed(2)}</div>
            <div>{cubicFeetToCups(recommendedVermiculite).toFixed(2)}</div>
            <div>{soilMix.vermiculite}%</div>
            <div>{recommendedVermiculite.toFixed(2)} cuFt</div>
            <div>Peat Moss</div>
            <div>{recommendedPeatMoss.toFixed(2)}</div>
            <div>{cubicFeetToCups(recommendedPeatMoss).toFixed(2)}</div>
            <div>{soilMix.peatMoss}%</div>
            <div>{recommendedPeatMoss.toFixed(2)} cuFt</div>
        </div>
    );
};

export default Results;