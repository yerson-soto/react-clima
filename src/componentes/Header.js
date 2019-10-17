import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => {
    return (
        <div>
            <nav>
                <div className="nav-wrapper light-blue darken-2">
                    <a href="../../public/index.html" className="brand-logo title">{props.titulo}</a>
                </div>          
            </nav>
        </div>
    );
}

Header.propTypes = {
    titulo: PropTypes.string.isRequired
}

export default Header;

