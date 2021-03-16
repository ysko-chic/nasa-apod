import React from 'react';
import styles from './ViewerTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ViewerTemplate = (props) => {
    const {viewer, spaceNavigator} = props;

    return (
        <div className={cx('viewer-template')}>
            <header>
                Astronomy Picture of the Day
            </header>
            <div className={cx('viewer-wrapper')}>
                {viewer}
                {/* space-navigator-wrapper 는 scss에 정의되어 있지않음 지워도 상관없음 */}
                <div className={cx('space-navigator-wrapper')}>
                    {spaceNavigator}
                </div>
                {/* <div>
                    {spaceNavigator}
                </div> */}
            </div>
        </div>
    )
}

export default ViewerTemplate;