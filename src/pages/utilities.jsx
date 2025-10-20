export function ToastBar({ showToast, setShowToast, toastType, toastMessage }) {
    if (!showToast) return null;

    return (
        <div className="toast position-fixed top-0 start-50 translate-middle-x show" 
             style={{ zIndex: 1050, minWidth: '300px' }} 
             role="alert" 
             aria-live="assertive" 
             aria-atomic="true">
            <div className={`toast-header ${toastType === 'success' ? 'bg-success text-white' : toastType === 'error' ? 'bg-danger text-white' : 'bg-info text-white'}`}>
                <strong className="me-auto">
                    {toastType === 'success' ? 'Success' : toastType === 'error' ? 'Error' : 'Info'}
                </strong>
                <button 
                    type="button" 
                    className="btn-close btn-close-white" 
                    onClick={() => setShowToast(false)}
                ></button>
            </div>
            <div className="toast-body bg-light">
                {toastMessage}
            </div>
        </div>
    );
}