import { Icon } from '@iconify/react';

const AccessDenied = () => {
    return (
        <div className="access-denied">
            <h1><Icon icon="bx:lock" width="40" height="40" /> Access Denied</h1>
        </div>
    )
}

export default AccessDenied