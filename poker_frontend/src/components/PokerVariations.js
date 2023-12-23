import React from 'react';
import Button from '@mui/material/Button';



const PokerVariations = ({pokerVariations, currentIndex, setCurrentIndex}) => {

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % pokerVariations.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + pokerVariations.length) % pokerVariations.length);
    };

    return (
        <div style={{ textAlign: 'center' }}>

            <div>
                <img src={pokerVariations[currentIndex].logo} alt={pokerVariations[currentIndex].name} height={200} />
            </div>
            <b>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                    <Button onClick={handlePrev}>&lt;</Button>
                    <p style={{ color: 'white' }}>{pokerVariations[currentIndex].name}</p>
                    <Button onClick={handleNext}>&gt;</Button>
                </div>
            </b>
        </div>
    );
};

export default PokerVariations;
