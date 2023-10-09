import React      from 'react';
import classnames from 'classnames'

import styles     from './Button.module.css';


const Button = (props) => {
    return (
        <button
          {...props}
          className={classnames(styles.button, props.className)}
        />
    );
};

export default Button;
