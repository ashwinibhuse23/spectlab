import React from 'react';
import { Link } from 'react-router-dom';
import './NabhBadge.css';

const NabhBadge = () => {
    return (
        <div className="nabh-float-container">
            <Link 
                to="/about" 
                className="nabh-float" 
                aria-label="NABH Accredited Center"
            >
                <div className="nabh-pulse"></div>
                <img 
                    src="/nabh.png" 
                    alt="NABH Accredited - Patient Safety & Quality of Care" 
                    className="nabh-icon"
                />
                <span className="nabh-tooltip-text">NABH Accredited Center</span>
            </Link>
        </div>
    );
};

export default NabhBadge;
